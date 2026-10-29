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
  "paskib 2025": ["img/organization/paskib 2025.png", "img/certificate/paskib 2025.jpg"],
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
  { group: "Backend", items: ["Flask", "ASP.NET", "Java Spring", "REST API"] },
  { group: "Database", items: ["SQL Server", "MySQL", "Oracle"] },
  { group: "Analysis & Design", items: ["UML", "Requirements Document", "Business Process Modeling", "UI Mockup (Figma)", "Progress Documentation"] },
  { group: "Architecture & Methods", items: ["3-Tier", "SDLC", "Waterfall", "System Prototyping", "Throwaway Prototyping"] },
  { group: "Tools", items: ["Postman", "VS Code", "Visual Studio", "IntelliJ", "draw.io", "Android Studio", "Figma", "Git & GitHub (basic)"] }
];

const EXPERIENCE = [
  {
    date: "Jan 2026 to Jul 2026", title: "Maintenance Engineering Intern", photo: "adm",
    org: CONFIDENTIAL ? "Automotive manufacturing company · Karawang" : "PT Astra Daihatsu Motor · Karawang", locked: false,
    bullets: [
      "Joined the Maintenance Press section as a digitalization intern, working as both developer and system analyst. I turned recurring equipment problems raised by maintenance and press-line technicians into requirements for a digital monitoring system, and captured them in a requirements document, UML diagrams and Figma mockups.",
      "Collected data and ran tests on site under real production conditions, so the system was built and tuned on actual line data. I reported progress and technical findings to industry supervisors and academic advisors, and documented each stage.",
      "The work became the Timing Belt Condition Monitoring System, which runs on a factory-floor monitor and supports the section's digitalization goals."
    ]
  },
  {
    date: "Jun 2022 to Aug 2022", title: "Sales & Distribution Data Validation Intern", photo: "forisa",
    org: "PT Forisa NusaPersada · Jakarta",
    bullets: ["As a data validation intern, I recorded and validated sales and branch distribution data, which kept the regional and sales performance figures accurate."]
  },
  {
    date: "Feb 2022 to May 2022", title: "Finance, Accounting & Tax Intern", photo: "sera",
    org: "PT Serasi Autoraya (SERA) · Jakarta",
    bullets: [
      "As a finance, accounting and tax intern, I assisted with administrative and financial record keeping, which kept company documents accurate and in order.",
      "I also joined the division's daily administrative work and learned its processes on the job."
    ]
  }
];

const PROJECTS = [
  {
    date: "Jan 2026 to Jul 2026", title: "Timing Belt Condition Monitoring System", photo: "timingbelt", locked: true,
    org: "A real-time computer vision system that classifies timing belt condition as OK, Warning or NG from four industrial cameras. My role: end-to-end developer and system analyst, from requirements and dataset to model, API and dashboard.",
    bullets: [
      "Analyzed the problem with the maintenance team and documented it in a requirements document, UML diagrams and Figma mockups, and recorded each stage of progress.",
      "Curated and annotated the dataset myself in Roboflow because site data was limited, then trained a YOLOv8s-OBB model on 46 images extended with augmentation. It reached 96% mAP@50 on the test set.",
      "Built a 3-tier stack (Flask API, React-Vite dashboard, MySQL) that runs fully offline on an NVIDIA Jetson Orin Nano Super with a P95 latency of 0.225 s, and displayed it live on a factory-floor monitor. I tuned the model step by step against real production conditions with System Prototyping."
    ],
    stack: ["Python", "YOLOv8s-OBB", "OpenCV", "Flask", "React-Vite", "MySQL", "Jetson Orin Nano", "Roboflow"]
  },
  {
    date: "Sep 2025 to Dec 2025", title: "Campus Facility Booking System", photo: "fasilitas", locked: true,
    org: "A website for managing campus facilities and inventory. My role: Full-Stack Developer and system analyst.",
    bullets: [
      "Co-initiated the system to move facility booking and asset tracking online. As the analyst, I wrote the requirements document, modeled the Purchase Requisition workflow, drew the UML diagrams and designed the Figma mockups, so stakeholders agreed on the scope before development began.",
      "Built it with Next.js (frontend), ASP.NET (backend) and SQL Server, and documented each stage of progress."
    ],
    stack: ["Next.js", "ASP.NET", "SQL Server"]
  },
  {
    date: "Mar 2025 to Jul 2025", title: "MINFOIN: Mobile Information App", photo: "minfoin",
    org: "An Android information app for the Informatics Management program. My role: Full-Stack Developer and system analyst.",
    bullets: [
      "Prepared the requirements document, UML diagrams and Figma mockups before coding, and documented each stage of progress.",
      "Designed the UI in React Native and managed the SQL Server database.",
      "Delivered six master-data sets and one core transaction module."
    ],
    // TODO: pastikan backend yang SEBENARNYA dipakai di MINFOIN, lalu ganti "ASP.NET Web API" kalau berbeda
    stack: ["React Native", "ASP.NET Web API", "SQL Server"]
  },
  {
    date: "Feb 2025 to Jul 2025", title: "Master Part Safety Grade Migration", photo: "masterpart", locked: true,
    org: "An internal web module for managing part data at PT Astra Honda Motor, built for the Master Part Safety Grade migration. My role: Full-Stack Developer and system analyst.",
    bullets: [
      "Prepared UML diagrams, requirement documentation and Figma mockups, and documented each stage of progress.",
      "Wrote the code from documented system requirements using the Waterfall method, building internal modules in Java Spring with HTML pages, secure CRUD operations and an Oracle database connection."
    ],
    // TODO: konfirmasi peran (Full-Stack?) dan keterlibatan analyst di proyek ini
    stack: ["Java Spring", "Oracle", "HTML"]
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
  ["🔌", "REST APIs", "ASP.NET · Java Spring"],
  ["👁️", "Vision systems", "YOLOv8 · OpenCV"],
  ["🗄️", "Business systems", "SQL Server · MySQL"]
];
// Ucapan maskot per section (kunci = id section) + ucapan acak saat maskot diklik
const MASCOT = { hero: "Hi, welcome!", about: "A quick introduction to Raihanah.", skills: "A full toolbox, from React to YOLOv8.", exp: "Real workplace experience.", projects: "Psst, click the images to enlarge them.", edu: "Politeknik Astra, D3 Informatics Management.", certs: "Every certificate opens as a PDF.", org: "Campus teams and committees.", awards: "A Huawei national finalist and a 3rd place in a writing contest.", contact: "Say hello, the buttons are right here." };
const MASCOT_FUN = ["Hehe, that tickles!", "Boop!", "The CV button is up there if you need it.", "Have you opened the projects yet?", "Have a nice day!"];
