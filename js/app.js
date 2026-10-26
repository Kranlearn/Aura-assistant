// Gestion des onglets interactifs
    const modeBtns = document.querySelectorAll('.mode-btn');
    const panels = document.querySelectorAll('.panel');

    modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        modeBtns.forEach(b => b.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(btn.dataset.target).classList.add('active');
      });
    });

    // Interaction Mascotte
    const mascot = document.getElementById('mascotAvatar');
    const speechBubble = document.getElementById('speechBubble');
    const quotes = [
      "Je veille sur ton rythme, code bien !",
      "Pense à t'hydrater avec un bon thé au miel.",
      "Focus maximum activé 🚀",
      "Une petite pause s'imposera bientôt."
    ];

    mascot.addEventListener('click', () => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      speechBubble.style.opacity = '0';
      setTimeout(() => {
        speechBubble.textContent = randomQuote;
        speechBubble.style.opacity = '1';
      }, 150);
    });

    // Logique Timer Pomodoro simple
    let timerInterval;
    let timeLeft = 25 * 60;
    const timerDisplay = document.getElementById('timerDisplay');
    const startTimerBtn = document.getElementById('startTimer');
    const resetTimerBtn = document.getElementById('resetTimer');
    const consoleLog = document.getElementById('consoleLog');

    function updateTimerDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    startTimerBtn.addEventListener('click', () => {
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        startTimerBtn.textContent = "Démarrer";
        consoleLog.textContent = "> Session Pomodoro en pause.";
        return;
      }

      startTimerBtn.textContent = "Pause";
      consoleLog.textContent = "> Session de travail lancée ⚡";
      timerInterval = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateTimerDisplay();
        } else {
          clearInterval(timerInterval);
          consoleLog.textContent = "> Temps écoulé ! Prends une pause.";
        }
      }, 1000);
    });

    resetTimerBtn.addEventListener('click', () => {
      clearInterval(timerInterval);
      timerInterval = null;
      timeLeft = 25 * 60;
      updateTimerDisplay();
      startTimerBtn.textContent = "Démarrer";
      consoleLog.textContent = "> Timer réinitialisé.";
    });
    // --- Logique d'ouverture / fermeture au clic sur la mascotte ---
const appContainer = document.querySelector('.app-container');
const mascotAvatar = document.getElementById('mascotAvatar');

mascotAvatar.addEventListener('click', (e) => {
  // Empêche de déclencher d'autres actions si besoin
  e.stopPropagation();
  
  // Bascule la classe 'minimized' pour ouvrir ou fermer le panneau
  appContainer.classList.toggle('minimized');
});