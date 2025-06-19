(() => {
   window.addEventListener('abra:applied', () => {
    const promoDiv = document.querySelector('div.new-pdp_promotxt');
    
    if (promoDiv) {  
      const observer = new MutationObserver(() => {
        const currentDisplay = promoDiv.style.display;
 
        if (currentDisplay === 'flex') {
          setTimeout(() => {
            window.Abra.render();
          }, 100);
        }
      });
      observer.observe(promoDiv, {
        attributes: true,
        attributeFilter: ['style']
      });
    } 
   });
})();