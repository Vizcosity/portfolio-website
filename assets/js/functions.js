$( document ).ready(function() {
//hamburger menu [MOBILE]
  $('button').click(function(){
    $(this).toggleClass('is-active')
    $('.body').toggleClass('hamTrans')
  });

//Opaque Navigation toggle on scroll

  //finding the position from top of the anchor point
$(window).scroll(function(){
var $scrollDistance = $(window).scrollTop();
var $anchorPos = {
  about: $("a[name=about]").offset().top,
  home: $("a[name=home]").offset().top
}
  //setting the opaque nav classes:
if ($scrollDistance >= $anchorPos.about) {
  $('.nwrap').addClass('opaqueNav')
  $('nav').addClass('darkerNavItems')
} else {
  $('.nwrap').removeClass('opaqueNav')
  $('nav').removeClass('darkerNavItems')
}
})

//NavigationDesktop

$('a[href*=#]').on('click', function(e){
    e.stopPropagation()
    e.preventDefault()
    var href = $(this).attr('href');
    var dest = 'a[name=' + href.replace('#','') + ']';
    $(dest).velocity('scroll',{
      duration: 'slow',
      ease: 'ease-in-out'
    })
});

$('.downNavArrow').on('click',function(e){
  $('a[name=about]').velocity('scroll',{
    duration: 'slow',
    ease: 'ease-in-out'
  })
})



});
