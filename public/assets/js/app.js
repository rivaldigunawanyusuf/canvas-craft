/**
 * From Prompt to Working Product: Build Daily Solutions with Gemini Canvas
 * Interactive 16:9 Keynote Presentation Deck + 3D Decorative & Conceptual Engine
 */

(() => {
  "use strict";

  const state = {
    currentSlide: 0,
    totalSlides: 10,
    activeBenefitTab: "campus",
    activeCanvasLayer: "chat",
    activeRecipePart: 1,
    activeDemoPreset: "gpa",
    activeIterStep: 1,
    cameraMode: "exploded",
    is3DPaused: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    rotX: -0.46,
    rotY: 0.72,
    targetRotX: -0.46,
    targetRotY: 0.72,
    isDragging3D: false,
    dragStartX: 0,
    dragStartY: 0,
    time: 0,
  };

  /* ==========================================================================
     Slide Metadata & 3D Scene Captions (10 Slides)
     ========================================================================== */

  const SLIDE_META = [
    {
      title: "From Prompt to Working Product",
      sceneTitle: "Visualisasi 3D • Dari Ide ke Produk",
      sceneCaption:
        "Tiga blok 3D melambangkan perjalanan dari instruksi obrolan, ruang kerja Gemini Canvas, hingga menjadi produk siap pakai.",
    },
    {
      title: "Sering Punya Ide Alat Bantu, Tapi Terhalang Koding?",
      sceneTitle: "Visualisasi 3D • Cara Lama vs Cara Baru",
      sceneCaption:
        "Jalur kiri yang bertumpuk rumit dibandingkan dengan jalur kanan yang ringkas menggunakan bantuan AI.",
    },
    {
      title: "Kenapa Kemampuan Ini Penting untuk Semua Orang?",
      sceneTitle: "Visualisasi 3D • Dampak Produktivitas",
      sceneCaption:
        "Klik pilihan Manfaat di Kampus atau Manfaat di Pekerjaan untuk menyorot kubus produktivitas terkait.",
    },
    {
      title: "Apa Itu Vibe Coding dalam Bahasa Sederhana?",
      sceneTitle: "Visualisasi 3D • Alur 3 Langkah Vibe Coding",
      sceneCaption:
        "Alur tiga tahap: Fokus ke masalah, AI merakit logika teknis, dan revisi langsung lewat obrolan.",
    },
    {
      title: "Google Gemini & Fitur Canvas",
      sceneTitle: "Visualisasi 3D • Bedah Layar Gemini Canvas",
      sceneCaption:
        "Klik salah satu bagian layar di sebelah kiri untuk menyorot panel Gemini Canvas yang dimaksud.",
    },
    {
      title: "Kenapa Hasilnya Berupa Satu File .html?",
      sceneTitle: "Visualisasi 3D • Paket Mandiri Satu File .html",
      sceneCaption:
        "Tiga komponen penting (Tampilan, Warna, dan Rumus Hitungan) menyatu rapi di dalam satu kapsul file .html.",
    },
    {
      title: "Rumus 4 Bahan agar Gemini Langsung Paham",
      sceneTitle: "Visualisasi 3D • 4 Balok Penyusun Prompt",
      sceneCaption:
        "Klik Bahan 1 sampai Bahan 4 pada slide untuk menyorot balok penyusun instruksi di panggung 3D.",
    },
    {
      title: "Lihat Bagaimana Prompt Berubah Jadi Aplikasi",
      sceneTitle: "Visualisasi 3D • Simulasi Aplikasi Harian",
      sceneCaption:
        "Pilih contoh produk di kiri dan ubah angkanya untuk merasakan langsung hasil aplikasi dari sebaris prompt.",
    },
    {
      title: "Jangan Minta Sekaligus, Bangun Secara Bertahap",
      sceneTitle: "Visualisasi 3D • Tangga Iterasi 3 Tahap",
      sceneCaption:
        "Klik Tahap 1, Tahap 2, atau Tahap 3 untuk melihat bagaimana produk dibangun bertahap dari pondasi hingga desain.",
    },
    {
      title: "Pilih 1 dari 3 Tema & Bangun Produk Pertamamu!",
      sceneTitle: "Visualisasi 3D • 3 Tema CanvasCraft Sprint",
      sceneCaption:
        "Tiga pilar utama tantangan praktik: Academic & Study, Daily & Finance, serta Collaboration & Career.",
    },
  ];

  /* ==========================================================================
     Slide 7: 4 Recipe Ingredients Data
     ========================================================================== */

  const RECIPE_PARTS = {
    1: {
      label: "Contoh Kalimat Bahan 1 (Tujuan Alat):",
      text: '"Buatkan aplikasi Kalkulator Target IPK Semester untuk membantu mahasiswa merencanakan nilai kuliah."',
    },
    2: {
      label: "Contoh Kalimat Bahan 2 (Kotak Input):",
      text: '"Sediakan kolom input untuk: IPK saat ini, total SKS yang sudah lulus, SKS semester ini, dan target IPK akhir."',
    },
    3: {
      label: "Contoh Kalimat Bahan 3 (Cara Hitung):",
      text: '"Hitung otomatis rata-rata nilai minimum yang wajib dicapai di semester ini beserta indikator status kemungkinannya."',
    },
    4: {
      label: "Contoh Kalimat Bahan 4 (Gaya Tampilan):",
      text: '"Gunakan tampilan bersih ala Google dengan kartu ringkas dan bungkus semuanya dalam 1 file HTML siap pakai."',
    },
  };

  /* ==========================================================================
     Slide 8: Interactive Mini Demo Presets (GPA, Budget, Team)
     ========================================================================== */

  const DEMO_PRESETS = {
    gpa: {
      prompt:
        '"Buatkan Kalkulator Target IPK Semester. Input: IPK sekarang, SKS lulus, SKS semester ini, dan Target IPK. Hitung rata-rata indeks nilai semester ini yang harus dicapai dalam 1 file HTML rapi."',
      defaultValues: {
        currentGpa: 3.35,
        completedCredits: 84,
        currentCredits: 20,
        targetGpa: 3.5,
      },
    },
    budget: {
      prompt:
        '"Buatkan Kalkulator Batas Aman Uang Harian. Input: Sisa anggaran bulanan, target tabungan wajib, dan sisa hari bulan ini. Tampilkan batas aman jajan per hari dalam 1 file HTML."',
      defaultValues: {
        remainingMoney: 1650000,
        savingGoal: 300000,
        daysLeft: 15,
      },
    },
    team: {
      prompt:
        '"Buatkan Pembagi Beban Tugas Kelompok. Input: Total tugas proyek, jumlah anggota tim, dan sisa hari sebelum tenggat. Hitung porsi tugas per anggota dan target selesai per minggu."',
      defaultValues: {
        totalTasks: 18,
        teamMembers: 4,
        daysToDeadline: 14,
      },
    },
  };

  /* ==========================================================================
     Slide 9: 3 Iteration Steps Data
     ========================================================================== */

  const ITERATION_STEPS = {
    1: {
      kicker: "Obrolan Pertama • Fokus Fungsi Dasar",
      heading: "Pastikan 1 Rumus Utama Berjalan Benar Dulu",
      quote:
        '"Buatkan kalkulator batas aman pengeluaran harian dari sisa uang bulanan dibagi sisa hari bulan ini."',
    },
    2: {
      kicker: "Obrolan Kedua • Tambah Fitur Pendukung",
      heading: "Tambahkan Kolom Tabungan & Peringatan Status",
      quote:
        '"Sekarang tambahkan kolom potongan tabungan wajib sebelum dibagi sisa hari, dan beri warna hijau jika aman."',
    },
    3: {
      kicker: "Obrolan Ketiga • Rapikan Desain & Kenyamanan",
      heading: "Perjelas Angka Utama & Buat Nyaman di Layar HP",
      quote:
        '"Perbesar ukuran angka hasil rupiahnya, rapikan jarak antar kotak, dan tambahkan tombol Reset."',
    },
  };

  /* ==========================================================================
     DOM References
     ========================================================================== */

  const mainStageShell = document.getElementById("main-content");
  const slides = Array.from(document.querySelectorAll(".slide"));
  const dotButtons = Array.from(document.querySelectorAll(".dot-btn"));
  const prevBtn = document.getElementById("prev-slide-btn");
  const nextBtn = document.getElementById("next-slide-btn");
  const topCounter = document.getElementById("slide-top-counter");
  const footerCurrentNum = document.getElementById("footer-current-num");
  const liveAnnouncer = document.getElementById("live-announcer");
  const stage3dTitle = document.getElementById("stage-3d-scene-title");
  const stage3dCaption = document.getElementById("stage-3d-caption");
  const pause3DBtn = document.getElementById("pause-3d-btn");
  const pause3DLabel = document.getElementById("pause-3d-label");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const canvas3D = document.getElementById("canvas-3d");
  const ctx3D = canvas3D ? canvas3D.getContext("2d") : null;

  /* ==========================================================================
     Slide Navigation with View Transitions API
     ========================================================================== */

  function formatTwoDigits(num) {
    return String(num).padStart(2, "0");
  }

  function announce(message) {
    if (!liveAnnouncer) return;
    liveAnnouncer.textContent = "";
    window.setTimeout(() => {
      liveAnnouncer.textContent = message;
    }, 30);
  }

  function applySlideDOMUpdate(targetIndex) {
    state.currentSlide = targetIndex;

    slides.forEach((slideEl, idx) => {
      const isCurrent = idx === targetIndex;
      slideEl.classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        slideEl.removeAttribute("hidden");
      } else {
        slideEl.setAttribute("hidden", "");
      }
    });

    dotButtons.forEach((btn, idx) => {
      const isCurrent = idx === targetIndex;
      btn.classList.toggle("is-active", isCurrent);
      if (isCurrent) {
        btn.setAttribute("aria-current", "step");
      } else {
        btn.removeAttribute("aria-current");
      }
    });

    const formattedSlideNum = formatTwoDigits(targetIndex + 1);
    const formattedTotal = formatTwoDigits(state.totalSlides);

    if (topCounter) {
      topCounter.textContent = `SLIDE ${formattedSlideNum} / ${formattedTotal}`;
    }
    if (footerCurrentNum) {
      footerCurrentNum.textContent = formattedSlideNum;
    }

    if (prevBtn) {
      const isFirst = targetIndex === 0;
      prevBtn.setAttribute("aria-disabled", String(isFirst));
    }
    if (nextBtn) {
      const isLast = targetIndex === state.totalSlides - 1;
      nextBtn.setAttribute("aria-disabled", String(isLast));
    }

    const meta = SLIDE_META[targetIndex] || SLIDE_META[0];
    if (stage3dTitle) {
      stage3dTitle.textContent = meta.sceneTitle;
    }
    if (stage3dCaption) {
      stage3dCaption.textContent = meta.sceneCaption;
    }

    // Gently shift 3D angle per slide so the user sees a dynamic 3D transition
    const angleOffsets = [
      [-0.34, 0.56],
      [-0.3, -0.48],
      [-0.38, 0.62],
      [-0.28, 0.44],
      [-0.4, 0.58],
      [-0.32, -0.52],
      [-0.36, 0.5],
      [-0.3, 0.64],
      [-0.35, -0.44],
      [-0.32, 0.54],
    ];
    const [rx, ry] = angleOffsets[targetIndex] || [-0.34, 0.56];
    state.targetRotX = rx;
    state.targetRotY = ry;

    announce(`Slide ${targetIndex + 1} dari ${state.totalSlides}: ${meta.title}`);
  }

  function goToSlide(targetIndex) {
    const clamped = Math.max(0, Math.min(state.totalSlides - 1, targetIndex));
    if (clamped === state.currentSlide) return;

    const direction = clamped > state.currentSlide ? "forward" : "backward";
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (document.startViewTransition && !prefersReduced) {
      try {
        document.startViewTransition({
          update: () => applySlideDOMUpdate(clamped),
          types: [direction],
        });
        return;
      } catch (e) {
        // Fallback for browsers that support startViewTransition(callback) without options object
        document.startViewTransition(() => applySlideDOMUpdate(clamped));
        return;
      }
    }

    applySlideDOMUpdate(clamped);
  }

  function bindNavigationEvents() {
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        if (state.currentSlide > 0) {
          goToSlide(state.currentSlide - 1);
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        if (state.currentSlide < state.totalSlides - 1) {
          goToSlide(state.currentSlide + 1);
        }
      });
    }

    dotButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = Number.parseInt(btn.getAttribute("data-slide-target") || "0", 10);
        if (!Number.isNaN(target)) {
          goToSlide(target);
        }
      });
    });

    window.addEventListener("keydown", (event) => {
      const activeEl = document.activeElement;
      const tag = activeEl ? activeEl.tagName : "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        goToSlide(state.currentSlide + 1);
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        goToSlide(state.currentSlide - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToSlide(state.totalSlides - 1);
      } else if (/^[1-9]$/.test(event.key) && !event.ctrlKey && !event.metaKey && !event.altKey) {
        const idx = Number.parseInt(event.key, 10) - 1;
        if (idx < state.totalSlides) {
          goToSlide(idx);
        }
      } else if (event.key === "0" && !event.ctrlKey && !event.metaKey && !event.altKey) {
        goToSlide(9);
      }
    });
  }

  /* ==========================================================================
     Interactive Slide Controls (Slides 3, 5, 6, 7, 8, 9) & 3D Card Tilt
     ========================================================================== */

  function bindSlideInteractiveControls() {
    // Slide 3: Manfaat di Kampus vs Pekerjaan
    const benefitButtons = Array.from(document.querySelectorAll("[data-benefit-tab]"));
    const campusPanel = document.getElementById("benefit-panel-campus");
    const workPanel = document.getElementById("benefit-panel-work");

    benefitButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.getAttribute("data-benefit-tab") || "campus";
        state.activeBenefitTab = mode;

        benefitButtons.forEach((b) => {
          const isMatch = b.getAttribute("data-benefit-tab") === mode;
          b.classList.toggle("is-active", isMatch);
          b.setAttribute("aria-selected", String(isMatch));
        });

        if (campusPanel && workPanel) {
          if (mode === "campus") {
            campusPanel.removeAttribute("hidden");
            workPanel.setAttribute("hidden", "");
          } else {
            workPanel.removeAttribute("hidden");
            campusPanel.setAttribute("hidden", "");
          }
        }
      });
    });

    // Slide 5: 3 Bagian Layar Gemini Canvas
    const layerButtons = Array.from(document.querySelectorAll("[data-layer-pick]"));
    layerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const layer = btn.getAttribute("data-layer-pick") || "chat";
        state.activeCanvasLayer = layer;

        layerButtons.forEach((b) => {
          const isMatch = b.getAttribute("data-layer-pick") === layer;
          b.classList.toggle("is-active", isMatch);
          b.setAttribute("aria-pressed", String(isMatch));
        });
      });
    });

    // Slide 6: Unduh Contoh File .html Siap Pakai
    const downloadBtn = document.getElementById("download-demo-html-btn");
    const downloadStatus = document.getElementById("download-status-text");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        const sampleHtml = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kalkulator Batas Aman Uang Harian | Hasil Gemini Canvas</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafd; color: #1f1f1f; margin: 0; padding: 32px 16px; display: flex; justify-content: center; }
    .card { max-width: 460px; width: 100%; background: #ffffff; border: 1px solid #c4c7c5; border-radius: 16px; padding: 24px; box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
    .tag { display: inline-block; background: #e8f0fe; color: #0b57d0; font-weight: 700; font-size: 12px; padding: 4px 10px; border-radius: 6px; margin-bottom: 10px; }
    h1 { font-size: 22px; margin: 0 0 8px; }
    p { font-size: 14px; color: #444746; margin: 0 0 18px; }
    label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
    input { width: 100%; box-sizing: border-box; padding: 10px 12px; border: 1px solid #747775; border-radius: 8px; font-size: 15px; margin-bottom: 14px; }
    .result { background: #e6f4ea; color: #137333; padding: 16px; border-radius: 10px; font-weight: 700; font-size: 18px; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <span class="tag">Contoh Output 1 File .html Gemini Canvas</span>
    <h1>Kalkulator Batas Aman Uang Harian</h1>
    <p>Ubah angka di bawah ini untuk melihat batas aman pengeluaran per hari:</p>
    <label for="sisa">Sisa Uang Bulanan (Rp)</label>
    <input id="sisa" type="number" value="1500000" step="50000">
    <label for="tabung">Target Tabungan Wajib (Rp)</label>
    <input id="tabung" type="number" value="300000" step="50000">
    <label for="hari">Sisa Hari Bulan Ini</label>
    <input id="hari" type="number" value="15" min="1" max="31">
    <div class="result" id="out">Batas Aman: Rp 80.000 / hari</div>
  </div>
  <script>
    const sisa = document.getElementById('sisa');
    const tabung = document.getElementById('tabung');
    const hari = document.getElementById('hari');
    const out = document.getElementById('out');
    function hitung() {
      const dana = Math.max(0, (Number(sisa.value) || 0) - (Number(tabung.value) || 0));
      const h = Math.max(1, Number(hari.value) || 1);
      const perHari = Math.floor(dana / h);
      out.textContent = 'Batas Aman: Rp ' + perHari.toLocaleString('id-ID') + ' / hari';
    }
    [sisa, tabung, hari].forEach(el => el.addEventListener('input', hitung));
  </script>
</body>
</html>`;

        const blob = new Blob([sampleHtml], { type: "text/html;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "kalkulator-uang-harian-gemini-canvas.html";
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        if (downloadStatus) {
          downloadStatus.textContent = "File contoh .html berhasil diunduh!";
        }
      });
    }

    // Slide 7: Rumus 4 Bahan Prompt
    const recipeButtons = Array.from(document.querySelectorAll("[data-recipe-part]"));
    const recipeBox = document.getElementById("recipe-example-box");
    const recipeText = document.getElementById("recipe-example-text");

    recipeButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const part = Number.parseInt(btn.getAttribute("data-recipe-part") || "1", 10);
        state.activeRecipePart = part;

        recipeButtons.forEach((b) => {
          const isMatch = Number.parseInt(b.getAttribute("data-recipe-part") || "1", 10) === part;
          b.classList.toggle("is-active", isMatch);
          b.setAttribute("aria-pressed", String(isMatch));
        });

        const data = RECIPE_PARTS[part] || RECIPE_PARTS[1];
        if (recipeBox) {
          const labelSpan = recipeBox.querySelector(".prompt-banner-label");
          if (labelSpan) labelSpan.textContent = data.label;
        }
        if (recipeText) {
          recipeText.textContent = data.text;
        }
      });
    });

    // Slide 8: Interactive Mini Demo Select
    const demoSelect = document.getElementById("quick-demo-select");
    if (demoSelect) {
      demoSelect.addEventListener("change", () => {
        state.activeDemoPreset = demoSelect.value;
        renderMiniDemoWidget(state.activeDemoPreset);
      });
      renderMiniDemoWidget(state.activeDemoPreset);
    }

    // Slide 9: 3 Tahap Iterasi Prompt
    const iterButtons = Array.from(document.querySelectorAll("[data-iter-tab]"));
    const iterKicker = document.getElementById("iter-kicker");
    const iterHeading = document.getElementById("iter-heading");
    const iterQuote = document.getElementById("iter-quote");

    iterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const step = Number.parseInt(btn.getAttribute("data-iter-tab") || "1", 10);
        state.activeIterStep = step;

        iterButtons.forEach((b) => {
          const isMatch = Number.parseInt(b.getAttribute("data-iter-tab") || "1", 10) === step;
          b.classList.toggle("is-active", isMatch);
          b.setAttribute("aria-selected", String(isMatch));
        });

        const stepData = ITERATION_STEPS[step] || ITERATION_STEPS[1];
        if (iterKicker) iterKicker.textContent = stepData.kicker;
        if (iterHeading) iterHeading.textContent = stepData.heading;
        if (iterQuote) iterQuote.textContent = stepData.quote;
      });
    });

    // 3D Tilt effect on .tilt-card elements
    const tiltCards = Array.from(document.querySelectorAll(".tilt-card"));
    tiltCards.forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const rect = card.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return;
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        const tiltX = (-relY * 7).toFixed(2);
        const tiltY = (relX * 7).toFixed(2);
        card.style.setProperty("--tilt-x", `${tiltX}deg`);
        card.style.setProperty("--tilt-y", `${tiltY}deg`);
      });

      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  /* ==========================================================================
     Slide 8: Render Live Mini Calculator Inside Slide
     ========================================================================== */

  function renderMiniDemoWidget(presetKey) {
    const promptDisplay = document.getElementById("demo-prompt-display");
    const appContainer = document.getElementById("demo-app-container");
    const preset = DEMO_PRESETS[presetKey] || DEMO_PRESETS.gpa;

    if (promptDisplay) {
      promptDisplay.textContent = preset.prompt;
    }
    if (!appContainer) return;

    if (presetKey === "gpa") {
      const v = preset.defaultValues;
      appContainer.innerHTML = `
        <span class="side-label">Hasil Aplikasi di Panel Kanan Canvas:</span>
        <div class="mini-calc-row">
          <div>
            <label for="sim-gpa-curr">IPK Saat Ini</label>
            <input id="sim-gpa-curr" type="number" step="0.05" min="0" max="4" value="${v.currentGpa}">
          </div>
          <div>
            <label for="sim-gpa-target">Target IPK Akhir</label>
            <input id="sim-gpa-target" type="number" step="0.05" min="0" max="4" value="${v.targetGpa}">
          </div>
          <div>
            <label for="sim-sks-done">SKS Sudah Lulus</label>
            <input id="sim-sks-done" type="number" step="1" min="1" max="160" value="${v.completedCredits}">
          </div>
          <div>
            <label for="sim-sks-now">SKS Semester Ini</label>
            <input id="sim-sks-now" type="number" step="1" min="1" max="24" value="${v.currentCredits}">
          </div>
        </div>
        <div class="mini-calc-result" id="sim-gpa-output"></div>
      `;

      const currInput = document.getElementById("sim-gpa-curr");
      const targetInput = document.getElementById("sim-gpa-target");
      const doneInput = document.getElementById("sim-sks-done");
      const nowInput = document.getElementById("sim-sks-now");
      const outEl = document.getElementById("sim-gpa-output");

      const updateGpa = () => {
        const curr = Number.parseFloat(currInput.value) || 0;
        const targ = Number.parseFloat(targetInput.value) || 0;
        const done = Math.max(1, Number.parseInt(doneInput.value, 10) || 1);
        const now = Math.max(1, Number.parseInt(nowInput.value, 10) || 1);
        const required = (targ * (done + now) - curr * done) / now;

        if (required > 4.0) {
          outEl.textContent = `Butuh IPS ${required.toFixed(2)} (Melebihi 4.00, sesuaikan target IPK)`;
        } else if (required <= 0) {
          outEl.textContent = "Target IPK sudah tercapai dengan tabungan nilai saat ini!";
        } else {
          outEl.textContent = `Wajib capai IPS minimal ${required.toFixed(2)} di semester ini`;
        }
      };

      [currInput, targetInput, doneInput, nowInput].forEach((el) => {
        if (el) el.addEventListener("input", updateGpa);
      });
      updateGpa();
    } else if (presetKey === "budget") {
      const v = preset.defaultValues;
      appContainer.innerHTML = `
        <span class="side-label">Hasil Aplikasi di Panel Kanan Canvas:</span>
        <div class="mini-calc-row">
          <div>
            <label for="sim-bud-rem">Sisa Uang (Rp)</label>
            <input id="sim-bud-rem" type="number" step="50000" min="0" value="${v.remainingMoney}">
          </div>
          <div>
            <label for="sim-bud-save">Tabungan Wajib (Rp)</label>
            <input id="sim-bud-save" type="number" step="50000" min="0" value="${v.savingGoal}">
          </div>
          <div>
            <label for="sim-bud-days">Sisa Hari Bulan Ini</label>
            <input id="sim-bud-days" type="number" step="1" min="1" max="31" value="${v.daysLeft}">
          </div>
        </div>
        <div class="mini-calc-result" id="sim-bud-output"></div>
      `;

      const remInput = document.getElementById("sim-bud-rem");
      const saveInput = document.getElementById("sim-bud-save");
      const daysInput = document.getElementById("sim-bud-days");
      const outEl = document.getElementById("sim-bud-output");

      const updateBudget = () => {
        const rem = Number.parseFloat(remInput.value) || 0;
        const save = Number.parseFloat(saveInput.value) || 0;
        const days = Math.max(1, Number.parseInt(daysInput.value, 10) || 1);
        const usable = Math.max(0, rem - save);
        const dailySafe = Math.floor(usable / days);
        outEl.textContent = `Batas Aman Harian: Rp ${dailySafe.toLocaleString("id-ID")} / hari`;
      };

      [remInput, saveInput, daysInput].forEach((el) => {
        if (el) el.addEventListener("input", updateBudget);
      });
      updateBudget();
    } else {
      const v = preset.defaultValues;
      appContainer.innerHTML = `
        <span class="side-label">Hasil Aplikasi di Panel Kanan Canvas:</span>
        <div class="mini-calc-row">
          <div>
            <label for="sim-team-tasks">Total Tugas Proyek</label>
            <input id="sim-team-tasks" type="number" step="1" min="1" value="${v.totalTasks}">
          </div>
          <div>
            <label for="sim-team-members">Jumlah Anggota Tim</label>
            <input id="sim-team-members" type="number" step="1" min="1" value="${v.teamMembers}">
          </div>
          <div>
            <label for="sim-team-days">Sisa Hari ke Tenggat</label>
            <input id="sim-team-days" type="number" step="1" min="1" value="${v.daysToDeadline}">
          </div>
        </div>
        <div class="mini-calc-result" id="sim-team-output"></div>
      `;

      const tasksInput = document.getElementById("sim-team-tasks");
      const membersInput = document.getElementById("sim-team-members");
      const daysInput = document.getElementById("sim-team-days");
      const outEl = document.getElementById("sim-team-output");

      const updateTeam = () => {
        const tasks = Math.max(1, Number.parseInt(tasksInput.value, 10) || 1);
        const members = Math.max(1, Number.parseInt(membersInput.value, 10) || 1);
        const days = Math.max(1, Number.parseInt(daysInput.value, 10) || 1);
        const perMember = (tasks / members).toFixed(1);
        const weeks = Math.max(1, days / 7);
        const perWeek = Math.ceil(tasks / weeks);
        outEl.textContent = `Porsi Adil: ${perMember} tugas/orang • Target: ${perWeek} tugas/minggu`;
      };

      [tasksInput, membersInput, daysInput].forEach((el) => {
        if (el) el.addEventListener("input", updateTeam);
      });
      updateTeam();
    }
  }

  /* ==========================================================================
     Theme Toggle (Light / Dark) & 3D Camera / Pause Controls
     ========================================================================== */

  function isDarkActive() {
    const meta = document.querySelector('meta[name="color-scheme"]');
    const content = meta ? meta.content : "light dark";
    if (content === "dark") return true;
    if (content === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function bindUtilityControls() {
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const meta = document.querySelector('meta[name="color-scheme"]');
        if (!meta) return;
        const nextScheme = isDarkActive() ? "light" : "dark";
        meta.content = nextScheme;
        try {
          localStorage.setItem("color-scheme", nextScheme);
        } catch (e) {}
      });
    }

    if (pause3DBtn && pause3DLabel) {
      const syncPauseUI = () => {
        pause3DLabel.textContent = state.is3DPaused ? "Putar 3D" : "Jeda 3D";
        pause3DBtn.setAttribute(
          "aria-label",
          state.is3DPaused ? "Putar animasi 3D" : "Jeda animasi 3D"
        );
      };
      syncPauseUI();

      pause3DBtn.addEventListener("click", () => {
        state.is3DPaused = !state.is3DPaused;
        syncPauseUI();
      });
    }

    if (canvas3D) {
      canvas3D.addEventListener("pointerdown", (e) => {
        state.isDragging3D = true;
        state.dragStartX = e.clientX;
        state.dragStartY = e.clientY;
        canvas3D.setPointerCapture(e.pointerId);
      });

      canvas3D.addEventListener("pointermove", (e) => {
        if (!state.isDragging3D) return;
        const dx = e.clientX - state.dragStartX;
        const dy = e.clientY - state.dragStartY;
        state.dragStartX = e.clientX;
        state.dragStartY = e.clientY;

        state.targetRotY += dx * 0.008;
        state.targetRotX = Math.max(-1.05, Math.min(0.45, state.targetRotX + dy * 0.008));
      });

      const stopDrag = () => {
        state.isDragging3D = false;
      };
      canvas3D.addEventListener("pointerup", stopDrag);
      canvas3D.addEventListener("pointercancel", stopDrag);
    }
  }

  /* ==========================================================================
     Consistent 16:9 Stage Scaling & High-DPI 3D Canvas Sizing
     ========================================================================== */

  function resizeStageAnd3DCanvas() {
    if (mainStageShell) {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const isCompact = vw <= 768 || vh <= 560;
      const bar = document.querySelector(".deck-bottom-bar");
      const barH = bar ? bar.offsetHeight : 56;
      const gap = isCompact ? 8 : 14;
      const padX = isCompact ? 16 : 48;
      const padY = isCompact ? 16 : 32;
      const bottomBarAndGap = barH + gap;

      const availW = Math.max(260, vw - padX);
      const availH = Math.max(160, vh - padY - bottomBarAndGap);

      let frameW = availW;
      let frameH = (frameW * 9) / 16;

      if (frameH > availH) {
        frameH = availH;
        frameW = (frameH * 16) / 9;
      }

      const scale = frameW / 1600;
      mainStageShell.style.setProperty("--frame-w", `${frameW.toFixed(2)}px`);
      mainStageShell.style.setProperty("--frame-h", `${frameH.toFixed(2)}px`);
      mainStageShell.style.setProperty("--slide-scale", scale.toFixed(5));
    }

    if (canvas3D && ctx3D) {
      // Logical resolution inside the 1600x900 slide canvas
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const logicalW = 540;
      const logicalH = 520;
      if (canvas3D.width !== logicalW * dpr || canvas3D.height !== logicalH * dpr) {
        canvas3D.width = logicalW * dpr;
        canvas3D.height = logicalH * dpr;
      }
    }
  }

  /* ==========================================================================
     3D Geometric & Conceptual Scene Engine (10 Slide Scenes)
     ========================================================================== */

  function project3D(x, y, z, cx, cy, fov) {
    const cosY = Math.cos(state.rotY);
    const sinY = Math.sin(state.rotY);
    const cosX = Math.cos(state.rotX);
    const sinX = Math.sin(state.rotX);

    // Rotate around Y axis
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    // Rotate around X axis
    const y2 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    const cameraDist = 660;
    const scale = fov / Math.max(160, cameraDist + z2);

    return {
      x: cx + x1 * scale,
      y: cy + y2 * scale,
      z: z2,
      scale,
    };
  }

  function shadeHexColor(hex, percent) {
    const clean = hex.replace("#", "");
    const num = Number.parseInt(clean, 16);
    const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + percent));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + percent));
    const b = Math.min(255, Math.max(0, (num & 0xff) + percent));
    return `rgb(${r}, ${g}, ${b})`;
  }

  function draw3DCuboid(ctx, box, cx, cy, fov) {
    const hw = box.w / 2;
    const hh = box.h / 2;
    const hd = box.d / 2;
    const bx = box.x;
    const by = box.y;
    const bz = box.z;

    const vertices = [
      { x: bx - hw, y: by - hh, z: bz - hd }, // 0: top-left-front
      { x: bx + hw, y: by - hh, z: bz - hd }, // 1: top-right-front
      { x: bx + hw, y: by + hh, z: bz - hd }, // 2: bottom-right-front
      { x: bx - hw, y: by + hh, z: bz - hd }, // 3: bottom-left-front
      { x: bx - hw, y: by - hh, z: bz + hd }, // 4: top-left-back
      { x: bx + hw, y: by - hh, z: bz + hd }, // 5: top-right-back
      { x: bx + hw, y: by + hh, z: bz + hd }, // 6: bottom-right-back
      { x: bx - hw, y: by + hh, z: bz + hd }, // 7: bottom-left-back
    ].map((v) => project3D(v.x, v.y, v.z, cx, cy, fov));

    const faces = [
      { idx: [0, 1, 2, 3], shade: 0, isFront: true },   // Front
      { idx: [4, 5, 6, 7], shade: -28, isFront: false }, // Back
      { idx: [0, 4, 7, 3], shade: -18, isFront: false }, // Left
      { idx: [1, 5, 6, 2], shade: 14, isFront: false },  // Right
      { idx: [0, 1, 5, 4], shade: 26, isFront: false },  // Top
      { idx: [3, 2, 6, 7], shade: -34, isFront: false }, // Bottom
    ];

    faces.forEach((f) => {
      f.avgZ =
        f.idx.reduce((acc, i) => acc + vertices[i].z, 0) / f.idx.length;
    });

    // Painter's algorithm: back to front
    faces.sort((a, b) => b.avgZ - a.avgZ);

    faces.forEach((f) => {
      ctx.beginPath();
      f.idx.forEach((vi, i) => {
        const pt = vertices[vi];
        if (i === 0) ctx.moveTo(pt.x, pt.y);
        else ctx.lineTo(pt.x, pt.y);
      });
      ctx.closePath();

      ctx.fillStyle = shadeHexColor(box.color, f.shade);
      ctx.fill();

      ctx.lineWidth = box.highlight ? 2.4 : 1.2;
      ctx.strokeStyle = box.highlight
        ? "#ffffff"
        : "rgba(255, 255, 255, 0.28)";
      ctx.stroke();
    });

    // Label badge anchored at center of the cuboid
    if (box.label) {
      const centerPt = project3D(bx, by, bz - hd - 8, cx, cy, fov);
      ctx.save();
      ctx.font = `700 ${Math.round(13 * centerPt.scale)}px "Plus Jakarta Sans", sans-serif`;
      const textMetrics = ctx.measureText(box.label);
      const padX = 10 * centerPt.scale;
      const pillW = textMetrics.width + padX * 2;
      const pillH = 24 * centerPt.scale;

      ctx.fillStyle = box.highlight ? "#ffffff" : "rgba(19, 19, 20, 0.84)";
      ctx.beginPath();
      ctx.roundRect(
        centerPt.x - pillW / 2,
        centerPt.y - pillH / 2,
        pillW,
        pillH,
        6 * centerPt.scale
      );
      ctx.fill();

      ctx.fillStyle = box.highlight ? "#0b57d0" : "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(box.label, centerPt.x, centerPt.y);
      ctx.restore();
    }
  }

  function buildSceneBoxesForSlide(slideIndex, spread, floatY) {
    const BLUE = "#1a73e8";
    const GREEN = "#1e8e3e";
    const AMBER = "#f9ab00";
    const RED = "#d93025";
    const SLATE = "#5f6368";

    switch (slideIndex) {
      case 0: // Slide 1: Cover - Prompt -> Gemini Canvas -> Produk
        return [
          {
            x: -125 * spread,
            y: -40 + floatY,
            z: 30 * spread,
            w: 115,
            h: 82,
            d: 44,
            color: BLUE,
            label: "1. Prompt Chat",
            highlight: true,
          },
          {
            x: 0,
            y: 5 - floatY * 0.7,
            z: 0,
            w: 138,
            h: 98,
            d: 52,
            color: AMBER,
            label: "2. Gemini Canvas",
            highlight: false,
          },
          {
            x: 125 * spread,
            y: 45 + floatY,
            z: -35 * spread,
            w: 120,
            h: 86,
            d: 46,
            color: GREEN,
            label: "3. Produk .html",
            highlight: true,
          },
        ];

      case 1: // Slide 2: Cara Lama vs Cara Baru
        return [
          {
            x: -115 * spread,
            y: -55 + floatY * 0.5,
            z: 20,
            w: 110,
            h: 52,
            d: 45,
            color: SLATE,
            label: "Belajar Sintaks",
          },
          {
            x: -115 * spread,
            y: 10 + floatY * 0.5,
            z: 20,
            w: 110,
            h: 52,
            d: 45,
            color: SLATE,
            label: "Setup Rumit",
          },
          {
            x: -115 * spread,
            y: 75 + floatY * 0.5,
            z: 20,
            w: 110,
            h: 52,
            d: 45,
            color: RED,
            label: "Cara Lama",
          },
          {
            x: 105 * spread,
            y: 10 - floatY,
            z: -20,
            w: 145,
            h: 135,
            d: 58,
            color: BLUE,
            label: "Cara Baru: Gemini",
            highlight: true,
          },
        ];

      case 2: { // Slide 3: Manfaat di Kampus vs Pekerjaan
        const isCampus = state.activeBenefitTab === "campus";
        return [
          {
            x: -110 * spread,
            y: -20 + floatY,
            z: isCampus ? -25 : 25,
            w: 132,
            h: 110,
            d: 52,
            color: isCampus ? BLUE : SLATE,
            label: "Manfaat Kampus",
            highlight: isCampus,
          },
          {
            x: 110 * spread,
            y: 20 - floatY,
            z: isCampus ? 25 : -25,
            w: 132,
            h: 110,
            d: 52,
            color: !isCampus ? GREEN : SLATE,
            label: "Manfaat Kerja",
            highlight: !isCampus,
          },
        ];
      }

      case 3: // Slide 4: 3 Langkah Vibe Coding
        return [
          {
            x: -130 * spread,
            y: 45 + floatY,
            z: 30,
            w: 105,
            h: 78,
            d: 44,
            color: BLUE,
            label: "1. Fokus Masalah",
          },
          {
            x: 0,
            y: 0 - floatY,
            z: 0,
            w: 115,
            h: 95,
            d: 48,
            color: AMBER,
            label: "2. AI Merakit",
            highlight: true,
          },
          {
            x: 130 * spread,
            y: -45 + floatY,
            z: -30,
            w: 115,
            h: 112,
            d: 52,
            color: GREEN,
            label: "3. Revisi Chat",
          },
        ];

      case 4: { // Slide 5: 3 Lapisan Layar Gemini Canvas
        const active = state.activeCanvasLayer;
        return [
          {
            x: -115 * spread,
            y: 0 + floatY,
            z: 45 * spread,
            w: 120,
            h: 150,
            d: 32,
            color: BLUE,
            label: "1. Panel Obrolan",
            highlight: active === "chat",
          },
          {
            x: 0,
            y: -10 - floatY,
            z: 0,
            w: 128,
            h: 156,
            d: 32,
            color: AMBER,
            label: "2. Kode Otomatis",
            highlight: active === "code",
          },
          {
            x: 115 * spread,
            y: 0 + floatY,
            z: -45 * spread,
            w: 134,
            h: 162,
            d: 36,
            color: GREEN,
            label: "3. Live Preview",
            highlight: active === "preview",
          },
        ];
      }

      case 5: // Slide 6: Satu File .html Mandiri
        return [
          {
            x: 0,
            y: -68 * spread + floatY,
            z: 0,
            w: 155,
            h: 48,
            d: 68,
            color: BLUE,
            label: "Struktur HTML",
          },
          {
            x: 0,
            y: 0,
            z: 0,
            w: 165,
            h: 54,
            d: 74,
            color: AMBER,
            label: "Desain & Warna CSS",
            highlight: true,
          },
          {
            x: 0,
            y: 68 * spread - floatY,
            z: 0,
            w: 155,
            h: 48,
            d: 68,
            color: GREEN,
            label: "Rumus Hitung JS",
          },
        ];

      case 6: { // Slide 7: Rumus 4 Bahan Prompt
        const p = state.activeRecipePart;
        return [
          {
            x: -95 * spread,
            y: -55 * spread + floatY,
            z: 20,
            w: 112,
            h: 72,
            d: 42,
            color: BLUE,
            label: "1. Tujuan Alat",
            highlight: p === 1,
          },
          {
            x: 95 * spread,
            y: -55 * spread - floatY,
            z: 20,
            w: 112,
            h: 72,
            d: 42,
            color: AMBER,
            label: "2. Kotak Input",
            highlight: p === 2,
          },
          {
            x: -95 * spread,
            y: 55 * spread - floatY,
            z: -20,
            w: 112,
            h: 72,
            d: 42,
            color: GREEN,
            label: "3. Cara Hitung",
            highlight: p === 3,
          },
          {
            x: 95 * spread,
            y: 55 * spread + floatY,
            z: -20,
            w: 112,
            h: 72,
            d: 42,
            color: RED,
            label: "4. Gaya Tampilan",
            highlight: p === 4,
          },
        ];
      }

      case 7: { // Slide 8: Simulasi Prompt ke Aplikasi
        const presetLabel =
          state.activeDemoPreset === "gpa"
            ? "Kalkulator IPK"
            : state.activeDemoPreset === "budget"
            ? "Uang Harian"
            : "Pembagi Tugas";
        return [
          {
            x: -115 * spread,
            y: -15 + floatY,
            z: 30,
            w: 118,
            h: 105,
            d: 44,
            color: BLUE,
            label: "Instruksi Teks",
          },
          {
            x: 95 * spread,
            y: 10 - floatY,
            z: -25,
            w: 152,
            h: 138,
            d: 54,
            color: GREEN,
            label: presetLabel,
            highlight: true,
          },
        ];
      }

      case 8: { // Slide 9: 3 Tahap Iterasi Bertahap
        const step = state.activeIterStep;
        return [
          {
            x: -125 * spread,
            y: 55 + floatY,
            z: 35,
            w: 105,
            h: 70,
            d: 48,
            color: BLUE,
            label: "Tahap 1: Pondasi",
            highlight: step === 1,
          },
          {
            x: 0,
            y: 5 - floatY,
            z: 0,
            w: 115,
            h: 105,
            d: 52,
            color: AMBER,
            label: "Tahap 2: Fitur",
            highlight: step === 2,
          },
          {
            x: 125 * spread,
            y: -40 + floatY,
            z: -35,
            w: 122,
            h: 140,
            d: 56,
            color: GREEN,
            label: "Tahap 3: Desain",
            highlight: step === 3,
          },
        ];
      }

      case 9: // Slide 10: 3 Tema CanvasCraft Mini Case Sprint
      default:
        return [
          {
            x: -130 * spread,
            y: 15 + floatY,
            z: 25,
            w: 112,
            h: 128,
            d: 48,
            color: BLUE,
            label: "Academic & Study",
          },
          {
            x: 0,
            y: -20 - floatY,
            z: -10,
            w: 118,
            h: 142,
            d: 52,
            color: GREEN,
            label: "Daily & Finance",
            highlight: true,
          },
          {
            x: 130 * spread,
            y: 15 + floatY,
            z: 25,
            w: 112,
            h: 128,
            d: 48,
            color: AMBER,
            label: "Collab & Career",
          },
        ];
    }
  }

  function drawDecorative3DOrbits(ctx, cx, cy, fov, dark) {
    // Subtle perspective grid ring + 4 Google-colored floating 3D satellites
    const ringRadius = 210;
    const segments = 36;
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const rx = Math.cos(angle) * ringRadius;
      const rz = Math.sin(angle) * ringRadius;
      const pt = project3D(rx, 115, rz, cx, cy, fov);
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    }
    ctx.strokeStyle = dark
      ? "rgba(168, 199, 250, 0.22)"
      : "rgba(11, 87, 208, 0.18)";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    const satellites = [
      { color: "#4285f4", phase: 0, yOff: -125 },
      { color: "#ea4335", phase: Math.PI * 0.5, yOff: 105 },
      { color: "#fbbc04", phase: Math.PI, yOff: -110 },
      { color: "#34a853", phase: Math.PI * 1.5, yOff: 115 },
    ];

    satellites.forEach((sat, idx) => {
      const theta = state.time * 0.7 + sat.phase + state.currentSlide * 0.4;
      const sx = Math.cos(theta) * 195;
      const sz = Math.sin(theta) * 165;
      const sy = sat.yOff + Math.sin(state.time * 1.4 + idx) * 10;
      const p = project3D(sx, sy, sz, cx, cy, fov);

      const r = Math.max(4, 8.5 * p.scale);
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fillStyle = sat.color;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#ffffff";
      ctx.stroke();
    });

    ctx.restore();
  }

  function render3DSceneLoop() {
    if (!canvas3D || !ctx3D) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas3D.width / dpr;
    const h = canvas3D.height / dpr;

    ctx3D.save();
    ctx3D.scale(dpr, dpr);
    ctx3D.clearRect(0, 0, w, h);

    const dark = isDarkActive();

    // Smoothly interpolate camera rotation
    if (!state.is3DPaused) {
      state.time += 0.018;
      if (!state.isDragging3D) {
        state.targetRotY += 0.0022;
      }
    }
    state.rotX += (state.targetRotX - state.rotX) * 0.1;
    state.rotY += (state.targetRotY - state.rotY) * 0.1;

    const cx = w * 0.5;
    const cy = h * 0.52;
    const fov = 540;

    // Subtle radial glow behind 3D stage
    const grad = ctx3D.createRadialGradient(cx, cy, 15, cx, cy, w * 0.55);
    if (dark) {
      grad.addColorStop(0, "rgba(8, 66, 160, 0.28)");
      grad.addColorStop(1, "rgba(19, 19, 20, 0)");
    } else {
      grad.addColorStop(0, "rgba(11, 87, 208, 0.12)");
      grad.addColorStop(1, "rgba(255, 255, 255, 0)");
    }
    ctx3D.fillStyle = grad;
    ctx3D.fillRect(0, 0, w, h);

    // Draw decorative 3D orbit ring & Google-colored nodes
    drawDecorative3DOrbits(ctx3D, cx, cy, fov, dark);

    const spread = state.cameraMode === "exploded" ? 1.32 : 1.0;
    const floatY = state.is3DPaused ? 0 : Math.sin(state.time * 1.7) * 6;

    const boxes = buildSceneBoxesForSlide(state.currentSlide, spread, floatY);

    // Draw connecting energy line between boxes
    if (boxes.length > 1) {
      ctx3D.save();
      ctx3D.beginPath();
      boxes.forEach((b, i) => {
        const pt = project3D(b.x, b.y, b.z, cx, cy, fov);
        if (i === 0) ctx3D.moveTo(pt.x, pt.y);
        else ctx3D.lineTo(pt.x, pt.y);
      });
      ctx3D.strokeStyle = dark ? "#a8c7fa" : "#0b57d0";
      ctx3D.lineWidth = 2.2;
      ctx3D.setLineDash([6, 5]);
      ctx3D.stroke();
      ctx3D.restore();
    }

    // Sort cuboids back-to-front by their projected Z center
    const sortedBoxes = boxes
      .map((b) => ({
        box: b,
        proj: project3D(b.x, b.y, b.z, cx, cy, fov),
      }))
      .sort((a, b) => b.proj.z - a.proj.z);

    sortedBoxes.forEach((item) => {
      draw3DCuboid(ctx3D, item.box, cx, cy, fov);
    });

    ctx3D.restore();
    window.requestAnimationFrame(render3DSceneLoop);
  }

  /* ==========================================================================
     Initialize Presentation Deck
     ========================================================================== */

  function init() {
    resizeStageAnd3DCanvas();
    window.addEventListener("resize", resizeStageAnd3DCanvas);

    bindNavigationEvents();
    bindSlideInteractiveControls();
    bindUtilityControls();
    applySlideDOMUpdate(0);

    window.requestAnimationFrame(render3DSceneLoop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
