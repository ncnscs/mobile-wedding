# RSVP Google Sheets Integration Design Specification

## Overview
Connect the mobile wedding invitation's RSVP form to Google Sheets via Google Apps Script (GAS) Web App, while providing local storage fallback so no RSVP responses are lost.

## Component & Data Flow
1. **Frontend Form (`index.html` & `js/app.js`)**:
   - Collects fields: `side` (groom/bride), `name`, `phone`, `count`, `meal` (yes/no/undecided), `message`.
   - Sends payload as JSON via `fetch(GOOGLE_SCRIPT_URL)` using `no-cors` or JSON mode to prevent CORS issues.
   - Shows loading state on submit button during request.
   - Stores backup copy in `localStorage` under `rsvp_submissions`.
   - Displays completion modal (`#rsvp-modal`) upon finish.

2. **Google Apps Script (GAS)**:
   - Receives POST request data in `doPost(e)`.
   - Appends row with timestamp, side, name, phone, count, meal, and message.
   - Handles CORS and returning success response.

3. **Fallback & Error Handling**:
   - If `GOOGLE_SCRIPT_URL` is empty or fetch fails, data is safely saved in local storage.
   - Alert/Modal displays confirmation regardless so user experience is smooth.

## File Changes
- `js/app.js`: Add `GOOGLE_SCRIPT_URL` config variable, asynchronous `handleRSVPSubmit`, loading button handling, localStorage backup function.
- `index.html`: Update submit button with ID or attributes if needed for loading state.
- `README.md` or `GOOGLE_SHEETS_GUIDE.md`: Document step-by-step instructions for setting up Google Apps Script.
