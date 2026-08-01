document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
  initGallery();
  initThanksToast();
  initBCutGallery();
});

/* ==========================================================================
   1. D-Day Live Countdown Timer
   ========================================================================== */
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

/* ==========================================================================
   2. Photo Gallery & Lightbox Modal
   ========================================================================== */
const photoList = [
  "_DSC6200.jpg", "_DSC4473.jpg", "_DSC4481.jpg", "_DSC4484.JPG",
  "_DSC4506.jpg", "_DSC4514.jpg", "_DSC4515.JPG", "_DSC4530.jpg",
  "_DSC4541_1.JPG", "_DSC4566.JPG", "_DSC4600.JPG", "_DSC4767.jpg",
  "_DSC4861-편집.jpg", "_DSC4995.jpg", "_DSC5026.jpg", "_DSC6023.jpg",
  "_DSC6055.jpg", "_DSC6347.jpg", "_DSC6479.jpg", "_DSC6480.jpg",
  "_DSC6834.jpg", "_DSC6838.jpg", "_DSC6846.jpg", "_DSC6921.jpg",
  "2 복사.jpg", "7 복사_(2) 복사.jpg", "9 복사_(2) 복사.jpg", "KakaoTalk_20260425_095251276_01.jpg"
];

let currentIndex = 0;
let isExpanded = false;

function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const moreBtn = document.getElementById('gallery-more-btn');
  if (!grid) return;

  renderGallery(9);

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
    item.innerHTML = `<img src="pics/${encodeURIComponent(filename)}" alt="웨딩 화보 ${idx + 1}" loading="lazy">`;
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

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') changeLightboxPhoto(-1);
    if (e.key === 'ArrowRight') changeLightboxPhoto(1);
  });

  // Touch Swipe
  let touchStartX = 0;
  modal.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) changeLightboxPhoto(1);
    if (touchEndX - touchStartX > 50) changeLightboxPhoto(-1);
  }, { passive: true });
}

let currentPhotoList = photoList;

function openLightbox(index, customList = photoList) {
  currentPhotoList = customList;
  currentIndex = index;
  const modal = document.getElementById('lightbox-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  updateLightboxContent();
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function changeLightboxPhoto(dir) {
  currentIndex = (currentIndex + dir + currentPhotoList.length) % currentPhotoList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  img.src = `pics/${encodeURIComponent(currentPhotoList[currentIndex])}`;
  counter.innerText = `${currentIndex + 1} / ${currentPhotoList.length}`;
}

/* ==========================================================================
   3. Accordion Toggle for Account Information
   ========================================================================== */
function toggleAccordion(btn) {
  const item = btn.parentElement;
  const content = item.querySelector('.accordion-content');
  const isActive = item.classList.contains('active');

  // Close all accordions
  document.querySelectorAll('.accordion-item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.accordion-content').style.maxHeight = null;
  });

  if (!isActive) {
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

/* ==========================================================================
   4. Clipboard Copy & Toast Feedback
   ========================================================================== */
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text)
      .then(() => showToast('계좌번호가 복사되었습니다.'))
      .catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('계좌번호가 복사되었습니다.');
  } catch (err) {
    showToast('복사에 실패했습니다.');
  }
  document.body.removeChild(textArea);
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

/* ==========================================================================
   5. RSVP Form Handling & Modal (Google Sheets + LocalStorage Fallback)
   ========================================================================== */
// 구글 앱스 스크립트 웹앱 배포 URL (GOOGLE_SHEETS_GUIDE.md 참조)
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwxdrO9YCFkgDEAJtaTfuZrzYA69g2LCYgoli8TBOgFqba4-8AKi92JgeSQEmO7uFcwrw/exec';

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

  // 1. 전송 중 상태 표시 및 버튼 비활성화
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = '전송 중...';
  }

  // 2. 로컬 스토리지에 2차 백업 저장
  saveRSVPToLocalStorage(payload);

  // 3. 구글 스프레드시트로 데이터 전송 (URL 설정 시)
  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.warn('구글 시트 전송 중 오류 발생 (로컬 스토리지에는 저장됨):', err);
    }
  }

  // 4. 버튼 상태 복구 및 안내 모달 표시
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.innerText = originalBtnText;
  }

  const modal = document.getElementById('rsvp-modal');
  const modalDesc = document.getElementById('rsvp-modal-desc');
  const bcutBtn = document.getElementById('rsvp-bcut-go-btn');
  const hasMessage = message.length > 0;

  if (hasMessage) {
    unlockBCutGallery(false);
  }

  if (modalDesc) {
    if (hasMessage) {
      modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보와 따뜻한 축하 메시지가 전달되었습니다.<br><br>🎉 축하해주셔서 감사드립니다! 특별히 B컷 갤러리도 보고 가실래요?`;
      if (bcutBtn) bcutBtn.classList.remove('hidden');
    } else {
      modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보가 전달되었습니다.<br>소중한 걸음 마음 깊이 기억하겠습니다.`;
      if (bcutBtn) bcutBtn.classList.add('hidden');
    }
  }

  if (modal) {
    modal.classList.add('active');
  }

  form.reset();
  const thanksEl = document.getElementById('rsvp-msg-thanks');
  if (thanksEl) thanksEl.classList.remove('show');
}

function saveRSVPToLocalStorage(data) {
  try {
    const existing = JSON.parse(localStorage.getItem('wedding_rsvp_list') || '[]');
    existing.push(data);
    localStorage.setItem('wedding_rsvp_list', JSON.stringify(existing));
  } catch (e) {
    console.error('로컬스토리지 저장 실패:', e);
  }
}

function closeRSVPModal() {
  const modal = document.getElementById('rsvp-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}

/* ==========================================================================
   6. Thanks Note Toast & B-Cut Gallery Functions
   ========================================================================== */
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
    item.addEventListener('click', () => openLightbox(idx, bcutPhotoList));
    grid.appendChild(item);
  });
}

function scrollToRSVP() {
  const rsvpSection = document.querySelector('.rsvp-section');
  if (rsvpSection) {
    rsvpSection.scrollIntoView({ behavior: 'smooth' });
    const msgArea = document.getElementById('rsvp-msg');
    if (msgArea) setTimeout(() => msgArea.focus(), 600);
  }
}

function goToBCutGallery() {
  closeRSVPModal();
  unlockBCutGallery(true);
}
