# RSVP Google Sheets Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Connect the mobile wedding invitation's RSVP form to Google Sheets via Google Apps Script (GAS) Web App, while providing local storage fallback and detailed setup documentation.

**Architecture:** Update `js/app.js` to handle asynchronous form submissions, send data to Google Apps Script, fallback to `localStorage`, and update UI state. Create `GOOGLE_SHEETS_GUIDE.md` for clear setup instructions.

**Tech Stack:** HTML5, Vanilla JavaScript (ES6+), Google Apps Script

## Global Constraints
- Target workspace: `260731_mobileWedding`
- Keep dependencies zero (vanilla JavaScript)
- Do not break existing UI/CSS styling

---

### Task 1: Update `js/app.js` with Google Sheets API submit & LocalStorage Fallback

**Files:**
- Modify: `js/app.js:216-243`

**Interfaces:**
- Consumes: `#rsvp-form` HTML inputs (`side`, `rsvp-name`, `rsvp-phone`, `rsvp-count`, `meal`, `rsvp-msg`)
- Produces: `handleRSVPSubmit(event)` async function, `saveRSVPToLocalStorage(data)`

- [ ] **Step 1: Update `handleRSVPSubmit` in `js/app.js` to support async fetch & loading state**

```javascript
/* ==========================================================================
   5. RSVP Form Handling & Modal (Google Sheets + LocalStorage Fallback)
   ========================================================================== */
// Change this URL to your deployed Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = '';

async function handleRSVPSubmit(event) {
  event.preventDefault();
  
  const submitBtn = document.querySelector('.rsvp-submit-btn');
  const originalBtnText = submitBtn ? submitBtn.innerText : '참석 의사 전달하기';
  
  const form = document.getElementById('rsvp-form');
  const side = form.querySelector('input[name="side"]:checked')?.value === 'groom' ? '신랑측' : '신부측';
  const name = document.getElementById('rsvp-name')?.value.trim() || '하객';
  const phone = document.getElementById('rsvp-phone')?.value.trim() || '';
  const count = document.getElementById('rsvp-count')?.value || '1';
  
  const mealVal = form.querySelector('input[name="meal"]:checked')?.value;
  const mealMap = { yes: '식사함', no: '안함', undecided: '미정' };
  const meal = mealMap[mealVal] || '미정';
  
  const message = document.getElementById('rsvp-msg')?.value.trim() || '';
  
  const payload = {
    timestamp: new Date().toLocaleString('ko-KR'),
    side,
    name,
    phone,
    count,
    meal,
    message
  };

  // Set loading state
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = '전송 중...';
  }

  // Save to LocalStorage as backup
  saveRSVPToLocalStorage(payload);

  // Send to Google Sheets if URL configured
  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('Google Sheets transmission error, stored in localStorage:', err);
    }
  }

  // Restore button state & show modal
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = originalBtnText;
  }

  const modal = document.getElementById('rsvp-modal');
  const modalDesc = document.getElementById('rsvp-modal-desc');
  
  if (modalDesc) {
    modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보가 전달되었습니다.<br>소중한 걸음 마음 깊이 기억하겠습니다.`;
  }
  if (modal) {
    modal.classList.add('active');
  }

  form.reset();
}

function saveRSVPToLocalStorage(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
    existing.push(data);
    localStorage.setItem('wedding_rsvp_list', JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save to LocalStorage', e);
  }
}
```

- [ ] **Step 2: Commit changes**

```bash
git add js/app.js
git commit -m "feat: integrate Google Sheets and LocalStorage fallback into RSVP form submission"
```

---

### Task 2: Create Google Sheets Setup Guide File (`GOOGLE_SHEETS_GUIDE.md`)

**Files:**
- Create: `GOOGLE_SHEETS_GUIDE.md`

- [ ] **Step 1: Write setup guide markdown**

Create `GOOGLE_SHEETS_GUIDE.md` detailing step-by-step instructions for Google Apps Script deployment.

- [ ] **Step 2: Commit changes**

```bash
git add GOOGLE_SHEETS_GUIDE.md
git commit -m "docs: add step-by-step Google Sheets Apps Script setup guide"
```
