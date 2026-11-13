# Canvas Craft

Slide presentasi interaktif 3D untuk sesi pengenalan **Google Gemini** dan fitur **Gemini Canvas**: *From Prompt to Working Product*. Bahasanya sederhana dan ramah pemula, jadi bisa dipakai siapa saja.

Situs statis murni (HTML, CSS, JavaScript) tanpa build step dan tanpa dependensi.

Live: https://canvas-craft.rivaldigunawanyusuf.com

## Isi Presentasi (10 slide)

| # | Topik |
|---|-------|
| 1 | Cover dan fun fact |
| 2 | Masalah: ide alat bantu yang terhalang koding |
| 3 | Kenapa kemampuan ini penting (kampus dan pekerjaan) |
| 4 | Apa itu vibe coding |
| 5 | Google Gemini dan fitur Canvas |
| 6 | Kenapa hasilnya satu file `.html` (ada contoh yang bisa diunduh) |
| 7 | Rumus 4 bahan prompt |
| 8 | Simulasi: prompt menjadi aplikasi (3 kalkulator interaktif) |
| 9 | Membangun secara bertahap |
| 10 | CanvasCraft Mini Case Sprint: pilih 1 dari 3 tema |

## Fitur

- Slide selalu berrasio **16:9** dan berada di tengah layar, termasuk di mobile.
- Tombol Sebelumnya dan Selanjutnya tepat di bawah slide.
- Visual 3D (Canvas 2D) yang berubah mengikuti isi tiap slide, bisa digeser dengan kursor.
- Transisi antar slide memakai View Transitions API.
- Mode terang dan gelap, mengikuti sistem atau lewat tombol tema.
- Menghormati `prefers-reduced-motion`, serta mendukung navigasi keyboard dan pembaca layar.

## Kontrol

| Tombol | Aksi |
|--------|------|
| `→` atau `PageDown` | Slide berikutnya |
| `←` atau `PageUp` | Slide sebelumnya |
| `Home` / `End` | Slide pertama / terakhir |
| `1` sampai `9`, `0` | Lompat ke slide 1 sampai 9, dan 10 |

## Menjalankan Lokal

```bash
npm run dev
# atau: python3 -m http.server 4173 -d public
# buka http://localhost:4173
```

## Deploy ke Vercel

```bash
npx vercel --prod
```

`vercel.json` sudah mengarahkan output ke folder `public/`, jadi tidak perlu build command. Folder `docs/` berada di luar `public/` sehingga tidak ikut terdeploy.

## PWA

Setelah dibuka sekali saat online, aplikasi bisa dipasang dan berjalan offline lewat service worker (`public/sw.js`). Naikkan `VERSION` di file itu setiap kali ada perubahan kode.

## Struktur

```
.
├── public/                    # semua yang dideploy
│   ├── index.html             # markup 10 slide
│   ├── sw.js                  # service worker (harus di root scope)
│   ├── manifest.webmanifest
│   └── assets/
│       ├── css/styles.css     # tema, layout 16:9, komponen
│       ├── js/app.js          # navigasi, interaksi, mesin 3D
│       └── icons/             # ikon PWA
├── docs/                      # brief acara (PDF), tidak ikut deploy
├── vercel.json
├── package.json
└── README.md
```

## Catatan

- Font (Plus Jakarta Sans dan Roboto Mono) dimuat dari Google Fonts. Tanpa koneksi, tampilan memakai font cadangan sistem.
- Presentasi ini dibuat dengan bantuan Google Gemini Canvas.

