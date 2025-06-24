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

deck.on('slidechanged', function(event) {
  const indexh = event.indexh;
  const indexv = event.indexv;
  const reveal = document.querySelector('.reveal');
  const slides = document.querySelector('.slides');

  if (indexh === 0) {
    reveal.classList.remove('blur-background');
  } else {
    reveal.classList.add('blur-background');
  }

  if (indexh === 0) {
    slides.classList.remove('parchemin');
  } else {
    slides.classList.add('parchemin');
  }

  // 4 2
  if (indexh === 4 && indexv === 2 || indexh === 5 && indexv === 2 || indexh === 9 && indexv === 1) {
    slides.style.height = '1020px';
  } else if (indexh === 7 && indexv === 3) {
    slides.style.height = '1060px';
  }
   else {
    slides.style.height = '954px';
  }

  const currentSlide = event.currentSlide;

  if (currentSlide.querySelector('#logos')) {
    const ctx = document.getElementById('logos');

    ctx.classList.add('logo-max');
  }

  if (currentSlide.querySelector('#ivyBenchmarkChart') && !window.ivyChartRendered) {
    const ctx = document.getElementById('ivyBenchmarkChart').getContext('2d');
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Main Bundle Size (KB)', 'Initial Load Time (ms)'],
        datasets: [
          {
            label: 'View Engine',
            backgroundColor: 'rgba(220, 53, 69, 0.7)', // rouge
            data: [240, 850]
          },
          {
            label: 'Ivy',
            backgroundColor: 'rgba(40, 167, 69, 0.7)', // vert
            data: [180, 620]
          }
        ]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });

    window.ivyChartRendered = true; // pour éviter de re-render
  }
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

  const slides = document.querySelector('.slides');
  slides.classList.remove('parchemin');
});