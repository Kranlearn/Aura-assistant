/* ======================================
   AURA ASSISTANT - MASCOT LOGIC & SPEECH
   ================================================================ */

class Mascot {
  constructor() {
    this.speechBubble = document.getElementById('speechBubble');
    this.mascotMessage = document.getElementById('mascotMessage');
    this.eyeLeft = document.getElementById('eyeLeft');
    this.eyeRight = document.getElementById('eyeRight');
    this.speakBtn = document.getElementById('speakBtn');
    this.mascotAvatar = document.getElementById('mascotAvatar');

    this.synth = window.speechSynthesis;
    this.init();
  }

  init() {
    // Événement au clic sur la mascotte ou le bouton parler
    if (this.speakBtn) {
      this.speakBtn.addEventListener('click', () => this.speakCurrentMessage());
    }
    if (this.mascotAvatar) {
      this.mascotAvatar.addEventListener('click', () => this.reactToClick());
    }
  }

  // Mettre à jour le message affiché dans la bulle
  setMessage(text, mood = 'neutral') {
    this.mascotMessage.textContent = text;
    this.setMood(mood);
  }

  // Changer les yeux / l'expression de la mascotte
  setMood(mood) {
    if (!this.eyeLeft || !this.eyeRight) return;

    switch (mood) {
      case 'happy':
        this.eyeLeft.setAttribute('r', '4');
        this.eyeRight.setAttribute('r', '4');
        this.eyeLeft.setAttribute('fill', '#34d399'); // Vert
        this.eyeRight.setAttribute('fill', '#34d399');
        break;
      case 'focused':
        this.eyeLeft.setAttribute('r', '3');
        this.eyeRight.setAttribute('r', '3');
        this.eyeLeft.setAttribute('fill', '#38bdf8'); // Bleu clair
        this.eyeRight.setAttribute('fill', '#38bdf8');
        break;
      case 'sleepy':
        this.eyeLeft.setAttribute('r', '2');
        this.eyeRight.setAttribute('r', '2');
        this.eyeLeft.setAttribute('fill', '#a78bfa'); // Violet
        this.eyeRight.setAttribute('fill', '#a78bfa');
        break;
      default:
        this.eyeLeft.setAttribute('r', '3.5');
        this.eyeRight.setAttribute('r', '3.5');
        this.eyeLeft.setAttribute('fill', '#38bdf8');
        this.eyeRight.setAttribute('fill', '#38bdf8');
        break;
    }
  }

  // Réaction interactive au clic sur la mascotte
  reactToClick() {
    const reactions = [
      { msg: "Prêt à charbonner une session de code ?", mood: "focused" },
      { msg: "Pense à boire un peu d'eau !", mood: "happy" },
      { msg: "Je surveille ta routine de près !", mood: "happy" },
      { msg: "Aura est opérationnelle !", mood: "neutral" }
    ];
    const random = reactions[Math.floor(Math.random() * reactions.length)];
    this.setMessage(random.msg, random.mood);
    this.speakCurrentMessage();
  }

  // Synthèse vocale avec Web Speech API
  speakCurrentMessage() {
    if (!this.synth) return;

    // Annuler la parole en cours si déjà en train de parler
    if (this.synth.speaking) {
      this.synth.cancel();
    }

    const text = this.mascotMessage.textContent;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;
    utterance.pitch = 1.1; // Légèrement plus aigu pour un côté mascotte

    this.synth.speak(utterance);
  }
}

// Export pour utilisation dans app.js
window.Mascot = Mascot;