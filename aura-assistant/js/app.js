/* ==========================================================================
   AURA ASSISTANT - MAIN APP INITIALIZATION
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialiser l'horloge en temps réel dans l'en-tête
  const clockElement = document.getElementById('clock');
  
  function updateClock() {
    if (!clockElement) return;
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // 2. Initialiser la mascotte interactive
  const mascot = new Mascot();

  // 3. Initialiser le gestionnaire de routines et de timer Pomodoro
  const routineManager = new RoutineManager(mascot);

  console.log("Aura Assistant initialisé avec succès ! 🚀");
});