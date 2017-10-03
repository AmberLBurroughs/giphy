
//array of meme topics
var topics = ["doge", "crying jordan", "shia labeouf", "grumpy cat"];

//append topics as buttons on page
function appendStartingButtons() {
  topics.forEach(function(topic){
    var topicButton = createButtonHTML(topic);
    $("#btn-container").append(topicButton);
  });
}

// create topic buttons
function createButtonHTML(topic){
  var topicButton = $("<button>");
  topicButton.addClass("btn");
  topicButton.text(topic);
  return topicButton;
}

// get btn val concatenate with queryURL
// scroll to gif section 
function clickMeme(){
  var btnValue = $(this).text();
  console.log(btnValue);
  var apiKEY = "&api_key=dc6zaTOxFJmzC";
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "&limit=10" + apiKEY;
  // make call to api
  getGifyData(queryURL);
  $('html, body').animate({
              scrollTop: $("#gif-wrap").offset().top
          }, 500);
}


// toggle animated and still image on click
$("#img-container").on("click", ".giff", function() {
  console.log("clicked");
  var src = ($(this).attr("src") === $(this).attr("data-still"))
                ? $(this).attr("data-animated") 
                : $(this).attr("data-still");
  $(this).attr("src", src);
});


// get gifs for topics with giphy api add them to page
function getGifyData(queryURL){
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){
    // console.log(response);
    // console.log(response.data[].images.fixed_height_small_still.url);
    $("#img-container").empty();
    response.data.forEach(function(element){
      //console.log(element.images.fixed_height_small_still.url);
      var stillImage = element.images.fixed_width_still.url;
      var animatedImage = element.images.fixed_width.url;
      var gifRating = element.rating;
      //console.log(element.images.fixed_height_small.url);
      var topicGif = createGifHTML(stillImage, animatedImage, gifRating);
  
      $("#img-container").append(topicGif);
    });
  });
}

// create html elements for api response
function createGifHTML(url1, url2, rating){
  var imgContainer = $("<div>");
  imgContainer.addClass("img-wrap");

  var elementImg = $("<img>");
  elementImg.addClass("giff");
  elementImg.attr("data-still", url1);
  elementImg.attr("data-animated", url2);
  elementImg.attr("src", url1);

  var imgRating = $("<p>");
  imgRating.addClass("ratingTxt");
  imgRating.text("rated: " + rating);

  imgContainer.append(elementImg);
  imgContainer.append(imgRating);

  return imgContainer
}

// show error if user adds existing topic
$("#topic-form-input").on("click", function() {
  $("#errormsg").addClass("hide");
});

// get input from form submit and validate 
$("#topic-form-submit").on("click", function(e) {
  // checking validity on jquery element 
   var inpObj = $("#topic-form");
    if (inpObj[0].checkValidity() == false) {
      return
    } else {
      e.preventDefault() 
    }
    var newTopic = $("#topic-form-input").val().trim();
    // console.log(newTopic);
    if(!topics.includes(newTopic)){
      topics.push(newTopic);
      appendNewButtons(newTopic);
    } else {
      $("#errormsg").removeClass("hide");
    }

    $("form").trigger("reset");

    $(".btn").on("click", clickMeme);

    
    return false; // prevent page refresh
  });


// add user input as a new button to html 
function appendNewButtons(newTopic) {
  var topicButton = createButtonHTML(newTopic);
  $("#btn-container").prepend(topicButton);
}

// on page load
$( document ).ready(function() {
  appendStartingButtons();
  // - When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
  // set a  event listener on `click`
  // check which button was click (this)
  // get the text value of button clicked save that to a variable
  $(".btn").on("click", clickMeme);
  
  // toggle scroll to top div visiblity for meme section 
  $(window).scroll(function () {
    if ($(window).scrollTop() > 700) {
      $("#to-top").removeClass("hide");
      //.fadeOut(1000)
      $("#to-top").addClass("show");
    }
    if ($(window).scrollTop() < 700) {
      $("#to-top").addClass("hide");
      $("#to-top").removeClass("show");
    }
  });

// animate scroll to top 
  $("#to-top").on("click", function() {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
    });
});
// - Deploy your assignment to Github Pages.