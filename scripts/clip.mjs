// Capture clipped regions of a full page: node scripts/clip.mjs <route> <out-prefix> [width]
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import net from "node:net";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const route = process.argv[2] ?? "/";
const prefix = process.argv[3] ?? "clip";
const width = Number(process.argv[4] ?? 1440);
const base = process.env.BASE ?? "http://localhost:4173";
const port = 9500 + Math.floor(Math.random() * 400);

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${port}`, "--headless=new", "--hide-scrollbars", "--disable-gpu",
  "--no-first-run", "--no-default-browser-check", `--window-size=${width},1000`,
  "--user-data-dir=/tmp/sc-chrome-clip", "about:blank",
]);
chrome.stderr.on("data", () => {});
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function waitPort(p) {
  for (let i = 0; i < 100; i++) {
    const ok = await new Promise((res) => { const s = net.connect(p, "127.0.0.1");
      s.on("connect", () => { s.end(); res(true); }); s.on("error", () => res(false)); });
    if (ok) return; await wait(100);
  }
  throw new Error("no devtools port");
}

async function run() {
  await waitPort(port); await wait(300);
  const ws = new WebSocket((await (await fetch(`http://127.0.0.1:${port}/json/new?${base}${route}`, { method: "PUT" })).json()).webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  const send = (method, params = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method, params })); });
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };

  await send("Runtime.enable");
  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width, height: 1000, deviceScaleFactor: 2, mobile: false });
  await send("Page.navigate", { url: `${base}${route}` });
  await wait(2500);
  // Scroll through the page so every whileInView reveal fires, then return to top.
  const expr = `(async()=>{const h=document.body.scrollHeight;for(let y=0;y<=h;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}window.scrollTo(0,h);await new Promise(r=>setTimeout(r,400));window.scrollTo(0,0);})()`;
  await send("Runtime.evaluate", { expression: expr, awaitPromise: true });
  await wait(600);
  const { cssContentSize } = await send("Page.getLayoutMetrics");
  const H = Math.ceil(cssContentSize.height);
  await send("Emulation.setDeviceMetricsOverride", { width, height: H, deviceScaleFactor: 2, mobile: false });
  await wait(700);

  const shot = async (name, clip) => {
    const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
    writeFileSync(`${prefix}_${name}.png`, Buffer.from(data, "base64"));
    console.log(`  ${prefix}_${name}.png  ${clip.width}x${clip.height} @${clip.y}`);
  };
  await shot("nav", { x: 0, y: 0, width, height: 90 });
  await shot("footer", { x: 0, y: Math.max(0, H - 360), width, height: 360 });
  console.log(`page height ${H}`);
  ws.close(); chrome.kill(); process.exit(0);
}
run().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });
