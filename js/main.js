/* ============================================================
   main.js — Titik awal. Urutannya penting:
   render dulu (bikin elemen), baru pasang efek di atasnya.
   ============================================================ */
renderAll();                              // 1. data.js -> HTML
initTheme();                              // 2. tombol tema
initMenu();                               // 2b. sidebar menu di HP
initTypewriter();                         // 3. teks mengetik
initTilt();                               // 4. foto 3D
initReveal();                             // 5. animasi muncul saat scroll
addEventListener("load", initGalleries);  // 6. galeri (tunggu semua foto selesai dimuat)
