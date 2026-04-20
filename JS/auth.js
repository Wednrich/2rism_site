$(document).ready(function () {

  /* =========================
     LOGIN
  ========================= */

  $('#loginForm').submit(function (e) {
    e.preventDefault();

    const email = $('#email').val().trim();
    const password = $('#password').val();

    if (!email || !password) {
      showError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      u => u.email === email && u.password === password
    );

    if (!user) {
      showError('Invalid email or password');
      return;
    }

    // save logged user
    localStorage.setItem('currentUser', JSON.stringify(user));

    showSuccess('Login successful! Redirecting...');

    setTimeout(() => {
      window.location.href = 'profile.html';
    }, 1200);
  });


  /* =========================
     REGISTER
  ========================= */

  $('#registerForm').submit(function (e) {
    e.preventDefault();

    const fullName = $('#fullName').val().trim();
    const email = $('#email').val().trim();
    const password = $('#password').val();
    const confirmPassword = $('#confirmPassword').val();

    if (!fullName || !email || !password || !confirmPassword) {
      showError('Please fill in all required fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showError('Invalid email address');
      return;
    }

    if (password.length < 8) {
      showError('Password must be at least 8 characters');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.find(u => u.email === email)) {
      showError('User with this email already exists');
      return;
    }

    const newUser = {
      id: Date.now(),
      fullName,
      email,
      password,
      createdAt: new Date().toISOString(),
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=2193b0&color=fff`
    };

    users.push(newUser);

    // 🔥 САМОЕ ВАЖНОЕ
    localStorage.setItem('users', JSON.stringify(users));

    showSuccess('Account created successfully! Redirecting to login...');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });


  /* =========================
     UI HELPERS
  ========================= */

  function showError(message) {
    $('#errorMessage').text(message).fadeIn(200);
    $('#successMessage').hide();
    setTimeout(() => $('#errorMessage').fadeOut(300), 3000);
  }

  function showSuccess(message) {
    $('#successMessage').text(message).fadeIn(200);
    $('#errorMessage').hide();
  }

});
