function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("show");
}

function showAlert(message) {
  const alertBox = document.getElementById("alertBox");
  alertBox.innerText = message;
  alertBox.style.display = "block";
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 3000);
}