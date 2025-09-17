function base64ToUtf8(str) {
  return decodeURIComponent(atob(str).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

async function initializeCountdown() {
  const finishedMessageEncoded = "0K8g0YLQtdCx0Y8g0L7QsdC+0LbQsNGOIOKdpO+4jw==";
  const targetDate = new Date(Date.UTC(2025, 11, 25, 3, 35, 0));
  const finishedMessage = base64ToUtf8(finishedMessageEncoded);

  let timerInterval;

  async function syncTimeAndStartCountdown() {
    let timeDifference = targetDate.getTime() - new Date().getTime();

    function updateCountdown() {
      if (timeDifference <= 0) {
        document.getElementById('countdown-timer').style.display = 'none';
        document.getElementById('message').textContent = finishedMessage;
        document.getElementById('message').style.fontSize = '2.5rem';
        clearInterval(timerInterval);
        return;
      }

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
      document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
      document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

      timeDifference -= 1000;
    }

    clearInterval(timerInterval);

    updateCountdown();

    timerInterval = setInterval(updateCountdown, 1000);
  }

  syncTimeAndStartCountdown();

  setInterval(syncTimeAndStartCountdown, 6 * 60 * 60 * 1000);
}

initializeCountdown();