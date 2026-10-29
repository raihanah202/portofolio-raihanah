/* ============================================================
   decor.js — AKSI LUCU (BARU): roll teks "I build ...", bubble hero,
   bunga yang mengembang & melayang, kursor hati + jejak, maskot.
   Teksnya ada di data.js (ROLL_WORDS, BUBBLES, MASCOT).
   Dipanggil dari main.js; hapus pemanggilnya kalau mau mematikan satu fitur.
   ============================================================ */
const dcReduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const dcFine = matchMedia("(hover:hover) and (pointer:fine)").matches; // mouse (bukan layar sentuh)
const DC_EMO = ["💗", "💙", "🌸", "✨", "🌷", "💜"];

/* Partikel kecil (hati/bunga) yang terbang lalu hilang */
function dcPop(x, y, ch, dx, dy, dur, size) {
  const s = document.createElement("span");
  s.className = "pt"; s.textContent = ch;
  s.style.cssText = `left:${x}px;top:${y}px;font-size:${size}px`;
  document.body.append(s);
  s.animate([
    { transform: "translate(-50%,-50%) scale(.4)", opacity: 1 },
    { transform: `translate(calc(-50% + ${dx}px),calc(-50% + ${dy}px)) scale(1.1) rotate(${dx}deg)`, opacity: 0 }
  ], { duration: dur, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => s.remove();
}
function dcBurst(x, y, n = 9) { // ledakan hati & bunga ke segala arah
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + Math.random(), r = 40 + Math.random() * 50;
    dcPop(x, y, DC_EMO[i % DC_EMO.length], Math.cos(a) * r, Math.sin(a) * r, 700 + Math.random() * 300, 14 + Math.random() * 10);
  }
}

/* 1) "I build ..." — kata bergulir vertikal seperti mesin slot (bukan mengetik) */
function initRoll() {
  const box = $("roll");
  if (!box) return;
  clearInterval(box._t);                                      // aman dipanggil ulang saat ganti bahasa
  const cols = ["#7DD3FC", "#F9A8D4", "#FDE68A", "#A7F3D0", "#C4B5FD"];
  const words = [...ROLL_WORDS, ROLL_WORDS[0]];             // kata pertama diulang di akhir agar putarannya mulus
  box.innerHTML = `<span class="rl">${words.map((w, i) => `<b style="color:${cols[i % cols.length]}"><i>${w}</i></b>`).join("")}</span>`;
  const rl = box.firstChild, items = [...rl.children];
  let i = 0;
  const fit = () => (box.style.width = items[i].firstChild.offsetWidth + 6 + "px"); // lebar kotak mengikuti kata aktif
  fit();
  if (document.fonts) document.fonts.ready.then(fit);
  if (dcReduce) return;
  rl.addEventListener("transitionend", () => {               // sampai di kata ulangan -> lompat diam-diam ke awal
    if (i !== words.length - 1) return;
    rl.style.transition = "none"; i = 0; rl.style.transform = "translateY(0)";
    void rl.offsetWidth; rl.style.transition = "";
  });
  box._t = setInterval(() => { i++; rl.style.transform = `translateY(-${i * 1.5}em)`; fit(); }, 2400);
}

/* 2) Bunga yang mengembang + melayang, dan bubble "apa yang bisa kubuat" di hero */
function flowerSVG(color, petals) {
  let p = "";
  for (let k = 0; k < petals; k++) p += `<ellipse cx="50" cy="26" rx="13" ry="22" transform="rotate(${(k * 360) / petals} 50 50)"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="${color}" fill-opacity=".85">${p}</g><circle cx="50" cy="50" r="12" fill="#FBBF24"/><circle cx="50" cy="50" r="5" fill="#fff" fill-opacity=".55"/></svg>`;
}
function initDecor() {
  const pal = ["#F9A8D4", "#C4B5FD", "#7DD3FC", "#FDBA74", "#A7F3D0", "#FDA4AF"];
  const spots = [ // [elemen induk, posisi CSS, ukuran px]
    [".hero", "top:-12px;left:44%", 64], [".hero", "bottom:80px;right:2%", 52], [".hero", "top:46%;left:-14px", 44],
    ["footer", "top:-18px;right:8%", 70], ["footer", "bottom:14px;left:5%", 48]
  ];
  document.querySelectorAll("section[id]").forEach((s, i) =>
    spots.push([`#${s.id}`, `top:${i % 2 ? 4 : -4}px;right:${4 + (i % 3) * 5}%`, 52 + (i % 3) * 10]));
  spots.forEach(([sel, pos, size], i) => {
    const host = document.querySelector(sel);
    if (!host) return;
    const f = document.createElement("span");
    f.className = "flw";
    f.style.cssText = `${pos};--s:${size}px;--d:${5 + (i % 4)}s`;  // --d = kecepatan melayang
    f.innerHTML = flowerSVG(pal[i % pal.length], [5, 6, 8][i % 3]);
    host.append(f);
  });
  renderBubbles();

  // Bunga kecil + hati + garis keriting yang menempel di sekeliling frame foto (ikut miring 3D bareng foto)
  const me = document.querySelector(".me");
  if (me) [
    ["#F9A8D4", 6, "top:-28px;right:-14px", 54, 5.5], ["#FDE68A", 8, "bottom:118px;right:-42px", 42, 6.5],
    ["#A7F3D0", 5, "top:44%;left:-40px", 38, 7], ["#C4B5FD", 6, "bottom:-20px;right:34px", 46, 5]
  ].forEach(([c, p, pos, s, d]) => {
    const f = document.createElement("span");
    f.className = "flw";
    f.style.cssText = `${pos};--s:${s}px;--d:${d}s;transform:translateZ(45px)`;
    f.innerHTML = flowerSVG(c, p);
    me.append(f);
  });
}
function renderBubbles() { // bubble "apa yang bisa kubuat" di hero (dipanggil ulang saat ganti bahasa)
  const b = $("bubbles");
  if (b) b.innerHTML = BUBBLES.map(([e, t, s], n) =>
    `<span class="bub b${n % 5}" style="--d:${n * 0.35}s">${e} <b>${t}</b><small>${s}</small></span>`).join("");
}

/* 3) Kursor hati (ujung hati = titik klik), jejak hati kecil, ledakan saat klik */
function initCursor() {
  if (!dcFine) return;                                         // layar sentuh: pakai kursor biasa
  document.body.insertAdjacentHTML("beforeend",
    `<div class="hc" id="hc"><i><svg viewBox="0 0 32 32" width="28" height="28"><defs><linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FF8FB8"/><stop offset="1" stop-color="#FF4D8D"/></linearGradient></defs><path d="M16 29C6 21 2 15.5 2 10.5 2 6.4 5.2 3.5 9 3.5c2.7 0 5 1.5 7 4.2 2-2.7 4.3-4.2 7-4.2 3.8 0 7 2.9 7 7 0 5-4 10.5-14 18.5z" fill="url(#hg)" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg></i></div>`);
  const hc = $("hc");
  document.documentElement.classList.add("cc");                // sembunyikan kursor asli
  let lx = -99, ly = -99;
  addEventListener("mousemove", (e) => {
    hc.style.opacity = 1;
    hc.style.transform = `translate(${e.clientX - 14}px,${e.clientY - 25}px)`; // 14,25 = ujung hati
    hc.classList.toggle("big", !!e.target.closest("a,button,.ph,.sc,.card,.bub,#mascot,.chip-s,[tabindex]")); // mengembang di atas yang bisa diklik
    if (!dcReduce && Math.hypot(e.clientX - lx, e.clientY - ly) > 38) {  // jejak tiap ~38px
      lx = e.clientX; ly = e.clientY;
      dcPop(lx + 6, ly + 6, DC_EMO[Math.floor(Math.random() * DC_EMO.length)], (Math.random() - 0.5) * 24, -26 - Math.random() * 24, 800, 11 + Math.random() * 5);
    }
  });
  document.addEventListener("mouseleave", () => (hc.style.opacity = 0));
  addEventListener("pointerdown", (e) => { hc.classList.add("press"); if (!dcReduce) dcBurst(e.clientX, e.clientY, 7); });
  addEventListener("pointerup", () => hc.classList.remove("press"));
}

/* 4) Maskot KUCING: matanya mengikuti kursor, berkedip, melambai, berkomentar sesuai section, lompat saat diklik */
function initMascot() {
  document.body.insertAdjacentHTML("beforeend", `<div id="mascot" role="button" tabindex="0" aria-label="Cat mascot, click to say hi"><div class="mb" id="mb" aria-live="polite"></div>
  <svg viewBox="0 0 120 120" aria-hidden="true"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FDBA74"/><stop offset="1" stop-color="#FB923C"/></linearGradient></defs>
  <path class="tail" d="M90 104C112 106 118 80 104 70" fill="none" stroke="#FB923C" stroke-width="9" stroke-linecap="round"/>
  <ellipse cx="60" cy="100" rx="30" ry="20" fill="url(#cg)" stroke="#fff" stroke-width="3"/><ellipse cx="60" cy="104" rx="15" ry="13" fill="#fff"/>
  <path d="M22 48Q18 14 30 12Q44 14 54 28Z" fill="url(#cg)" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M29 40Q28 24 32 20Q40 22 46 30Z" fill="#F9A8D4"/>
  <path d="M98 48Q102 14 90 12Q76 14 66 28Z" fill="url(#cg)" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M91 40Q92 24 88 20Q80 22 74 30Z" fill="#F9A8D4"/>
  <ellipse cx="60" cy="58" rx="40" ry="34" fill="url(#cg)" stroke="#fff" stroke-width="3"/>
  <path d="M54 27v8M60 25v10M66 27v8" stroke="#EA580C" stroke-width="3" stroke-linecap="round"/>
  <ellipse cx="60" cy="69" rx="15" ry="11" fill="#fff"/>
  <ellipse cx="34" cy="68" rx="7" ry="4.5" fill="#FDA4AF" opacity=".8"/><ellipse cx="86" cy="68" rx="7" ry="4.5" fill="#FDA4AF" opacity=".8"/>
  <g class="eyes"><g id="mp"><ellipse cx="44" cy="56" rx="5.5" ry="6.8" fill="#1E1B4B"/><ellipse cx="76" cy="56" rx="5.5" ry="6.8" fill="#1E1B4B"/><circle cx="42.3" cy="53.5" r="2" fill="#fff"/><circle cx="74.3" cy="53.5" r="2" fill="#fff"/></g></g>
  <path d="M56.5 64h7l-3.5 4.5Z" fill="#F472B6" stroke="#F472B6" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M60 68.5q-3.5 5-8.5 2M60 68.5q3.5 5 8.5 2" fill="none" stroke="#1E1B4B" stroke-width="2.2" stroke-linecap="round"/>
  <path d="M28 62L10 57M28 67L9 68M29 72L13 79M92 62L110 57M92 67L111 68M91 72L107 79" stroke="#1E1B4B" stroke-width="1.8" stroke-linecap="round" opacity=".55"/>
  <path d="M38 88Q60 100 82 88" fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round"/><circle cx="60" cy="97" r="5" fill="#FBBF24" stroke="#fff" stroke-width="1.5"/>
  <g transform="translate(98 22) scale(.9)"><g fill="#F9A8D4"><circle cx="0" cy="-7" r="5"/><circle cx="6.7" cy="-2" r="5"/><circle cx="4" cy="5.7" r="5"/><circle cx="-4" cy="5.7" r="5"/><circle cx="-6.7" cy="-2" r="5"/></g><circle r="4" fill="#FBBF24"/></g>
  <ellipse cx="46" cy="114" rx="9" ry="6" fill="#fff"/><ellipse cx="74" cy="114" rx="9" ry="6" fill="#fff"/>
  <g class="hand-r"><ellipse cx="92" cy="94" rx="8" ry="11" transform="rotate(-18 92 94)" fill="url(#cg)" stroke="#fff" stroke-width="2.5"/></g></svg></div>`);
  const m = $("mascot"), mb = $("mb"), pp = $("mp");
  let tm = null;
  const say = (t) => { mb.textContent = t; mb.classList.add("show"); clearTimeout(tm); tm = setTimeout(() => mb.classList.remove("show"), 4200); };
  const talk = () => {
    say(MASCOT_FUN[Math.floor(Math.random() * MASCOT_FUN.length)]);
    m.classList.remove("jump"); void m.offsetWidth; m.classList.add("jump");   // lompat
    const r = m.getBoundingClientRect();
    if (!dcReduce) dcBurst(r.left + r.width / 2, r.top + 30, 8);
  };
  m.onclick = talk;
  m.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); talk(); } };
  if (dcFine) addEventListener("mousemove", (e) => {           // pupil mengikuti kursor (maks 3 px)
    const r = m.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * 0.55);
    const d = Math.hypot(dx, dy) || 1, k = Math.min(3.2, d / 60);
    pp.setAttribute("transform", `translate(${(dx / d) * k} ${(dy / d) * k})`);
  }, { passive: true });
  let cur = "";                                                // ucapan berganti saat section berganti
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    const key = e.target.id || "hero";
    if (e.isIntersecting && key !== cur) { cur = key; if (MASCOT[key]) say(MASCOT[key]); }
  }), { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll(".hero,section[id],footer[id]").forEach((s) => io.observe(s));
  setTimeout(() => say(MASCOT.hero), 1200);
}

/* 5) Judul section: "02 — Skills" + "Tech stack" digabung jadi satu: nomor dalam bunga + teks judul */
function initHeads() {
  document.querySelectorAll("section[id],footer[id]").forEach((sec) => {
    const ey = sec.querySelector(":scope>.eyebrow"), h = sec.querySelector(":scope>h2");
    if (!ey || !h) return;
    const n = (ey.textContent.match(/\d+/) || [""])[0];
    let petals = "";
    for (let k = 0; k < 8; k++) petals += `<ellipse cx="50" cy="27" rx="14" ry="23" transform="rotate(${k * 45} 50 50)"/>`;
    const hd = document.createElement("div");
    hd.className = "hd";
    hd.innerHTML = `<span class="num" aria-hidden="true"><svg viewBox="0 0 100 100"><g class="np">${petals}</g><circle class="nc" cx="50" cy="50" r="25"/></svg><b>${n}</b></span>`;
    sec.insertBefore(hd, h); hd.append(h); ey.remove();   // label kecil dibuang, judul ikut masuk ke baris yang sama
  });
}
