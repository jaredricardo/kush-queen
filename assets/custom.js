class ProductCardGrid2 extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.price = this.querySelector('.prod-price-card');
        this.variantSelector = this.querySelector('select.product-form__variants');
        this.variantSelector.addEventListener('change', (e) => {
            const variantId = this.variantSelector.value
            const variantPrice = this.variantSelector.querySelector('option[value="' + variantId +  '"]').getAttribute('data-variant-price');
            this.price.innerHTML = variantPrice;
        });
    }

    disconnectedCallback() {
        // Cleanup if needed
    }
}

customElements.define('product-card-grid-v2', ProductCardGrid2);

// Dynamically set #PageContainer top offset to match the actual header height.
// Runs on load, window resize, and whenever the header element itself changes size
// (e.g. announcement bar text wraps, third-nav content changes).
(function () {
  var resizeTimer;

  function setHeaderOffset() {
    var header = document.getElementById('main-header-container');
    if (header) {
      document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
    }
  }

  // Initial call (script is deferred, so DOM is ready)
  setHeaderOffset();

  // Update on viewport resize
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setHeaderOffset, 50);
  });

  // Update whenever the header itself changes height (content/image reflow, etc.)
  if (typeof ResizeObserver !== 'undefined') {
    var header = document.getElementById('main-header-container');
    if (header) {
      new ResizeObserver(setHeaderOffset).observe(header);
    }
  }
})();