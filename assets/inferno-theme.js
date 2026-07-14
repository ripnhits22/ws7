(function () {
 document.documentElement.classList.remove('no-js');

 function initInfernoMotion(root) {
 var hero = root.querySelector('.inferno-hero__art');
 if (hero && !hero.dataset.motionReady) {
 hero.dataset.motionReady = 'true';
 hero.setAttribute('role', 'button');
 hero.setAttribute('tabindex', '0');
 hero.setAttribute('aria-label', 'Animate the Inferno pack lineup');

 var toggleHero = function () {
 hero.classList.remove('is-bursting');
 void hero.offsetWidth;
 hero.classList.toggle('is-expanded');
 hero.classList.add('is-bursting');
 window.setTimeout(function () { hero.classList.remove('is-bursting'); }, 750);
 };

 hero.addEventListener('click', toggleHero);
 hero.addEventListener('keydown', function (event) {
 if (event.key === 'Enter' || event.key === ' ') {
 event.preventDefault();
 toggleHero();
 }
 });
 }

 root.querySelectorAll('.inferno-card').forEach(function (card) {
 if (card.dataset.motionReady) return;
 card.dataset.motionReady = 'true';

 card.addEventListener('pointermove', function (event) {
 if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
 var rect = card.getBoundingClientRect();
 var x = (event.clientX - rect.left) / rect.width;
 var y = (event.clientY - rect.top) / rect.height;
 card.style.setProperty('--rx', ((0.5 - y) * 10).toFixed(2) + 'deg');
 card.style.setProperty('--ry', ((x - 0.5) * 12).toFixed(2) + 'deg');
 card.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
 card.style.setProperty('--my', (y * 100).toFixed(1) + '%');
 });

 card.addEventListener('pointerleave', function () {
 card.style.setProperty('--rx', '0deg');
 card.style.setProperty('--ry', '0deg');
 });

 card.addEventListener('click', function (event) {
 if (event.target.closest('a, button, input, select, textarea')) return;
 card.classList.remove('is-popping');
 void card.offsetWidth;
 card.classList.add('is-popping');
 window.setTimeout(function () { card.classList.remove('is-popping'); }, 700);
 });
 });
 }

 function boot() {
 document.querySelectorAll('.inferno-site').forEach(initInfernoMotion);
 }

 if (document.readyState === 'loading') {
 document.addEventListener('DOMContentLoaded', boot);
 } else {
 boot();
 }

 document.addEventListener('shopify:section:load', boot);
})();
