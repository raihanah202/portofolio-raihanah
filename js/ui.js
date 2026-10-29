/* ============================================================
   ui.js — BARU: ganti bahasa EN <-> ID, klik logo / "Back to top" = scroll ke atas.
   Teks Indonesia ada di STATIC_ID (teks yang tertulis di index.html) dan DATA_ID
   (isi kartu dari data.js, urutannya sama dengan array aslinya). Mau ubah terjemahan? Edit di sini.
   ============================================================ */
let LANG = "en";

/* Teks kecil yang dipakai render.js / detail.js (dipanggil lewat t("kunci")) */
const UI_STR = {
  en: { locked: "details private", pdf: "Open PDF ↗" },
  id: { locked: "detail dirahasiakan", pdf: "Buka PDF ↗" }
};
function t(k) { return (UI_STR[LANG] && UI_STR[LANG][k]) || UI_STR.en[k] || k; }

/* Teks di index.html yang punya atribut data-i18n="kunci" (versi Inggrisnya diambil otomatis dari HTML) */
const STATIC_ID = {
  n_about: "Tentang", n_skills: "Skill", n_exp: "Pengalaman", n_projects: "Proyek", n_edu: "Edukasi",
  n_certs: "Sertifikat", n_org: "Organisasi", n_awards: "Prestasi", n_contact: "Kontak",
  build: "Saya membuat",
  lead: "Manajemen Informatika (D3) di Politeknik Astra. Saya membuat aplikasi web dan mobile, dan proyek terbaru saya adalah sistem vision real-time yang membaca empat kamera industri di NVIDIA Jetson Orin Nano.",
  dl: "Unduh CV", cm: "Hubungi saya",
  h_about: "Sedikit tentang saya",
  about_p: "Saya telah menyelesaikan pendidikan D3 Manajemen Informatika di Politeknik Astra. Saya membuat aplikasi web dan mobile dengan Next.js, ASP.NET, React, React Native, Laravel, dan Spring Boot, didukung database SQL Server, MySQL, dan Oracle. Untuk tugas akhir, saya merancang dan men-deploy sistem computer vision real-time di perangkat edge untuk memantau kondisi timing belt di sebuah perusahaan manufaktur otomotif. Sebelum menulis kode, saya juga mengerjakan sisi analisisnya: mengumpulkan kebutuhan dan memodelkan alur proses bisnis.",
  s1: "IPK D3 / 4.00", s2: "Proyek utama", s3: "Magang di industri", s4: "Sertifikasi",
  h_skills: "Tech stack", h_exp: "Pengalaman kerja", h_projects: "Proyek", h_edu: "Pendidikan",
  h_certs: "Sertifikasi", h_org: "Organisasi", h_awards: "Penghargaan",
  h_contact: "Mari berbincang.", ct_sub: "Saya terbuka untuk peran full-stack dan computer vision. Kirim email atau pesan, atau unduh CV saya di bawah ini.",
  top: "Kembali ke atas ↑"
};

/* Salinan data Inggris asli (diambil sebelum ada yang diubah) — dipakai untuk balik ke EN */
const ORIG = JSON.parse(JSON.stringify({ EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATES, ORGANIZATIONS, AWARDS, ROLL_WORDS, BUBBLES, MASCOT, MASCOT_FUN }));
const LIVE = { EXPERIENCE, PROJECTS, EDUCATION, CERTIFICATES, ORGANIZATIONS, AWARDS };

/* Terjemahan isi kartu. Tiap array sejajar dengan array di data.js; {} = tidak ada yang diubah */
const DATA_ID = {
  EXPERIENCE: [
    {
      title: "Magang Maintenance Engineering",
      org: CONFIDENTIAL ? "Perusahaan manufaktur otomotif · Karawang" : "PT Astra Daihatsu Motor · Karawang",
      bullets: [
        "Bergabung di seksi Maintenance Engineering (Maintenance Press) untuk mendukung proyek digitalisasi.",
        "Bekerja bersama teknisi maintenance dan press line untuk mengubah masalah mesin yang berulang menjadi kebutuhan monitoring digital.",
        "Mengumpulkan data dan menguji langsung di lapangan dalam kondisi produksi yang sebenarnya.",
        "Melaporkan perkembangan dan temuan teknis kepada supervisor industri dan dosen pembimbing."
      ]
    },
    {
      title: "Magang Validasi Data Penjualan & Distribusi",
      bullets: ["Mencatat dan memvalidasi data penjualan serta distribusi cabang agar data wilayah dan kinerja penjualan tetap akurat."]
    },
    {
      title: "Magang Keuangan, Akuntansi & Pajak",
      bullets: [
        "Membantu pencatatan administrasi dan keuangan, serta menjaga dokumen perusahaan tetap akurat dan rapi.",
        "Ikut mengerjakan administrasi harian divisi dan mempelajari prosesnya langsung di tempat."
      ]
    }
  ],
  PROJECTS: [
    {
      title: "Sistem Monitoring Kondisi Timing Belt",
      org: "Sistem computer vision real-time yang mengklasifikasikan kondisi timing belt sebagai OK, Warning, atau NG dari empat kamera industri, memakai model YOLOv8s-OBB yang saya latih sendiri.",
      bullets: [
        "Berjalan sepenuhnya offline sebagai stack 3-tier (Flask API, dashboard React-Vite, MySQL) di NVIDIA Jetson Orin Nano, dan ditampilkan langsung di monitor lantai pabrik.",
        "Akses data di lapangan terbatas, jadi saya menyusun dan menganotasi dataset sendiri, lalu menyetel model secara bertahap sesuai kondisi produksi yang sebenarnya."
      ]
    },
    {
      title: "Sistem Booking Fasilitas Kampus",
      org: "Website pengelolaan fasilitas dan inventaris kampus. Peran saya: Full-Stack Developer.",
      bullets: [
        "Ikut menginisiasi sistem untuk memindahkan booking fasilitas dan pelacakan aset ke platform digital.",
        "Memodelkan alur Purchase Requisition dan menggambar diagram UML agar semua pihak sepakat soal cakupan sistem."
      ]
    },
    {
      title: "MINFOIN: Aplikasi Informasi Mobile",
      org: "Aplikasi informasi Android untuk program studi Manajemen Informatika. Peran saya: Full-Stack Developer.",
      bullets: [
        "Merancang UI dengan React Native dan mengelola database SQL Server.",
        "Menyelesaikan enam set data master dan satu modul transaksi utama."
      ]
    },
    {
      title: "Migrasi Master Part Safety Grade",
      bullets: [
        "Dibangun dengan metode Waterfall, menulis kode berdasarkan kebutuhan sistem yang terdokumentasi.",
        "Membangun modul internal untuk mengelola data part, dengan operasi CRUD yang aman dan koneksi ke database Oracle."
      ]
    }
  ],
  EDUCATION: [
    {
      title: "D3 Manajemen Informatika · Politeknik Astra",
      stack: ["Rekayasa Perangkat Lunak", "Sistem Basis Data", "Pemodelan Sistem", "Analis Kebutuhan", "Pemrograman Mobile", "Computer Vision"]
    },
    { org: "Mempelajari desain visual dan produksi media digital, yang menjadi dasar saya dalam prinsip desain dan pembuatan konten." }
  ],
  CERTIFICATES: [{}, {}, {}, { desc: "Dasar Virtualisasi & Server" }],
  ORGANIZATIONS: [
    { title: "Anggota, Tim Paskibra ASTRAtech 2024", desc: "Tim upacara bendera kampus" },
    { title: "Anggota, Tim Paskibra ASTRAtech 2025", desc: "Tim upacara bendera kampus" },
    { desc: "Badan Eksekutif Mahasiswa (BEM), 2024 sampai 2025" },
    { title: "Koordinator Divisi Acara", desc: "Panitia NOVASTECH" }
  ],
  AWARDS: [
    { title: "Juara 3, Lomba Karya Tulis Ilmiah", desc: "NOVASTECH, BEM Politeknik Astra" },
    { title: "Finalis Nasional, Huawei ICT Competition 2024-2025", desc: "Jalur Network, Huawei ICT Academy" }
  ],
  ROLL_WORDS: ["aplikasi web", "aplikasi mobile", "REST API", "sistem vision real-time", "sistem booking & workflow"],
  BUBBLES: [
    ["🌐", "Aplikasi web", "React · Next.js"], ["📱", "Aplikasi mobile", "React Native"], ["🔌", "REST API", "ASP.NET · Spring Boot"],
    ["👁️", "Sistem vision", "YOLOv8 · OpenCV"], ["🗄️", "Sistem bisnis", "SQL Server · MySQL"]
  ],
  MASCOT: {
    hero: "Hai, selamat datang!", about: "Perkenalan singkat tentang Raihanah.", skills: "Perkakasnya lengkap, dari React sampai YOLOv8.",
    exp: "Pengalaman kerja nyata.", projects: "Psst, klik gambarnya biar lebih besar.", edu: "Politeknik Astra, D3 Manajemen Informatika.",
    certs: "Semua sertifikat bisa dibuka sebagai PDF.", org: "Tim dan kepanitiaan kampus.", awards: "Finalis nasional Huawei dan juara 3 lomba karya tulis.", contact: "Mau menyapa? Tombolnya ada di sini."
  },
  MASCOT_FUN: ["Hehe, geli!", "Boop!", "Tombol CV ada di atas kalau kamu butuh.", "Sudah buka proyeknya belum?", "Semoga harimu menyenangkan!"]
};

/* Nama bulan Inggris -> Indonesia yang beda ejaan (Jan, Feb, Mar, Jun, Jul, Sep, Nov sama saja) */
const MONTH_ID = { May: "Mei", Aug: "Agu", Oct: "Okt", Dec: "Des" };
const idDate = (s) => s.replace(/\b(May|Aug|Oct|Dec)\b/g, (m) => MONTH_ID[m]).replace(/ to /g, " sampai "); // "Jan 2026 to Jul 2026" -> "Jan 2026 sampai Jul 2026"

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
