# تحلیل یافته‌های main.ts — Melo (گزارش `03-main-ts-Issues-fa.txt`)

**تاریخ تحلیل:** 2026-09-17
**وضعیت پروژه:** Melo v0.9.0 — main.ts ~2019 خط
**روش:** بررسی هر یافته در برابر کد فعلی (`src/main.ts`)، تعیین وضعیت، رتبه‌بندی اهمیت، شناسایی ریسک‌های پرفورمنسی/جانبی، و ارائه استراتژی پیاده‌سازی (بدون کد).

---

## راهنمای رتبه‌بندی (اهمیت)

- **P1-A (بحرانی — دسترسی کاربر را مختل می‌کند):** مشکلاتی که مستقیماً روی قابلیت استفاده تأثیر می‌گذارند، race condition روی پنجره‌ها، یا پنجره‌های غیرقابل‌دسترس.
- **P1-B (پایداری multi-window):** مشکلاتی که در تعامل چند پنجره‌ای، tray، CLI/resume ایجاد مشکل می‌کنند.
- **P2-C (کارایی و صحت fallback):** polling غیرضروری، persistence پرنویس، fallback مرورگر غیرصادقانه.
- **P2-D (کیفیت کد و نگه‌داری):** monolith، `any`، selector گسترده، import مرده، تست ناکافی.

---

## ✅/⚠️/❌ — وضعیت هر یافته در کد فعلی

### P1-A — بحرانی (دسترسی کاربر)

#### یافته ۱ — انتقال ناقص header actions هنگام routing پنل ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۶۴۷–۶۶۲ — `titleHtml` فقط از `.float-title` و `bodyHtml` از `.float-body` کپی می‌شود. `float-actions` (که شامل دکمه Reset Settings است) منتقل نمی‌شود.
- **نتیجه:** در پنجره Settings به‌صورت پنل Tauri، دکمه Reset ناپدید می‌شود.
- **رتبه:** P1-A
- **ریسک پرفورمنس/جانبی:** کم (صرفاً مسئله UI template).

#### یافته ۲ — Geometry ناسازگار بین physical و logical pixels ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۷۸۵–۷۸۷ (`outerPosition`/`innerSize` بدون تبدیل به logical)، خط ۷۷۹ (`LogicalPosition(g.x, g.y)`)، خط ۷۹۷ (داخل onResized `innerSize` با `toLogical` تبدیل می‌شود ولی ذخیره نمی‌شود)، خط ۱۰۱۲–۱۰۱۵ (`persistGeometry` نیز physical ذخیره می‌کند).
- **نتیجه:** ذخیره physical، restore با Logical → drift در DPI scaling یا multi-monitor.
- **رتبه:** P1-A
- **ریسک پرفورمنس/جانبی:** کم. اگر نادرست پیاده شود: حلقه تبدیل در `onResized` فراخوانی‌های اضافی IPC تولید می‌کند.

#### یافته ۳ — تغییر monitor/resolution → پنجره خارج از صفحه ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۷۷۹ بدون بررسی `availableMonitors()` یا `primaryScreen().workArea`. در حالت browser fallback تابع `clampIntoDesktop` (خط ۱۰۴۰) وجود دارد ولی در Tauri native panel اعمال نمی‌شود.
- **رتبه:** P1-A
- **ریسک پرفورمنس/جانبی:** کم. فقط در لحظه create/restore چند native call اضافه می‌شود (تحمل‌پذیر).

#### یافته ۴ — Race در ساخت پنجره ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۱۰۲۵–۱۰۲۶ — بین `getByLabel` و `new WebviewWindow` فاصله async وجود دارد، بدون lock. کلیک سریع روی یک دکمه می‌تواند چند WebviewWindow با یک label بسازد.
- **رتبه:** P1-A
- **ریسک پرفورمنس/جانبی:** **متوسط بالقوه.** اگر lock سراسری اعمال شود، کلیک‌های موازی روی پنل‌های مختلف serialize می‌شوند. lock باید per-panel باشد.

### P1-B — پایداری multi-window

#### یافته ۵ — کلیک روی پنل باز آن را می‌بندد نه focus می‌کند ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۱۰۲۶ `if (existing) { await existing.close(); ... }`. رفتار فعلی: toggle (یعنی بستن)؛ در تضاد با انتظار کاربر (focus).
- **رتبه:** P1-B
- **ریسک پرفورمنس/جانبی:** ناچیز (رفتار تعاملی).

#### یافته ۶ — URL panel allowlist نشده ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۶۳۳ `new URLSearchParams(location.search).get("panel")` و خط ۶۳۵ `classList.add("panel-" + urlPanel)` بدون اعتبارسنجی. همچنین خط ۶۴۷ `document.getElementById("win-" + urlPanel)` می‌تواند null باشد و `bodyHtml` خالی شود.
- **رتبه:** P1-B
- **ریسک پرفورمنس/جانبی:** کم.

#### یافته ۷ — Polling هر 1.2 ثانیه ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۶۷۸ `setInterval(refresh, 1200)` در حالت main Tauri.
- **رتبه:** P2-C (بهبود عملکرد)
- **ریسک پرفورمنس/جانبی:** **این یافته خودش یک مصرف‌کننده پرفورمنس است.** حذف آن با رویداد event-driven بهبوددهنده است.

#### یافته ۸ — Debounce ذخیره geometry ندارد ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۷۹۰ `mainWin.onMoved(saveGeo)` و خط ۷۹۲ `onResized → saveGeo()` در هر فریم فراخوانی می‌شود. هر فراخوانی = یک IPC + localStorage write.
- **رتبه:** P2-C
- **ریسک پرفورمنس/جانبی:** **خودش آسیب‌زننده است.** debounce پیش‌فرض باید ~250ms باشد؛ flush نهایی در `onCloseRequested` یا `onMoved` پایان.

#### یافته ۹ — بستن Main به tray، پنل‌های ثانویه را باز می‌گذارد ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۸۳۷–۸۴۰ — وقتی tray فعال است، فقط `mainWin.hide()` صدا زده می‌شود. پنل‌ها باز می‌مانند.
- **رتبه:** P1-B
- **ریسک پرفورمنس/جانبی:** **متوسط بالقوه.** اگر policy "hide همه" انتخاب شود، در close/restore باید لیست پنل‌های visible پیمایش شود؛ batch لازم است.

#### یافته ۱۰ — Browser fallback lifecycle ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۱۲۷۲–۱۲۸۴ — `URL.createObjectURL` بدون `URL.revokeObjectURL`، `lib?.addTracks` در حالت web ممکن است no-op باشد (بسته به setupLibrary)، و toast موفقیت بدون بررسی نتیجه نشان داده می‌شود.
- **رتبه:** P2-C
- **ریسک پرفورمنس/جانبی:** **متوسط.** اگر "in-memory demo store واقعی" اضافه شود، import بزرگ حافظه مصرف می‌کند. سقف تعداد، metadata حداقلی، revoke قطعی object URL ضروری است. مسیر Tauri نباید degrade شود.

#### یافته ۱۱ — CLI/Open With و resume timing-sensitive ⚠️ **تا حدی بهبود یافته**
- **شواهد در کد فعلی:** خط ۸۴۳–۸۹۰ — polling با چند timeout (400, 900, 1500, 2200, 3000ms)، `cliOpenSeen` flag، `recentOpenPaths` de-dup map، و در resume خط ۱۹۶۸ `if (cliOpenSeen) return` اضافه شده.
- **بهبود نسبت به گزارش:** polling جایگزین نشده ولی dedup بهتر شده و resume دیگر race نمی‌کند.
- **باقی‌مانده:** هیچ state machine رسمی برای boot coordinator وجود ندارد؛ ordering همچنان به ترتیب event/polling و timeout وابسته است.
- **رتبه:** P1-B (اما نه بحرانی)
- **ریسک پرفورمنس/جانبی:** **کم.** boot coordinator اگر timeout کوتاه (مثل 3s) داشته باشد، startup بیش از حد طولانی نمی‌شود.

### P2-D — ساختار، type safety، نگه‌داری

#### یافته ۱۲ — main.ts monolith ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** فایل ~2019 خط (از ۱۸۶۴ در زمان گزارش بزرگ‌تر هم شده). تمام bootstrap، window manager، import orchestration، resume، UI setup در یک فایل.
- **رتبه:** P2-D
- **ریسک پرفورمنس/جانبی:** ناچیز. فقط هزینه توسعه.

#### یافته ۱۳ — any و globals گسترده ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** `(window as any).LumiLibrary`, `(window as any).LumiPlayer`, `(window as any).__LUMI_AUDIO__`, `(window as any).__TOAST__`, `(window as any).__LUMI_REBIND_MAIN__`, `(window as any).__MELO_EMBEDDED_PLAYLIST__`, `(window as any).__MELO_VISUALIZER_SET_PAUSED__` در خط ۸۸۲، ۱۲۵۶، ۱۲۵۷، ۱۵۸۱، ۱۵۸۲، ۱۷۹۸، ۱۸۴۳ و بسیاری جاهای دیگر.
- **رتبه:** P2-D
- **ریسک پرفورمنس/جانبی:** ناچیز (compile-time).

#### یافته ۱۴ — selector bindWinControls بیش‌ازحد گسترده ⚠️ **تا حدی بهبود یافته**
- **شواهد در کد فعلی:** خط ۱۷۷۳ اکنون `.win-btn, [data-melo="minimize"], [data-melo="close"]` را انتخاب می‌کند (در گزارش فقط `.win-btn` بود). اما همچنان `.win-btn` کلی است و شامل `btnAddFiles` و `btnThemeToggle` نیز می‌شود.
- **باقی‌مانده:** منطق داخلی handler اکنون با `aria-label` یا `data-melo` تشخیص می‌دهد (خط ۱۷۸۰–۱۷۸۲). اما skin سفارشی می‌تواند `.win-btn close` داشته باشد که رفتار متفاوت بگیرد.
- **رتبه:** P2-D (پایین‌تر از گزارش)
- **ریسک پرفورمنس/جانبی:** ناچیز.

#### یافته ۱۵ — contextmenu سراسری غیرفعال ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** خط ۹۱۷ `document.addEventListener("contextmenu", e => e.preventDefault())`.
- **رتبه:** P2-D
- **ریسک پرفورمنس/جانبی:** ناچیز. اگر اشتباه پیاده شود (مثلاً با event delegation سنگین) ممکن است کندی ایجاد کند.

#### یافته ۱۶ — import applyCustomSkin مرده ✅ **همچنان وجود دارد ولی تأیید شده**
- **شواهد در کد فعلی:** خط ۸ `applyCustomSkin` در لیست import ولی در بدنه استفاده نمی‌شود.
- **رتبه:** P2-D
- **ریسک پرفورمنس/جانبی:** ناچیز.

#### یافته ۱۷ — تست خودکار ناکافی ❌ **همچنان وجود دارد**
- **شواهد در کد فعلی:** هیچ پوشش تست برای panel routing، geometry، tray، CLI، resume، event bridge در main.ts دیده نمی‌شود.
- **رتبه:** P2-D
- **ریسک پرفورمنس/جانبی:** ناچیز (هزینه CI).

---

## 🔥 ریسک‌های پرفورمنسی و جانبی — جمع‌بندی

از ۱۷ یافته، تنها **۵ مورد** می‌توانند در صورت پیاده‌سازی نادرست باعث کاهش پرفورمنس یا ایجاد مشکلات جانبی شوند:

| یافته | ریسک | دلیل | پیشگیری |
|---|---|---|---|
| **۴** (race ساخت پنجره) | متوسط | lock سراسری → serialize کلیک‌ها | lock per-panel، کوتاه‌عمر |
| **۷** (polling 1.2s) | بهبوددهنده (حذف = بهبود) | — | جایگزینی event-driven |
| **۸** (debounce geometry) | بهبوددهنده (نداشتن = بد) | IPC + write در هر فریم | debounce 250ms + flush نهایی |
| **۹** (tray + پنل‌ها) | متوسط | پیمایش همه پنل‌ها در hide/restore | batch + نگهداری لیست visible |
| **۱۰** (browser fallback) | متوسط | حافظه با import بزرگ | سقف تعداد/حجم، revoke object URL |
| **۱۱** (boot coordinator) | کم | timeout طولانی startup | timeout ~3s، cancellation token |

**نکته کلیدی:** یافته‌های **۷ و ۸** خودشان در حال حاضر **مصرف‌کننده پرفورمنس هستند** — رفع آن‌ها بهبود است، نه ریسک.

---

## 🛠️ استراتژی پیاده‌سازی (بدون کد، فقط طرح)

### موج ۱ — بحرانی + پایداری multi-window (P1-A + P1-B)

#### ۱. رفع انتقال header actions (یافته ۱)
- **هدف:** کل `.float-actions` به همراه title/body منتقل شود.
- **طرح:**
  1. یک helper function `clonePanelDOM(panelName)` که title + actions + body را در یک ساختار واحد کپی می‌کند.
  2. در پنجره native، `.panel-actions` در `panel-titlebar` قرار می‌گیرد و `data-melo` attribute روی هر دکمه برای rebind handler حفظ می‌شود.
  3. پس از mount، `bindWinControls()` و handler خاص (مثل Reset) به المان‌های جدید متصل می‌شوند.
- **اولویت:** بالا، چون قابلیت Settings reset در پنجره بومی فعلاً ناپدید است.

#### ۲. Geometry ایمن و DPI-aware (یافته ۲ و ۳)
- **هدف:** ذخیره و restore کاملاً logical + clamp به نمایشگرهای فعال.
- **طرح:**
  1. یک helper `resolveWindowGeometry(win, scaleFactor)` که با `toLogical(scaleFactor)` تبدیل می‌کند و یکپارچه `{x, y, w, h}` logical برمی‌گرداند.
  2. در restore: با `availableMonitors()` لیست work-areaها را بگیر، بررسی کن که آیا `(x, y, w, h)` در یکی از آن‌ها جا می‌گیرد. اگر نه → center در primary monitor با سایز ایمن.
  3. در save: فقط logical، فقط در فریم‌های debounce‌شده.
- **اولویت:** بالا (پنجره غیرقابل‌دسترس = کرش تجربه کاربری).

#### ۳. Creation lock + focus policy (یافته ۴ و ۵)
- **هدف:** جلوگیری از race + رفتار focus به‌جای close.
- **طرح:**
  1. یک `Map<panelLabel, Promise<void>>` به‌عنوان lock per-panel؛ هر `openPanelWindow` ابتدا promise موجود را await کرده، سپس promise جدید ثبت می‌کند و در پایان (finally) حذف می‌کند.
  2. تغییر رفتار کلیک روی پنل باز: اگر پنل باز است → `existing.show()` + `existing.setFocus()` + `existing.unminimize()`؛ اگر minimize است → فقط unminimize. close فقط روی دکمه × پنل.
  3. رفتار toggle (بستن با کلیک مجدد) از طریق یک modifier (مثلاً Shift+click یا دکمه ×) ارائه شود؛ یا فقط از طریق آیکون × در titlebar.
- **اولویت:** بالا (race می‌تواند پنل تکراری بسازد).

#### ۴. Allowlist پنل + حذف polling + debounce geometry (یافته ۶، ۷، ۸)
- **هدف:** typed registry + event-driven + کاهش کار تکراری.
- **طرح:**
  1. یک `const ALLOWED_PANELS = ["library", "playlist", "equalizer", "lyrics", "settings"] as const`. اگر `urlPanel` خارج از این لیست بود → fallback به main، log warning.
  2. حذف `setInterval(refresh, 1200)`. جایگزینی با listener بر روی رویدادهای `melo:panel-opened` و `melo:panel-closed` که در `openPanelWindow` و `busOn("melo:panel-closed")` منتشر می‌شوند (این دومی از قبل وجود دارد).
  3. debounce ~250ms روی `saveGeo` (هر دو main و panel). در `onCloseRequested` flush فوری با `await saveGeoNow()`.
- **اولویت:** متوسط (پایداری + صرفه‌جویی IPC).

#### ۵. Tray policy روشن + Boot Coordinator (یافته ۹ و ۱۱)
- **هدف:** رفتار tray قابل پیش‌بینی + boot ایمن.
- **طرح:**
  1. یک policy flag `melo-pref-tray-keep-panels` با مقادیر `"keep"` (پنل‌ها بمانند)، `"hide"` (پنل‌ها هم hide شوند)، `"close"` (همه بسته شوند). پیش‌فرض: `"keep"`.
  2. در `mainWin.onCloseRequested`: اگر tray فعال است و policy = hide → یک batch با `Promise.allSettled([...panels.map(p => hidePanel(p))])`. اگر keep → فقط main hide.
  3. Boot Coordinator: یک state machine ساده با states `BOOT_INIT → BOOT_CLI_DRAIN → BOOT_UI_READY → BOOT_RESUME → BOOT_DONE`. CLI drain تا 3 ثانیه یا تا `BOOT_UI_READY` (هر کدام زودتر). Resume فقط در `BOOT_DONE` یا با cancellation اگر `BOOT_CLI_DRAIN` هنوز path دریافت کرد.
- **اولویت:** متوسط.

#### ۶. Browser fallback صادق + revoke (یافته ۱۰)
- **هدف:** حالت web قابل پیش‌بینی + بدون نشتی حافظه.
- **طرح:**
  1. یک `createDemoLibraryStore()` که فقط در حالت browser فعال می‌شود و سقف مثلاً ۵۰۰ آیتم + ۵۰۰ MB حجم کل دارد.
  2. revoke قطعی: `URL.revokeObjectURL(url)` در listener `audio.ended` یا زمانی که track از queue حذف می‌شود.
  3. toast فقط بر اساس نتیجه واقعی: اگر `lib.addTracks` خالی برگشت → "Could not add files in browser preview".
- **اولویت:** متوسط.

### موج ۲ — کیفیت کد (P2-D)

#### ۷. تفکیک ماژول (یافته ۱۲)
- **هدف:** کاهش monolith.
- **طرح:**
  1. `src/window-manager.ts` → open/close/focus پنل‌ها، geometry، creation lock، event-driven sync.
  2. `src/panel-router.ts` → کلون کردن DOM برای native پنل + bind handler.
  3. `src/boot-coordinator.ts` → state machine + CLI drain + resume.
  4. `src/browser-fallback.ts` → demo store + object URL lifecycle.
  5. `src/main.ts` → فقط entry: init locale، apply theme، setup player، setup library/eq/viz/lyrics/skin/settings، فراخوانی window-manager + boot-coordinator.
- **اولویت:** پایین (اما ریسک regression در طول waves ۱–۶ بالا می‌رود، پس زودتر بهتر).

#### ۸. Type safety (یافته ۱۳)
- **هدف:** حذف تدریجی `any` + interface برای window globals.
- **طرح:**
  1. یک `src/global.d.ts` که `Window` را extend می‌کند: `interface Window { LumiLibrary: ...; LumiPlayer: ...; __LUMI_AUDIO__: ...; __TOAST__: ...; __MELO_EMBEDDED_PLAYLIST__: ...; __MELO_VISUALIZER_SET_PAUSED__: ...; __LUMI_REBIND_MAIN__: () => void; }`.
  2. حذف همه `(window as any)` به‌جز مواردی که واقعاً dynamic هستند.
  3. فعال‌سازی تدریجی `noUnusedLocals` و `noUnusedParameters` در `tsconfig.json` بعد از wave ۱.
- **اولویت:** پایین.

#### ۹. Selector دقیق + contextmenu هوشمند + cleanup (یافته ۱۴، ۱۵، ۱۶)
- **هدف:** رفتار قابل پیش‌بینی با skin سفارشی.
- **طرح:**
  1. `data-role="window-control"` یا `data-window-action="minimize|close"` به‌عنوان data attribute اختصاصی. `bindWinControls` فقط این selector را هدف بگیرد. کلاس `.win-btn` فقط برای استایل.
  2. contextmenu: `e.preventDefault()` فقط اگر `e.target.closest('[data-contextmenu]')` وجود داشته باشد؛ در غیر این صورت default browser.
  3. حذف `applyCustomSkin` از import در main.ts (در skin.ts باقی بماند چون `skin.ts` از آن استفاده می‌کند).
- **اولویت:** پایین.

#### ۱۰. تست خودکار (یافته ۱۷)
- **هدف:** پوشش regression برای قراردادهای حساس.
- **طرح:**
  1. **Unit tests** با vitest:
     - `panel-router`: کلون کردن DOM پنل، allowlist validation.
     - `boot-coordinator`: state transitions، timeout، CLI path جلوگیری از resume.
     - `window-manager`: debounce geometry، clamp to bounds.
  2. **Integration tests** با `@tauri-apps/api` mock:
     - رویداد focus policy.
     - race condition ساخت پنجره (parallel calls).
  3. **E2E (Playwright/WinAppDriver)**:
     - DPI 125%/150%/200%، monitor دوم، unplug، تغییر resolution.
     - CLI/Open With با چند فایل هم‌زمان + resume race.
- **اولویت:** پایین (اما قبل از release باید حداقل unit و integration اضافه شوند).

---

## 📊 ترتیب نهایی پیاده‌سازی

| موج | یافته‌ها | وابستگی |
|---|---|---|
| **موج ۱** (بحرانی) | ۱، ۲، ۳، ۴، ۵ | — |
| **موج ۲** (پایداری) | ۶، ۷، ۸، ۹، ۱۱ | بعد از ۴ |
| **موج ۳** (کارایی) | ۱۰ | مستقل |
| **موج ۴** (کیفیت) | ۱۲، ۱۳، ۱۴، ۱۵، ۱۶ | بعد از موج ۱–۳ (تا logic ثابت باشد) |
| **موج ۵** (تست) | ۱۷ | بعد از هر wave منطقی |

**پیشنهاد:** ابتدا موج ۱ (۱، ۲، ۳، ۴، ۵) را به‌صورت یک PR واحد اعمال کنید — این‌ها به هم وابسته‌اند (race fix وابسته به focus policy است؛ انتقال header وابسته به template مشترک). سپس ۶–۹–۱۱ در یک PR، ۱۰ در یک PR، و ۱۲–۱۳–۱۴–۱۵–۱۶–۱۷ در طول زمان.

---

## ⚠️ ملاحظات ویژه برای جلوگیری از regression

1. **یافته‌های ۷ و ۸** را همزمان اعمال کنید (polling removal + debounce geometry)، چون رویداد `melo:panel-opened` باید دقیقاً در همان تغییر ایجاد شود وگرنه sync پنل‌ها مختل می‌شود.
2. **یافته ۴** (creation lock) باید per-panel باشد، نه سراسری. کلیک روی Library نباید کلیک روی Playlist را بلاک کند.
3. **یافته ۹** (tray) قبل از اعمال، policy باید با کاربر نهایی شود (keep/hide/close). پیشنهاد: `"keep"` به‌عنوان پیش‌فرض برای backward compatibility.
4. **یافته ۱۰** (browser fallback) نباید مسیر Tauri را تحت تأثیر قرار دهد. سقف فقط در حالت `!isTauri` اعمال شود.
5. **یافته ۱۲** (تفکیک ماژول) ریسک regression بالایی دارد؛ باید با پوشش تست کافی (موج ۵) همراه باشد یا بعد از تثبیت logic انجام شود.

---

**نتیجه:** از ۱۷ یافته، **۱۶ مورد همچنان در کد فعلی وجود دارد** (فقط یافته ۱۱ به‌طور نسبی بهبود یافته، آن هم نه به‌صورت state machine). فقط **۵ مورد** ریسک پرفورمنسی/جانبی دارند (۴، ۷، ۸، ۹، ۱۰، ۱۱) که ۲ مورد (۷، ۸) خودشان بهبوددهنده هستند.
