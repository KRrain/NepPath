function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}

document.getElementById("joinForm").addEventListener("submit", function(e) {
  e.preventDefault();

  emailjs.sendForm('service_nkinmur', 'template_89bwhhk', this)
    .then(function() {
      const alertBox = document.getElementById("alertBox");
      alertBox.style.display = "block";
      alertBox.textContent = "✅ Application submitted! Check your email.";
      setTimeout(() => {
        alertBox.style.display = "none";
      }, 4000);
    }, function(error) {
      alert("❌ Failed to send. Please try again.\n" + JSON.stringify(error));
    });

  this.reset();
});