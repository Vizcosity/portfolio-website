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
