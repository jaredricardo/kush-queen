(() => {
  console.log('abra func live theme')
  window.addEventListener('abra:applied', () => {
    const promoDiv = document.querySelector('div.new-pdp_promotxt');
    
    if (promoDiv) {  
      const observer = new MutationObserver(() => {
        const currentDisplay = promoDiv.style.display;
        
        if (currentDisplay === 'flex') {
          window.Abra.useSellingPlanPriceOnProductBlock = false;
          window.Abra.render();
        } else if (currentDisplay === 'none') {
          window.Abra.useSellingPlanPriceOnProductBlock = true;
          window.Abra.render();
        }
      });
      
      observer.observe(promoDiv, {
        attributes: true,
        attributeFilter: ['style']
      });
    } 
  });
})();