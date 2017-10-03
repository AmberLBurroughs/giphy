
//$("form").trigger("reset");


// - Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// 	- We chose animals for our theme, but you can make a list to your own liking.

var topics = ["doge", "crying jordan"];

// - Your app should take the topics in this array and create buttons in your HTML.
// 	- Try using a loop that appends a button for each string in the array.
  function appendStartingButtons() {
    topics.forEach(function(topic){
      var topicButton = createButtonHTML(topic);
      $("#btn-container").append(topicButton);
    });
  }

  function createButtonHTML(topic){
    var topicButton = $("<button>");
    topicButton.addClass("btn");
    topicButton.text(topic);
    return topicButton;
  }


// - When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// set a event listener on `click`
// the image clicked check if the 
// $(".giff").on("click", function() {
$("#img-container").on("click", ".giff", function() {
  console.log("clicked");
  var src = ($(this).attr("src") === $(this).attr("data-still"))
                ? $(this).attr("data-animated") 
                : $(this).attr("data-still");
  $(this).attr("src", src);
});


// - Under every gif, display its rating (PG, G, so on).
// 	- This data is provided by the GIPHY API.
// 	- Only once you get images displaying with button presses should you move on to the next step.

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
      var stillImage = element.images.fixed_height_still.url;
      var animatedImage = element.images.fixed_height.url;
      var gifRating = element.rating;
      //console.log(element.images.fixed_height_small.url);
      var topicGif = createGifHTML(stillImage, animatedImage, gifRating);
      //$("#img-container").html("");
      $("#img-container").append(topicGif);
    });
  });
}

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
  imgRating.text(rating);
  imgContainer.append(elementImg);
  imgContainer.append(imgRating);
  return imgContainer
}

$("#topic-form-input").on("click", function() {
  $("#errormsg").addClass("hide");
});

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

    $(".btn").on("click", function(){
      var btnValue = $(this).text();
      console.log(btnValue);
      var apiKEY = "&api_key=dc6zaTOxFJmzC";
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "meme" + "&limit=10" + apiKEY;
      // make call to api
      getGifyData(queryURL);
    });
    
    return false; // prevent page refresh
  });

// add user input button to html 
function appendNewButtons(newTopic) {
  var topicButton = createButtonHTML(newTopic);
  $("#btn-container").prepend(topicButton);
}

$( document ).ready(function() {
  appendStartingButtons();
  // - When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
  // set a  event listener on `click`
  // check which button was click (this)
  // get the text value of button clicked save that to a variable
  $(".btn").on("click", function(){
    var btnValue = $(this).text();
    console.log(btnValue);
    var apiKEY = "&api_key=dc6zaTOxFJmzC";
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue + "&limit=10" + apiKEY;
    // make call to api
    getGifyData(queryURL);
  });
});
// - Deploy your assignment to Github Pages.