# MySpace
لوحة متابعة شخصية (خطوط WE / اشتراكات / مخزون / أقسام مخصصة) — PWA بتصميم Material 3 تشتغل أوفلاين وتتزامن مع Supabase.

## الهيكل
- `css/tokens.css` — Design Tokens (الخطوط، الأحجام، الزوايا، المسافات، الحركة، الظلال). غيّر الهوية من هنا.
- `css/palettes.css` — لوحات ألوان Material You (6 ألوان × فاتح/داكن) — مولَّدة.
- `css/base.css` · `components.css` · `pages.css` — الهيكل والمكونات والصفحات.
- `js/core.js` (بيانات + ثيم) · `ui.js` (ripple/قوائم/حوارات) · `sync.js` (Supabase) · `views/*` (الصفحات) · `app.js` (التوجيه والتشغيل).
- `tools/gen.mjs` — يولّد `palettes.css` و`js/icons.js` (`npm i && npm run gen`). لإضافة لون: أضفه في `SEEDS` هناك وفي `SEEDS` داخل `js/core.js`.
الرفع: GitHub ← Cloudflare Pages (Build command فاضي، Output directory = `/`). التفاصيل في `DEPLOY_AR.md`.
