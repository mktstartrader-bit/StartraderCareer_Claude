// Capture an arbitrary vertical region of a full page (post scroll-reveal).
// Usage: node scripts/region.mjs <route> <out.png> <width> <y> <height>
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import net from "node:net";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [route = "/", out = "region.png", width = "1440", yStr = "0", hStr = "800"] = process.argv.slice(2);
const W = Number(width), Y = Number(yStr), H = Number(hStr);
const base = process.env.BASE ?? "http://localhost:5173";
const port = 9700 + Math.floor(Math.random() * 200);

const chrome = spawn(CHROME, [
  `--remote-debugging-port=${port}`, "--headless=new", "--hide-scrollbars", "--disable-gpu",
  "--no-first-run", "--no-default-browser-check", `--window-size=${W},1000`,
  "--user-data-dir=/tmp/sc-chrome-region", "about:blank",
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
  const send = (m, p = {}) => new Promise((res) => { const mid = ++id; pending.set(mid, res); ws.send(JSON.stringify({ id: mid, method: m, params: p })); });
  await new Promise((r) => (ws.onopen = r));
  ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id); } };
  await send("Runtime.enable"); await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send("Page.navigate", { url: `${base}${route}` });
  await wait(2500);
  const expr = `(async()=>{const h=document.body.scrollHeight;for(let y=0;y<=h;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,90));}window.scrollTo(0,h);await new Promise(r=>setTimeout(r,400));window.scrollTo(0,0);})()`;
  await send("Runtime.evaluate", { expression: expr, awaitPromise: true });
  await wait(700);
  const { cssContentSize } = await send("Page.getLayoutMetrics");
  const full = Math.ceil(cssContentSize.height);
  await send("Emulation.setDeviceMetricsOverride", { width: W, height: full, deviceScaleFactor: 1, mobile: false });
  await wait(700);
  const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: Y, width: W, height: H, scale: 1 } });
  writeFileSync(out, Buffer.from(data, "base64"));
  console.log(`saved ${out} (${W}x${H} @${Y}) page=${full}`);
  ws.close(); chrome.kill(); process.exit(0);
}
run().catch((e) => { console.error(e); chrome.kill(); process.exit(1); });
