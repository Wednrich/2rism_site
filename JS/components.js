$(document).ready(function () {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  const headerHTML = `
    <nav>
      <a href="home.html" class="logo">
        <i class="fas fa-globe-americas"></i> TourHub
      </a>

      <ul class="nav-links">
        <li><a href="home.html">Home</a></li>
        <li><a href="tours.html">Tours</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact</a></li>
        <li><a href="favorites.html">Favorites</a></li>
      </ul>

      <div class="user-section">
        <button class="profile-btn" id="profileBtn"></button>
        <button class="profile-btn logout-btn" id="logoutBtn"></button>
        <div class="menu-toggle">
          <i class="fas fa-bars"></i>
        </div>
      </div>
    </nav>
  `;
  $('header').html(headerHTML);

  const footerHTML = `
    <div class="footer-content">
      <div class="footer-section">
        <h3>TourHub</h3>
        <p>Your gateway to amazing travel experiences around the world.</p>
      </div>
    </div>
  `;
  $('footer').html(footerHTML);

  const path = window.location.pathname;

  $('.nav-links a').each(function () {
    const href = $(this).attr('href');

    if (path.includes(href)) {
      $(this).addClass('active');
    }
  });

  if (path === '/' || path === '' || path.includes('index')) {
    $('.nav-links a[href="home.html"]').addClass('active');
  }

  const profileBtn = $('#profileBtn');
  const logoutBtn = $('#logoutBtn');

  if (user) {
    profileBtn.html(`<i class="fas fa-user"></i> Profile`);
    profileBtn.on('click', function () {
      window.location.href = 'profile.html';
    });

    logoutBtn.html(`<i class="fas fa-sign-out-alt"></i> Logout`);
    logoutBtn.on('click', function () {
      localStorage.removeItem('currentUser');
      window.location.href = 'home.html';
    });
  } else {
    profileBtn.html('LOGIN');
    profileBtn.on('click', function () {
      window.location.href = 'login.html';
    });

    logoutBtn.hide();
  }

  $('.menu-toggle').on('click', function () {
    $('.nav-links').toggleClass('active');
  });
});
