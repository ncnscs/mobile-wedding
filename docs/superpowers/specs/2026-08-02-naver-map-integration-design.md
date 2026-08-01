# Design Spec: Naver Map Integration for Location Section

## Summary
Replace OpenStreetMap embed iframe in the mobile wedding invitation's "오시는 길" (Location) section with an interactive Naver Map (Naver Maps API v3), rendering a pin marker at the wedding venue (파주 웨딩마을).

## Requirements
1. **HTML Structure (`index.html`)**:
   - Replace `<iframe src="https://www.openstreetmap.org/...">` inside `<div class="map-container">` with a dynamic div container `#naver-map`.
   - Add Naver Map v3 OpenAPI script tag in `<head>` (or before closing `</body>`).
   - Retain the bottom navigation buttons (카카오맵, 네이버지도, 티맵) for app deep-linking.

2. **JavaScript Logic (`js/app.js`)**:
   - Add `initNaverMap()` function initialized on `DOMContentLoaded`.
   - Coordinates: `37.7888749` (Latitude), `126.6997458` (Longitude).
   - Zoom level: `16` (optimal for venue view).
   - Place a `naver.maps.Marker` at venue coordinates.
   - Attach a `naver.maps.InfoWindow` displaying "웨딩마을".
   - Include graceful fallback handling if `window.naver` or Client ID is invalid/not loaded.

3. **Styling (`css/style.css`)**:
   - Style `#naver-map` container with `width: 100%`, `height: 280px`, `border-radius: var(--radius-sm)`, and `overflow: hidden`.

## Components Affected
- `index.html`: Update map container and add script tag.
- `js/app.js`: Add `initNaverMap()` function call.
- `css/style.css`: Add styles for `#naver-map` container.
