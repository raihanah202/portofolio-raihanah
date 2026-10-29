/* ============================================================
   effects.js — Semua interaksi, animasi, auto-slide & lightbox.
   ============================================================ */

/* 1) Tombol ganti tema */
function initTheme() {
  const root = document.documentElement;
  $("th").onclick = () => { root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light"; };
}

/* 2) Teks "I build ..." typing effect */
function initTypewriter() {
  const el = $("tw");
  let word = 0, chars = 0, deleting = false;
  (function tick() {
    const w = TYPING_WORDS[word];
    chars += deleting ? -1 : 1;
    el.textContent = w.slice(0, chars);
    let delay = deleting ? 35 : 75;
    if (!deleting && chars === w.length) { deleting = true; delay = 1500; }
    else if (deleting && chars === 0) { deleting = false; word = (word + 1) % TYPING_WORDS.length; delay = 350; }
    setTimeout(tick, delay);
  })();
}

/* 3) Foto profil 3D Tilt */
function initTilt() {
  const me = document.querySelector(".me");
  if (!me) return;
  const NEAR = 120;
  const clamp = (v) => Math.max(-1, Math.min(1, v));
  const tilt = (e) => {
    const r = me.getBoundingClientRect();
    const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
    const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
    if (Math.hypot(dx, dy) > NEAR) { me.style.transform = ""; return; }
    const x = clamp((e.clientX - r.left) / r.width - 0.5);
    const y = clamp((e.clientY - r.top) / r.height - 0.5);
    me.style.transform = `perspective(700px) rotateY(${x * 26}deg) rotateX(${-y * 26}deg) scale(1.04)`;
  };
  addEventListener("pointermove", tilt);
  addEventListener("pointerdown", tilt);
  ["pointerup", "pointercancel"].forEach((t) =>
    addEventListener(t, (e) => { if (e.pointerType !== "mouse") me.style.transform = ""; }));
  document.addEventListener("mouseleave", () => (me.style.transform = ""));
}

/* 4) Galeri foto: Auto-slide + Klik foto untuk perbesar (Lightbox) */
let currentLightboxGallery = [];
let currentLightboxIndex = 0;

function initGalleries() {
  // Bikin elemen Lightbox Modal jika belum ada di HTML
  if (!document.getElementById("lightbox")) {
    const lbHTML = `
      <div id="lightbox" class="lightbox-modal" aria-hidden="true">
        <button class="lb-close" id="lbClose" aria-label="Close">✕</button>
        <button class="lb-prev" id="lbPrev" aria-label="Previous">‹</button>
        <div class="lb-container">
          <div class="lb-content" id="lbContent"></div>
          <div class="lb-caption" id="lbCaption"></div>
        </div>
        <button class="lb-next" id="lbNext" aria-label="Next">›</button>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", lbHTML);

    // Event listener modal lightbox
    $("lbClose").onclick = closeLightbox;
    $("lightbox").onclick = (e) => { if (e.target === $("lightbox")) closeLightbox(); };
    $("lbPrev").onclick = () => navigateLightbox(-1);
    $("lbNext").onclick = () => navigateLightbox(1);
    
    addEventListener("keydown", (e) => {
      const lb = $("lightbox");
      if (lb && lb.classList.contains("open")) {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "ArrowRight") navigateLightbox(1);
      }
    });
  }

  document.querySelectorAll(".ph").forEach((g) => {
    const track = g.querySelector(".track");
    if (!track) return;
    
    // Ambil elemen anak (img atau pdf-wrapper)
    const items = [...track.children].filter(el => el.tagName === 'IMG' || el.classList.contains('pdf-wrapper'));
    const n = items.length;
    if (!n) return;
    
    g.classList.add("f");
    
    // Ambil card terdekat untuk membaca judul dan deskripsi kartu jika ada
    const cardEl = g.closest(".card") || g.closest(".it");
    const titleEl = cardEl ? cardEl.querySelector("h4, h3") : null;
    const descEl = cardEl ? cardEl.querySelector("p") : null;
    const cardTitle = titleEl ? titleEl.textContent : "";
    const cardDesc = descEl ? descEl.textContent : "";

    // Event klik elemen di galeri untuk buka Lightbox
    items.forEach((item, idx) => {
      item.style.cursor = "zoom-in";
      item.onclick = (e) => {
        e.stopPropagation();
        openLightbox(items, idx, cardTitle, cardDesc);
      };
    });

    if (n < 2) return; // Kalau 1 foto aja, ga perlu panah & auto-slide
    g.classList.add("m");

    const dots = g.querySelector(".dots");
    if (dots) {
      dots.innerHTML = "<i></i>".repeat(n);
      const sync = () => [...dots.children].forEach((d, j) =>
        d.classList.toggle("on", j === Math.round(track.scrollLeft / track.clientWidth)));
      track.onscroll = sync;
      sync();
    }

    const prevBtn = g.querySelector(".pv");
    const nextBtn = g.querySelector(".nx");
    if (prevBtn) prevBtn.onclick = (e) => {
      e.stopPropagation();
      track.scrollBy({ left: -track.clientWidth, behavior: "smooth" });
    };
    if (nextBtn) nextBtn.onclick = (e) => {
      e.stopPropagation();
      track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
    };

    // Auto-slide interval
    let autoInterval = null;
    const startAutoSlide = () => {
      if (autoInterval) return;
      autoInterval = setInterval(() => {
        let maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 5) {
          track.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          track.scrollBy({ left: track.clientWidth, behavior: "smooth" });
        }
      }, 3500);
    };

    const stopAutoSlide = () => {
      if (autoInterval) {
        clearInterval(autoInterval);
        autoInterval = null;
      }
    };

    startAutoSlide();
    g.addEventListener("mouseenter", stopAutoSlide);
    g.addEventListener("mouseleave", startAutoSlide);
    g.addEventListener("touchstart", stopAutoSlide, { passive: true });
  });
}

/* Global variabel untuk menyimpan info lightbox aktif */
let currentLightboxTitle = "";
let currentLightboxDesc = "";

function openLightbox(itemsList, index, title, desc) {
  currentLightboxGallery = itemsList;
  currentLightboxIndex = index;
  currentLightboxTitle = title || "";
  currentLightboxDesc = desc || "";
  updateLightboxContent();
  
  const lb = $("lightbox");
  if (!lb) return;

  // Sembunyikan tombol < > dan nomor urut jika foto hanya 1 buah
  if (currentLightboxGallery.length < 2) {
    lb.classList.add("single");
  } else {
    lb.classList.remove("single");
  }

  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lb = $("lightbox");
  if (!lb) return;
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function navigateLightbox(dir) {
  if (!currentLightboxGallery.length) return;
  currentLightboxIndex = (currentLightboxIndex + dir + currentLightboxGallery.length) % currentLightboxGallery.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const container = $("lbContent");
  const captionEl = $("lbCaption");
  if (!container) return;
  
  container.innerHTML = "";
  const currentItem = currentLightboxGallery[currentLightboxIndex];
  if (!currentItem) return;

  if (currentItem.tagName === "IMG") {
    const img = document.createElement("img");
    img.src = currentItem.src;
    img.alt = currentItem.alt || "";
    container.appendChild(img);
  } else if (currentItem.classList.contains("pdf-wrapper")) {
    const clone = currentItem.cloneNode(true);
    container.appendChild(clone);
  }

  // Mengatur teks di bawah gambar (Judul, Deskripsi, dan Indikator (1/2) jika > 1 foto)
  if (captionEl) {
    let text = currentLightboxTitle;
    if (currentLightboxDesc) text += " — " + currentLightboxDesc;
    
    // Tulis nomor urut (1/2) HANYA jika jumlah foto lebih dari 1
    if (currentLightboxGallery.length > 1) {
      text += ` (${currentLightboxIndex + 1}/${currentLightboxGallery.length})`;
    }
    
    captionEl.textContent = text;
  }
}

/* 5) Reveal Animation saat Scroll */
function initReveal() {
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in"); io.unobserve(el);
    setTimeout(() => { el.classList.remove("rv", "in"); el.style.transitionDelay = ""; }, 1800);
  }), { threshold: 0.1 });
  
  document.querySelectorAll("section>.eyebrow,section>h2,section>.hd,.about>*,.hero>div:first-child>*,.it,.sl,.grid>.card,.skills>.card,.stat,footer>*")
    .forEach((el) => {
      const n = [...el.parentNode.children].indexOf(el);
      el.style.transitionDelay = Math.min(n, 6) * 100 + "ms";
      el.classList.add("rv"); io.observe(el);
    });
}

/* 6) Sidebar Menu Mobile */
function initMenu() {
  const btn = $("menu");
  if (!btn) return;
  const set = (open) => {
    document.body.classList.toggle("menu-open", open);
    btn.textContent = open ? "✕" : "☰";
    btn.setAttribute("aria-expanded", open);
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.onclick = () => set(!document.body.classList.contains("menu-open"));
  const scrim = $("scrim");
  if (scrim) scrim.onclick = () => set(false);
  document.querySelectorAll("#side a").forEach((a) => a.addEventListener("click", () => set(false)));
  addEventListener("keydown", (e) => { if (e.key === "Escape") set(false); });
  matchMedia("(min-width:761px)").addEventListener("change", (e) => { if (e.matches) set(false); });
}