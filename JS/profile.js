const currentUser = JSON.parse(localStorage.getItem('currentUser'));

if (!currentUser) {
  window.location.href = 'login.html';
}

const nameEl = document.getElementById('profileName');
const emailEl = document.getElementById('profileEmail');
const avatarEl = document.querySelector('.profile-avatar');

if (nameEl) nameEl.textContent = currentUser.fullName;
if (emailEl) emailEl.textContent = currentUser.email;

if (avatarEl) {
  avatarEl.src =
    currentUser.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      currentUser.fullName
    )}&background=2193b0&color=fff&size=200`;
}

const favoritesToursKey = `favoritesTours_${currentUser.id}`;
const bookedToursKey = `bookedTours_${currentUser.id}`;

const favoritesTours =
  JSON.parse(localStorage.getItem(favoritesToursKey)) || [];

const bookedTours =
  JSON.parse(localStorage.getItem(bookedToursKey)) || [];

const favoritesContainer = document.getElementById('profile-favorites-tours');
const bookedContainer = document.getElementById('profile-booked-tours');

if (favoritesContainer) {
  if (!favoritesTours.length) {
    favoritesContainer.innerHTML =
      `<p class="empty-text">No favorite tours yet.</p>`;
  } else {
    favoritesContainer.innerHTML = '';
    favoritesTours.forEach(tour => {
      favoritesContainer.innerHTML += `
        <div class="tour-card">
          <img src="${tour.img}" alt="${tour.name}">
          <div class="tour-content">
            <h3>${tour.name}</h3>
            <p>${tour.desc}</p>
            <div class="tour-meta">
              <span class="tour-price">${tour.price}</span>
            </div>
          </div>
        </div>
      `;
    });
  }
}

if (bookedContainer) {
  if (!bookedTours.length) {
    bookedContainer.innerHTML =
      `<p class="empty-text">No booked tours yet.</p>`;
  } else {
    bookedContainer.innerHTML = '';
    bookedTours.forEach(tour => {
      bookedContainer.innerHTML += `
  <div class="tour-card">
    <img src="${tour.img}" alt="${tour.name}">
    <div class="tour-content">
      <h3>${tour.name}</h3>
      <p>${tour.desc}</p>
      <div class="tour-meta">
        <span class="tour-price">${tour.price}</span>
        <button class="cancel-btn" onclick="cancelBooking(${tour.id})">
          Cancel
        </button>
      </div>
    </div>
  </div>
`;

    });
  }
}

function cancelBooking(tourId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const bookedKey = `bookedTours_${currentUser.id}`;

  let bookedTours = JSON.parse(localStorage.getItem(bookedKey)) || [];

  const tour = bookedTours.find(t => t.id === tourId);

  bookedTours = bookedTours.filter(t => t.id !== tourId);
  localStorage.setItem(bookedKey, JSON.stringify(bookedTours));

  showBookingAlert(`${tour.name} booking cancelled`);

  setTimeout(() => {
    location.reload();
  }, 300);
}

function showBookingAlert(text) {
  const modal = document.getElementById('bookingModal');
  const message = document.getElementById('bookingText');

  message.textContent = text;
  modal.style.display = 'flex';
}
document.getElementById('closeBookingModal')?.addEventListener('click', () => {
  document.getElementById('bookingModal').style.display = 'none';
});
