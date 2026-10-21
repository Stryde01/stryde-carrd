(() => {
  const translations = {
    en: {
      pageTitle: "STRYDE — Portfolio",
      pageDescription: "Voxel model artist portfolio — custom creatures, weapons, props, and environment assets for games and mods.",
      backToTop: "Back to top",
      switchLanguage: "Switch language to Chinese",
      introAria: "Introduction",
      introEyebrow: "INDEPENDENT VOXEL ARTIST",
      heroTitle: "Models for<br><em>your game.</em>",
      introDescription: "I make custom voxel models for games and mods — creatures, weapons, props, and environment assets, built to match your project's style.",
      exploreWork: "VIEW WORK",
      scrollToEnter: "SCROLL DOWN",
      skinFrameAria: "Your portrait image slot",
      skinPlaceholder: "YOUR PORTRAIT",
      skinPath: "ADD assets/portrait/photo.webp",
      introLabel: "INTRODUCTION",
      galleryAria: "Portfolio gallery",
      selectedWork: "SELECTED WORK",
      galleryTitle: "Recent <em>work.</em>",
      scrollToMove: "SCROLL TO BROWSE",
      swipeToExplore: "SWIPE TO BROWSE",
      galleryWindowAria: "Portfolio items. Use left and right arrow keys to navigate.",
      addYourModel: "ADD YOUR MODEL",
      modelSlot: "3D MODEL SLOT",
      discordLink: "DISCORD · stryde001",
      discordLinkAria: "Open stryde001 on Discord",
      viewLarger: "View larger",
      lightboxLabel: "Work preview",
      lightboxAlt: "Portfolio work",
      closeLightbox: "Close",
      galleryFooter: "MODELS · PROPS · GAME ASSETS",
      scrollLabel: "SCROLL",
      mobileFooter: "STRYDE · VOXEL MODEL ARTIST"
    },
    zh: {
      pageTitle: "STRYDE — 作品集",
      pageDescription: "体素模型师作品集：为游戏与模组制作角色、武器、道具与场景模型。",
      backToTop: "返回顶部",
      switchLanguage: "切换为英文",
      introAria: "个人介绍",
      introEyebrow: "独立体素美术创作者",
      heroTitle: "为你的游戏<br><em>制作模型。</em>",
      introDescription: "我为游戏与模组制作体素模型：角色、武器、道具与场景资产，风格可按你的项目定制。",
      exploreWork: "查看作品",
      scrollToEnter: "向下滚动",
      skinFrameAria: "你的照片区域",
      skinPlaceholder: "你的照片",
      skinPath: "添加图片：assets/portrait/photo.webp",
      introLabel: "个人介绍",
      galleryAria: "作品集画廊",
      selectedWork: "精选作品",
      galleryTitle: "近期<em>作品。</em>",
      scrollToMove: "滚动浏览",
      swipeToExplore: "左右滑动",
      galleryWindowAria: "作品列表。使用键盘左右方向键切换作品。",
      addYourModel: "添加你的模型",
      modelSlot: "3D 模型展示位",
      discordLink: "DISCORD · stryde001",
      discordLinkAria: "在 Discord 上打开 stryde001",
      viewLarger: "查看大图",
      lightboxLabel: "作品预览",
      lightboxAlt: "作品图片",
      closeLightbox: "关闭",
      galleryFooter: "模型 · 道具 · 游戏资产",
      scrollLabel: "滚动",
      mobileFooter: "STRYDE · 体素模型师"
    }
  };

  const languageButton = document.querySelector("#language-toggle");
  const storageKey = "portfolio-language";

  function getPreferredLanguage() {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved === "en" || saved === "zh") return saved;
    } catch (_) {}
    const languages = Array.isArray(navigator.languages) ? navigator.languages : [navigator.language || "en"];
    return languages.some((language) => /^zh(?:-|$)/i.test(language)) ? "zh" : "en";
  }

  function applyLanguage(language, persistChoice = false) {
    const lang = language === "zh" ? "zh" : "en";
    const dictionary = translations[lang];
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    document.title = dictionary.pageTitle;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (dictionary[key] !== undefined) element.textContent = dictionary[key];
    });
    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const key = element.dataset.i18nHtml;
      if (dictionary[key] !== undefined) element.innerHTML = dictionary[key];
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
      const key = element.dataset.i18nAria;
      if (dictionary[key] !== undefined) element.setAttribute("aria-label", dictionary[key]);
    });
    document.querySelectorAll("[data-i18n-meta]").forEach((element) => {
      const key = element.dataset.i18nMeta;
      if (dictionary[key] !== undefined) element.setAttribute("content", dictionary[key]);
    });

    if (languageButton) {
      languageButton.textContent = lang === "zh" ? "EN" : "中文";
      languageButton.setAttribute("aria-label", dictionary.switchLanguage);
      languageButton.setAttribute("lang", lang === "zh" ? "en" : "zh-CN");
      languageButton.title = dictionary.switchLanguage;
    }

    if (lightboxModel) lightboxModel.setAttribute("alt", dictionary.lightboxAlt);
    document.querySelectorAll(".work-model").forEach((model) => model.setAttribute("alt", dictionary.lightboxAlt));

    if (persistChoice) { try { window.localStorage.setItem(storageKey, lang); } catch (_) {} }
  }


  const body = document.body;
  const stage = document.querySelector(".experience");
  const scrollSpace = document.querySelector(".scroll-space");
  const intro = document.querySelector(".intro");
  const gallery = document.querySelector(".gallery");
  const track = document.querySelector("#gallery-track");
  const works = Array.isArray(window.PORTFOLIO_WORKS) && window.PORTFOLIO_WORKS.length
    ? window.PORTFOLIO_WORKS
    : [{ accent: "#8c69c7" }, { accent: "#5d8e83" }, { accent: "#ba8a54" }, { accent: "#6582a7" }];

  works.forEach((work) => {
    const article = document.createElement("article");
    article.className = "work-slide";
    article.dataset.accent = work.accent || "#8c69c7";
    if (work.model) article.dataset.model = work.model;
    if (work.poster) article.dataset.image = work.poster;
    if (work.background) article.dataset.background = work.background;
    article.innerHTML = `
      <div class="work-media">
        <model-viewer class="work-model" alt="" camera-controls auto-rotate auto-rotate-delay="1200" rotation-per-second="12deg" camera-orbit="30deg 68deg 95%" tone-mapping="aces" exposure="0.65" shadow-intensity="1" shadow-softness="0.9" loading="lazy" reveal="auto"></model-viewer>
        <div class="empty-media"><span class="empty-cross" aria-hidden="true">+</span><span data-i18n="addYourModel">ADD YOUR MODEL</span><small data-i18n="modelSlot">3D MODEL SLOT</small></div>
        <button class="media-expand" type="button" aria-label="View larger" data-i18n-aria="viewLarger"><span aria-hidden="true">↗</span></button>
      </div>`;
    track.append(article);
  });

  const galleryWindow = document.querySelector("#gallery-window");
  const slides = [...document.querySelectorAll(".work-slide")];
  const currentIndex = document.querySelector("#current-index");
  const totalIndex = document.querySelector("#total-index");
  const exploreLink = document.querySelector("#explore-link");
  const lightbox = document.querySelector("#lightbox");
  const lightboxModel = document.querySelector("#lightbox-model");
  const lightboxClose = document.querySelector("#lightbox-close");
  const mediaQuery = window.matchMedia("(max-width: 720px)");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const particleCanvas = document.querySelector("#particles");
  const particleCtx = particleCanvas ? particleCanvas.getContext("2d") : null;

  let isMobile = mediaQuery.matches;
  let isReduced = reducedMotion.matches;
  let lastActive = -1;
  let particleAccent = "#8c69c7";
  let particles = [];
  let particleWidth = 0;
  let particleHeight = 0;
  let particleRaf = 0;
  let particlesRunning = false;
  let lastLightboxTrigger = null;

  totalIndex.textContent = String(slides.length).padStart(2, "0");
  applyLanguage(getPreferredLanguage());
  if (languageButton) languageButton.addEventListener("click", () => applyLanguage(document.documentElement.lang === "zh-CN" ? "en" : "zh", true));

  function clamp(value, min = 0, max = 1) { return Math.min(max, Math.max(min, value)); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function smooth(t) { return t * t * (3 - 2 * t); }

  function setActiveSlide(index) {
    index = clamp(index, 0, slides.length - 1);
    if (index === lastActive) return;
    lastActive = index;
    const slide = slides[index];
    const accent = slide.dataset.accent || "#8c69c7";
    stage.style.setProperty("--accent", accent);
    particleAccent = accent;
    currentIndex.textContent = String(index + 1).padStart(2, "0");

    const image = slide.dataset.background;
    stage.style.setProperty("--active-image", image ? `url("${image}")` : "none");
  }

  function makeParticle(y) {
    const size = 1.2 + Math.random() * 2.6;
    return {
      x: Math.random() * particleWidth,
      y,
      size,
      speed: 0.08 + Math.random() * 0.3,
      drift: (Math.random() - 0.5) * 0.22,
      alpha: 0.14 + Math.random() * 0.46,
      phase: Math.random() * Math.PI * 2,
      color: Math.floor(Math.random() * 3),
      round: Math.random() < 0.3
    };
  }

  function resizeParticles() {
    if (!particleCanvas || !particleCtx) return;
    const rect = particleCanvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    particleWidth = Math.max(1, rect.width);
    particleHeight = Math.max(1, rect.height);
    particleCanvas.width = Math.round(particleWidth * dpr);
    particleCanvas.height = Math.round(particleHeight * dpr);
    particleCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(70, Math.max(20, Math.round((particleWidth * particleHeight) / 32000)));
    particles = Array.from({ length: count }, () => makeParticle(Math.random() * particleHeight));
  }

  function drawParticles(time) {
    if (!particlesRunning || !particleCtx) return;
    particleCtx.clearRect(0, 0, particleWidth, particleHeight);
    const palette = ["#ecebe4", particleAccent, "#aab69b"];
    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += p.drift + Math.sin(time / 2000 + p.phase) * 0.06;
      if (p.y < -10) Object.assign(p, makeParticle(particleHeight + Math.random() * 50));
      if (p.x < -10) p.x = particleWidth + 10;
      if (p.x > particleWidth + 10) p.x = -10;
      const twinkle = 0.55 + Math.sin(time / 1100 + p.phase) * 0.45;
      particleCtx.globalAlpha = Math.max(0, Math.min(1, p.alpha * twinkle));
      particleCtx.fillStyle = palette[p.color];
      if (p.round) {
        particleCtx.beginPath();
        particleCtx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
        particleCtx.fill();
      } else if (particleCtx.roundRect) {
        particleCtx.beginPath();
        particleCtx.roundRect(p.x, p.y, p.size, p.size, 1);
        particleCtx.fill();
      } else {
        particleCtx.fillRect(p.x, p.y, p.size, p.size);
      }
    });
    particleCtx.globalAlpha = 1;
    particleRaf = requestAnimationFrame(drawParticles);
  }

  function startParticles() {
    if (!particleCtx || particlesRunning || isReduced || document.hidden) return;
    particlesRunning = true;
    particleRaf = requestAnimationFrame(drawParticles);
  }

  function stopParticles() {
    particlesRunning = false;
    if (particleRaf) cancelAnimationFrame(particleRaf);
    particleRaf = 0;
    if (particleCtx) particleCtx.clearRect(0, 0, particleWidth, particleHeight);
  }

  function setIntroImage() {    const frame = document.querySelector("#skin-frame");
    const imagePath = frame.dataset.image;
    if (!imagePath) return;
    frame.style.backgroundImage = `url("${imagePath}")`;
    frame.style.backgroundPosition = "center";
    frame.style.backgroundSize = "cover";
    const empty = frame.querySelector(".empty-media");
    if (empty) empty.remove();
  }

  function setWorkModels() {
    slides.forEach((slide) => {
      const media = slide.querySelector(".work-media");
      const model = media.querySelector(".work-model");
      const modelPath = slide.dataset.model;
      const posterPath = slide.dataset.image;
      const backgroundPath = slide.dataset.background || posterPath;
      if (model && posterPath) model.setAttribute("poster", posterPath);
      if (model && modelPath) {
        model.setAttribute("src", modelPath);
        model.setAttribute("environment-image", "vendor/environments/moon_1k.hdr");
        slide.classList.add("has-model");
        const empty = media.querySelector(".empty-media");
        if (empty) empty.remove();
      }
      if (backgroundPath) slide.dataset.background = backgroundPath;
    });
  }

  function openLightbox(slide) {
    const modelPath = slide && slide.dataset.model;
    if (!modelPath || !lightbox || !lightboxModel) return;
    lastLightboxTrigger = document.activeElement;
    if (slide.dataset.image) lightboxModel.setAttribute("poster", slide.dataset.image);
    lightboxModel.setAttribute("environment-image", "vendor/environments/moon_1k.hdr");
    lightboxModel.setAttribute("src", modelPath);
    lightbox.hidden = false;
    document.documentElement.classList.add("lightbox-open");
    if (lightboxClose) lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || lightbox.hidden) return;
    lightbox.hidden = true;
    document.documentElement.classList.remove("lightbox-open");
    if (lightboxModel) {
      lightboxModel.removeAttribute("src");
      lightboxModel.removeAttribute("poster");
    }
    if (lastLightboxTrigger && typeof lastLightboxTrigger.focus === "function") lastLightboxTrigger.focus();
    lastLightboxTrigger = null;
  }

  function mobileMode() {    isMobile = mediaQuery.matches;
    isReduced = reducedMotion.matches;
    resizeParticles();
    if (isReduced) stopParticles();
    else startParticles();
    if (isMobile || isReduced) {
      body.classList.add("static-layout");
      intro.style.removeProperty("transform");
      intro.style.removeProperty("opacity");
      gallery.style.removeProperty("transform");
      gallery.style.removeProperty("opacity");
      track.style.removeProperty("transform");
      if (isMobile) scrollSpace.style.display = "none";
      else scrollSpace.style.display = "block";
      return;
    }
    body.classList.remove("static-layout");
    scrollSpace.style.display = "block";
    update();
  }

  function update() {
    if (isMobile || isReduced) return;

    const maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = clamp(window.scrollY / maxY);

    // Phase 1: the intro and portrait shrink/fade away.
    const introT = smooth(clamp(progress / 0.30));
    intro.style.transform = `translate3d(0, ${-36 * introT}px, 0) scale(${1 - 0.105 * introT})`;
    intro.style.opacity = String(1 - introT);
    intro.style.pointerEvents = introT > 0.92 ? "none" : "auto";

    // Phase 2: the portfolio gallery rises from the bottom.
    const revealT = smooth(clamp((progress - 0.13) / 0.27));
    gallery.style.transform = `translate3d(0, ${(1 - revealT) * 105}%, 0)`;
    gallery.style.opacity = String(revealT);
    gallery.style.pointerEvents = revealT > 0.92 ? "auto" : "none";

    // Phase 3: continued vertical scroll becomes horizontal gallery travel.
    const horizontalT = smooth(clamp((progress - 0.40) / 0.60));
    const maxX = Math.max(0, track.scrollWidth - window.innerWidth);
    const x = maxX * horizontalT;
    track.style.transform = `translate3d(${-x}px, 0, 0)`;

    const centerX = window.innerWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;
    slides.forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const distance = Math.abs((rect.left + rect.right) / 2 - centerX);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveSlide(closestIndex);

    const hint = document.querySelector(".edge-hint");
    if (hint) hint.style.opacity = progress > 0.45 ? "0" : ".7";
  }

  function scrollToGalleryStart() {
    if (isMobile || isReduced) {
      document.querySelector("#gallery").scrollIntoView({ behavior: isReduced ? "auto" : "smooth" });
      return;
    }
    const maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    window.scrollTo({ top: maxY * 0.43, behavior: "smooth" });
  }

  exploreLink.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToGalleryStart();
  });

  galleryWindow.addEventListener("keydown", (event) => {
    if (isMobile || isReduced) return;
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = clamp(lastActive + (event.key === "ArrowRight" ? 1 : -1), 0, slides.length - 1);
    const maxY = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const targetT = slides.length <= 1 ? 0 : next / (slides.length - 1);
    const p = 0.40 + targetT * 0.60;
    window.scrollTo({ top: maxY * p, behavior: "smooth" });
  });

  track.addEventListener("click", (event) => {
    const trigger = event.target.closest(".media-expand");
    if (trigger) openLightbox(trigger.closest(".work-slide"));
  });

  if (lightbox) {
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });
  }
  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });

  let ticking = false;
  function onScroll() {
    if (ticking || isMobile || isReduced) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      update();
      ticking = false;
    });
  }

  setIntroImage();
  setWorkModels();
  mobileMode();
  setActiveSlide(0);
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", () => {
    mobileMode();
    update();
  });
  mediaQuery.addEventListener?.("change", mobileMode);
  reducedMotion.addEventListener?.("change", mobileMode);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopParticles();
    else if (!isReduced) startParticles();
  });
})();
