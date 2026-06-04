// Full-page screenshots via headless Chrome (CDP) — no extra deps.
// Usage: node scripts/shoot.mjs <path> <outfile> [width]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import net from "node:net";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const route = process.argv[2] ?? "/";
const out = process.argv[3] ?? "shot.png";
const width = Number(process.argv[4] ?? 1440);
const base = process.env.BASE ?? "http://localhost:4173";

const port = 9222 + Math.floor(Math.random() * 500);

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${port}`,
  "--headless=new",
  "--hide-scrollbars",
  "--disable-gpu",
  "--no-first-run",
  "--no-default-browser-check",
  `--window-size=${width},1200`,
  "--user-data-dir=/tmp/sc-chrome-profile",
  "about:blank",
]);
chrome.stderr.on("data", () => {});

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitPort(p) {
  for (let i = 0; i < 100; i++) {
    const ok = await new Promise((res) => {
      const s = net.connect(p, "127.0.0.1");
      s.on("connect", () => { s.end(); res(true); });
      s.on("error", () => res(false));
    });
    if (ok) return;
    await wait(100);
  }
  throw new Error("chrome devtools port never opened");
}

async function cdp() {
  await waitPort(port);
  await wait(300);
  const list = await (await fetch(`http://127.0.0.1:${port}/json/new?${base}${route}`, { method: "PUT" })).json();
  const wsUrl = list.webSocketDebuggerUrl;
  const { WebSocket } = await import("node:worker_threads").then(() => ({ WebSocket: globalThis.WebSocket }));
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const mid = ++id;
      pending.set(mid, resolve);
      ws.send(JSON.stringify({ id: mid, method, params }));
    });
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg.result); pending.delete(msg.id); }
  };

  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width, height: 1200, deviceScaleFactor: 1, mobile: false,
  });
  await send("Page.navigate", { url: `${base}${route}` });
  await wait(2500); // let fonts & images load

  // Scroll through so every whileInView reveal fires, then return to top.
  const expr = `(async()=>{const h=document.body.scrollHeight;for(let y=0;y<=h;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}window.scrollTo(0,h);await new Promise(r=>setTimeout(r,400));window.scrollTo(0,0);})()`;
  await send("Runtime.evaluate", { expression: expr, awaitPromise: true });
  await wait(600);

  const { cssContentSize } = await send("Page.getLayoutMetrics");
  const height = Math.min(Math.ceil(cssContentSize.height), 30000);
  await send("Emulation.setDeviceMetricsOverride", { width, height, deviceScaleFactor: 1, mobile: false });
  await wait(500);

  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true });
  writeFileSync(out, Buffer.from(data, "base64"));
  ws.close();
  chrome.kill();
  console.log(`saved ${out} (${width}x${height})`);
  process.exit(0);
}

cdp().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });
