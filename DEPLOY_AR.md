# رفع MySpace

## 1) Supabase
1. أنشئ مشروع باسم MySpace.
2. SQL Editor ← الصق محتوى `supabase-schema.sql` ← Run.
3. Authentication ← Users ← Add user (إيميل + باسورد ليك إنت). وبعدين Auth ← Sign In / Providers وقفّل التسجيل الجديد (Disable sign ups).
4. Project Settings ← API: انسخ `Project URL` و `anon public key` (مش service_role!).

## 2) Cloudflare Pages
Direct Upload للمجلد كله (أو GitHub). Build command فاضي، output directory = `/`.

## 3) التفعيل
افتح الموقع ← ⚙ ← حط الـ URL والـ anon key والإيميل والباسورد ← حفظ. أي بيانات اتسجلت أوفلاين هتترفع لوحدها أول ما النت يرجع.

## 4) التثبيت
أندرويد/كروم: زرار «تثبيت». آيفون: Safari ← Share ← Add to Home Screen.

## الخط (Ping AR LT)
الملفات في `fonts/` (woff2 + otf). الخط تجاري: استخدمه فقط لو معاك ترخيص (راجع `fonts/LICENSE-NOTE.txt`).
المتوفر وزن Light فقط؛ لو عندك أوزان Regular/Bold حط ملفاتها في `fonts/` وأضف `@font-face` لها في أول `<style>` داخل `index.html`.
بعد أي تعديل في الملفات غيّر رقم `V` في `service-worker.js` (مثلاً `myspace-v3`) عشان الأجهزة تاخد النسخة الجديدة.
