import Reveal from './node_modules/reveal.js/dist/reveal.esm.js';
import RevealHighlight from './node_modules/reveal.js/plugin/highlight/highlight.esm.js';
import RevealNotes from './node_modules/reveal.js/plugin/notes/notes.esm.js';

let deck = new Reveal({
  plugins: [RevealHighlight, RevealNotes],
});
deck.initialize({
  width: 1920,
  height: 974,
  minScale: 0.5,
  maxScale: 0.9,
  slideNumber: true,
  slideNumber: 'c',
});

// Attente que le plugin Notes soit bien prêt
deck.on('ready', () => {
  const originalOpen = window.open;

  window.open = function (...args) {
    const newWindow = originalOpen.apply(window, args);

    const interval = setInterval(() => {
      if (newWindow.document && newWindow.document.head) {
        const link = newWindow.document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'notes.css'; // Chemin vers ton fichier CSS
        newWindow.document.head.appendChild(link);
        clearInterval(interval);
      }
    }, 100);

    return newWindow;
  };
});