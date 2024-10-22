if(window.location.href.indexOf('checkout') > -1 ){
  $(document).find('.checkout-icon').show();
}

$(document).on('click','.checkout-icon',function(){
  $(this).addClass('active');
  $(document).find('.checkout-home').addClass('menu-active');
  $(document).find('.mp-menu>.mp-level').addClass('mp-level-open');
  $(document).find('#mp-menu').addClass('active');
})
$(document).on('click','.checkout-icon.active',function(){
  $(this).removeClass('active');
  $(document).find('.checkout-home').removeClass('menu-active');
  $(document).find('.mp-menu>.mp-level').removeClass('mp-level-open');
  $(document).find('#mp-menu').removeClass('active');
})
$(document).on('click','.a11y-properties',function(){
  $(this).parents('li').find('.mega-menu-dropdown').addClass('mp-level-open')
})
$(document).on('click','.mp-back',function(){
  $(this).parents('.mega-menu-dropdown').removeClass('mp-level-open')
})
$(document).mouseup(function(e) {
  var container = $('.mp-menu');
  if (!container.is(e.target) && container.has(e.target).length === 0){
    $('.checkout-icon.active').click();
  }
  });
$(document).ready(function(){
  $.get('/cart',function(content) {
      var content = $(content).find('div.checkout-upsell-wrap')[0].outerHTML;
    $(document).find('.order-summary__section--product-list').after(content);
     $(document).find('.mobile-upsell').after(content);
    
     console.log(content);
  });
})


$(document).on('click','.upsell-add',function(){
  var productId = $(this).data('id');
  $.ajax({
      type: "POST",
      url: "/cart/add.js",
      dataType: "json",
      data: {
        id: productId,
        quantity: 1,
      },
        success:function(){
          var currentUrl = window.location.href;
            $.get(currentUrl,function(content) {
            var newContant = content;
            var content = $(content).find('div.order-summary__sections').html();
            $(document).find('.order-summary__sections').html(content);
            var toggleData =  $(newContant).find('.order-summary-toggle').html();
            $(document).find('.order-summary-toggle').html(toggleData);
          }).done(function(){
             $.get('/cart',function(content) {
              var content = $(content).find('div.checkout-upsell-wrap')[0].outerHTML;
             $(document).find('.order-summary__section--product-list').after(content);
             $(document).find('header.banner').find('.checkout-upsell-wrap').remove();
             $(document).find('.mobile-upsell').after(content);
            });      
         })
        }
      })
   });










