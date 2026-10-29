/* ============================================================
   ui.js — BARU: ganti bahasa EN <-> ID, klik logo / "Back to top" = scroll ke atas.
   Teks Indonesia ada di STATIC_ID (teks yang tertulis di index.html) dan DATA_ID
   (isi kartu dari data.js, urutannya sama dengan array aslinya). Mau ubah terjemahan? Edit di sini.
   ============================================================ */
let LANG = "en";

/* Teks kecil yang dipakai render.js / detail.js (dipanggil lewat t("kunci")) */
const UI_STR = {
  en: { locked: "details confidential", pdf: "Open PDF ↗" },
  id: { locked: "detail dirahasiakan", pdf: "Buka PDF ↗" }
};
function t(k) { return (UI_STR[LANG] && UI_STR[LANG][k]) || UI_STR.en[k] || k; }

/* Teks di index.html yang punya atribut data-i18n="kunci" (versi Inggrisnya diambil otomatis dari HTML) */
const STATIC_ID = {
  n_about: "Tentang", n_skills: "Skill", n_exp: "Pengalaman", n_projects: "Proyek", n_edu: "Edukasi",
  n_certs: "Sertifikat", n_org: "Organisasi", n_awards: "Prestasi", n_contact: "Kontak",
  build: "Aku membuat",
  lead: "Lulusan Manajemen Informatika (D3) yang suka membangun sistem web & mobile, dan baru-baru ini jatuh cinta pada Computer Vision di perangkat edge.",
  dl: "Unduh CV", cm: "Hubungi Saya",
  h_about: "Sedikit tentangku",
  about_p: "Lulusan baru D3 Manajemen Informatika Politeknik Astra dengan pengalaman pengembangan full-stack di web dan mobile (Next.js, ASP.NET, React, React Native, Laravel, Spring Boot) serta database relasional (SQL Server, MySQL, Oracle). Baru-baru ini memperluas kemampuan ke Computer Vision dan Deep Learning dengan merancang dan men-deploy sistem deteksi cacat real-time di perangkat edge. Aku memadukan analisis proses bisnis yang kuat dengan kemampuan AI/ML yang terus tumbuh, dan siap berkontribusi pada solusi IT yang inovatif dan berbasis data.",
  s1: "IPK D3 / 4.00", s2: "Proyek utama", s3: "Magang di industri", s4: "Sertifikasi",
  h_skills: "Tech stack", h_exp: "Pengalaman kerja", h_projects: "Proyek", h_edu: "Pendidikan",
  h_certs: "Sertifikasi", h_org: "Organisasi", h_awards: "Penghargaan",
  h_contact: "Yuk ngobrol.", ct_sub: "Terbuka untuk peluang full-stack & computer vision.",
  top: "Kembali ke atas ↑"
};

/* Salinan data Inggris asli (diambil sebelum ada yang diubah) — dipakai untuk balik ke EN */
const ORIG = JSON.parse(JSON.stringify({ EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATES, ORGANIZATIONS, AWARDS, ROLL_WORDS, BUBBLES, MASCOT, MASCOT_FUN }));
const LIVE = { EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATES, ORGANIZATIONS, AWARDS };

/* Terjemahan isi kartu. Tiap array sejajar dengan array di data.js; {} = tidak ada yang diubah */
const DATA_ID = {
  EXPERIENCE: [
    {
      title: "Magang – Maintenance Engineering",
      org: CONFIDENTIAL ? "Perusahaan manufaktur otomotif · Karawang" : "PT Astra Daihatsu Motor · Karawang",
      bullets: [
        "Ditempatkan di seksi Maintenance Engineering (Maintenance Press), mendukung inisiatif digitalisasi.",
        "Bekerja erat dengan teknisi maintenance dan press line untuk mengubah masalah mesin yang berulang menjadi kebutuhan monitoring digital.",
        "Mengumpulkan data dan menjalankan pengujian langsung di lapangan dalam kondisi produksi nyata.",
        "Melaporkan progres dan temuan teknis kepada supervisor industri dan dosen pembimbing."
      ]
    },
    {
      title: "Magang – Validasi Data Penjualan & Distribusi",
      bullets: ["Mencatat dan memvalidasi data penjualan serta distribusi cabang agar akurat secara wilayah maupun kinerja penjualan."]
    },
    {
      title: "Magang – Keuangan, Akuntansi & Pajak",
      bullets: [
        "Membantu pencatatan administrasi dan keuangan agar dokumen perusahaan tetap akurat dan tertib.",
        "Aktif belajar dan ikut terlibat dalam proses administrasi harian divisi."
      ]
    }
  ],
  PROJECTS: [
    {
      title: "Sistem Monitoring Kondisi Timing Belt",
      org: "Sistem computer vision real-time dengan model YOLOv8s-OBB hasil training sendiri yang mengklasifikasikan kondisi timing belt (OK / Warning / NG) dari 4 kamera industri.",
      bullets: [
        "Stack 3-tier yang berjalan sepenuhnya offline (Flask API, dashboard React-Vite, MySQL) di NVIDIA Jetson Orin Nano, ditampilkan langsung di monitor lantai pabrik.",
        "Menyusun dan menganotasi dataset sendiri meski akses data di lapangan terbatas, lalu menyetel model secara iteratif untuk kondisi produksi nyata."
      ]
    },
    {
      title: "Sistem Booking Fasilitas Kampus",
      org: "Website pengelolaan fasilitas dan inventaris kampus (peran: Full-Stack Developer).",
      bullets: [
        "Ikut menginisiasi sistem untuk mendigitalkan booking fasilitas dan pelacakan aset.",
        "Memodelkan alur Purchase Requisition dan membuat diagram UML agar semua pihak sepaham soal cakupan sistem."
      ]
    },
    {
      title: "MINFOIN — Aplikasi Informasi Mobile",
      org: "Aplikasi informasi Android untuk program studi Manajemen Informatika (Full-Stack Developer).",
      bullets: [
        "Merancang UI dengan React Native dan mengelola database SQL Server.",
        "Menyelesaikan 6 set data master dan 1 modul transaksi utama."
      ]
    },
    {
      title: "Migrasi Master Part Safety Grade",
      bullets: [
        "Dikembangkan dengan metodologi Waterfall, menulis kode dari kebutuhan sistem yang terstruktur.",
        "Membangun modul pengelolaan data part internal yang berfokus pada CRUD aman dan koneksi database Oracle."
      ]
    }
  ],
  EDUCATION: [
    {
      title: "D3 Manajemen Informatika · Politeknik Astra",
      stack: ["Rekayasa Perangkat Lunak", "Sistem Basis Data", "Pemodelan Sistem", "Analis Kebutuhan", "Pemrograman Mobile", "Computer Vision"]
    },
    { org: "Desain visual dan produksi media digital; dasar prinsip desain dan pembuatan konten." }
  ],
  CERTIFICATES: [{}, {}, {}, { desc: "Dasar Virtualisasi & Server" }],
  ORGANIZATIONS: [
    { title: "Anggota – Tim Paskibra ASTRAtech 2024", desc: "Tim upacara bendera kampus" },
    { title: "Anggota – Tim Paskibra ASTRAtech 2025", desc: "Tim upacara bendera kampus" },
    { desc: "Badan Eksekutif Mahasiswa (BEM), 2024–2025" },
    { title: "Koordinator Divisi Acara", desc: "Panitia NOVASTECH" }
  ],
  AWARDS: [
    { title: "Juara 3, Lomba Karya Tulis Ilmiah", desc: "NOVASTECH, BEM Politeknik Astra" },
    { title: "Finalis Nasional, Huawei ICT Competition 2024–2025", desc: "Jalur Network, Huawei ICT Academy" }
  ],
  ROLL_WORDS: ["aplikasi web", "aplikasi mobile", "REST API", "sistem vision real-time", "sistem booking & workflow"],
  BUBBLES: [
    ["🌐", "Aplikasi web", "React · Next.js"], ["📱", "Aplikasi mobile", "React Native"], ["🔌", "REST API", "ASP.NET · Spring Boot"],
    ["👁️", "Sistem vision", "YOLOv8 · OpenCV"], ["🗄️", "Sistem bisnis", "SQL Server · MySQL"]
  ],
  MASCOT: {
    hero: "Hai, selamat datang! 💙", about: "Itulah Raihanah secara singkat ✨", skills: "Banyak banget alat di kotak perkakas 🧰",
    exp: "Pengalaman nyata, bukan cuma tugas kuliah", projects: "Psst... klik gambarnya! 👆", edu: "Lulusan D3 baru nih 🎓",
    certs: "Sertifikat berderet 📜", org: "Pemain tim sejati 🤝", awards: "Penghargaan & jadi finalis 🏆", contact: "Sapa aku dong! Aku nggak gigit 💌"
  },
  MASCOT_FUN: ["Hehe, geli tau! 💖", "Boop! 🌸", "Psst, tombol CV-nya ada di situ 😉", "Udah lihat proyeknya belum?", "Semoga harimu menyenangkan! ✨"]
};

/* Nama bulan Inggris -> Indonesia yang beda ejaan (Jan, Feb, Mar, Jun, Jul, Sep, Nov sama saja) */
const MONTH_ID = { May: "Mei", Aug: "Agu", Oct: "Okt", Dec: "Des" };
const idDate = (s) => s.replace(/\b(May|Aug|Oct|Dec)\b/g, (m) => MONTH_ID[m]);

/* Tukar isi data (data.js) ke bahasa yang dipilih — array/objek diubah di tempat supaya render.js tinggal baca ulang */
function applyData(lang) {
  const id = lang === "id";
  Object.keys(LIVE).forEach((k) => LIVE[k].forEach((item, i) => {
    Object.assign(item, ORIG[k][i], id ? DATA_ID[k][i] : {});
    if (id && item.date) item.date = idDate(ORIG[k][i].date);
  }));
  [["ROLL_WORDS", ROLL_WORDS], ["BUBBLES", BUBBLES], ["MASCOT_FUN", MASCOT_FUN]].forEach(([k, arr]) => {
    arr.length = 0; arr.push(...(id ? DATA_ID[k] : ORIG[k]));
  });
  Object.assign(MASCOT, ORIG.MASCOT, id ? DATA_ID.MASCOT : {});
}

/* Tukar teks statis di index.html (elemen ber-atribut data-i18n) */
function applyStatic(lang) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.innerHTML;       // simpan versi Inggris sekali saja
    const idText = STATIC_ID[el.dataset.i18n];
    el.innerHTML = lang === "id" && idText ? idText : el.dataset.en;
  });
  document.documentElement.lang = lang;
}

/* Render ulang bagian yang isinya berubah, lalu pasang lagi efeknya */
function refreshView() {
  const fill = $("ed").querySelector(".tl-fill");                        // garis timeline jangan sampai ikut terhapus
  renderSlider("ex", EXPERIENCE, "kerja", "💼");
  renderSlider("pr", PROJECTS, "proyek", "🚀");
  renderEducationCards("ed", EDUCATION);
  if (fill) $("ed").prepend(fill);
  renderCardGrid("ce", CERTIFICATES, "sertifikat", "📜");
  renderCardGrid("og", ORGANIZATIONS, "organisasi", "🌸");
  renderCardGrid("aw", AWARDS, "penghargaan", "🏆");
  initSliders();                                                         // slider + auto-slide kartu
  initGalleries();                                                       // galeri foto di tiap kartu
  initRoll();                                                            // kata "I build ..." berputar
  renderBubbles();                                                       // bubble hero
}

function setLang(lang, rerender) {
  LANG = lang;
  applyData(lang);
  applyStatic(lang);
  const b = $("lang");
  if (b) b.dataset.l = lang;                                             // CSS menggeser "knob" EN/ID dari atribut ini
  if (rerender) refreshView();
}

function initLang() {
  let saved = null;
  try { saved = localStorage.getItem("lang"); } catch (e) {}
  setLang(saved === "id" ? "id" : "en", false);                          // dipanggil sebelum renderAll(), jadi tidak perlu render ulang
  $("lang").onclick = () => {
    const next = LANG === "en" ? "id" : "en";
    setLang(next, true);
    try { localStorage.setItem("lang", next); } catch (e) {}
  };
}

/* Klik logo bunga atau "Back to top" = scroll mulus ke atas */
function initLogoTop() {
  const up = () => scrollTo({ top: 0, behavior: "smooth" });
  const logo = $("logo"), tt = $("toTop");
  if (logo) {
    logo.onclick = up;
    logo.onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); up(); } };
  }
  if (tt) tt.onclick = (e) => { e.preventDefault(); up(); };
}
