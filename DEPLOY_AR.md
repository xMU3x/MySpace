# رفع MySpace

## 1) Supabase
1. أنشئ مشروع باسم MySpace.
2. SQL Editor ← الصق `supabase-schema.sql` ← Run (الجدول والأعمدة لم تتغير).
3. Authentication ← Users ← Add user (إيميل + باسورد ليك)، وقفّل التسجيل الجديد.
4. Project Settings ← API: انسخ `Project URL` و`anon public key` (مش service_role).

## 2) Cloudflare Pages
Connect to Git (أو Direct Upload) — Build command فاضي، Output directory = `/`.

## 3) التفعيل
افتح الموقع ← الإعدادات (أيقونة المنزلقات في الشريط الجانبي) ← حط الـ URL والـ anon key والإيميل والباسورد ← حفظ.

## 4) التثبيت
أندرويد/كروم: زرار التثبيت في الهيدر. آيفون: Safari ← Share ← Add to Home Screen.

## ملاحظات
- بعد أي تعديل غيّر `V` في `service-worker.js` (مثلاً `myspace-v5`) عشان الأجهزة تاخد النسخة الجديدة.
- كل الخطوط والأيقونات محلية (لا اعتماد على CDN). التراخيص في `fonts/LICENSES.txt`.
