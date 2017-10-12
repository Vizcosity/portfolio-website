const spaceID = 'g791xagttdc8';
const accessToken = 'e0588852d2401c2c2b331a719151d9f8feae5aca98cadfe968be9183c424fb48';

var categories = [];

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

    for (var i = 0; i < items.length; i++){
        render(new PortfolioItem(items[i], items[i].id), 'div.items-container');
    }

  });

  // Load the about section.
  loadAboutSection(spaceID, accessToken);

  // Portfolio Item expand / collapse functionality.
  $('.items-container').on('click', '.expandable', function(){

    // $(this).css('display: none');

    expandPortfolioItem($(this), ($expanded) => {

      // After expansion, add in the dynamic article content.
      loadPortfolioArticle($expanded, () => {

        // After we load the content, remove the 'waiting-for-portfolio-content'
        // class, but wait at least half a second.
        setTimeout(() => {
          $expanded
          .children('.portfolio-item-overlay')
          .removeClass('waiting-for-portfolio-content');
        }, 500);

        // After we remove the waiting class, reveal all of the content.
        revealPortfolioContent($expanded.children('.portfolio-item-overlay'));


      });

    })


  });

  // Collapse functionality for portoflio item.
  $('body').on('click', '.portfolio-item-extended-exit-button', function(){

    // Fade out the button, and text content.
    $('button.portfolio-item-extended-exit-button > svg').fadeOut("fast");

    $(this).siblings('.portfolio-item-extended-content-container').fadeOut();

    // Set scrolling back on the body.
    $('body').css("overflow", "auto");

    var $item = $(this).parent().parent();

    // Remove the expanded class so that background transitions back to normal.
    $item.removeClass("expanded");

    $item.addClass("portfolio-item-overlay-collapse");

    $item.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function(){
      $(this).remove();
    });

  });

  // Scrolling effects.
  $('.downArrow').click(function(){
    $('.portfolio-container').velocity("scroll", {duration: 1000, easing: 'ease-in-out'});
  });

  // Scroll to designated anchor position.
  $('nav a').click(function(event){

    event.preventDefault();

    var hrefLink = $(this).attr('href');


    // Scroll to the correct position.
    $('a'+hrefLink).velocity("scroll", {duration: 1000, easing: 'ease-in-out'});

  });


  // Blur parrallax slider on scroll.
  // $(window).on('scroll', function(){
  //
	//    var max = 5;
  //
	//    var amt = max * ($(window).scrollTop() / $('body').height());
  //
	//    $('.parallax-slider').css("filter", "blur("+amt+"px)");
  // });


});

// Reveals article on scroll, as well as meta data related to the portfolio
// item such as dates, tags and so forth.
function revealPortfolioContent($element, callback){

  // Enable scroll reveal on the loaded element.
  // sr.reveal('.portfolio-item-extended-content-container');

  // Push the header text upward and slot in the metadata.




}

// Loads a portfolio article and grabs renders to the element.
function loadPortfolioArticle($element, callback){

  // Portfolio item id.
  var id = $element.data('id');

  // Get the entry by id.
  getEntryById(id, (data) => {

    // If no article, return.
    if (!data || !data.fields || !data.fields.article) return;

    // Render it onto the page.
    render(new Article(data.fields.article), $element.children('.portfolio-item-overlay'));

    // Call callback.
    if (callback) callback();

  })

}

// Parses md to HTML.
function parseMD(md){

  var parseMarkdown = new showdown.Converter();
  return parseMarkdown.makeHtml(md);

}

// Article object.
function Article(md){

  // Instantiate markdown parser.
  var parseMarkdown = new showdown.Converter();

  this.markdown = md;

  this.markup = `<div class="portfolio-item-extended-content-container portfolio-item-article">` +
                  parseMarkdown.makeHtml(md) +
                `</div>`;

}

// Expands a passed portfolio item.
function expandPortfolioItem($element, callback){

  // Duplicate the current element, and inject into page as a fixed pos overlay.
    // We first create a jQuery element object and prepare it to be injected into the page.
    // var overlayElement = $('<div class="portfolio-item">'+$(this).html()+'</div>');
    var $overlayElement = $($element[0].outerHTML);

    // Save the position + size attributes of the item as it is on the page.
    var elementAttributes = $element[0].getBoundingClientRect();

    // Remove the unsupported 'x' and 'y' properties.
    elementAttributes = cleanExpansionElementAttributes(elementAttributes);

    // Save the attributes in the global variable, to be used later when collapsing.
    // globalAttributes[$(this).data("id")] = elementAttributes;
    //
    console.log(`Incoming collapse stuff.`);
    console.log(elementAttributes);

    prepareCollapseAnimation(elementAttributes, $element);

    // Add fixed positining before applying styles to overlay object.
    elementAttributes.position = "fixed";
    elementAttributes.display = "none";

    // Prepare CSS for fixed positioning using above attributes.
    $overlayElement.css(elementAttributes);

    // Inject the element into the page.
    $overlayElement = $overlayElement.appendTo("body");

    // Display the element on the page.
    $overlayElement.show();

    // Remove the expandable class to prevent double expansion.
    $overlayElement.removeClass("expandable");
    $overlayElement.addClass("expanded");

    // Add the overlay element CSS class.
    $overlayElement.addClass("portfolio-item-overlay-expand");


    // Stop scroll from occurring on the body.
    $('body').css('overflow', 'hidden');

    // Append the article info.

      // First, we make the portfolio container scrollable.
      var $innerContent = $overlayElement.find(".portfolio-item-overlay")
      // $innerContent.css("overflow-y", "scroll");

      // Make the Header Text / title fixed.
      // $innerContent.find(".portfolio-head-text").css({"position": "fixed", "z-index": 0});
      // Apply the 'waiting for content' class.
      $innerContent.addClass('waiting-for-portfolio-content');

      // Wait for the expand animation to finish, then call the parent callback.
      $overlayElement.one('webkitAnimationEnd mozAnimationEnd oAnimationEnd oanimationend animationend', function(){

        // Add the load spinner to indicate that content is being retrieved.
        $innerContent.append(
          `<div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>`
        );


        // Inject the exit button.
        $innerContent.append(`
          <button class="portfolio-item-extended-exit-button tooltipped">
          <!-- SVG ICON -->
            <svg style="display: none;" stroke="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <line stroke-width="4" x1="2" x2="30" y1="2" y2="30"/><line stroke-width="4" x1="2" x2="30" y1="30" y2="2"/>
            </svg>

          <!-- TOOLTIP -->
            <p class='tooltip-content'>
              Back.
            </p>
          </button>`);

        // After appending the exit button, allow for a soft fadeIn.
        $("button.portfolio-item-extended-exit-button > svg").fadeIn();

        // Call the parent callback if it exists with the overlay element.
        if (callback) callback($(this));

      });

}

// Portfolio Item object.
function PortfolioItem(details, id){

  // Add the categories to the global variable if they do not exist already.
  for (var cat in details.categories){
    if (categories.indexOf(details.categories[cat]) === -1) addCategory(details.categories[cat]);
  }

  // Build the categories string.
  var cats = details.categories.join(" ");

  this.markup = '<div data-id="'+(id)+'" class="mix '+cats+' portfolio-item expandable" style="background-image: url(&quot;'+(details.image.url ? details.image.url : "")+'&quot;)">';
  this.markup += '<div class="portfolio-item-logo"></div>';
  this.markup +=  '<div class="portfolio-item-overlay">';
  this.markup += '<p class="portfolio-head-text">'+(details.title ? details.title : "")+'</p>';
  this.markup += '<div class="portfolio-preview-content">';
  this.markup += '<p class="portfolio-desc-text">'+(details.caption ? details.caption : "")+'</p>';
  this.markup +=  '<svg class="portfolio-expand-icon" height="32px" id="Layer_1" style="enable-background:new 0 0 32 32;" version="1.1" viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M28,2h-6c-1.104,0-2,0.896-2,2s0.896,2,2,2h1.2l-4.6,4.601C18.28,10.921,18,11.344,18,12c0,1.094,0.859,2,2,2  c0.641,0,1.049-0.248,1.4-0.6L26,8.8V10c0,1.104,0.896,2,2,2s2-0.896,2-2V4C30,2.896,29.104,2,28,2z M12,18  c-0.641,0-1.049,0.248-1.4,0.6L6,23.2V22c0-1.104-0.896-2-2-2s-2,0.896-2,2v6c0,1.104,0.896,2,2,2h6c1.104,0,2-0.896,2-2  s-0.896-2-2-2H8.8l4.6-4.601C13.72,21.079,14,20.656,14,20C14,18.906,13.141,18,12,18z"/></svg>';
  this.markuo +=  '</div>';
  this.markup +=  '</div>';
  this.markup +=  '</div>';

  this.attributes = details;
}

// Fetches the about section and loads it into the page.
function loadAboutSection(spaceID, accessToken){

  // Get the JSON info from contentful.
  getAboutSection(spaceID, accessToken, (details) => {

    render({markup: details.title}, $('h2#about-section-header'));

    // Parse the markdown from contentful.


    render({markup: parseMD(details.body)}, $('p.about-body'));

  });

}

// Fetch the about section from contentful.
function getAboutSection(spaceID, accessToken, callback){

  // Instance contentful client.
  var client = contentful.createClient({
    space: spaceID,
    accessToken: accessToken
  });

  // Fetch about section.
  client.getEntries({
    'content_type': 'about'
  })
  // Return the first entry.
  .then(response => {
    return callback({
      title: response.items[0].fields.sectionHeader,
      body: response.items[0].fields.sectionBody
    });
  })

}

// Grabbing the portfolio items from Contentful:
function fetchItemsJSON(spaceID, accessToken, callback){

  var client = contentful.createClient({
    space: spaceID,
    accessToken: accessToken
  });

  // Collect the portfolio item entries in raw JSON:
  client.getEntries({
    content_type: 'portfolioEntry'
  }).then(function(entries){

    var output = [];
    for (var i = 0; i < entries.items.length; i++){
      output.push({
        title: entries.items[i].fields.title,
        caption: entries.items[i].fields.caption,
        image: {
          title: entries.items[i].fields.coverImage.fields.title,
          url: "http:"+entries.items[i].fields.coverImage.fields.file.url
        },
        // date: {
        //   start: ,
        //   complet
        // }
        categories: entries.items[i].fields.filterType,
        id: entries.items[i].sys.id
      });
    }

    // Return
    if (callback) return callback(output);

  });

}

// Get the entry by ID.
function getEntryById(id, callback){

  // Set up Contentful client.
  var client = contentful.createClient({
    space: spaceID,
    accessToken: accessToken
  });

  client.getEntry(id)
  .then(entry => callback(entry))
  .catch(error => console.log(error));

}

function addCategory(category){
  // Adds category to the global variable and renders out in DOM.
  categories.push(category);

  $('.filter-container').append('<button style="border: none; background: none;" data-filter=".'+category+'"><a class="filter-option">'+category+'</a></button>');
}

// Takes in markup and a container, appends it.
function render(element, container){
  $(container).append(element.markup);
}

// Stylesheet incrementer.
var i = 0;

// Prepares the collapse animation by adding the positions and sizes to the stylesheet.
// Dynamic aniamtion.
function prepareCollapseAnimation(attributes, $element){

  var styles = '';
	styles = '@keyframes collapseItem {';
		styles += '0% {';
		styles += 'height: 100%;';
		styles += 'width: 100%;';
		styles += 'top: 0px;';
		styles += 'left: 0px;';
		styles += '}';
		// styles += '50% {';
		// styles += 'height: '+attributes.height+'px;';
		// styles += 'top: ' + attributes.top + 'px;';
		// styles += '}';
		styles += '100% {';
		styles += 'height: '+attributes.height+'px;';
		styles += 'width: '+attributes.width+'px;';
		styles += 'top: ' + attributes.top + 'px;';
		styles += 'left: ' + attributes.left + 'px;';
		styles += '}';
	styles += '}';

  document.styleSheets[0].insertRule(styles, i++);

}

// Cleans the 'x' and 'y' properties which are not supported in CSS.
function cleanExpansionElementAttributes($element){

  // the DOMRect object seems to not produce any keys when
  // using the Object.keys() function, therefore we have to map
  // all of our desired attribtes manually..

  var $output = {
    width: $element.width,
    height: $element.height,
    bottom: $element.bottom,
    left: $element.left,
    right: $element.right,
    top: $element.top,

  };

  // Return the cleaned element.
  return $output;

}
