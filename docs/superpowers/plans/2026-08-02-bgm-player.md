# BGM Player Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate background music ("Steal The Show.mp3") into the mobile wedding invitation with a floating glassmorphic toggle button and seamless user interaction autoplay handling.

**Architecture:** Add HTML `<audio>` tag and floating BGM toggle button in `index.html`, style the button with a glassmorphism theme and pulse/disc animation in `css/style.css`, and add autoplay/toggle control logic in `js/app.js`.

**Tech Stack:** HTML5 Audio, Vanilla CSS3, Javascript (ES6+).

## Global Constraints
- Target Audio File: `audio/Steal The Show.mp3`
- Floating Button Position: `top: 16px; right: 16px; z-index: 999;` inside `.mobile-container`
- Design Token Compliance: Uses `--accent-gold`, `--shadow-sm`, and `--bg-color` variables

---

### Task 1: HTML Structure for BGM Audio and Floating Control Button

**Files:**
- Modify: `index.html`

**Interfaces:**
- Produces: HTML elements `#bgm-player` (`<audio>`) and `#bgm-toggle-btn` (`<button>`)

- [ ] **Step 1: Add `<audio>` and `#bgm-toggle-btn` elements to `index.html`**

Add the floating button and audio tag inside `.mobile-container` at the top of the body:

```html
<!-- Floating BGM Player Button -->
<button id="bgm-toggle-btn" class="bgm-toggle-btn paused" aria-label="BGM 재생/일시정지">
  <span class="bgm-icon">🎵</span>
  <span class="bgm-wave"></span>
</button>
<audio id="bgm-player" src="audio/Steal The Show.mp3" loop preload="auto"></audio>
```

- [ ] **Step 2: Verify HTML tag placement in `index.html`**

Check that elements exist and syntax is valid.

- [ ] **Step 3: Commit HTML changes**

```bash
git add index.html
git commit -m "feat(bgm): add bgm audio element and floating toggle button markup"
```

---

### Task 2: CSS Styling for Floating BGM Button

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `.bgm-toggle-btn`, `.bgm-icon`, `.bgm-wave` in `index.html`
- Produces: CSS rules for floating button, glassmorphism, active/paused states, and pulse rotation animation.

- [ ] **Step 1: Add BGM floating button styles to `css/style.css`**

Add the following CSS rules at the bottom of `css/style.css`:

```css
/* ==========================================================================
   BGM Floating Player Button
   ========================================================================== */
.bgm-toggle-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 999;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--accent-gold-light);
  box-shadow: 0 4px 12px rgba(197, 139, 126, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  outline: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.bgm-toggle-btn:active {
  transform: scale(0.92);
}

.bgm-icon {
  font-size: 1.1rem;
  line-height: 1;
  display: inline-block;
  transition: transform 0.4s ease;
}

.bgm-toggle-btn.playing .bgm-icon {
  animation: spinDisc 3s linear infinite;
  color: var(--accent-gold);
}

.bgm-toggle-btn.paused .bgm-icon {
  opacity: 0.6;
  filter: grayscale(0.5);
}

@keyframes spinDisc {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

- [ ] **Step 2: Commit CSS changes**

```bash
git add css/style.css
git commit -m "style(bgm): add glassmorphic floating bgm button styling and spin animation"
```

---

### Task 3: JS Audio Control & Autoplay Handler

**Files:**
- Modify: `js/app.js`

**Interfaces:**
- Consumes: `#bgm-player` and `#bgm-toggle-btn` DOM nodes
- Produces: `initBGMPlayer()` lifecycle function called on `DOMContentLoaded`

- [ ] **Step 1: Implement `initBGMPlayer()` in `js/app.js`**

Add `initBGMPlayer()` call in `DOMContentLoaded` listener and implement function:

```javascript
/* ==========================================================================
   BGM Player & Autoplay Handler
   ========================================================================== */
function initBGMPlayer() {
  const bgm = document.getElementById('bgm-player');
  const toggleBtn = document.getElementById('bgm-toggle-btn');
  if (!bgm || !toggleBtn) return;

  let isPlaying = false;

  function playBGM() {
    bgm.play().then(() => {
      isPlaying = true;
      toggleBtn.classList.remove('paused');
      toggleBtn.classList.add('playing');
    }).catch(err => {
      console.log('Autoplay prevented by browser:', err);
      isPlaying = false;
      toggleBtn.classList.remove('playing');
      toggleBtn.classList.add('paused');
    });
  }

  function pauseBGM() {
    bgm.pause();
    isPlaying = false;
    toggleBtn.classList.remove('playing');
    toggleBtn.classList.add('paused');
  }

  // Toggle button click handler
  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (isPlaying) {
      pauseBGM();
    } else {
      playBGM();
    }
  });

  // Attempt initial play & first user interaction play
  const enableAutoPlay = () => {
    if (!isPlaying) {
      playBGM();
    }
    document.removeEventListener('click', enableAutoPlay);
    document.removeEventListener('touchstart', enableAutoPlay);
  };

  document.addEventListener('click', enableAutoPlay, { once: true });
  document.addEventListener('touchstart', enableAutoPlay, { once: true });

  // Attempt immediate play if allowed
  playBGM();
}
```

- [ ] **Step 2: Add `initBGMPlayer()` invocation inside `DOMContentLoaded`**

```javascript
document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
  initGallery();
  initThanksToast();
  initBCutGallery();
  initNaverMap();
  initBGMPlayer();
});
```

- [ ] **Step 3: Commit JS changes**

```bash
git add js/app.js
git commit -m "feat(bgm): implement BGM audio play/pause toggle and gesture autoplay handler"
```

---

### Task 4: End-to-End Verification

- [ ] **Step 1: Check browser page & UI layout**
Verify the floating BGM button appears at top right (`top: 16px; right: 16px;`).
- [ ] **Step 2: Test audio playback**
Click BGM button and verify `Steal The Show.mp3` plays smoothly and icon animates. Click again to verify pause.
