# B컷 갤러리 및 축하 메시지 반응형 인터랙션 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** RSVP 축하 메시지 입력 시 감동 문구 애니메이션 추가 및 축하 메시지를 작성한 하객 전용 B컷 갤러리 잠금/해제 기능 구축

**Architecture:** Vanilla HTML/CSS/JS 기반. RSVP 폼 입력 실시간 이벤트 처리, 로컬 스토리지 연동 B컷 갤러리 상태 유지, 라이트박스 팝업 연동.

**Tech Stack:** HTML5, CSS3, ES6 JavaScript, LocalStorage API.

## Global Constraints

- OS & Browser: Standard modern mobile and desktop browsers (iOS Safari, Android Chrome, Kakao In-app Browser).
- Design system: Existing wedding invitation CSS design system (var(--primary-gold), var(--font-serif), glassmorphism styles).

---

### Task 1: HTML Markup Updates for Toast Message, B-Cut Gallery & RSVP Modal

**Files:**
- Modify: [index.html](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/index.html)

**Interfaces:**
- Consumes: Existing `#rsvp-form`, `#rsvp-modal`, `.gallery-section`
- Produces: `#rsvp-msg-thanks`, `#bcut-section`, `#bcut-locked-card`, `#bcut-unlocked-card`, `#rsvp-modal-bcut-btn`

- [ ] **Step 1: Add `#rsvp-msg-thanks` container below `#rsvp-msg`**

In [index.html](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/index.html) around line 150 (below `#rsvp-msg` textarea), add:
```html
<div id="rsvp-msg-thanks" class="thanks-note">
  <span class="heart-icon">💖</span> 헉! 설마 축하메시지를 써주시는 건가요...?! 정말 감사드립니다!
</div>
```

- [ ] **Step 2: Add B컷 Gallery Section right below `.gallery-section`**

In [index.html](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/index.html) around line 101, add:
```html
<!-- B-Cut Gallery Section -->
<section class="bcut-section" id="bcut-section">
  <!-- Locked Card State -->
  <div class="bcut-locked-card" id="bcut-locked-card">
    <div class="bcut-lock-icon">🔒</div>
    <span class="bcut-tag">SPECIAL BEHIND</span>
    <h3 class="bcut-title">비하인드 B컷 갤러리</h3>
    <p class="bcut-desc">RSVP 참석 응답 시 축하 메시지를 남겨주시면<br>신랑·신부의 숨겨진 B컷 화보가 오픈됩니다 💕</p>
    <button type="button" class="bcut-go-rsvp-btn" onclick="scrollToRSVP()">축하 메시지 남기고 B컷 열기 ✍️</button>
  </div>

  <!-- Unlocked State (Hidden initially) -->
  <div class="bcut-unlocked-container hidden" id="bcut-unlocked-card">
    <div class="section-header">
      <span class="section-tag">BEHIND STORY</span>
      <h2 class="section-title">✨ 비하인드 B컷 갤러리</h2>
      <p class="bcut-sub-notice">소중한 축하 메시지 감사합니다! 자유롭게 감상하세요.</p>
      <div class="gold-divider"></div>
    </div>
    <div class="bcut-grid" id="bcut-grid">
      <!-- Dynamic rendering via JS -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: Update RSVP Modal structure to include B컷 button**

In [index.html](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/index.html) inside `#rsvp-modal`, update action buttons:
```html
<div class="rsvp-modal-actions">
  <button id="rsvp-bcut-go-btn" class="bcut-modal-btn hidden" onclick="goToBCutGallery()">🎁 B컷 갤러리 보러가기</button>
  <button class="modal-close-btn" onclick="closeRSVPModal()">확인</button>
</div>
```

---

### Task 2: CSS Styling for Toast Message & B-Cut Gallery

**Files:**
- Modify: [css/style.css](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/css/style.css)

**Interfaces:**
- Consumes: `.thanks-note`, `.bcut-section`, `.bcut-locked-card`, `.bcut-unlocked-container`, `.bcut-grid`
- Produces: Complete CSS animations for smooth slide down and locked card visuals.

- [ ] **Step 1: Add `.thanks-note` slide-down animation styles**

Add to [css/style.css](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/css/style.css):
```css
.thanks-note {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  transform: translateY(-8px);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-size: 0.82rem;
  color: var(--primary-gold-dark, #b8860b);
  background: rgba(255, 248, 240, 0.9);
  border: 1px solid rgba(212, 175, 55, 0.3);
  padding: 0 12px;
  border-radius: 12px;
  margin-top: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 500;
}

.thanks-note.show {
  max-height: 60px;
  opacity: 1;
  transform: translateY(0);
  padding: 8px 12px;
  margin-top: 8px;
}

.thanks-note .heart-icon {
  animation: heartPulse 1.2s infinite ease-in-out;
}

@keyframes heartPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
```

- [ ] **Step 2: Add B컷 Gallery locked & unlocked card styles**

Add to [css/style.css](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/css/style.css):
```css
/* B-Cut Gallery Section */
.bcut-section {
  padding: 30px 20px 40px;
  background: linear-gradient(180deg, #FAF8F5 0%, #FFFDF9 100%);
  text-align: center;
}

.bcut-locked-card {
  background: rgba(255, 255, 255, 0.85);
  border: 1px dashed rgba(212, 175, 55, 0.5);
  border-radius: 16px;
  padding: 32px 20px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(8px);
  transition: all 0.5s ease;
}

.bcut-lock-icon {
  font-size: 2.4rem;
  margin-bottom: 8px;
  animation: lockFloat 2.5s ease-in-out infinite;
}

@keyframes lockFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.bcut-tag {
  font-size: 0.72rem;
  letter-spacing: 2px;
  color: var(--primary-gold);
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.bcut-title {
  font-family: var(--font-serif);
  font-size: 1.35rem;
  color: #333;
  margin-bottom: 10px;
}

.bcut-desc {
  font-size: 0.88rem;
  color: #666;
  line-height: 1.5;
  margin-bottom: 18px;
}

.bcut-go-rsvp-btn {
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 0.88rem;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transition: transform 0.2s;
}

.bcut-go-rsvp-btn:active {
  transform: scale(0.96);
}

.bcut-unlocked-container {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.bcut-unlocked-container.show {
  opacity: 1;
  transform: translateY(0);
}

.bcut-sub-notice {
  font-size: 0.85rem;
  color: #888;
  margin-top: 4px;
}

.bcut-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 16px;
}

.bcut-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.bcut-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.bcut-item:hover img {
  transform: scale(1.05);
}

.hidden {
  display: none !important;
}

.bcut-modal-btn {
  background: linear-gradient(135deg, #ff7e5f, #feb47b);
  color: #fff;
  border: none;
  padding: 10px 18px;
  font-size: 0.9rem;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  margin-right: 8px;
  box-shadow: 0 4px 12px rgba(255, 126, 95, 0.3);
}
```

---

### Task 3: JS Interaction & State Management in app.js

**Files:**
- Modify: [js/app.js](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/js/app.js)

**Interfaces:**
- Consumes: `#rsvp-msg`, `handleRSVPSubmit`, photoList array
- Produces: `initBCutGallery`, `unlockBCutGallery`, `scrollToRSVP`, `goToBCutGallery`, `initThanksToast`

- [ ] **Step 1: Add `#rsvp-msg` listener (`initThanksToast`)**

In [js/app.js](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/js/app.js):
```js
function initThanksToast() {
  const msgInput = document.getElementById('rsvp-msg');
  const thanksEl = document.getElementById('rsvp-msg-thanks');
  if (!msgInput || !thanksEl) return;

  msgInput.addEventListener('input', () => {
    if (msgInput.value.trim().length > 0) {
      thanksEl.classList.add('show');
    } else {
      thanksEl.classList.remove('show');
    }
  });
}
```

- [ ] **Step 2: Add B컷 photo list & `initBCutGallery()`**

In [js/app.js](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/js/app.js):
```js
// B컷 사진 전용 배열 (미공개 화보 8장)
const bcutPhotoList = [
  "_DSC4861-편집.jpg", "_DSC4515.JPG", "_DSC4541_1.JPG", "_DSC4566.JPG",
  "_DSC6834.jpg", "_DSC6838.jpg", "_DSC6846.jpg", "_DSC6921.jpg"
];

function initBCutGallery() {
  const isUnlocked = localStorage.getItem('wedding_bcut_unlocked') === 'true';
  if (isUnlocked) {
    unlockBCutGallery(false);
  }
}

function unlockBCutGallery(shouldScroll = false) {
  localStorage.setItem('wedding_bcut_unlocked', 'true');
  const lockedCard = document.getElementById('bcut-locked-card');
  const unlockedCard = document.getElementById('bcut-unlocked-card');

  if (lockedCard) lockedCard.classList.add('hidden');
  if (unlockedCard) {
    unlockedCard.classList.remove('hidden');
    renderBCutGrid();
    setTimeout(() => unlockedCard.classList.add('show'), 50);

    if (shouldScroll) {
      unlockedCard.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function renderBCutGrid() {
  const grid = document.getElementById('bcut-grid');
  if (!grid || grid.children.length > 0) return;

  bcutPhotoList.forEach((filename, idx) => {
    const item = document.createElement('div');
    item.className = 'bcut-item';
    item.innerHTML = `<img src="pics/${encodeURIComponent(filename)}" alt="B컷 화보 ${idx + 1}" loading="lazy">`;
    item.addEventListener('click', () => openBCutLightbox(idx));
    grid.appendChild(item);
  });
}

function scrollToRSVP() {
  const rsvpForm = document.getElementById('rsvp-section');
  if (rsvpForm) {
    rsvpForm.scrollIntoView({ behavior: 'smooth' });
    const msgArea = document.getElementById('rsvp-msg');
    if (msgArea) setTimeout(() => msgArea.focus(), 600);
  }
}

function goToBCutGallery() {
  closeRSVPModal();
  unlockBCutGallery(true);
}

function openBCutLightbox(index) {
  // Use existing lightbox with bcutPhotoList
  currentIndex = index;
  // Temporary switch photoList for lightbox
  window.activePhotoList = bcutPhotoList;
  openLightboxCustom(bcutPhotoList, index);
}
```

- [ ] **Step 3: Update `handleRSVPSubmit` logic to unlock B컷 and show custom text**

In [js/app.js](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/js/app.js) inside `handleRSVPSubmit()`:
```js
  const hasMessage = message.length > 0;

  if (hasMessage) {
    unlockBCutGallery(false);
  }

  const modalDesc = document.getElementById('rsvp-modal-desc');
  const bcutBtn = document.getElementById('rsvp-bcut-go-btn');

  if (modalDesc) {
    if (hasMessage) {
      modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보와 따뜻한 축하 메시지가 전달되었습니다.<br><br>🎉 축하해주셔서 감사드립니다! 특별히 B컷 갤러리도 보고 가실래요?`;
      if (bcutBtn) bcutBtn.classList.remove('hidden');
    } else {
      modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보가 전달되었습니다.<br>소중한 걸음 마음 깊이 기억하겠습니다.`;
      if (bcutBtn) bcutBtn.classList.add('hidden');
    }
  }
```

- [ ] **Step 4: Initialize all new functions on `DOMContentLoaded`**

In [js/app.js](file:///c:/Users/user/Desktop/hj/workSpaceAntigravity/260731_mobileWedding/js/app.js):
```js
document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
  initGallery();
  initThanksToast();
  initBCutGallery();
});
```

---

## Verification Plan

### Automated / Browser Verification
- Open `index.html` using local dev server / browser subagent or manual test.
- Type in `#rsvp-msg` -> Verify `#rsvp-msg-thanks` appears with smooth slide animation and text `"💖 헉! 설마 축하메시지를 써주시는 건가요...?! 정말 감사드립니다!"`.
- Clear text -> Verify toast disappears.
- Check B컷 Section -> Verify it starts in locked state `🔒`.
- Submit RSVP with message -> Verify modal pops up with `"🎉 축하해주셔서 감사드립니다! 특별히 B컷 갤러리도 보고 가실래요?"` and `[ 🎁 B컷 갤러리 보러가기 ]` button.
- Click B컷 button -> Verify page smooth scrolls to unlocked B컷 section and images render cleanly.
- Refresh page -> Verify B컷 section remains unlocked due to `localStorage`.
