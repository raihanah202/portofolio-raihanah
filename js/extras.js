/* ============================================================
   extras.js — tambahan redesign (BARU). Dipanggil dari main.js.
   Isi: progress bar, scroll-spy menu, garis timeline, PDF buka+unduh, slider kartu.
   ============================================================ */

/* 1) Bar progres scroll di paling atas halaman */
function initProgress() {
  const bar = document.createElement("i");
  bar.id = "progress";
  document.body.prepend(bar);
  const upd = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    bar.style.transform = `scaleX(${Math.min(1, scrollY / max)})`;
  };
  addEventListener("scroll", upd, { passive: true });
  upd();
}

/* 2) Scroll-spy: menu yang sesuai section aktif diberi kelas "on" */
function initSpy() {
  const map = {}; // semua section sekarang punya menu sendiri (9 menu), tidak perlu pemetaan
  const links = [...document.querySelectorAll("#side a")];
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = map[e.target.id] || e.target.id;
    links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === "#" + id));
    const cs = getComputedStyle(e.target), nav = $("side"); // menu ikut warna section
    ["--a", "--b"].forEach((k) => nav.style.setProperty(k, cs.getPropertyValue(k)));
  }), { rootMargin: "-40% 0px -55% 0px" }); // aktif saat section melewati tengah layar
  document.querySelectorAll("section[id],footer[id]").forEach((s) => io.observe(s));
}

/* 3) Garis timeline yang menyala sesuai posisi scroll */
function initTimelineFill() {
  const tls = [...document.querySelectorAll(".tl")];
  tls.forEach((t) => t.insertAdjacentHTML("afterbegin", '<span class="tl-fill"></span>'));
  const upd = () => tls.forEach((t) => {
    const r = t.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.7 - r.top) / r.height));
    t.firstElementChild.style.height = p * 100 + "%";
  });
  addEventListener("scroll", upd, { passive: true });
  upd();
}

/* 4) Link PDF: di DESKTOP terbuka di tab baru DAN otomatis terunduh.
      Di HP tetap buka tab baru saja (unduhan otomatis sering mengganggu). */
function initPdfLinks() {
  const desktop = matchMedia("(hover:hover) and (pointer:fine)");
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href$=".pdf" i]');
    if (!a || !desktop.matches || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    e.stopPropagation();                           // jangan ikut membuka lightbox
    window.open(a.href, "_blank", "noopener");     // 1) tab baru
    const d = document.createElement("a");         // 2) unduh lewat link tak terlihat
    d.href = a.href;
    d.download = decodeURIComponent(a.href.split("/").pop());
    document.body.append(d); d.click(); d.remove();
  }, true); // capture: jalan sebelum handler lain
}

/* 5) Slider kartu Experience & Projects: geser manual, tombol ← →, titik penanda, kartu aktif membesar */
const AUTO_MS = 4500; // jeda geser otomatis kartu (ms) — ubah angka ini kalau mau lebih cepat/lambat
function initSliders() {
  document.querySelectorAll(".sl").forEach((sl) => {
    const tr = sl.querySelector(".sl-track"), cs = [...tr.children], ds = [...sl.querySelectorAll(".sl-dots i")];
    const cur = () => { // kartu yang paling dekat tepi kiri = aktif
      let b = 0, d = 1e9;
      cs.forEach((c, i) => { const x = Math.abs(c.offsetLeft - tr.scrollLeft); if (x < d) { d = x; b = i; } });
      return b;
    };
    const mark = () => { const a = cur(); cs.forEach((c, i) => c.classList.toggle("active", i === a)); ds.forEach((x, i) => x.classList.toggle("on", i === a)); };
    const go = (i) => tr.scrollTo({ left: cs[Math.max(0, Math.min(cs.length - 1, i))].offsetLeft, behavior: "smooth" });
    sl.querySelector(".sl-prev").onclick = () => go(cur() - 1);
    sl.querySelector(".sl-next").onclick = () => go(cur() + 1);
    tr.addEventListener("scroll", () => requestAnimationFrame(mark), { passive: true });
    mark();

    /* --- Geser OTOMATIS: pindah ke kartu berikutnya tiap AUTO_MS, balik ke awal kalau sudah di kartu terakhir --- */
    clearInterval(sl._auto);                                    // aman dipanggil ulang (mis. saat ganti bahasa)
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let hover = false, visible = true, holdUntil = 0;
    const hold = (ms) => (holdUntil = Date.now() + ms);
    sl.onmouseenter = () => (hover = true);                     // kursor di atas slider = berhenti
    sl.onmouseleave = () => { hover = false; hold(1200); };
    sl.onpointerdown = () => hold(8000);                        // user geser/klik manual = beri jeda 8 detik
    sl.onfocusin = () => (hover = true);
    sl.onfocusout = () => (hover = false);
    if (sl._io) sl._io.disconnect();
    sl._io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 }); // hanya jalan saat slider terlihat
    sl._io.observe(sl);
    sl._auto = setInterval(() => {
      const lb = document.getElementById("lightbox");
      const popupOpen = lb && lb.classList.contains("open");   // jangan geser saat pop-up foto terbuka
      if (hover || !visible || document.hidden || popupOpen || Date.now() < holdUntil) return;
      const a = cur();
      go(a >= cs.length - 1 ? 0 : a + 1);
    }, AUTO_MS);
  });
}
