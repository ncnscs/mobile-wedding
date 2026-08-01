# BGM Player Integration Design

## Overview
Add background music ("Steal The Show.mp3") to the mobile wedding invitation with a sleek floating glassmorphic toggle button and seamless audio auto-play handling.

## Requirements & Scope
1. **Audio Source**: `audio/Steal The Show.mp3` (already located in `audio/`).
2. **Floating BGM Control Button**:
   - Fixed position at the top right of the mobile invitation container (`top: 16px; right: 16px; z-index: 999;`).
   - Circular glassmorphic button styled to match the rose-gold/ambient cream wedding design system.
   - Smooth pulse / rotation micro-animation when audio is active; quiet state when paused.
3. **Audio Playback Logic**:
   - Autoplay policy compliance: attempt muted/unmuted playback or play on first user interaction (touch/click) anywhere on the document.
   - Seamless loop playback (`loop` attribute on HTML `<audio>` tag).
   - Click event handler on BGM button to toggle play/pause state dynamically.

## Component Details
- `index.html`: Add `<audio id="bgm-player" src="audio/Steal The Show.mp3" loop preload="auto"></audio>` and floating button `<button id="bgm-toggle-btn" class="bgm-toggle-btn paused" aria-label="음악 재생/일시정지">`.
- `css/style.css`: Add styles for `.bgm-toggle-btn`, pulse animation, equalizer/disc icon styles.
- `js/app.js`: Add `initBGMPlayer()` to manage audio lifecycle, user gesture triggers, button state toggle, and event listeners.

## Verification Plan
1. Launch local dev server or check existing page.
2. Verify BGM button renders gracefully on the top-right of mobile container.
3. Click BGM button to test play/pause audio playback of `Steal The Show.mp3`.
4. Test animation active state when playing and paused state when stopped.
