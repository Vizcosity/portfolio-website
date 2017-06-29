const spaceID = 'g791xagttdc8';
const accessToken = 'e0588852d2401c2c2b331a719151d9f8feae5aca98cadfe968be9183c424fb48';


$(document).ready(function(){

  // Entry point.

  // Typing animations.
  $(".landing-tagline > target").typed({
			strings: ["websites.", "videos.", "software.","branding material.", "people happy.", "sleek design."],
			typeSpeed: 75,
      loop: true
		});

  // Portfolio item content grid layout with jQuery MixItUp 3.
  var grid = mixitup(".items-container");

  // Scroll revealing.
  window.sr = ScrollReveal();

  sr.reveal('.portfolio-container');
  sr.reveal('.about-container');

  // Content retrieval.
  //
  // The following code retrieves the portfolio items from
  // Contentful and injects them into the page.
  fetchItemsJSON(spaceID, accessToken, function(items){

    // for (var i = 0; i < items.length; i++){
    //     render(new PortfolioItem(items[i]), 'div.items-container');
    // }

  });

  // Portfolio item hover effects.
  $('.items-container').on('mouseover', '.portfolio-item', function(event){

    // Set the title text to disappear.
    $(this).children(".portfolio-item-overlay").children('p.portfolio-head-text').fadeOut("fast");

    // Increase opacity of the overlay.
      // Grab the rgba() val of the current overlay being used.
      var rgbVal = $(this).children('.portfolio-item-overlay').css('background-color');

      rgbVal = rgbVal.replace('0.5', '0.75');

      $(this).children('.portfolio-item-overlay').css('background-color', rgbVal);

    // Show the desc text and the expand icon.
    $(this).children(".portfolio-item-overlay").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
      $(this).children(".portfolio-item-overlay").children("p.portfolio-desc-text").fadeIn('fast');
      $(this).children(".portfolio-item-overlay").children("svg.portfolio-expand-icon").fadeIn('fast');
    });

  });

  $('.items-container').on('mouseleave', '.portfolio-item', function(event){

    // Set the title text to disappear.
    $(this).children(".portfolio-item-overlay").children('p.portfolio-head-text').fadeIn("fast");

    // Decrease opacity of the overlay.
      // Grab the rgba() val of the current overlay being used.
      var rgbVal = $(this).children('.portfolio-item-overlay').css('background-color');

      rgbVal = rgbVal.replace('0.75', '0.5');

      $(this).children('.portfolio-item-overlay').css('background-color', rgbVal);

    // Hide the text and expand icon on mouse leave.
    $(this).children(".portfolio-item-overlay").children("p.portfolio-desc-text").fadeOut('fast');
    $(this).children(".portfolio-item-overlay").children("svg.portfolio-expand-icon").fadeOut('fast');

  });

});


// Grabbing the portfolio items from Contentful:
function fetchItemsJSON(spaceID, accessToken, callback){

  var client = contentful.createClient({
    space: spaceID,
    accessToken: accessToken
  });

  // Collect the portfolio item entries in raw JSON:
  client.getEntries().then(function(entries){

    var output = [];
    for (var i = 0; i < entries.items.length; i++){
      output.push({
        title: entries.includes.Entry[i].fields.title,
        caption: entries.includes.Entry[i].fields.caption,
        image: {
          title: entries.includes.Asset[i].fields.title,
          url: "http:"+entries.includes.Asset[i].fields.file.url
        },
        // date: {
        //   start: ,
        //   complet
        // }
        categories: entries.items[i].fields.filterType
      });
    }

    // Return
    if (callback) return callback(output);

  });

}

// Portfolio Item object.
// function PortfolioItem(details){
//   this.markup =
// }
