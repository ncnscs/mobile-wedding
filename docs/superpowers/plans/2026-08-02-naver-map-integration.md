# Naver Map Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace OpenStreetMap iframe in the mobile wedding invitation with an interactive Naver Map (Naver Maps API v3) showing the venue marker at 파주 웨딩마을.

**Architecture:** Include Naver Map v3 script tag in HTML head/body, replace iframe with `#naver-map` container, initialize `naver.maps.Map` with venue marker and info window in JS, and apply styling in CSS.

**Tech Stack:** HTML5, Vanilla JavaScript, CSS3, Naver Maps API v3

## Global Constraints
- Target Address: 경기 파주시 탄현면 헤이리마을길 76-12 (웨딩마을)
- Coordinates: Latitude 37.7888749, Longitude 126.6997458
- Maintain existing external map link buttons (카카오맵, 네이버지도, 티맵).

---

### Task 1: Update HTML Structure for Naver Map (`index.html`)

**Files:**
- Modify: `index.html:202-208`

**Interfaces:**
- Consumes: Naver Maps API Script (`https://oapi.map.naver.com/openapi/v3/maps.js`)
- Produces: `#naver-map` container DOM element

- [ ] **Step 1: Inspect `index.html` map container section**

Verify the current `<iframe src="https://www.openstreetmap.org/...">` placement inside `<div class="map-container">`.

- [ ] **Step 2: Replace iframe with `#naver-map` div and add Naver Maps API script in `index.html`**

In `<head>` of `index.html`:
```html
<script type="text/javascript" src="https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"></script>
```

In `<div class="map-container">` of `index.html`:
```html
<div class="map-container">
  <div id="naver-map" style="width: 100%; height: 280px; border-radius: var(--radius-sm);"></div>
</div>
```

- [ ] **Step 3: Commit HTML changes**

```bash
git add index.html
git commit -m "feat(location): replace OpenStreetMap iframe with naver-map container"
```

---

### Task 2: Implement Naver Map Initialization Logic (`js/app.js`)

**Files:**
- Modify: `js/app.js:1-6` and append `initNaverMap()`

**Interfaces:**
- Consumes: `#naver-map` DOM element, `window.naver.maps`
- Produces: Interactive map with marker and info window centered at wedding venue

- [ ] **Step 1: Add `initNaverMap()` call to `DOMContentLoaded` listener**

In `js/app.js`:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
  initGallery();
  initThanksToast();
  initBCutGallery();
  initNaverMap();
});
```

- [ ] **Step 2: Implement `initNaverMap()` function with venue marker & fallback**

```javascript
/* ==========================================================================
   Naver Map Initialization
   ========================================================================== */
function initNaverMap() {
  const mapEl = document.getElementById('naver-map');
  if (!mapEl) return;

  const lat = 37.7888749;
  const lng = 126.6997458;

  // Check if Naver Maps API script is loaded
  if (typeof naver === 'undefined' || !naver.maps) {
    mapEl.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; background:var(--bg-card); border-radius:var(--radius-sm); border:1px solid var(--gold-subtle); padding:20px; text-align:center;">
        <p style="margin-bottom:8px; font-weight:600; color:var(--text-dark);">📍 파주 웨딩마을</p>
        <p style="font-size:13px; color:var(--text-muted); margin-bottom:12px;">경기 파주시 탄현면 헤이리마을길 76-12</p>
        <p style="font-size:12px; color:var(--gold-accent);">네이버 지도 API 인증키(Client ID) 설정 후 이용 가능합니다.</p>
      </div>
    `;
    return;
  }

  const venueLatLng = new naver.maps.LatLng(lat, lng);
  const mapOptions = {
    center: venueLatLng,
    zoom: 16,
    zoomControl: true,
    zoomControlOptions: {
      position: naver.maps.Position.TOP_RIGHT
    }
  };

  const map = new naver.maps.Map('naver-map', mapOptions);

  const marker = new naver.maps.Marker({
    position: venueLatLng,
    map: map,
    title: '웨딩마을'
  });

  const infoWindow = new naver.maps.InfoWindow({
    content: '<div style="padding:8px 12px; font-size:13px; font-weight:600; color:#333; background:#fff; border-radius:6px; box-shadow:0 2px 6px rgba(0,0,0,0.15);">📍 웨딩마을</div>',
    borderWidth: 0,
    backgroundColor: 'transparent',
    anchorSize: new naver.maps.Size(10, 10)
  });

  infoWindow.open(map, marker);
}
```

- [ ] **Step 3: Commit JS changes**

```bash
git add js/app.js
git commit -m "feat(location): add initNaverMap function with marker and fallback"
```

---

### Task 3: CSS Styles for Naver Map Container (`css/style.css`)

**Files:**
- Modify: `css/style.css`

**Interfaces:**
- Consumes: `#naver-map` element
- Produces: CSS styling for map box and controls

- [ ] **Step 1: Add `#naver-map` styling to `css/style.css`**

```css
#naver-map {
  width: 100%;
  height: 280px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}
```

- [ ] **Step 2: Commit CSS changes**

```bash
git add css/style.css
git commit -m "style(location): add CSS styles for naver-map container"
```
