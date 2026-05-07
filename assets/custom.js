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