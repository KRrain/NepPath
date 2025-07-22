// Toggle hamburger menu
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  navMenu.classList.toggle("active");
}

// EmailJS form handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.sendForm('service_zd5htum', 'template_3zijr45', this)
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
      document.getElementById('contactAlert').style.display = 'block';
      document.getElementById('contactForm').reset();
    }, function(error) {
      console.log('FAILED...', error);
      alert('❌ Failed to send message. Please try again.');
    });
});