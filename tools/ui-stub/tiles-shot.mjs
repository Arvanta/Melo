// Direct tiles capture: measure the card grid, clip exactly around it.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer");
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const MIME = { ".html":"text/html",".js":"text/javascript",".css":"text/css",".woff2":"font/woff2" };
const root = process.argv[2], out = process.argv[3];
const server = http.createServer((req,res)=>{
  let u = decodeURIComponent(req.url.split("?")[0]); if (u === "/") u = "/index.html";
  const f = path.join(root, u);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200,{"content-type":MIME[path.extname(f)]||"application/octet-stream"});
  fs.createReadStream(f).pipe(res);
});
await new Promise(r=>server.listen(0,"127.0.0.1",r));
const browser = await puppeteer.launch({ args:["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1600, height: 900, deviceScaleFactor: 2 });
const stub = fs.readFileSync(new URL("./stub.js", import.meta.url), "utf8");
await page.evaluateOnNewDocument(stub + `\nrun("win-library");`);
await page.goto(`http://127.0.0.1:${server.address().port}/?v=tiles`, { waitUntil: "networkidle0" });
await new Promise(r=>setTimeout(r, 2600));
const clip = await page.evaluate(() => {
  const tabBtn = [...document.querySelectorAll("#libraryTabs .tab")].find(b => b.dataset.libtab === "albums");
  tabBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  const win = document.getElementById("win-library");
  const r = win.getBoundingClientRect();
  win.style.width = "1560px"; const _r2 = win.getBoundingClientRect(); return { wx: _r2.x, wy: _r2.y, ww: _r2.width, wh: _r2.height, cards: document.querySelectorAll(".lib-card").length,
           list: (() => { const el = document.getElementById("trackList"); const q = el.getBoundingClientRect(); return [q.x, q.y, q.width, q.height]; })() };
});
await new Promise(r=>setTimeout(r, 1200));
const geo = await page.evaluate(() => {
  const av = document.querySelector(".lib-card .lib-avatar");
  if (!av) return null; const r = av.getBoundingClientRect();
  return { w: +r.width.toFixed(1), h: +r.height.toFixed(1) };
});
console.log("avatar", JSON.stringify(geo));
const box = await page.evaluate(() => {
  const cards = [...document.querySelectorAll(".lib-card")];
  const win = document.getElementById("win-library").getBoundingClientRect();
  if (!cards.length) return null;
  const rs = cards.map(c => c.getBoundingClientRect());
  return { x: win.x + 6, y: Math.min(...rs.map(r => r.top)) - win.y + win.y - 6,
           w: win.width - 12, h: (Math.max(...rs.map(r => r.bottom)) - Math.min(...rs.map(r => r.top))) + 12,
           abs: [Math.min(...rs.map(r=>r.top)), Math.max(...rs.map(r=>r.bottom))] };
});
console.log("clipinfo", JSON.stringify({ ...clip, box }));
if (box) await page.screenshot({ path: out, clip: { x: box.x, y: box.y, width: box.w, height: box.h } });
else await page.screenshot({ path: out });
await browser.close(); server.close();
