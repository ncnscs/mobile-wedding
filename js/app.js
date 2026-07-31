document.addEventListener('DOMContentLoaded', () => {
  initDDayTimer();
  initGallery();
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

function openLightbox(index) {
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
  currentIndex = (currentIndex + dir + photoList.length) % photoList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img = document.getElementById('lightbox-img');
  const counter = document.getElementById('lightbox-counter');
  img.src = `pics/${encodeURIComponent(photoList[currentIndex])}`;
  counter.innerText = `${currentIndex + 1} / ${photoList.length}`;
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
   5. RSVP Form Handling & Modal
   ========================================================================== */
function handleRSVPSubmit(event) {
  event.preventDefault();
  const nameInput = document.getElementById('rsvp-name');
  const name = nameInput ? nameInput.value.trim() : '하객';

  const modal = document.getElementById('rsvp-modal');
  const modalDesc = document.getElementById('rsvp-modal-desc');
  
  if (modalDesc) {
    modalDesc.innerHTML = `<strong>${name}</strong>님, 참석 정보가 전달되었습니다.<br>소중한 걸음 마음 깊이 기억하겠습니다.`;
  }
  if (modal) {
    modal.classList.add('active');
  }

  document.getElementById('rsvp-form').reset();
}

function closeRSVPModal() {
  const modal = document.getElementById('rsvp-modal');
  if (modal) {
    modal.classList.remove('active');
  }
}
