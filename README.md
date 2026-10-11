# Portofolio Raihanah Basyirah

Website statis: **HTML + CSS + JavaScript biasa** (tanpa React/Next.js, tanpa build, tanpa npm).

## Struktur
```
portofolio-raihanah/
├── index.html          # kerangka halaman (nav, section, footer)
├── css/
│   ├── base.css        # warna tema, font, reset, nav, footer
│   ├── components.css  # hero, kartu, timeline, galeri foto
│   ├── animations.css  # gerakan: sabuk, kilau, ketik, 3D, muncul saat scroll
│   └── responsive.css  # tampilan HP
├── js/
│   ├── data.js         # ← ISI KONTEN (edit di sini)
│   ├── render.js       # data -> HTML
│   ├── effects.js      # ketik, foto 3D, galeri, reveal, tema
│   └── main.js         # menjalankan semuanya
├── assets/
│   └── CV_Raihanah_Basyirah.pdf   # CV yang dibuka tombol "Download CV"
└── img/
    ├── foto-profil.jpg
    └── kerja-1-1.jpg, proyek-2-1.jpg, ...   # foto galeri (opsional)
```

## Menjalankan
Klik dua kali `index.html`, atau `python -m http.server 8000` lalu buka `http://localhost:8000`.

## Menambah foto galeri
Tiap kartu punya field `photo` di `js/data.js`. Taruh foto di `img/` dengan format `<photo>-<nomor>.jpg` (maks 6 per kartu).
Contoh: `adm-1.jpg`, `adm-2.jpg`, `sera-1.jpg`, `sera-2.jpg`.

| photo | Kartu |
|---|---|
| adm, forisa, sera | Pengalaman kerja |
| timingbelt, fasilitas, minfoin, masterpart | Proyek |
| poltek, smk36 | Pendidikan |
| sic, mikrotik, linux, vm | Sertifikat |
| paskibra, bem, novastech | Organisasi |
| writing, huawei | Penghargaan |

## Kontak & CV
Edit `CONTACT` di `js/data.js` (email, LinkedIn, WhatsApp, file CV).

## Kerahasiaan
`CONFIDENTIAL` di `js/data.js`: `true` menyamarkan proyek/perusahaan bertanda `locked`.

## Hosting (gratis)
GitHub Pages / Cloudflare Pages / Netlify / Vercel: upload folder ini apa adanya.
