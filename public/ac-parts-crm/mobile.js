/* Responsive affordances only. Business records and calculations are untouched. */
(() => {
  let scheduled = false;
  function update() {
    scheduled = false;
    document.querySelectorAll('.table-wrap,.tablewrap').forEach(region => {
      const table = region.querySelector('table');
      if (!table) return;
      const scrolls = region.scrollWidth > region.clientWidth + 2 && /auto|scroll/.test(getComputedStyle(region).overflowX);
      let hint = region.previousElementSibling;
      if (!hint?.classList.contains('table-scroll-hint') && scrolls) {
        hint = document.createElement('p');
        hint.className = 'table-scroll-hint';
        hint.textContent = 'Scroll horizontally to see all columns';
        region.before(hint);
      }
      if (hint?.classList.contains('table-scroll-hint')) hint.hidden = !scrolls;
      if (scrolls) {
        region.tabIndex = 0;
        region.setAttribute('role', 'region');
        region.setAttribute('aria-label', 'Scrollable records table');
      } else {
        region.removeAttribute('tabindex');
        region.removeAttribute('role');
        region.removeAttribute('aria-label');
      }
    });
    /* Existing equipment forms use adjacent labels; expose those same words to assistive technology. */
    document.querySelectorAll('.field').forEach(field => {
      const label = field.querySelector('label'), input = field.querySelector('input,select,textarea');
      if (label && input && !label.htmlFor && !input.getAttribute('aria-label')) input.setAttribute('aria-label', label.textContent.trim());
    });
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(update); } }
  new MutationObserver(schedule).observe(document.body, {childList: true, subtree: true});
  addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  schedule();
})();
