$( document ).ready(function() {
//hamburger menu [MOBILE]
  $('button').click(function(){
    $(this).toggleClass('is-active')
    $('.body').toggleClass('hamTrans')
  });

//Opaque Navigation toggle on scroll

  //finding the position from top of the anchor point
//ONLY ON DESKTOP!

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

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78703723-1', 'auto');
  ga('send', 'pageview');

});
