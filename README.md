# MySpace
لوحة متابعة شخصية (خطوط WE / اشتراكات / مخزون / أقسام مخصصة) — PWA بتصميم "Soft ledger": خلفية فاتحة + كروت بيضاء + أزرق واحد قوي + لوحة داكنة واحدة في كل شاشة. تشتغل أوفلاين وتتزامن مع Supabase.

## الهيكل
- `css/tokens.css` — Design Tokens (الألوان فاتح/داكن، الأحجام، الزوايا، المسافات، الحركة).
- `css/base.css` (الهيكل والشريط الجانبي والهيدر) · `components.css` (الأزرار، الشارات، الأشرطة المخططة، الحوارات…) · `pages.css`.
- `js/core.js` (بيانات + ثيم) · `ui.js` (قوائم/حوارات/ripple) · `sync.js` (Supabase) · `views/*` (الصفحات) · `app.js` (التوجيه والتشغيل).
- `tools/gen.mjs` — يولّد `js/icons.js` من Lucide (`npm i && npm run gen`).
الرفع: GitHub ← Cloudflare Pages (Build command فاضي، Output directory = `/`). التفاصيل في `DEPLOY_AR.md`.
