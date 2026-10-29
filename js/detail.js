/* ============================================================
   detail.js — POP-UP 2 CARD (BARU), menggantikan lightbox lama di effects.js.
   Klik gambar mana pun -> kiri: gambar diperbesar (slide otomatis + bisa digeser
   manual), kanan: penjelasan kartunya. initGalleries() di effects.js tetap
   yang memasang klik; dia memanggil openLightbox() di bawah ini.
   ============================================================ */
const DT_MS = 3500;                 // jeda auto-slide (ms)
let dtN = 0, dtI = 0, dtPlaying = true, dtT = null;

function initDetail() {
  // id="lightbox" dipakai supaya effects.js tidak membuat lightbox lama
  document.body.insertAdjacentHTML("beforeend", `
  <div id="lightbox" class="dt-wrap" aria-hidden="true" role="dialog" aria-modal="true"><div class="dt">
    <section class="dt-card dt-pics">
      <div class="dt-view" id="dtView"><div class="dt-track" id="dtTrack"></div>
        <button class="dt-b dt-prev" id="dtPrev" aria-label="Previous">‹</button>
        <button class="dt-b dt-next" id="dtNext" aria-label="Next">›</button>
        <button class="dt-b dt-play" id="dtPlay" aria-label="Pause slideshow">❚❚</button>
        <span class="dt-count" id="dtCount"></span><i class="dt-bar" id="dtBar"></i></div>
      <div class="dt-dots" id="dtDots"></div>
    </section>
    <aside class="dt-card dt-info" id="dtInfo"></aside>
  </div></div>`);
  const lb = $("lightbox"), track = $("dtTrack");
  $("dtPrev").onclick = () => { dtGo(dtI - 1); dtArm(); };
  $("dtNext").onclick = () => { dtGo(dtI + 1); dtArm(); };
  $("dtPlay").onclick = () => {
    dtPlaying = !dtPlaying;
    $("dtPlay").textContent = dtPlaying ? "❚❚" : "▶";
    $("dtPlay").setAttribute("aria-label", dtPlaying ? "Pause slideshow" : "Play slideshow");
    dtArm();
  };
  // geser manual (swipe/trackpad): sinkronkan indeks, lanjutkan auto-slide setelah berhenti
  let st = null;
  track.addEventListener("scroll", () => {
    dtI = Math.round(track.scrollLeft / track.clientWidth); dtSync();
    clearTimeout(st); st = setTimeout(dtArm, 200);
  }, { passive: true });
  const view = $("dtView");
  view.addEventListener("mouseenter", () => clearInterval(dtT));   // hover = jeda
  view.addEventListener("mouseleave", dtArm);
  view.addEventListener("pointerdown", () => clearInterval(dtT));
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("dt")) closeLightbox(); });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") { dtGo(dtI - 1); dtArm(); }
    if (e.key === "ArrowRight") { dtGo(dtI + 1); dtArm(); }
    if (e.key === " " && dtN > 1) { e.preventDefault(); $("dtPlay").click(); }
  });
}

function dtGo(i, smooth = true) {
  const t = $("dtTrack");
  dtI = (i + dtN) % dtN;
  t.scrollTo({ left: dtI * t.clientWidth, behavior: smooth ? "smooth" : "instant" });
  dtSync();
}
function dtSync() {
  $("dtCount").textContent = `${dtI + 1} / ${dtN}`;
  [...$("dtDots").children].forEach((d, j) => d.classList.toggle("on", j === dtI));
}
function dtArm() { // (re)start auto-slide + bar progres
  clearInterval(dtT);
  const bar = $("dtBar"); bar.style.animation = "none";
  if (dtN < 2 || !dtPlaying || !$("lightbox").classList.contains("open")) return;
  void bar.offsetWidth;
  bar.style.animation = `lbfill ${DT_MS}ms linear infinite`;
  dtT = setInterval(() => dtGo(dtI + 1), DT_MS);
}

// Isi kartu penjelasan: diambil dari kartu di halaman (tanggal, judul, deskripsi, poin, chip, PDF)
function dtDetail(card) {
  if (!card) return "";
  const q = (s) => card.querySelector(s);
  let title = "", lock = "";
  const h = q("h3,h4");
  if (h) { const c = h.cloneNode(true), l = c.querySelector(".lock"); if (l) { lock = l.outerHTML; l.remove(); } title = c.textContent.trim(); }
  const p = q(".sub,p"), pdf = q('a[href$=".pdf" i]');
  return (q(".w") ? `<span class="w">${q(".w").textContent}</span>` : "") + `<h3>${title}${lock}</h3>` +
    (p ? `<p>${p.innerHTML}</p>` : "") + (q("ul") ? q("ul").outerHTML : "") + (q(".chips") ? q(".chips").outerHTML : "") +
    (pdf ? `<a class="btn-pdf" href="${pdf.getAttribute("href")}" target="_blank" rel="noopener">Open PDF ↗</a>` : "");
}

// Menimpa openLightbox/closeLightbox bawaan effects.js (dipanggil dari klik gambar)
function openLightbox(items, idx) {
  const lb = $("lightbox"), track = $("dtTrack");
  dtN = items.length; dtI = idx; dtPlaying = true;
  $("dtPlay").textContent = "❚❚";
  track.innerHTML = "";
  items.forEach((el) => {
    let n;
    if (el.tagName === "IMG") { n = new Image(); n.src = el.currentSrc || el.src; n.alt = el.alt || ""; }
    else { n = el.cloneNode(true); n.style.cursor = ""; }
    track.append(n);
  });
  $("dtDots").innerHTML = "<i></i>".repeat(dtN);
  const card = items[0].closest(".sc,.card,.it"), cs = getComputedStyle(card);
  ["--a", "--b"].forEach((k) => lb.style.setProperty(k, cs.getPropertyValue(k))); // warna pop-up = warna kartu
  $("dtInfo").innerHTML = '<button class="dt-x" id="dtX" aria-label="Close">×</button>' + dtDetail(card);
  $("dtX").onclick = closeLightbox;
  lb.classList.toggle("single", dtN < 2);
  lb.classList.add("open"); lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  dtGo(dtI, false); dtArm();
}
function closeLightbox() {
  const lb = $("lightbox");
  clearInterval(dtT);
  lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
