import Reveal from './node_modules/reveal.js/dist/reveal.esm.js';
import Markdown from './node_modules/reveal.js/plugin/markdown/markdown.esm.js';
import RevealHighlight from './node_modules/reveal.js/plugin/highlight/highlight.esm.js';
import RevealNotes from './node_modules/reveal.js/plugin/notes/notes.esm.js';

let deck = new Reveal({
  plugins: [Markdown, RevealHighlight, RevealNotes],
});
deck.initialize({
  width: 1920,
  height: 974,
  minScale: 0.5,
  maxScale: 0.9,
});
