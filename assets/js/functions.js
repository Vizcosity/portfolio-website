$( document ).ready(function() {
//hamburger menu
  $('button').click(function(){
    $(this).toggleClass('is-active')
  });

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
