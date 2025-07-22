function toggleMenu() {
  const nav = document.getElementById('navMenu');
  nav.classList.toggle('active');
}

function openSignin() {
  document.getElementById('signinPopup').style.display = 'block';
}

function closeSignin() {
  document.getElementById('signinPopup').style.display = 'none';
}

function showAlert(message, type) {
  const alert = document.getElementById('alertBox');
  alert.textContent = message;
  alert.className = `alert ${type}`;
  alert.style.display = 'block';

  // Remove alert after 3s
  setTimeout(() => {
    alert.style.display = 'none';
  }, 3000);
}

function submitLogin() {
  const pass = document.getElementById('passwordInput').value;
  if (pass === 'admin123') {
    showAlert('Login Successful!', 'success');
    closeSignin();
  } else {
    showAlert('Incorrect Password!', 'error');
  }
}