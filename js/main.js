/* ============================================================
   main.js — Titik awal. Urutannya penting:
   render dulu (bikin elemen), baru pasang efek di atasnya.
   ============================================================ */
renderAll();                              // 1. data.js -> HTML
initHeads();                              // 1b. judul section: nomor dalam bunga + teks
initTheme();                              // 2. tombol tema
initMenu();                               // 2b. sidebar menu di HP
initRoll();                               // 3. "I build ..." roll vertikal (pengganti efek ketik)
initTilt();                               // 4. foto 3D
initReveal();                             // 5. animasi muncul saat scroll
initSliders();                            // 5a. slider kartu Experience & Projects
initDetail();                             // 5a2. pop-up 2 card (gambar + penjelasan)
initDecor();                              // 5a3. bunga + bubble hero
initCursor();                             // 5a4. kursor hati + jejak
initMascot();                             // 5a5. maskot
initProgress();                           // 5b. bar progres scroll
initSpy();                                // 5c. menu aktif sesuai section
initTimelineFill();                       // 5d. garis timeline menyala
initPdfLinks();                           // 5e. PDF: tab baru + terunduh (desktop)
addEventListener("load", () => {          // 6. galeri (tunggu semua foto selesai dimuat)
  initGalleries();
});
