document.getElementById('scroll').addEventListener('click', function() {
    console.log('clicked');
    document.getElementById('adopt-section').scrollIntoView({
      behavior: 'smooth'
    });
});


const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";

  setTimeout(function () {
    displayAllPets();
  }, 2000)
}
const handleLoad = () => {
  document.getElementById("spinner").style.display = "none";
}

function showCountdownModal() {
  const countdownModal = document.getElementById("countdownModal");
  const countdownText = document.getElementById("countdownText");

  let countdown = 3;
  countdownText.textContent = `Closing in ${countdown} seconds...`;

  countdownModal.showModal();

  const countdownInterval = setInterval(() => {
    countdown--;  // Decrease countdown time
    countdownText.textContent = `Closing in ${countdown} seconds...`;

    if (countdown <= 0) {
      clearInterval(countdownInterval); 
      countdownModal.close();
    }
  }, 1000);
}

