// - Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics.
// 	- We chose animals for our theme, but you can make a list to your own liking.

var topics = ["cats", "dogs", "birds"];
// - Your app should take the topics in this array and create buttons in your HTML.
// 	- Try using a loop that appends a button for each string in the array.
topics.forEach(function(topic){
	var topicButton = $("<button>");
	topicButton.addClass("btn");
	topicButton.text(topic);
	$("#btn-container").append(topicButton);
});

// - When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.
// set a  event listener on `click`
	// check which button was click (this)
	// get the text value of button clicked save that to a variable
$(".btn").on("click", function(){
	var btnValue = $(this).text();
	//console.log(btnValue);
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + btnValue +"&api_key=dc6zaTOxFJmzC&limit=10";
	// var queryURL = baseURL + btnValue;

      // make call to api
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response){
      	// console.log(response);
      	// console.log(response.data[].images.fixed_height_small_still.url);
      	$("#img-container").empty();
      	response.data.forEach(function(element){
      		//console.log(element.images.fixed_height_small_still.url);
      		var stillImage = element.images.fixed_height_small_still.url;
      		var animatedImage = element.images.fixed_height_small.url;
      		//console.log(element.images.fixed_height_small.url);
      		var elementImg = $("<img>");
      		elementImg.addClass("giff");
      		elementImg.attr("data-still", stillImage);
      		elementImg.attr("data-animated", animatedImage);
      		elementImg.attr("src", stillImage);
      		//$("#img-container").html("");
      		$("#img-container").append(elementImg);
      	});
      });

});
//topics.push(btnValue);
// concatenate variable above with 



// - When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.
// set a event listener on `click`
// the image clicked check if the 
// $(".giff").on("click", function() {
$("#img-container").on("click", ".giff",function() {
  console.log("clicked");
  var src = ($(this).attr("src") === $(this).attr("data-still"))
                ? $(this).attr("data-animated") 
                : $(this).attr("data-still");
  $(this).attr("src", src);
});

// - Under every gif, display its rating (PG, G, so on).
// 	- This data is provided by the GIPHY API.
// 	- Only once you get images displaying with button presses should you move on to the next step.


// - Add a form to your page takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array remakes the buttons on the page.


// - Deploy your assignment to Github Pages.