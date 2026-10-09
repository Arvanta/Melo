// Before/after composites cropped around what each round-73 change alters.
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const puppeteer = require("puppeteer");
import http from "node:http"; import fs from "node:fs"; import path from "node:path";

const MIME = { ".html":"text/html",".js":"text/javascript",".css":"text/css",".woff2":"font/woff2" };
function serve(root) {
  const s = http.createServer((req,res)=>{
    let u = decodeURIComponent(req.url.split("?")[0]); if (u === "/") u = "/index.html";
    const f = path.join(root, u);
    if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
    res.writeHead(200,{"content-type":MIME[path.extname(f)]||"application/octet-stream"});
    fs.createReadStream(f).pipe(res);
  });
  return new Promise(r => s.listen(0, "127.0.0.1", () => r(s)));
}

// crop box per view: [x0,y0,x1,y1] in CSS px inside the revealed window
const CROPS = {
  sheet:      { win: "win-library",  box: [8, 150, 760, 560] },     // first album sheet incl. meta line
  tiles:      { win: "win-library",  box: [8, 300, 760, 600] },     // card grid
  mostplayed: { win: "win-playlist", box: [8, 60, 760, 420] },      // first rows incl. times
  settings:   { win: "win-settings", box: [0, 0, 630, 660] },       // whole settings window
};

const view = process.argv[2];
const root = process.argv[3];
const outPng = process.argv[4];
const C = CROPS[view];
const server = await serve(root);
const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1300, height: 900, deviceScaleFactor: 2 });
const data = fs.readFileSync(new URL("./stub.js", import.meta.url), "utf8");
await page.evaluateOnNewDocument(data + `\nrun(${JSON.stringify(C.win)});`);
await page.goto(`http://127.0.0.1:${server.address().port}/?v=${view}`, { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 2600));
await page.evaluate(async (v, win) => {
  if (v === "sheet" || v === "tiles") {
    const tabBtn = [...document.querySelectorAll("#libraryTabs .tab")].find(b => b.dataset.libtab === "albums");
    tabBtn?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    await new Promise(r => setTimeout(r, 1800));
    if (v === "sheet") {
      const row = document.querySelector("[data-group-index]");
      const seen = [];
      for (let step = 0; step < 6; step++) {
        seen.push({ step, sheets: document.querySelectorAll(".lib-sheet").length, rows: document.querySelectorAll("[data-group-index]").length, crumb: document.querySelector(".lib-crumb")?.textContent?.trim() ?? null });
        if (document.querySelector(".lib-sheet")) break;
        const target = document.querySelector(".lib-sheet [data-group-index]") || row;
        target?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        await new Promise(r => setTimeout(r, 1200));
      }
      seen.push({ step: "final", sheets: document.querySelectorAll(".lib-sheet").length, rows: document.querySelectorAll("[data-group-index]").length, crumb: document.querySelector(".lib-crumb")?.textContent?.trim() ?? null });
      window.__seen = seen;
    }
  }
  if (v === "settings") {
    [...document.querySelectorAll(".settings-tab")].find(b => b.dataset.stab === "appearance")?.click();
  }
  window.__probe = {
    sheets: document.querySelectorAll(".lib-sheet").length,
    count: document.querySelector(".lib-sheet-count")?.textContent ?? null,
    mins: document.querySelector(".lib-sheet-mins")?.textContent ?? null,
    cards: document.querySelectorAll(".lib-card").length,
    avatar: (() => { const av = document.querySelector(".lib-card .lib-avatar"); if (!av) return null; const r = av.getBoundingClientRect(); return [Math.round(r.width), Math.round(r.height)]; })(),
    libView: localStorage.getItem("melo-lib-view"),
    seen: window.__seen || null,
    trackListHead: (document.getElementById("trackList")?.innerHTML || "").slice(0, 160),
    set: window.__setProbe || null,
    skinRow: [...document.querySelectorAll(".settings-row")].map(r => r.textContent).find(t => /Skins Directory/i.test(t))?.replace(/\s+/g, " ").trim().slice(0, 220) ?? null,
  };
}, view, C.win);
console.log(view, JSON.stringify(await page.evaluate(() => window.__probe)));
const [x0, y0, x1, y1] = C.box;
const buf = await page.screenshot({ clip: { x: x0, y: y0, width: x1 - x0, height: y1 - y0 } });
fs.writeFileSync(outPng, buf);
await browser.close(); server.close();
console.log("shot", view, outPng);
