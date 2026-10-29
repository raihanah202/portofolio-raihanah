/* ============================================================
   data.js — SEMUA ISI WEBSITE ADA DI SINI (teks website: bahasa Inggris).
   ============================================================ */

const CONTACT = {
  email: "rayhanah.basyirah@gmail.com",
  linkedin: "https://www.linkedin.com/in/raihanahbasyirah",
  whatsapp: "62859106990123",
  waText: "Hi Raihanah, I found your portfolio website and would like to get in touch.",
  cv: "assets/certificate/CV_Raihanah_Basyirah.pdf"
};

const CONFIDENTIAL = true;
const MAX_PHOTOS = 6;

const PHOTOS = {
  "adm": ["img/experience/adm-1.jpg", "img/certificate/sertif adm.png"],
  "forisa": ["img/experience/forisa-1.jpg", "img/experience/forisa-2.jpg"],
  "sera": ["img/experience/sera-1.jpg"],
  "timingbelt": ["img/project/timingbelt-1.jpg", "img/project/timingbelt-2.jpg", "img/project/timingbelt-3.jpg", "img/project/timingbelt-4.jpg", "img/project/timingbelt-5.jpg", "img/project/timingbelt-6.jpg", "img/project/adm team.png"],
  "fasilitas": ["img/project/sarana-1.jpg", "img/project/sarana team.png"],
  "minfoin": ["img/project/minfoin-1.png", "img/project/minfoin-2.png", "img/project/minfoin team.png"],
  "masterpart": ["img/project/ahm.jpg", "img/project/ahm present.png"],
  "vm": ["img/certificate/aguna.jpg"],
  "mikrotik": ["img/certificate/mtcna.jpg"],
  "linux": ["img/certificate/NDG.jpg"],
  "bem": ["img/certificate/bem.jpg"],
  "sic": ["img/certificate/samsung.jpg"],
  "paskib 2024": ["img/organization/paskib 2024.png", "img/certificate/paskib 2024.jpg"],
  "paskib 2025": ["img/organization/paskib 2024.png", "img/certificate/paskib 2025.jpg"],
  "bem-org": ["img/organization/bem.png", "img/certificate/bem.jpg"],
  "novastech": ["img/organization/novastech.png", "img/certificate/novastech.png"],
  "lkti": ["img/certificate/lkti.png", "img/awards/lkti team.png"],
  "huawei": ["img/certificate/huawei.png"]
};

const TYPING_WORDS = ["web & mobile apps", "computer vision systems", "REST APIs & dashboards", "edge AI on Jetson ⚡", "things that actually help ✨"];

const SKILLS = [
  { group: "AI / Computer Vision", items: ["Python", "YOLOv8 (OBB)", "OpenCV", "Roboflow", "Deep Learning", "Edge AI (NVIDIA Jetson)"] },
  { group: "Programming Languages", items: ["Python", "JavaScript", "Java", "C#"] },
  { group: "Frontend", items: ["React.js", "React Native", "Next.js", "React-Vite", "HTML"] },
  { group: "Backend", items: ["Flask", "ASP.NET", "Java Spring", "Laravel", "REST API"] },
  { group: "Database", items: ["SQL Server", "MySQL", "Oracle"] },
  { group: "Architecture & Methods", items: ["3-Tier", "SDLC", "Waterfall", "System Prototyping", "Throwaway Prototyping"] },
  { group: "Tools", items: ["Postman", "VS Code", "Visual Studio", "IntelliJ", "draw.io", "Android Studio", "Figma"] }
];

const EXPERIENCE = [
  {
    date: "Jan 2026 to Jul 2026", title: "Maintenance Engineering Intern", photo: "adm",
    org: CONFIDENTIAL ? "Automotive manufacturing company · Karawang" : "PT Astra Daihatsu Motor · Karawang", locked: false,
    bullets: [
      "Joined the Maintenance Engineering section (Maintenance Press) to support digitalization projects.",
      "Worked with maintenance and press-line technicians to turn recurring equipment problems into requirements for digital monitoring.",
      "Collected data and ran tests on site under real production conditions.",
      "Reported progress and technical findings to industry supervisors and academic advisors."
    ]
  },
  {
    date: "Jun 2022 to Aug 2022", title: "Sales & Distribution Data Validation Intern", photo: "forisa",
    org: "PT Forisa NusaPersada · Jakarta",
    bullets: ["Recorded and validated sales and branch distribution data so that regional and sales performance figures stayed accurate."]
  },
  {
    date: "Feb 2022 to May 2022", title: "Finance, Accounting & Tax Intern", photo: "sera",
    org: "PT Serasi Autoraya (SERA) · Jakarta",
    bullets: [
      "Assisted with administrative and financial record keeping, and kept company documents accurate and in order.",
      "Took part in the division's day-to-day administrative work and learned its processes on the job."
    ]
  }
];

const PROJECTS = [
  {
    date: "Jan 2026 to Jul 2026", title: "Timing Belt Condition Monitoring System", photo: "timingbelt", locked: true,
    org: "A real-time computer vision system that classifies timing belt condition as OK, Warning or NG from four industrial cameras, using a YOLOv8s-OBB model I trained myself.",
    bullets: [
      "Runs fully offline as a 3-tier stack (Flask API, React-Vite dashboard, MySQL) on an NVIDIA Jetson Orin Nano, and is shown live on a factory-floor monitor.",
      "Data access on site was limited, so I curated and annotated my own dataset and tuned the model step by step for real production conditions."
    ],
    stack: ["Python", "YOLOv8s-OBB", "OpenCV", "Flask", "React-Vite", "MySQL", "Jetson Orin Nano", "Roboflow"]
  },
  {
    date: "Sep 2025 to Dec 2025", title: "Campus Facility Booking System", photo: "fasilitas", locked: true,
    org: "A website for managing campus facilities and inventory. My role: Full-Stack Developer.",
    bullets: [
      "Co-initiated the system to move facility booking and asset tracking online.",
      "Modeled the Purchase Requisition workflow and drew UML diagrams so stakeholders agreed on the system scope."
    ],
    stack: ["Next.js", "ASP.NET", "SQL Server"]
  },
  {
    date: "Mar 2025 to Jul 2025", title: "MINFOIN: Mobile Information App", photo: "minfoin",
    org: "An Android information app for the Informatics Management program. My role: Full-Stack Developer.",
    bullets: [
      "Designed the UI in React Native and managed the SQL Server database.",
      "Finished six master-data sets and one core transaction module."
    ],
    stack: ["React Native", "SQL Server"]
  },
  {
    date: "Feb 2025 to Jul 2025", title: "Master Part Safety Grade Migration", photo: "masterpart",
    org: "PT Astra Honda Motor", locked: true,
    bullets: [
      "Built with the Waterfall method, writing code from documented system requirements.",
      "Built internal modules for managing part data, with secure CRUD operations and an Oracle database connection."
    ],
    stack: ["HTML", "Java Spring", "Oracle"]
  }
];

const EDUCATION = [
  {
    date: "Aug 2023 to Aug 2026", title: "D3 Informatics Management · Politeknik Astra", photo: "poltek", org: "GPA 3.53 / 4.00",
    stack: ["Software Engineering", "Database Systems", "System Modeling", "Requirements Analyst", "Mobile Programming", "Computer Vision"]
  },
  {
    date: "Jul 2020 to May 2023", title: "SMK Negeri 36 Jakarta · Multimedia", photo: "smk36",
    org: "Studied visual design and digital media production, which gave me a base in design principles and content creation."
  }
];

const CERTIFICATES = [
  { title: "MikroTik Certified Network Associate (MTCNA)", photo: "mikrotik", org: "MikroTik", desc: "ID 2512NA1894", date: "Dec 2025", pdf: "assets/certificate/mtcna.pdf" },
  { title: "Samsung Innovation Campus", photo: "sic", org: "Samsung Electronics", desc: "Code Kickstart: Python Programming (Batch 7)", date: "Oct 2025", pdf: "assets/certificate/samsung.pdf" },
  { title: "NDG Linux Unhatched 2024", photo: "linux", org: "Cisco Networking Academy", desc: "Linux Essentials Foundation", date: "Mar 2024", pdf: "assets/certificate/NDG.pdf" },
  { title: "Virtual Machine Fundamental", photo: "vm", org: "Aguna Course", desc: "Virtualization & Server Basics", date: "Feb 2024", pdf: "assets/certificate/aguna.pdf" }
];

const ORGANIZATIONS = [
  { title: "Member, Tim Paskibra ASTRAtech 2024", photo: "paskib 2024", desc: "Campus flag-ceremony team", date: "Aug 2024", pdf: "assets/certificate/paskib 2024.pdf" },
  { title: "Member, Tim Paskibra ASTRAtech 2025", photo: "paskib 2025", desc: "Campus flag-ceremony team", date: "Aug 2025", pdf: "assets/certificate/paskib 2025.pdf" },
  { title: "Media & Content Manager", photo: "bem-org", desc: "Student Executive Board (BEM), 2024 to 2025", date: "2024 to 2025", pdf: "assets/certificate/bem.pdf" },
  { title: "Event Division Coordinator", photo: "novastech", desc: "NOVASTECH Committee", date: "2024", pdf: "assets/certificate/novastech.pdf" }
];

const AWARDS = [
  { title: "3rd Place, Scientific Writing Competition", photo: "lkti", desc: "NOVASTECH, BEM Politeknik Astra", date: "2025", pdf: "assets/certificate/lkti.pdf" },
  { title: "National Finalist, Huawei ICT Competition 2024-2025", photo: "huawei", desc: "Network Track, Huawei ICT Academy", date: "2024", pdf: "assets/certificate/huawei.pdf" }
];
/* ===== (BARU) Aksi lucu — isi teks diedit di sini ===== */
// Kata yang berputar setelah "I build ..." (roll vertikal, menggantikan efek ketik)
const ROLL_WORDS = ["web apps", "mobile apps", "REST APIs", "real-time vision systems", "booking & workflow systems"];
// Bubble di hero: [emoji, judul, tools] — semuanya terlihat sekaligus supaya HRD langsung paham
const BUBBLES = [
  ["🌐", "Web apps", "React · Next.js"],
  ["📱", "Mobile apps", "React Native"],
  ["🔌", "REST APIs", "ASP.NET · Spring Boot"],
  ["👁️", "Vision systems", "YOLOv8 · OpenCV"],
  ["🗄️", "Business systems", "SQL Server · MySQL"]
];
// Ucapan maskot per section (kunci = id section) + ucapan acak saat maskot diklik
const MASCOT = { hero: "Hi, welcome!", about: "A quick introduction to Raihanah.", skills: "A full toolbox, from React to YOLOv8.", exp: "Real workplace experience.", projects: "Psst, click the images to enlarge them.", edu: "Politeknik Astra, D3 Informatics Management.", certs: "Every certificate opens as a PDF.", org: "Campus teams and committees.", awards: "A Huawei national finalist and a 3rd place in a writing contest.", contact: "Say hello, the buttons are right here." };
const MASCOT_FUN = ["Hehe, that tickles!", "Boop!", "The CV button is up there if you need it.", "Have you opened the projects yet?", "Have a nice day!"];
