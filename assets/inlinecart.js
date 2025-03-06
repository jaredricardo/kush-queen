/*
 * MONOLITHO CUSTOM OVERLAY CART
 * Developed by Willem Shepherd, 2012 for Monolitho, a Shopify Theme 
 * tread lightly, this code is fragile!
 */
var moneyFormat = '${{amount}}'; // eslint-disable-line camelcase

function attributeToString(attribute) {
  if ((typeof attribute) !== 'string') {
    attribute += '';
    if (attribute === 'undefined') {
      attribute = '';
    }
  }
  return jQuery.trim(attribute);
}

function formatMoney(cents, format) {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '');
  }
  var value = '';
  var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
  var formatString = format || moneyFormat;

  function formatWithDelimiters(number, precision, thousands, decimal) {
    thousands = thousands || ',';
    decimal = decimal || '.';

    if (isNaN(number) || number === null) {
      return 0;
    }

    number = (number / 100.0).toFixed(precision);

    var parts = number.split('.');
    var dollarsAmount = parts[0].replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      '$1' + thousands
    );
    var centsAmount = parts[1] ? decimal + parts[1] : '';

    return dollarsAmount + centsAmount;
  }

  switch (formatString.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2);
      break;
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0);
      break;
    case 'amount_with_comma_separator':
      value = formatWithDelimiters(cents, 2, '.', ',');
      break;
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, '.', ',');
      break;
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ');
      break;
    case 'amount_with_apostrophe_separator':
      value = formatWithDelimiters(cents, 2, "'");
      break;
  }

  return formatString.replace(placeholderRegex, value);
}

//$('.template-product').on( 'click', '.product-form .add-to-cart-btn', addToCart );
$('body').on( 'click', '.add-to-cart-btn', addToCart );
// $('body').on('click', '.products-with-tags-section .addtocart', openDrawer);
$('body').on( 'click', '.addtocart', addToCart);
///$('body').on( 'click', '.addtocartbtn', addToCart);
//$('body').on('click', '.js-drawer-close', closeDrawer);


function toggleDrawer(e){
  if (typeof e !== 'undefined') e.preventDefault();
  $('html').toggleClass('js-drawer-open');
  $('html').toggleClass('js-drawer-open-right');
  $('body').toggleClass('js-drawer-open');
  $('body').toggleClass('js-drawer-open-right');
  $('#CartDrawer').toggleClass('js-drawer-open');
}
function openDrawer(e){
  if (typeof e !== 'undefined') e.preventDefault();
  $('html').addClass('js-drawer-open');
  $('html').addClass('js-drawer-open-right');
  $('body').addClass('js-drawer-open');
  $('body').addClass('js-drawer-open-right');
  $('#CartDrawer').addClass('js-drawer-open');
}
function closeDrawer(e){
  if (typeof e !== 'undefined') e.preventDefault();
  $('html').removeClass('js-drawer-open');
  $('html').removeClass('js-drawer-open-right');
  $('body').removeClass('js-drawer-open');
  $('body').removeClass('js-drawer-open-right');
  $('#CartDrawer').removeClass('js-drawer-open');
}

function addToCart(e){

  if (typeof e !== 'undefined') 
    e.preventDefault();

  //console.log('123');
  var id        = $(this).parents('form').find('[name="id"]').val();
 // console.log(id);
  var quantity  = $(this).parents('form').find('[name="quantity"]').val() || 1;
  
  var dsrc  = $(this).data('src');
  var dtitle  = $(this).data('title');
  
  var get_form_data = $(this).parents('form').serialize();
  

  $.ajax({ 
    type: 'POST',
    url: '/cart/add.js',
    async: false, 
    cache: false, 
    //data: 'quantity=' + quantity + '&id=' + id,
    data: get_form_data,
    dataType: 'json',
    error: addToCartFail,
    success: updateCartaddNote,
    cache: false,
    complete: function(){
     // $('#cart-drawer-container').addClass('waitremove');
      $('.ns-thumb img').attr('src',dsrc);
       $('.ns-content strong').text(dtitle);
    } 
  });
//  openDrawer();
}

function updateCartaddNote(note, callback) {
  $.ajax({ 
    type: 'POST',
    beforeSend: function(){
      $('.addtocart').text('');
      $('.addtocart').addClass('loading');
      $('.notification-added-to-cart').removeClass('hide1');
      
      
    },
    url: '/cart/update.js',
    // data: 'note=' + attributeToString(note),
    data: 'note=',
    dataType: 'json',
    success: thisGetUpdatedCart,
    error: function(XMLHttpRequest, textStatus) {
      Shopify.onError(XMLHttpRequest, textStatus);
    },
    complete: function(){
      //$('#ajax-loading-image').fadeOut(1000);
      setTimeout(function(){ 
      $('.addtocart').removeClass('loading');
      $('.addtocart').text('+ Add to cart ');
        $('.notification-added-to-cart').addClass('hide1');
     }, 3000); 
     
      
      
    }
  });
}
function removecartitem(id) {
  var cart_line_item = (id);

  $.ajax({ 
    type: 'POST',
    url: '/cart/change.js',
    data:  'quantity=0&line='+cart_line_item,
    async: false, 
    cache: false, 
    dataType: 'json',
    success: thisGetUpdatedCart,
    error: addToCartFail
  });

  // add alert when item added to cart.
  // add alert when item removed.
  $('#remove-from-cart-msg').html('Item removed from Bag!').fadeIn();   
}

function updatecartitem(quantity,id) {
  var cart_line_item = (id);
  var data = "updates["+id+"]="+quantity+"";
  //console.log(data);
  $.ajax({ 
    type: 'POST',
    beforeSend: function(){
      //$('#ajax-loading-image').fadeIn(1000);
    },
    url: '/cart/update.js',
    data: data,
    async: false, 
    cache: false, 
    dataType: 'json',
    success: thisGetUpdatedCart,
    error: addToCartFail,
    complete: function(){
      //$('#ajax-loading-image').fadeOut(1000);
    }
  });

}

// $("#CartContainer").on('click', '.ajaxcart__qty-adjust' ,function(e) {
//   e.preventDefault();
//   var current_item_id = $(this).data('id');
//   var current_quantity = $(this).data('qty');
//   $(this).parent().find('button').prop("disabled", true);
//   $(this).parent().find('input').prop("disabled", true);
//   updatecartitem(current_quantity,current_item_id);
// });

function addToCartFail(jqXHR, textStatus, errorThrown){
  var response = $.parseJSON(jqXHR.responseText);
   console.error('PROBLEM ADDING TO CART!', response.description);  
//  $(this).text('Out of Stock');
}

// Get the cart associated with the cart-info div (id)
function thisGetUpdatedCart(cart) {
  changeUpdatedCart(cart, 'cart-drawer-container');   
}

// Do all the fancy stuff.
function changeUpdatedCart(cart, cart_summary_id, cart_count_id) {
  if ((typeof cart_summary_id) === 'string') {
    var cart_summary = ('#' + cart_summary_id);
    if (cart_summary.length) {  
      // Empty Entire cart-info div so that the we are not creating 2 carts/duplicate info.
      $(cart_summary).empty();      

      // Add a table and Tbody to attach stuff to.
      //$("<table class=addedcart><tbody id='updating_cart'></tbody></table>").appendTo(cart_summary);
      $(".notification-added-to-cart").appendTo(cart_summary);

      $.each(cart, function(key, value) {

        if (key === 'items') {
          var uc = $('#' + cart_summary_id + ' #updating_cart');

          // Creates the entire table using the new item information that has been updated!
          // If you want to add a column, test it in inline-cart.liquid FIRST, then write it into the line below

          if (value.length) {
            $.each(value, function(i, item) {           
              var getitem_price = (item.price);
              var monetizeitemprice = formatMoney(getitem_price, '${{amount}}')

              //finds image, creates url, cartfinalimage used instead of item.image later in the table
              var imageurl = (item.image);
              var varsize = ('medium');
              var matches = imageurl.match(/(.*\/[\w\-\_\.]+)\.(\w{2,4})/);
              var cartfinalimage =  (matches[1] + '_' + varsize + '.' + matches[2]);
              var line_item = i+1;
              var final_html = '';
              var j;
              var mydata = [];
              $.ajax({ 
                type: 'GET',
                url: '/products/'+item.handle,
                async: false, 
                cache: false, 
                dataType: 'json',
                success: function (json) {
                  mydata = json;
                   // $('#cart-drawer-container').removeClass('waitremove');
                }
              });
              var ajax_get_data1;
             // final_html= '';
              final_html = "<div id='product-"+item.id+"' class='"+item.handle+" item last odd ajaxcart__product'><div class='ajaxcart__row' data-line='"+(i+1)+"'><div class='grid'><div class='grid__item one-half1'><a class='ajaxcart__product-image' href='"+item.url+"' title='"+item.title+"'><img class='cartimage' src='"+ imageurl +"'  alt='"+ item.title +"' /></a></div><div class='grid__item one-half2'><div class='ajaxcart__product-name--wrapper'><a class='ajaxcart__product-name' href='"+item.url+"' title='"+item.title+"'>"+item.title+"</a><p><b>SKU :</b>"+item.sku+"</p></div><div class='ajaxcart__qty'><button type='button' class='ajaxcart__qty-adjust ajaxcart__qty--minus icon-fallback-text' data-id='"+item.id+"' data-qty='"+(item.quantity-1)+"' data-line='"+(i+1)+"' aria-label='Reduce item quantity by one'><span class='ion-minus'></span></button><input type='text' name='updates[]' class='ajaxcart__qty-num' value='"+item.quantity+"' min='0' data-id='"+item.id+"' data-line='"+(i+1)+"' aria-label='quantity' pattern='[0-9]*'><button type='button' class='ajaxcart__qty-adjust ajaxcart__qty--plus icon-fallback-text' data-id='"+item.id+"' data-line='"+(i+1)+"' data-qty='"+(item.quantity+1)+"' aria-label='Increase item quantity by one'><span class='ion-plus'></span></button></div></div><div class='price-wrapper'><span class='ajaxcart__price'>"+monetizeitemprice+"</span><div class ='cart_remove'><a class='remove-cart-item' onClick='removecartitem("+ line_item +"); return false;'>Remove</a></div></div></div></div>";
              //console.log(final_html);
              $(final_html).appendTo(uc);

            });
          } else {
            //Returns error if something went wrong.
            $('<p class="cart--empty-message">Your cart is currently empty.</p>');
          }
        } else {
        }
      });     

      setTimeout(function(){
        openDrawer();  
      },700);
      
    }
  }

  // Update Cart Total Money in Cart and converts it to money format   
  var $cartTotalAmoutFooter = $('.cart_total span:first');
  var getTotalPrice = (cart.total_price);
  var monetizeTotalPrice = formatMoney(getTotalPrice, '${{amount}}')

  switch(cart.total_price){
    default:
      $cartTotalAmoutFooter.text (monetizeTotalPrice);
      break;
  }

  // Update Cart Total Count in Cart Title and Side Tab
  
  var $newcartcount = $('#cart-count');
  var $newcartcount2 = $('#cart-count-2');
  var $newcartblankmessage = $('.add-items-ajax');
  var $enablecart_bottom = $('.woocommerce-message');

  $newcartcount.html(' '+cart.item_count+' ');
  $newcartcount2.html(' '+cart.item_count+' ');
  
  if(cart.item_count === 0) {
    $newcartblankmessage.html('Your cart is currently empty.');
    $enablecart_bottom.html('');
    $enablecart_bottom.slideUp( "slow").hide();
  }
  else {
    $newcartblankmessage.html('');
    //$enablecart_bottom.html('<a href="/cart" tabindex="1" class="button wc-forward">View cart</a> “Awaken CBD Bath Bomb” has been added to your cart.');
    $enablecart_bottom.addClass('hidden-notice');
  }
  
  $('.woocommerce-message .close-icon').click(function(){
  
    $enablecart_bottom.removeClass('hidden-notice');
  
  });

  


  
}