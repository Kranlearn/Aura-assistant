/* ========================================
   AURA ASSISTANT - ROUTINE & TIMER LOGIC
   ============================================ */

class RoutineManager {
  constructor(mascot) {
    this.mascot = mascot;

    // Éléments du Pomodoro
    this.timerMinutes = document.getElementById('timerMinutes');
    this.timerSeconds = document.getElementById('timerSeconds');
    this.startBtn = document.getElementById('startTimerBtn');
    this.resetBtn = document.getElementById('resetTimerBtn');

    // Éléments de navigation & panneaux
    this.modeButtons = document.querySelectorAll('.mode-btn');
    this.workPanel = document.getElementById('workPanel');
    this.sleepPanel = document.getElementById('sleepPanel');

    // État du timer
    this.timeLeft = 25 * 60; // 25 minutes en secondes
    this.timerId = null;
    this.isRunning = false;

    this.init();
  }

  init() {
    // Gestion des événements du timer
    if (this.startBtn) {
      this.startBtn.addEventListener('click', () => this.toggleTimer());
    }
    if (this.resetBtn) {
      this.resetBtn.addEventListener('click', () => this.resetTimer());
    }

    // Gestion du changement de mode (Travail / Sommeil)
    this.modeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchMode(e.target.dataset.mode));
    });
  }

  // Lancer ou mettre en pause le Pomodoro
  toggleTimer() {
    if (this.isRunning) {
      this.pauseTimer();
    } else {
      this.startTimer();
    }
  }

  startTimer() {
    this.isRunning = true;
    this.startBtn.textContent = 'Pause';
    this.startBtn.classList.remove('btn-primary');
    this.startBtn.classList.add('btn-secondary');

    if (this.mascot) {
      this.mascot.setMessage("C'est parti pour 25 minutes de focus intense !", "focused");
    }

    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.updateTimerDisplay();
      } else {
        this.onTimerComplete();
      }
    }, 1000);
  }

  pauseTimer() {
    this.isRunning = false;
    clearInterval(this.timerId);
    this.startBtn.textContent = 'Reprendre';
    this.startBtn.classList.remove('btn-secondary');
    this.startBtn.classList.add('btn-primary');

    if (this.mascot) {
      this.mascot.setMessage("Pause marquée. Respire un coup et réessaie quand tu veux.", "neutral");
    }
  }

  resetTimer() {
    this.pauseTimer();
    this.timeLeft = 25 * 60;
    this.updateTimerDisplay();
    this.startBtn.textContent = 'Démarrer';

    if (this.mascot) {
      this.mascot.setMessage("Timer réinitialisé. Prêt pour un nouveau cycle ?", "neutral");
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;

    this.timerMinutes.textContent = String(minutes).padStart(2, '0');
    this.timerSeconds.textContent = String(seconds).padStart(2, '0');
  }

  onTimerComplete() {
    this.pauseTimer();
    this.startBtn.textContent = 'Démarrer';
    if (this.mascot) {
      this.mascot.setMessage("Session terminée ! Prends une vraie pause de 5 minutes.", "happy");
      this.mascot.speakCurrentMessage();
    }
  }

  // Basculer entre l'onglet Travail et l'onglet Sommeil
  switchMode(mode) {
    this.modeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    if (mode === 'work') {
      this.workPanel.classList.remove('hidden');
      this.sleepPanel.classList.add('hidden');
      if (this.mascot) {
        this.mascot.setMessage("Mode Travail activé. Découpons du code !", "focused");
      }
    } else if (mode === 'sleep') {
      this.workPanel.classList.add('hidden');
      this.sleepPanel.classList.remove('hidden');
      if (this.mascot) {
        this.mascot.setMessage("Mode Sommeil. Il est temps de préparer ta nuit d'ici 23h.", "sleepy");
      }
    }
  }
}

// Export pour utilisation dans app.js
window.RoutineManager = RoutineManager;