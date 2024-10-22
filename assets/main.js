$(function ($) {
  
  /*---------------- activity Slider ------------------*/

  $('.activity-slider').slick({
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3
        }
      },

      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3
        }
      },			 

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  /*---------------- activity Slider ------------------*/

  $('.giving-slider').slick({
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 4
        }
      },

      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4
        }
      },			 

      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 568,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  });

  $(document).ready(function(){
    $('#mp-menu').pushMenu({
      type: 'overlap',
      levelSpacing: 0,
      backClass: 'mp-back',    
      pusher: '.site-outer',
      scrollTop: false
    });
  });



  $('body').on('click', '.search-footer', function(e) {
    e.stopPropagation();
    e.preventDefault();
    $(this).closest('li').toggleClass('active');
  });

  /*---------------- EQUAL HEIGHT STARTS ------------------*/
  if ($(window).width() < 767){   

  }else {    
    $(window).load(function() {
      equalheight('.template-blog .entry-content-wrapper');
       equalheight('.list-view-item');
      equalheight('.template-blog .art-main .article__grid-excerpt');
      equalheight('.banners_item .banner_img');
      equalheight('.template-page .article__title h3 a');
      equalheight('div#shopify-section-blog-section-new .entry-media ');
      equalheight('div#shopify-section-press-section .entry-media ');
      
      equalheight('.grid__item.medium-up--one-third .blog-list-view .entry-media .article__list-image-wrapper');
      equalheight('.article-listing');
      
      
      equalheight('div#shopify-section-1571883225299 section.blog-section.home-blog-section-wrap .entry-media ');
      equalheight('.home-btm-banner-img-container');
      equalheight('.template-page .blog-list-view .article__list-image-container');
      equalheight('.template-page .latest-post .article__list-image-container');
      
    });

    $(window).resize(function() {
      equalheight('.template-blog .entry-content-wrapper');
       equalheight('.list-view-item');
      equalheight('.template-blog .art-main .article__grid-excerpt');
      equalheight('.banners_item .banner_img');
      equalheight('.template-page .article__title h3 a');
      equalheight('div#shopify-section-blog-section-new .entry-media '); 
      equalheight('div#shopify-section-press-section .entry-media ');
      equalheight('.grid__item.medium-up--one-third .blog-list-view .entry-media .article__list-image-wrapper');
      equalheight('.article-listing');
      
      equalheight('div#shopify-section-1571883225299 section.blog-section.home-blog-section-wrap .entry-media ');
      equalheight('.home-btm-banner-img-container ');
      equalheight('.template-page .blog-list-view .article__list-image-container');
      equalheight('.template-page .latest-post .article__list-image-container');
      
    });
  }

  /*$(window).load(function() {
    equalheight('.home-blog-section-wrap .home-blog-desc');
  });

  $(window).resize(function() {
    equalheight('.home-blog-section-wrap .home-blog-desc');
  });*/

  /*---------------- EQUAL HEIGHT ENDS ------------------*/
  $('.prod-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    infinite: false,
    fade: false,
    adaptiveHeight: true,
    asNavFor: '.shop-slider-nav'
  });
  $('.shop-slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.prod-slider',
    dots: false,
    arrows: true,
    focusOnSelect: true,
    
    responsive: [
      {
        breakpoint: 1080,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          arrows: false
        }
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          vertical: false,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          
          arrows: false
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          vertical: false,
          arrows: false,
          
        }
      }

    ]
  });
  $('.btn.plus').click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('field');
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    if (!isNaN(currentVal)) {
      $('input[name=' + fieldName + ']').val(currentVal + 1);
    } else {
      $('input[name=' + fieldName + ']').val(1);
    }
  });
  $(".btn.minus").click(function(e) {
    e.preventDefault();
    fieldName = $(this).attr('field');
    var currentVal = parseInt($('input[name=' + fieldName + ']').val());
    if (!isNaN(currentVal) && currentVal > 1) {
      $('input[name=' + fieldName + ']').val(currentVal - 1);
    } else {
      $('input[name=' + fieldName + ']').val(1);
    }
  });


  /***********************/
  $(".search-toggle").on('click', function (e) {
    $("body").toggleClass('search-active');
    $(".serch-popup").toggleClass('search-popup-active');
    e.preventDefault();
  });

  var i = $(".opal-login-form-ajax");
  i.on("submit", function(e) {
    e.preventDefault();
    var i = $(this),
        a = $("input#HeadCustomerEmail", i).val() && $("input#HeadCustomerPassword", i).val();
    a && $.ajax({
      type: "POST",
      url: i.attr("action"),
      data: i.serialize(),
      success: function(t) {
        if(t.indexOf('Invalid login credentials') !== -1) {
          i.find('.bad').html('Invalid login credentials.');
        }
        else {
          location.href = '/account';
        }
      },
      error: function(t, i) {
        /*console.log(t);
        console.log(i);*/
      }
    })
  });
  /***********************/

  /***********************/
//   $('.look-talk-link-wrap').fancybox({
//     loop: true,
//     hash : false
//   });
//   $('.promise-link-wrap').fancybox({
//     loop: true,
//     hash : false
//   });
  /***********************/

});

$(window).load(function(){
  
  $(".menu-bar > ul > li > a").keydown(function(event){
    const keycode = event.which;
    switch(keycode){
      case 39: $(this).parent().next().find("a:first").focus();
        event.preventDefault();
        break;
      case 37: $(this).parent().prev().find("a:first").focus();
        event.preventDefault();
        break;
      case 40: $(this).next().addClass('show');
        $(this).attr("aria-expanded", true);
        $(this).next().find("a:first").focus();
        event.preventDefault();
        break;
    }   
    
  });
  
  $(".menu-bar > ul > li .menu-dropdown > ul > li > a").keydown(function(event){
    const keycode = event.which;
    switch(keycode){
      case 40: $(this).parent().next().find("a:first").focus();
        event.preventDefault();
        break;
        case 27: 
        $(this).closest("li.has-submenu").find("a:first").focus();
          $(this).closest("li.has-submenu").find("a:first").next().removeClass('show');
          $(this).closest("li.has-submenu").find("a:first").attr("aria-expanded", false);
        event.preventDefault();
        break;
      case 38: 
        if($(this).parent().is(":first-child")){
          $(this).closest("li.has-submenu").find("a:first").focus();
          $(this).closest("li.has-submenu").find("a:first").next().removeClass('show');
          $(this).closest("li.has-submenu").find("a:first").attr("aria-expanded", false);
        }else{
          $(this).parent().prev().find("a:first").focus();
        }
        event.preventDefault();
        break;
    }   
    
  });
  
  $(".slider-handle.min-slider-handle.round").attr("aria-label", "Min Price");
  $(".slider-handle.max-slider-handle.round").attr("aria-label", "Maximum Price");
  
//   $('li[role="tab"]').each(function(){
//     var controls = $(this).attr('data-content-id') || '';
//     if(controls == ""){
//     	$(this).removeAttr("aria-controls");  
//     }
//     $(this).attr("aria-controls", controls.replace("#",''));
//   });
  
  
  $("#close-mob-nav").click(function(){
    $("#trigger").click();
    setTimeout(function(){
      $("#trigger").focus();      
    },500);
    
  });
  
  $("#trigger").click(function(){
    setTimeout(function(){
      $("#close-mob-nav").focus();      
    },500);
    
  });
  
  $("#a11y-close-filter").keydown(function(event){
    if(event.which == "13"){
      event.preventDefault();      
      $(this).click();
    }
  });
  
  $(".mz-lens img, .mz-zoom-window img").attr("alt","");
  
  $(".a11y-properties").click(function(){
    $(this).next().addClass("mp-level-open");
    $(this).next().find(".a11y-back-button").focus();
  });
  
  $(".a11y-back-button").click(function(){
    $(this).parent().prev().focus();
  });
  
  $("#last-div").focus(function(){
    $("#a11y-close-filter").focus();
  });
  
  $('.resp-tab-item[role="tab"]').attr("aria-selected", "false");
  $('.resp-tab-item.resp-tab-active[role="tab"]').attr("aria-selected", "true");
  
  $('.resp-tab-item[role="tab"]').click(function(){
    $('.resp-tab-item[role="tab"]').attr("aria-selected", "false");
  $('.resp-tab-item.resp-tab-active[role="tab"]').attr("aria-selected", "true");
  });
  
  $('.resp-tab-item[role="tab"]').keydown(function(event){
    if(event.which == "13"){
      $(this).click();
      var tabpanel = $(this).attr("aria-controls");
      setTimeout(function(){
        $('[aria-labelledby="'+tabpanel+'"]').attr("tabindex","-1");
        $('[aria-labelledby="'+tabpanel+'"]').focus();
        $("#trigger").focus();
      },1000);
    }
  });
  
  $("#rc_duplicate_selector").attr("aria-label", "Duplicate selector");
  $("#ProductSelect-new-product-template").attr("aria-label", "Product template");
  $(".yotpo-sum-reviews.yotpo-distribution-clickable").each(function(){
    $(this).attr("aria-label", $(this).text().trim() +" Reviews for " + $(this).attr("data-score-distribution") + " star rating");
  });
  
  $(".yotpo-nav.yotpo-nav-primary > ul").attr("role","none");
  $(".yotpo-nav.yotpo-nav-primary").removeAttr("tabindex");
  
  $(".yotpo-nav.yotpo-nav-primary > ul > li").each(function(){
    $(this).attr("aria-label", $(this).text().trim());
  });

  $(".pagination li a").each(function(){
    $(this).attr("aria-label", "Page " + $(this).text().trim());
  });
  
  $(".yotpo-page-element.goTo.yotpo-active").attr("aria-current", "true");
  $(".mz-expand-controls.mz-fade.mz-visible button").each(function(){
    $(this).attr("aria-label", $(this).attr("title"));
    $(this).removeAttr("title");
  });
  
  $(".yotpo-stars .yotpo-icon.yotpo-icon-star.rating-star").attr("aria-hidden", "true");
  $("#rc_radio_options label span").removeAttr("aria-label");
  $("#yotpo-testimonials-product-bottomline").removeAttr("aria-selected");
  
  $(".readmoreshowoption a").focus(function(){
    $(this).parent().addClass("display-container");
  });
  
  $(".readmoreshowoption a").blur(function(){
    $(this).parent().removeClass("display-container");
  });
  
});