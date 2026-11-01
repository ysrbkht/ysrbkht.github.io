# Quran Apps website

Static site for GitHub Pages (no build step).

```
index.html
assets/css/style.css     design
assets/js/config.js      <-- put your download links here
assets/js/i18n.js        <-- texts in Persian / Arabic / English
assets/js/app.js         logic (language, theme, rendering)
assets/img/favicon.svg
```

## ویرایش لینک‌ها
فایل `assets/js/config.js` را باز کنید و به‌جای `#` لینک واقعی را بگذارید. فایل‌های APK و EXE را در پوشهٔ `downloads/` بگذارید یا از GitHub Releases استفاده کنید.

## انتشار
1. همهٔ فایل‌ها را در ریشهٔ مخزن گیت‌هاب بگذارید.
2. Settings > Pages > Deploy from a branch > main / (root).
3. دامنه: در همان صفحه در Custom domain بنویسید. گیت‌هاب خودش فایل `CNAME` را می‌سازد. رکوردهای DNS را از راهنمای رسمی GitHub Pages بگیرید.
