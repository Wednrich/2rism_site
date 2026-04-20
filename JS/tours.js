const currentUser = JSON.parse(localStorage.getItem('currentUser'));

const toursData = [
  {
    id: 1,
    name: "European Adventure",
    desc: "Explore 5 amazing European cities in 10 days.",
    img: "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=600",
    price: "$2,499",
    category: "europe"
  },
  {
    id: 2,
    name: "Asian Discovery",
    desc: "Tokyo, Bangkok, Bali, and Singapore in 12 days.",
    img: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600",
    price: "$1,999",
    category: "asia"
  },
  {
    id: 3,
    name: "Tropical Paradise",
    desc: "7 nights in Maldives luxury villas.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600",
    price: "$3,499",
    category: "tropical"
  },
  {
    id: 4,
    name: "Dubai Luxury Tour",
    desc: "Burj Khalifa, desert safari, luxury resorts.",
    img: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=600",
    price: "$2,799",
    category: "middle-east"
  },
  {
    id: 5,
    name: "Iceland Explorer",
    desc: "Northern lights, glaciers, waterfalls.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600",
    price: "$2,299",
    category: "europe"
  },
  {
    id: 6,
    name: "Japan Culture Trip",
    desc: "Kyoto temples, Tokyo nightlife, Mt. Fuji.",
    img: "https://images.unsplash.com/photo-1549693578-d683be217e58?w=600",
    price: "$2,199",
    category: "asia"
  }
];

const toursContainer = document.getElementById('tours-container');

const favoritesKey = currentUser
  ? `favoritesTours_${currentUser.id}`
  : null;

const bookedKey = currentUser
  ? `bookedTours_${currentUser.id}`
  : null;

let favoritesTours = favoritesKey
  ? JSON.parse(localStorage.getItem(favoritesKey)) || []
  : [];

function isFavorite(id) {
  return favoritesTours.some(t => t.id === id);
}

function getPriceNumber(price) {
  return parseInt(price.replace(/[^0-9]/g, ''));
}

let currentCategory = 'all';

function filterTours(category) {
  currentCategory = category;
  applyFilters();
}

function applyFilters() {
  const minPrice =
    parseInt(document.getElementById('minPrice')?.value) || 0;
  const maxPrice =
    parseInt(document.getElementById('maxPrice')?.value) || Infinity;

  let filtered = [...toursData];

  if (currentCategory !== 'all') {
    filtered = filtered.filter(
      tour => tour.category === currentCategory
    );
  }

  filtered = filtered.filter(tour => {
    const price = getPriceNumber(tour.price);
    return price >= minPrice && price <= maxPrice;
  });

  renderTours(filtered);
}

function renderTours(tours) {
  toursContainer.innerHTML = '';

  if (!tours.length) {
    toursContainer.innerHTML =
      `<p style="text-align:center;color:#666;">No tours found.</p>`;
    return;
  }

  tours.forEach(tour => {
    const favoriteClass = isFavorite(tour.id) ? 'fas' : 'far';

    toursContainer.innerHTML += `
      <div class="tour-card">
        <img src="${tour.img}" alt="${tour.name}">
        <div class="tour-content">
          <h3>${tour.name}</h3>
          <p>${tour.desc}</p>
          <div class="tour-meta">
            <span class="tour-price">${tour.price}</span>
            <button class="book-btn" onclick="bookTour(${tour.id})">
              Book Now
            </button>
            <button class="favorite-btn" onclick="toggleFavorite(${tour.id})">
              <i class="${favoriteClass} fa-heart"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

function toggleFavorite(tourId) {
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  const tour = toursData.find(t => t.id === tourId);
  const index = favoritesTours.findIndex(t => t.id === tourId);

  if (index > -1) {
    favoritesTours.splice(index, 1);
  } else {
    favoritesTours.push(tour);
  }

  localStorage.setItem(favoritesKey, JSON.stringify(favoritesTours));
  applyFilters();
}

function bookTour(tourId) {
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  let bookedTours =
    JSON.parse(localStorage.getItem(bookedKey)) || [];

  const tour = toursData.find(t => t.id === tourId);

  if (bookedTours.some(t => t.id === tourId)) {
    showBookingAlert(`${tour.name} is already booked`);
    return;
  }

  bookedTours.push(tour);
  localStorage.setItem(bookedKey, JSON.stringify(bookedTours));

  showBookingAlert(tour.name);
}

function showBookingAlert(text) {
  const modal = document.getElementById('bookingModal');
  const message = document.getElementById('bookingText');

  message.textContent = `Great! ${text} will be booked`;
  modal.style.display = 'flex';
}

document.getElementById('closeBookingModal')?.addEventListener('click', () => {
  document.getElementById('bookingModal').style.display = 'none';
});

renderTours(toursData);
