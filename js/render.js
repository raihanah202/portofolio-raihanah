/* ============================================================
   render.js — Mengubah data (data.js) menjadi HTML di halaman.
   ============================================================ */

const $ = (id) => document.getElementById(id);

const renderChips = (list) => list.map((x) => `<span class="chip">${x}</span>`).join("");

/* Slot foto & dokumen galeri: tombol panah & titik indikator hanya muncul jika file/foto > 1 */
function renderGallery(key, emoji) {
  const files = PHOTOS[key] || Array.from({ length: MAX_PHOTOS }, (_, j) => `img/${key}-${j + 1}.jpg`);
  const isMultiple = files.length > 1;
  
  const imgs = files.map((u) => {
    if (u.toLowerCase().endsWith('.pdf')) {
      return `<div class="pdf-wrapper">
                <object data="${u}" type="application/pdf" class="pdf-frame">
                  <div class="pdf-fallback">
                    <p>📄 Dokumen PDF</p>
                    <a href="${u}" target="_blank" rel="noopener" class="btn-pdf">Buka / Download PDF</a>
                  </div>
                </object>
              </div>`;
    }
    return `<img src="${u}" alt="" onerror="this.remove()">`;
  }).join("");

  return `<div class="ph ${isMultiple ? 'm' : ''}">
    <span><i>${emoji}</i>swipeable photo/pdf gallery<br>img/${key}-1.jpg, img/${key}-1.png…</span>
    <div class="track">${imgs}</div>
    ${isMultiple ? '<button class="pv" aria-label="Previous">‹</button><button class="nx" aria-label="Next">›</button><div class="dots"></div>' : ''}
  </div>`;
}

function renderTimeline(targetId, items, photoPrefix, emoji) {
  $(targetId).innerHTML = items.map((it, n) => {
    const lock = it.locked && CONFIDENTIAL ? '<span class="lock">🔒 details confidential</span>' : "";
    const bullets = it.bullets ? `<ul>${it.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : "";
    const stack = it.stack ? `<div class="chips" style="margin-top:10px">${renderChips(it.stack)}</div>` : "";
    return `<div class="it">
      <span class="w">${it.date}</span>
      <h3>${it.title}${lock}</h3>
      <p>${it.org || ""}</p>${bullets}${stack}
      ${renderGallery(it.photo || `${photoPrefix}-${n + 1}`, emoji)}
    </div>`;
  }).join("");
}

/* Grid Kartu untuk Sertifikat, Organisasi, dan Penghargaan dengan galeri slider & tombol PDF */
function renderCardGrid(targetId, items, photoPrefix, emoji) {
  $(targetId).innerHTML = items.map((it, n) => {
    const key = it.photo || `${photoPrefix}-${n + 1}`;
    const pdfPath = it.pdf ? `<div style="margin-top: 10px;"><a href="${it.pdf}" target="_blank" rel="noopener" class="btn-pdf">Buka PDF ↗</a></div>` : "";
    
    return `<div class="card">
      ${renderGallery(key, emoji)}
      <span class="w">${it.date}</span>
      <h4>${it.title}</h4>
      <p>${it.desc || it.org || ""}</p>
      ${pdfPath}
    </div>`;
  }).join("");
}

function renderSkills() {
  $("sk").innerHTML = SKILLS.map((s) =>
    `<div class="card"><h3>${s.group}</h3><div class="chips">${renderChips(s.items)}</div></div>`).join("");
}

function renderContact() {
  $("btn-cv").href = CONTACT.cv;
  $("ct-email").href = `mailto:${CONTACT.email}`;
  $("ct-email").textContent = CONTACT.email;
  $("ct-linkedin").href = CONTACT.linkedin || "https://www.linkedin.com/search/results/people/?keywords=Raihanah%20Basyirah";
  $("ct-wa").href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.waText)}`;
}

function renderAll() {
  renderContact();
  renderSkills();
  renderTimeline("ex", EXPERIENCE, "kerja", "💼");
  renderTimeline("pr", PROJECTS, "proyek", "🚀");
  renderTimeline("ed", EDUCATION, "pendidikan", "🎓");
  renderCardGrid("ce", CERTIFICATES, "sertifikat", "📜");
  renderCardGrid("og", ORGANIZATIONS, "organisasi", "🌸");
  renderCardGrid("aw", AWARDS, "penghargaan", "🏆");
}