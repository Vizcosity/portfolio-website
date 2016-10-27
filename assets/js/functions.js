$( document ).ready(function() {

  // Enabling the ripple effect for the circular skill-content divs.
  $(".rippler").rippler({
    effectClass      :  'rippler-effect',
    effectSize      :  16,     // Default size (width & height)
    addElement      :  'a',   // e.g. 'svg'(feature)
    duration        :  400
  });

//hide overlay
  $('.hireOverlay').hide()
//removing media from tweetembed
  $('.twitterFeed').on('DOMSubtreeModified propertychange','#twitter-widget-0', function(){
    $('.twitter-timeline').contents().find('.timeline-Tweet-media').css('display','none')
    $('.twitter-block').css('height','100%')

  });
//hire overlay on click
  var fbutton = $('.freelanceButton');

  fbutton.click(function(){
    $('.hireOverlay').fadeIn('slow')
    $('.hireOverlay').css('display','flex')
    $('.hireOverlay').addClass('hireOverlay-active')
    //removing scroll
    $('body').addClass('hideScrollbar')
  });

  //removing overlay on click
  $('.hireOverlay').click(function(){
    $(this).fadeOut('slow')
    $('body').removeClass('hideScrollbar')
  });

  $('.exitButton').click(function(){
    $('.hireOverlay').fadeOut('slow')
    $('body').removeClass('hideScrollbar')
  });

function mobMenuSlide(){
  $('button').toggleClass('is-active')
 $('.body').toggleClass('hamTrans')
 $('.nwrap').toggleClass('pushNav')
 $('.BlackFade-main').toggleClass('BlackFade-active')

}
//hamburger menu [MOBILE]
  $('button').click(function(){
    mobMenuSlide()
  });

  $('.mobNavClick').click(function(){
       $('button').removeClass('is-active')
       $('.body').removeClass('hamTrans')
       $('.nwrap').removeClass('pushNav')
    })
//messing with the skills section circles

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
if ($scrollDistance >= $anchorPos.about - 60) {
  $('.nwrap').addClass('opaqueNav')
  $('nav').addClass('darkerNavItems')
} else {
  $('.nwrap').removeClass('opaqueNav')
  $('nav').removeClass('darkerNavItems')
}
}) // End of on scroll function.

var thanks = ['#iLoveYou','#coffeeIconId'];

$(thanks[0]).hide()
//coffeeButton easter-egg
  $('.coffeeButton').mouseenter(function(){
    $(thanks[1]).fadeOut(100)
    if ( $(thanks[1]).css('display') === 'none') {
    $(thanks[0]).delay(150).fadeIn(150) }
//      $('#innerCoffeeButton').append('<p id="iLoveYou" class="coffeeGratitude">i love you</p>')

}).mouseleave(function(){
    $(thanks[1]).delay(350).fadeIn(300)
    $(thanks[0]).fadeOut(150)
})
//NavigationDesktop

$('a[href*=#]').on('click', function(e){
    e.stopPropagation()
    e.preventDefault()
    var href = $(this).attr('href');
    var dest = 'a[name=' + href.replace('#','') + ']';
    $(dest).velocity('scroll',{
      duration: 'slow',
      ease: 'easeInOutQuint'
    })
});

$('.downNavArrow').on('click',function(e){
  $('a[name=about]').velocity('scroll',{
    duration: 'slow',
    ease: 'easeInOutQuint'
  })
});

  var allowToShow = true;
  // Implement expanding skills-portfolio circles.
  $('.circlePlaceholder').on('click', function(){
    //$(this).animate(fillOptions, 1000)
    if (allowToShow) {
      // $('.circlePlaceholder > svg, .circlePlaceholder > p').fadeOut('fast');
      allowToShow = false;
      $(this).children().fadeOut('fast');
      //$('.portfolio-interface').fadeIn('slow');
      smoothIn('.portfolio-interface');
    } else {
      // $('.circlePlaceholder > svg, .circlePlaceholder > p').fadeIn('fast');
      allowToShow = true;
    }

    $(this).toggleClass('fillToScreen');
  });


  // Attempted new implementation with .hover() yay jQuery!
  var paintBrushShown = true;
  $('#graphicCircle').hover(function(){
    if (paintBrushShown){
      // The painBrush is on, hide it and show the expand button.
      $('.paintBrush').fadeOut('medium', function(){
        paintBrushShown = false;
        if (!allowToShow) return;
        $('#expandIcon-graphic').fadeIn('medium', function(){
          // $('#expandIcon-graphic').addClass('expandIcon-enlarge');
        });
        $('#expandIcon-graphic').css('transform', 'scale(1.2,1.2)');

      });
    } else {
      $('#expandIcon-graphic').css('transform', 'scale(1,1)');
      $('#expandIcon-graphic').fadeOut('medium', function(){
        paintBrushShown = true;
        if (!allowToShow) return;
        $('.paintBrush').fadeIn('medium');
        // $('#expandIcon-graphic').removeClass('expandIcon-enlarge');
      });
    }
  });

  // Code section
  var codeTextShown = true;
  $('#codeCircle').hover(function(){
    if (codeTextShown){
      // The painBrush is on, hide it and show the expand button.
      $('.skillsCodeHeader').fadeOut('medium', function(){
        codeTextShown = false;
        if (!allowToShow) return;
        $('#expandIcon-code').fadeIn('medium', function(){
        });
        $('#expandIcon-code').css('transform', 'scale(1.2,1.2)');

      });
    } else {
      $('#expandIcon-code').css('transform', 'scale(1,1)');
      $('#expandIcon-code').fadeOut('medium', function(){
        codeTextShown = true;
        if (!allowToShow) return;
        $('.skillsCodeHeader').fadeIn('medium');
      });
    }
  });

  // Video section
  var videoIconShown = true;
  $('#videoCircle').hover(function(){
    if (videoIconShown){
      // The painBrush is on, hide it and show the expand button.
      $('.videoCameraIcon').fadeOut('medium', function(){
        videoIconShown = false;
        if (!allowToShow) return;
        $('#expandIcon-video').fadeIn('medium', function(){
        });
        $('#expandIcon-video').css('transform', 'scale(1.2,1.2)');

      });
    } else {
      $('#expandIcon-video').css('transform', 'scale(1,1)');
      $('#expandIcon-video').fadeOut('medium', function(){
        videoIconShown = true;
        if (!allowToShow) return;
        $('.videoCameraIcon').fadeIn('medium');
      });
    }
  });


  // Displaying the Portfolio content.

  // The whitewash overlay interface needs to be initiated for each button.
  // The content depends on which button was pressed.



}); // End of document ready.

function smoothOut(element, callback){
  var $element = $(element);

  $element.css('opacity', '0');

  $element.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
        $(this).css('display', 'none');
        if (callback) callback();
  });
}
function smoothIn(element, callback) {
  var $element = $(element);

  $element.css('opacity', '0');

  $element.css('display', 'block');
  console.log($element.css('display'));

  $element.css('opacity', '1');

  $element.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function() {
        if (callback) callback();
  });
}

  // Google analytics.

  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-78703723-1', 'auto');
  ga('send', 'pageview');
