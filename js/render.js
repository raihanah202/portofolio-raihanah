/* ============================================================
   render.js — Mengubah data (data.js) menjadi HTML di halaman.
   ============================================================ */


const $ = (id) => document.getElementById(id);

const renderChips = (list) => list.map((x) => `<span class="chip">${x}</span>`).join("");

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
    return `<img src="${u}" alt="" loading="lazy" decoding="async" onerror="this.remove()">`;
  }).join("");

  return `<div class="ph ${isMultiple ? 'm' : ''}">
    <span><i>${emoji}</i>swipeable photo/pdf gallery<br>img/${key}-1.jpg, img/${key}-1.png…</span>
    <div class="track">${imgs}</div>
    ${isMultiple ? '<button class="pv" aria-label="Previous">‹</button><button class="nx" aria-label="Next">›</button><div class="dots"></div>' : ''}
  </div>`;
}

function renderTimeline(targetId, items, photoPrefix, emoji) {
  const html = items.map((it, n) => {
    const lock = it.locked && CONFIDENTIAL ? `<span class="lock">🔒 ${t("locked")}</span>` : "";
    const bullets = it.bullets ? `<ul>${it.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : "";
    const stack = it.stack ? `<div class="chips" style="margin-top:10px">${renderChips(it.stack)}</div>` : "";
    return `<div class="it">
      <span class="w">${it.date}</span>
      <h3>${it.title}${lock}</h3>
      <p>${it.org || ""}</p>${bullets}${stack}
      ${renderGallery(it.photo || `${photoPrefix}-${n + 1}`, emoji)}
    </div>`;
  }).join("");
  $(targetId).innerHTML = html;
}

function renderEducationCards(targetId, items) {
  const html = items.map((it) => {
    const stackChips = it.stack ? `<div class="chips" style="margin-top:16px">${renderChips(it.stack)}</div>` : "";
    const descText = it.org && !it.org.includes("GPA") ? `<p style="margin-top:10px; font-size:14.5px; color:var(--mut); line-height:1.5;">${it.org}</p>` : "";
    const gpaBadge = it.org && it.org.includes("GPA") ? `<div style="margin-top:12px;"><span class="chip" style="background:color-mix(in srgb, var(--acc) 12%, transparent); color:var(--acc); border:1px solid var(--line);">${it.org}</span></div>` : "";

    return `<div class="card" style="display: flex; flex-direction: column; justify-content: space-between; padding: 24px; margin-bottom: 14px;">
      <div>
        <span class="w" style="font-family: var(--mono); font-size: 13px; color: var(--acc);">${it.date}</span>
        <h4 style="font: 600 20px/1.3 var(--serif); margin: 8px 0 4px; color: var(--ink);">${it.title}</h4>
        ${descText}
        ${gpaBadge}
      </div>
      ${stackChips}
    </div>`;
  }).join("");
  $(targetId).innerHTML = html;
}

function renderCardGrid(targetId, items, photoPrefix, emoji) {
  const html = items.map((it, n) => {
    const key = it.photo || `${photoPrefix}-${n + 1}`;
    const pdfPath = it.pdf ? `<div style="margin-top: 10px;"><a href="${it.pdf}" target="_blank" rel="noopener" class="btn-pdf">${t("pdf")}</a></div>` : "";
    
    return `<div class="card">
      ${renderGallery(key, emoji)}
      <span class="w">${it.date}</span>
      <h4>${it.title}</h4>
      <p>${it.desc || it.org || ""}</p>
      ${pdfPath}
    </div>`;
  }).join("");
  $(targetId).innerHTML = html;
}

/* Slider kartu (Experience & Projects): foto di atas, panel navy berisi judul + penjelasan */
function renderSlider(targetId, items, photoPrefix, emoji) {
  const cards = items.map((it, n) => {
    const lock = it.locked && CONFIDENTIAL ? `<span class="lock">🔒 ${t("locked")}</span>` : "";
    const bullets = it.bullets ? `<ul>${it.bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : "";
    const stack = it.stack ? `<div class="chips">${renderChips(it.stack)}</div>` : "";
    return `<article class="sc">${renderGallery(it.photo || `${photoPrefix}-${n + 1}`, emoji)}
      <div class="sc-body"><span class="w">${it.date}</span><h3>${it.title}${lock}</h3>
      <p class="sub">${it.org || ""}</p>${bullets}${stack}</div></article>`;
  }).join("");
  $(targetId).innerHTML = `<div class="sl-track">${cards}</div>
    <div class="sl-ctrl"><button class="round sl-prev" aria-label="Previous">←</button>
    <div class="sl-dots">${items.map(() => "<i></i>").join("")}</div>
    <button class="round solid sl-next" aria-label="Next">→</button></div>`;
}

function renderSkills() {
  const html = SKILLS.map((s) =>
    `<div class="card"><h3>${s.group}</h3><div class="chips">${renderChips(s.items)}</div></div>`).join("");
  $("sk").innerHTML = html;
}

function renderContact() {
  $("btn-cv").href = CONTACT.cv;
  $("ct-cv").href = CONTACT.cv;                 // tombol CV kedua di footer
  $("ct-email").href = `mailto:${CONTACT.email}`;
  $("ct-email").textContent = CONTACT.email;
  $("ct-linkedin").href = CONTACT.linkedin || "https://www.linkedin.com/search/results/people/?keywords=Raihanah%20Basyirah";
  $("ct-wa").href = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.waText)}`;
}

function renderAll() {
  renderContact();
  renderSkills();
  renderSlider("ex", EXPERIENCE, "kerja", "💼");
  renderSlider("pr", PROJECTS, "proyek", "🚀");
  renderEducationCards("ed", EDUCATION);
  renderCardGrid("ce", CERTIFICATES, "sertifikat", "📜");
  renderCardGrid("og", ORGANIZATIONS, "organisasi", "🌸");
  renderCardGrid("aw", AWARDS, "penghargaan", "🏆");
}