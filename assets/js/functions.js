$( document ).ready(function() {
//hamburger menu
  $('button').click(function(){
    $(this).toggleClass('is-active')
  });

//Opaque Navigation toggle on scroll

  //finding the position from top of the anchor point



$(window).scroll(function(){
var $scrollDistance = $(window).scrollTop();
var $anchorPos = $("a[name=about]").offset().top;

if ($scrollDistance >= $anchorPos) {
  $('.nwrap').addClass('opaqueNav')
  $('nav').addClass('darkerNavItems')
} else {
  $('.nwrap').removeClass('opaqueNav')
  $('nav').removeClass('darkerNavItems')
}

})

//NavigationDesktop
function scrollToAnchor(aid){
    var aTag = $("a[name='"+ aid +"']");
    $('html,body').animate({scrollTop: aTag.offset().top},'slow');
}


  $('#about').click(function(){
    scrollToAnchor('about')
    return false
  })

  $('.downNavArrow').click(function(){
    scrollToAnchor('about')
    return false
  })

  $('#home').click(function(){
    scrollToAnchor('home')
    return false
  })

});
