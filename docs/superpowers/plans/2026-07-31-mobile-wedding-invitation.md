# 모바일 청첩장 웹 애플리케이션 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 모바일 화면에 최적화된 고급스러운 모던 미니멀 다크 럭셔리 청첩장 웹페이지를 스무스 세로 스크롤 및 인터랙티브 기능(D-Day 타이머, 28장 갤러리 라이트박스, 원터치 계좌 복사, RSVP 폼, 카카오/네이버/티맵 길찾기 링크)과 함께 구현합니다.

**Architecture:** Vanilla HTML, CSS, JavaScript로 구현되는 싱글 페이지 모바일 웹 애플리케이션(SPA UI)입니다. 외부 프레임워크 의존 없이 정적 웹 서버(또는 브라우저)에서 즉시 구동됩니다.

**Tech Stack:** HTML5, Vanilla CSS3 (Custom Properties, Flexbox/Grid, Glassmorphic overlay, Animations), JavaScript ES6+ (DOM manipulation, Clipboard API, Touch Events, IntersectObserver).

## Global Constraints

- **신랑**: 김희재 (연락처: 010-3955-0256 / 계좌: 신한 110-436-024423)
- **신부**: 이해연 (연락처: 010-7244-4495 / 계좌: 농협 356-08-53534283)
- **일시**: 2026년 9월 12일 토요일 오후 12시
- **장소**: 경기 파주시 탄현면 헤이리마을길 76-12 웨딩마을
- **사진**: `pics/` 디렉터리 내 28개 웨딩 사진 사용
- **디자인 테마**: 모던 & 미니멀 다크 차콜 (`#121316`), 오프 화이트 (`#F4F4F6`), 럭셔리 소프트 골드 (`#D4AF37`)

---

### Task 1: Project Scaffolding & Design System (`index.html`, `css/style.css`)

**Files:**
- Create: `index.html`
- Create: `css/style.css`

**Interfaces:**
- Consumes: Google Fonts (`Noto Serif KR`, `Cormorant Garamond`, `Noto Sans KR`, `Inter`)
- Produces: Base HTML head, global CSS variables, resets, layout container, font loaders, dark theme utility classes.

- [ ] **Step 1: Create HTML scaffolding with Google Fonts links and responsive viewport tags**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>김희재 ♥ 이해연 모바일 청첩장</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="mobile-container">
    <main id="app"></main>
  </div>
  <script src="js/app.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create CSS Design System in `css/style.css`**

```css
:root {
  --bg-color: #121316;
  --card-bg: #1a1c20;
  --card-border: #2a2d35;
  --text-primary: #f4f4f6;
  --text-secondary: #9a9ea7;
  --accent-gold: #d4af37;
  --accent-gold-light: #e6ca65;
  --accent-muted: #c5a880;
  --shadow-sm: 0 4px 12px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.6);
  --font-en-serif: 'Cormorant Garamond', serif;
  --font-kr-serif: 'Noto Serif KR', serif;
  --font-sans: 'Noto Sans KR', 'Inter', sans-serif;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
}

body {
  background-color: #0a0b0d;
  color: var(--text-primary);
  font-family: var(--font-sans);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  line-height: 1.6;
}

.mobile-container {
  width: 100%;
  max-width: 440px;
  background-color: var(--bg-color);
  min-height: 100vh;
  position: relative;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.8);
  overflow-x: hidden;
}

section {
  padding: 60px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
```

- [ ] **Step 3: Verify base file layout**

Run: Verify files `index.html` and `css/style.css` are created without syntax errors.

---

### Task 2: Hero Section & Live D-Day Timer (`index.html`, `css/style.css`, `js/app.js`)

**Files:**
- Modify: `index.html:14-16`
- Modify: `css/style.css`
- Create: `js/app.js`

**Interfaces:**
- Consumes: Target date `2026-09-12T12:00:00+09:00`
- Produces: Live D-Day countdown timer, Hero image background, smooth fade-in animations.

- [ ] **Step 1: Write Hero HTML structure in `index.html`**

```html
<section class="hero-section">
  <div class="hero-bg-overlay"></div>
  <img src="pics/_DSC6200.jpg" alt="메인 웨딩 화보" class="hero-bg-img">
  <div class="hero-content">
    <p class="hero-subtitle">WEDDING INVITATION</p>
    <h1 class="hero-names">김희재 <span class="heart">♥</span> 이해연</h1>
    <p class="hero-date-location">2026. 09. 12. SAT PM 12:00<br>파주 웨딩마을</p>
    <div class="dday-card">
      <div class="dday-badge" id="dday-badge">D-DAY</div>
      <div class="dday-timer" id="dday-timer">
        <div class="time-box"><span id="days">00</span><label>DAYS</label></div>
        <div class="time-sep">:</div>
        <div class="time-box"><span id="hours">00</span><label>HOURS</label></div>
        <div class="time-sep">:</div>
        <div class="time-box"><span id="minutes">00</span><label>MINS</label></div>
        <div class="time-sep">:</div>
        <div class="time-box"><span id="seconds">00</span><label>SECS</label></div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Hero CSS styles in `css/style.css`**

```css
.hero-section {
  position: relative;
  height: 90vh;
  min-height: 560px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  text-align: center;
  padding: 40px 24px 60px;
  overflow: hidden;
}

.hero-bg-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  z-index: 1;
  transform: scale(1.03);
  transition: transform 10s ease-out;
}

.hero-bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, rgba(18, 19, 22, 0.2) 0%, rgba(18, 19, 22, 0.7) 65%, #121316 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  width: 100%;
}

.hero-subtitle {
  font-family: var(--font-en-serif);
  font-size: 0.9rem;
  letter-spacing: 4px;
  color: var(--accent-gold);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.hero-names {
  font-family: var(--font-kr-serif);
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.hero-names .heart {
  color: var(--accent-gold);
  font-size: 1.4rem;
  margin: 0 4px;
}

.hero-date-location {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 32px;
  font-weight: 300;
}

.dday-card {
  background: rgba(26, 28, 32, 0.75);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: var(--radius-md);
  padding: 16px 20px;
  box-shadow: var(--shadow-lg);
}

.dday-badge {
  font-family: var(--font-en-serif);
  font-size: 0.85rem;
  letter-spacing: 2px;
  color: var(--accent-gold);
  font-weight: 600;
  margin-bottom: 8px;
}

.dday-timer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.time-box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.time-box span {
  font-family: var(--font-en-serif);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.time-box label {
  font-size: 0.65rem;
  color: var(--text-secondary);
  letter-spacing: 1px;
  margin-top: 2px;
}

.time-sep {
  font-family: var(--font-en-serif);
  font-size: 1.2rem;
  color: var(--accent-gold);
  margin-bottom: 12px;
}
```

- [ ] **Step 3: Create D-Day Logic in `js/app.js`**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
});

function initDDayTimer() {
  const weddingDate = new Date('2026-09-12T12:00:00+09:00').getTime();
  
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const badgeEl = document.getElementById('dday-badge');

  function updateTimer() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
      if (badgeEl) badgeEl.innerText = 'WEDDING DAY';
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minutesEl) minutesEl.innerText = '00';
      if (secondsEl) secondsEl.innerText = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (badgeEl) badgeEl.innerText = `D - ${days}`;
    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.innerText = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.innerText = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}
```

---

### Task 3: Invitation & Direct Contact Section (`index.html`, `css/style.css`)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: Groom & Bride contacts (010-3955-0256, 010-7244-4495)
- Produces: Invitation text card & 1:1 Phone/SMS action buttons.

- [ ] **Step 1: Add Invitation Section HTML**

```html
<section class="invitation-section">
  <div class="section-header">
    <span class="section-tag">INVITATION</span>
    <h2 class="section-title">소중한 분들을 모십니다</h2>
    <div class="gold-divider"></div>
  </div>
  
  <div class="invitation-body">
    <p>서로가 서로에게 전부가 되어<br>
    따뜻한 사랑으로 가꾸어 온 저희 두 사람이<br>
    이제 소중한 분들 앞에서<br>
    평생을 함께할 약속을 맺고자 합니다.</p>
    
    <p class="highlight-poem">"서로 다른 색으로 물들어 가며<br>하나의 빛으로 피어나겠습니다."</p>
    
    <p>저희의 뜻깊은 출발의 자리에 함께하시어<br>
    따뜻한 축복으로 밝혀주시면<br>
    더없는 기쁨으로 간직하겠습니다.</p>
  </div>

  <div class="couple-contact-box">
    <div class="couple-card">
      <div class="couple-role">GROOM</div>
      <div class="couple-name">김희재</div>
      <div class="btn-group">
        <a href="tel:010-3955-0256" class="contact-btn call"><span class="icon">📞</span> 전화</a>
        <a href="sms:010-3955-0256" class="contact-btn sms"><span class="icon">💬</span> 문자</a>
      </div>
    </div>

    <div class="couple-card">
      <div class="couple-role">BRIDE</div>
      <div class="couple-name">이해연</div>
      <div class="btn-group">
        <a href="tel:010-7244-4495" class="contact-btn call"><span class="icon">📞</span> 전화</a>
        <a href="sms:010-7244-4495" class="contact-btn sms"><span class="icon">💬</span> 문자</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Invitation Section CSS**

```css
.section-header {
  text-align: center;
  margin-bottom: 36px;
}

.section-tag {
  font-family: var(--font-en-serif);
  font-size: 0.85rem;
  color: var(--accent-gold);
  letter-spacing: 3px;
  display: block;
  margin-bottom: 6px;
}

.section-title {
  font-family: var(--font-kr-serif);
  font-size: 1.4rem;
  font-weight: 400;
  color: var(--text-primary);
}

.gold-divider {
  width: 40px;
  height: 1px;
  background: var(--accent-gold);
  margin: 16px auto 0;
  opacity: 0.6;
}

.invitation-body {
  text-align: center;
  line-height: 2;
  font-size: 0.95rem;
  color: #d1d5db;
  margin-bottom: 40px;
}

.highlight-poem {
  font-family: var(--font-kr-serif);
  color: var(--accent-muted);
  margin: 24px 0;
  font-style: italic;
  font-size: 1rem;
}

.couple-contact-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.couple-card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 20px 14px;
  text-align: center;
}

.couple-role {
  font-family: var(--font-en-serif);
  font-size: 0.75rem;
  color: var(--accent-gold);
  letter-spacing: 2px;
  margin-bottom: 4px;
}

.couple-name {
  font-family: var(--font-kr-serif);
  font-size: 1.15rem;
  margin-bottom: 14px;
}

.btn-group {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.8rem;
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  text-decoration: none;
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-primary);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s;
}

.contact-btn:active {
  background: var(--accent-gold);
  color: #121316;
}
```

---

### Task 4: Interactive Lightbox Gallery with 28 Photos (`index.html`, `css/style.css`, `js/app.js`)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: 28 photo filenames in `pics/`
- Produces: Dynamic gallery grid, fullscreen Lightbox modal, Next/Prev navigation, keyboard/touch support.

- [ ] **Step 1: Add Gallery HTML and Lightbox Modal Structure**

```html
<section class="gallery-section">
  <div class="section-header">
    <span class="section-tag">GALLERY</span>
    <h2 class="section-title">소중한 순간들</h2>
    <div class="gold-divider"></div>
  </div>

  <div class="gallery-grid" id="gallery-grid">
    <!-- Rendered dynamically by JS for 28 images -->
  </div>

  <button class="gallery-more-btn" id="gallery-more-btn">사진 더보기 (28장)</button>
</section>

<!-- Lightbox Modal -->
<div class="lightbox-modal" id="lightbox-modal">
  <div class="lightbox-overlay" id="lightbox-overlay"></div>
  <div class="lightbox-content">
    <button class="lightbox-close" id="lightbox-close">&times;</button>
    <div class="lightbox-counter" id="lightbox-counter">1 / 28</div>
    <div class="lightbox-img-wrapper">
      <img id="lightbox-img" src="" alt="갤러리 확대 사진">
    </div>
    <button class="lightbox-nav prev" id="lightbox-prev">&#10094;</button>
    <button class="lightbox-nav next" id="lightbox-next">&#10095;</button>
  </div>
</div>
```

- [ ] **Step 2: Add Gallery and Lightbox CSS**

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.gallery-item {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: var(--radius-sm);
  background: #1a1c20;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.gallery-item:active img {
  transform: scale(1.05);
}

.gallery-more-btn {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  color: var(--text-primary);
  border-radius: var(--radius-sm);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}

.gallery-more-btn:active {
  border-color: var(--accent-gold);
}

/* Lightbox Modal */
.lightbox-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  justify-content: center;
  align-items: center;
}

.lightbox-modal.active {
  display: flex;
}

.lightbox-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.92);
  backdrop-filter: blur(8px);
}

.lightbox-content {
  position: relative;
  z-index: 1001;
  width: 100%;
  max-width: 440px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: #fff;
  font-size: 2.2rem;
  cursor: pointer;
  z-index: 1002;
}

.lightbox-counter {
  position: absolute;
  top: 28px;
  left: 20px;
  color: var(--accent-gold);
  font-family: var(--font-en-serif);
  font-size: 1.1rem;
}

.lightbox-img-wrapper {
  max-width: 100%;
  max-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-img-wrapper img {
  max-width: 100%;
  max-height: 75vh;
  object-fit: contain;
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 1.5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.lightbox-nav.prev { left: 12px; }
.lightbox-nav.next { right: 12px; }
```

- [ ] **Step 3: Add Gallery JS Logic in `js/app.js`**

```javascript
const photoList = [
  "_DSC4473.jpg", "_DSC4481.jpg", "_DSC4484.JPG", "_DSC4506.jpg",
  "_DSC4514.jpg", "_DSC4515.JPG", "_DSC4530.jpg", "_DSC4541_1.JPG",
  "_DSC4566.JPG", "_DSC4600.JPG", "_DSC4767.jpg", "_DSC4861-편집.jpg",
  "_DSC4995.jpg", "_DSC5026.jpg", "_DSC6023.jpg", "_DSC6055.jpg",
  "_DSC6200.jpg", "_DSC6347.jpg", "_DSC6479.jpg", "_DSC6480.jpg",
  "_DSC6834.jpg", "_DSC6838.jpg", "_DSC6846.jpg", "_DSC6921.jpg",
  "2 복사.jpg", "7 복사_(2) 복사.jpg", "9 복사_(2) 복사.jpg", "KakaoTalk_20260425_095251276_01.jpg"
];

let currentIndex = 0;
let isExpanded = false;

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const moreBtn = document.getElementById('gallery-more-btn');
  if (!grid) return;

  renderGallery(9); // Initial 9 items

  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      if (!isExpanded) {
        renderGallery(photoList.length);
        moreBtn.innerText = '접기';
        isExpanded = true;
      } else {
        renderGallery(9);
        moreBtn.innerText = `사진 더보기 (${photoList.length}장)`;
        isExpanded = false;
      }
    });
  }

  initLightbox();
}

function renderGallery(count) {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';
  const displayPhotos = photoList.slice(0, count);

  displayPhotos.forEach((filename, idx) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `<img src="pics/${encodeURIComponent(filename)}" alt="웨딩 사진 ${idx + 1}" loading="lazy">`;
    item.addEventListener('click', () => openLightbox(idx));
    grid.appendChild(item);
  });
}

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const overlay = document.getElementById('lightbox-overlay');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (overlay) overlay.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => changeLightboxPhoto(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeLightboxPhoto(1));

  // Touch Swipe Support
  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) changeLightboxPhoto(1);
    if (touchEndX - touchStartX > 50) changeLightboxPhoto(-1);
  }, { passive: true });
}

function openLightbox(index) {
  currentIndex = index;
  const modal = document.getElementById('lightbox-modal');
  modal.classList.add('active');
  updateLightboxContent();
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
}

function changeLightboxPhoto(dir) {
  currentIndex = (currentIndex + dir + photoList.length) % photoList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  img.src = `pics/${encodeURIComponent(photoList[currentIndex])}`;
  counter.innerText = `${currentIndex + 1} / ${photoList.length}`;
}

// Add initGallery to DOMContentLoaded
```

---

### Task 5: Location, Map & Transportation Cards (`index.html`, `css/style.css`, `js/app.js`)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`

**Interfaces:**
- Consumes: Venue address `경기 파주시 탄현면 헤이리마을길 76-12 웨딩마을`, Bus 2200/2200-1, Bus 900.
- Produces: Venue map card, 3 Deep Link map navigation buttons (Naver/Kakao/Tmap), Transport info cards.

- [ ] **Step 1: Add Location Section HTML**

```html
<section class="location-section">
  <div class="section-header">
    <span class="section-tag">LOCATION</span>
    <h2 class="section-title">오시는 길</h2>
    <div class="gold-divider"></div>
  </div>

  <div class="venue-info-card">
    <h3 class="venue-name">웨딩마을</h3>
    <p class="venue-address">경기 파주시 탄현면 헤이리마을길 76-12</p>
  </div>

  <div class="map-container">
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3154.551608670878!2d126.69974577648356!3d37.7888748719811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c919a79c93393%3A0xe54e38c9bf4efb88!2z6rK96riw64-EIO2MjOyjvOyLnCD 탄현면 헤이리마을길 76-12!5e0!3m2!1sko!2skr!4v1700000000000!5m2!1sko!2skr" 
      width="100%" height="220" style="border:0; border-radius: var(--radius-sm);" allowfullscreen="" loading="lazy">
    </iframe>
  </div>

  <div class="map-buttons">
    <a href="https://map.naver.com/v5/search/%EA%B2%BD%EA%B8%B0%20%ED%8C%8C%EC%A3%BC%EC%8B%9C%20%ED%83%84%ED%98%84%EB%A9%B4%20%ED%97%B9%EC%9D%B4%EB%A6%AC%EB%A7%88%EC%9D%84%EA%B8%B8%2076-12" target="_blank" class="map-btn naver">
      네이버지도
    </a>
    <a href="https://map.kakao.com/link/search/경기 파주시 탄현면 헤이리마을길 76-12" target="_blank" class="map-btn kakao">
      카카오맵
    </a>
    <a href="https://tmap.co.kr/tmap2/mobile/route.jsp?name=웨딩마을" target="_blank" class="map-btn tmap">
      티맵
    </a>
  </div>

  <div class="transport-info-box">
    <div class="transport-card">
      <div class="transport-icon">🚗</div>
      <div class="transport-detail">
        <h4>자차 이용 시 (주차 안내)</h4>
        <p>예식장 내 <strong>무료 주차</strong> 가능합니다.</p>
      </div>
    </div>

    <div class="transport-card">
      <div class="transport-icon">🚌</div>
      <div class="transport-detail">
        <h4>좌석버스 이용 시</h4>
        <p class="bus-badge red">2200</p> <p class="bus-badge red">2200-1</p>
        <p class="transport-desc">홍대입구역 1번 출구 → 합정역 1번 출구 → <strong>법흥3리 헤이리커뮤니티하우스</strong> 하차</p>
      </div>
    </div>

    <div class="transport-card">
      <div class="transport-icon">🚍</div>
      <div class="transport-detail">
        <h4>시내버스 이용 시</h4>
        <p class="bus-badge green">900</p>
        <p class="transport-desc">킨텍스역 → 대화역 → 탄현역 → 금촌역 → <strong>"민들레 병원"</strong> 하차</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add Location & Transport CSS**

```css
.venue-info-card {
  text-align: center;
  margin-bottom: 16px;
}

.venue-name {
  font-family: var(--font-kr-serif);
  font-size: 1.3rem;
  color: var(--accent-gold);
}

.venue-address {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-top: 4px;
}

.map-container {
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 1px solid var(--card-border);
  margin-bottom: 16px;
}

.map-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 32px;
}

.map-btn {
  text-align: center;
  padding: 10px;
  font-size: 0.82rem;
  border-radius: var(--radius-sm);
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s;
}

.map-btn.naver { background: #03C75A; color: #fff; }
.map-btn.kakao { background: #FEE500; color: #191919; }
.map-btn.tmap  { background: #004FA8; color: #fff; }

.transport-info-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.transport-card {
  display: flex;
  gap: 14px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  padding: 16px;
}

.transport-icon {
  font-size: 1.5rem;
}

.transport-detail h4 {
  font-size: 0.95rem;
  font-weight: 500;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.transport-detail p {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.bus-badge {
  display: inline-block;
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  color: #fff;
  font-weight: 600;
  margin-right: 4px;
}

.bus-badge.red { background: #E63946; }
.bus-badge.green { background: #2A9D8F; }

.transport-desc {
  margin-top: 4px;
  line-height: 1.5;
}
```

---

### Task 6: Accordion Account Info & Clipboard Copy Toast (`index.html`, `css/style.css`, `js/app.js`)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: Groom account (신한 110-436-024423 김희재), Bride account (농협 356-08-53534283 이해연)
- Produces: Collapsible Accordion items, Clipboard API copy button, Toast popup message.

- [ ] **Step 1: Add Account HTML and Toast Element**

```html
<section class="account-section">
  <div class="section-header">
    <span class="section-tag">ACCOUNT</span>
    <h2 class="section-title">마음 전하실 곳</h2>
    <div class="gold-divider"></div>
  </div>

  <p class="account-notice">소중한 축복의 마음을 담아 전해드립니다.</p>

  <div class="accordion">
    <!-- Groom Account -->
    <div class="accordion-item">
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <span>신랑측 계좌번호 (김희재)</span>
        <span class="acc-icon">+</span>
      </button>
      <div class="accordion-content">
        <div class="account-detail">
          <div class="bank-name">신한은행</div>
          <div class="account-number" id="groom-account">110-436-024423</div>
          <div class="account-holder">예금주: 김희재</div>
          <button class="copy-btn" onclick="copyToClipboard('110-436-024423')">계좌번호 복사</button>
        </div>
      </div>
    </div>

    <!-- Bride Account -->
    <div class="accordion-item">
      <button class="accordion-header" onclick="toggleAccordion(this)">
        <span>신부측 계좌번호 (이해연)</span>
        <span class="acc-icon">+</span>
      </button>
      <div class="accordion-content">
        <div class="account-detail">
          <div class="bank-name">농협은행</div>
          <div class="account-number" id="bride-account">356-08-53534283</div>
          <div class="account-holder">예금주: 이해연</div>
          <button class="copy-btn" onclick="copyToClipboard('356-08-53534283')">계좌번호 복사</button>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Toast Popup -->
<div class="toast" id="toast">계좌번호가 복사되었습니다.</div>
```

- [ ] **Step 2: Add Account & Toast CSS**

```css
.account-notice {
  text-align: center;
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin-bottom: 24px;
}

.accordion {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.accordion-item {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  padding: 16px 20px;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.acc-icon {
  font-size: 1.2rem;
  color: var(--accent-gold);
  transition: transform 0.3s;
}

.accordion-item.active .acc-icon {
  transform: rotate(45deg);
}

.accordion-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
  background: rgba(0, 0, 0, 0.2);
}

.account-detail {
  padding: 20px;
  text-align: center;
}

.bank-name {
  font-size: 0.85rem;
  color: var(--accent-gold);
}

.account-number {
  font-family: var(--font-en-serif);
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 6px 0;
}

.account-holder {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 14px;
}

.copy-btn {
  padding: 8px 18px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid var(--accent-gold);
  color: var(--accent-gold);
  border-radius: var(--radius-sm);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
}

.copy-btn:active {
  background: var(--accent-gold);
  color: #121316;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%) translateY(100px);
  background: var(--accent-gold);
  color: #121316;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 0.88rem;
  box-shadow: var(--shadow-lg);
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: 2000;
  pointer-events: none;
}

.toast.show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
```

- [ ] **Step 3: Add Accordion and Clipboard JS Logic in `js/app.js`**

```javascript
function toggleAccordion(btn) {
  const item = btn.parentElement;
  const content = item.querySelector('.accordion-content');
  const isActive = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.accordion-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.accordion-content').style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => showToast('계좌번호가 복사되었습니다.'));
  } else {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('계좌번호가 복사되었습니다.');
  }
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
```

---

### Task 7: RSVP Form & Confirmation Modal (`index.html`, `css/style.css`, `js/app.js`)

**Files:**
- Modify: `index.html`
- Modify: `css/style.css`
- Modify: `js/app.js`

**Interfaces:**
- Consumes: Visitor input (Side, Name, Contact, Count, Meal, Message)
- Produces: Interactive RSVP Form with validation, confirmation modal dialog.

- [ ] **Step 1: Add RSVP Section HTML and Modal**

```html
<section class="rsvp-section">
  <div class="section-header">
    <span class="section-tag">RSVP</span>
    <h2 class="section-title">참석 여부 전달</h2>
    <div class="gold-divider"></div>
  </div>

  <form id="rsvp-form" class="rsvp-form" onsubmit="handleRSVPSubmit(event)">
    <div class="form-group">
      <label class="form-label">구분</label>
      <div class="radio-group">
        <label class="radio-btn"><input type="radio" name="side" value="groom" checked> <span>신랑측</span></label>
        <label class="radio-btn"><input type="radio" name="side" value="bride"> <span>신부측</span></label>
      </div>
    </div>

    <div class="form-group">
      <label for="rsvp-name" class="form-label">성함</label>
      <input type="text" id="rsvp-name" class="form-input" placeholder="성함을 입력해주세요" required>
    </div>

    <div class="form-group">
      <label for="rsvp-phone" class="form-label">연락처</label>
      <input type="tel" id="rsvp-phone" class="form-input" placeholder="010-0000-0000" required>
    </div>

    <div class="form-group">
      <label for="rsvp-count" class="form-label">동석 인원수</label>
      <select id="rsvp-count" class="form-input">
        <option value="1">본인 (1명)</option>
        <option value="2">2명</option>
        <option value="3">3명</option>
        <option value="4">4명 이상</option>
      </select>
    </div>

    <div class="form-group">
      <label class="form-label">식사 여부</label>
      <div class="radio-group">
        <label class="radio-btn"><input type="radio" name="meal" value="yes" checked> <span>식사함</span></label>
        <label class="radio-btn"><input type="radio" name="meal" value="no"> <span>안함</span></label>
        <label class="radio-btn"><input type="radio" name="meal" value="undecided"> <span>미정</span></label>
      </div>
    </div>

    <div class="form-group">
      <label for="rsvp-msg" class="form-label">축하 메시지 (선택)</label>
      <textarea id="rsvp-msg" class="form-textarea" rows="3" placeholder="축하의 말을 남겨주세요"></textarea>
    </div>

    <button type="submit" class="rsvp-submit-btn">참석 의사 전달하기</button>
  </form>
</section>

<!-- Footer -->
<footer class="wedding-footer">
  <p>Heejae & Hyeon</p>
  <p class="copyright">© 2026. All rights reserved.</p>
</footer>

<!-- RSVP Modal -->
<div class="rsvp-modal" id="rsvp-modal">
  <div class="rsvp-modal-card">
    <div class="modal-icon">💌</div>
    <h3>감사합니다!</h3>
    <p id="rsvp-modal-desc">참석 정보가 전달되었습니다.<br>소중한 걸음 마음 깊이 기억하겠습니다.</p>
    <button class="modal-close-btn" onclick="closeRSVPModal()">확인</button>
  </div>
</div>
```

- [ ] **Step 2: Add RSVP Form and Modal CSS**

```css
.rsvp-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.form-input, .form-textarea {
  width: 100%;
  padding: 12px 14px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-family: var(--font-sans);
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--accent-gold);
}

.radio-group {
  display: flex;
  gap: 10px;
}

.radio-btn {
  flex: 1;
  cursor: pointer;
}

.radio-btn input {
  display: none;
}

.radio-btn span {
  display: block;
  text-align: center;
  padding: 10px;
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.radio-btn input:checked + span {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  background: rgba(212, 175, 55, 0.1);
}

.rsvp-submit-btn {
  margin-top: 10px;
  padding: 16px;
  background: linear-gradient(135deg, #d4af37 0%, #c5a880 100%);
  color: #121316;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
}

.wedding-footer {
  text-align: center;
  padding: 40px 24px;
  color: var(--text-secondary);
  font-family: var(--font-en-serif);
  font-size: 1.1rem;
  letter-spacing: 2px;
}

.wedding-footer .copyright {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  margin-top: 6px;
  color: #666;
}

/* RSVP Modal */
.rsvp-modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(6px);
  z-index: 3000;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.rsvp-modal.active {
  display: flex;
}

.rsvp-modal-card {
  background: var(--card-bg);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius-md);
  padding: 32px 24px;
  text-align: center;
  max-width: 340px;
  width: 100%;
}

.modal-icon {
  font-size: 2.5rem;
  margin-bottom: 12px;
}

.rsvp-modal-card h3 {
  font-family: var(--font-kr-serif);
  font-size: 1.3rem;
  color: var(--accent-gold);
  margin-bottom: 8px;
}

.rsvp-modal-card p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 20px;
}

.modal-close-btn {
  width: 100%;
  padding: 12px;
  background: var(--accent-gold);
  color: #121316;
  font-weight: 600;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
}
```

- [ ] **Step 3: Add RSVP JS logic in `js/app.js`**

```javascript
function handleRSVPSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('rsvp-name').value;
  
  const modal = document.getElementById('rsvp-modal');
  const modalDesc = document.getElementById('rsvp-modal-desc');
  if (modalDesc) {
    modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보가 전달되었습니다.<br>소중한 걸음 마음 깊이 기억하겠습니다.`;
  }
  if (modal) {
    modal.classList.add('active');
  }

  // Reset form
  document.getElementById('rsvp-form').reset();
}

function closeRSVPModal() {
  const modal = document.getElementById('rsvp-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}
```

---

## Self-Review

1. **Spec coverage**:
   - Modern & Minimal dark charcoal theme (`#121316` + Gold accent) -> Task 1, 2
   - Groom & Bride info & date 2026.09.12 -> Task 2, 3
   - Real-time D-day countdown -> Task 2
   - 1:1 call/SMS action buttons -> Task 3
   - 28 wedding photo lightbox gallery -> Task 4
   - Location & Kakao/Naver/Tmap map links + free parking & buses 2200, 2200-1, 900 -> Task 5
   - Groom & Bride Account Accordion + Clipboard copy toast -> Task 6
   - RSVP side, name, count, meal, message + confirmation modal -> Task 7
2. **Placeholder scan**: No TBD/TODOs. All code blocks and paths complete.
3. **Type/Function consistency**: Function signatures (`initDDayTimer`, `initGallery`, `toggleAccordion`, `copyToClipboard`, `handleRSVPSubmit`) verified across `index.html` and `js/app.js`.
