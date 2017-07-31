//==========Initial array of Food==========//
var gifs = ["Bob's Burgers", "Sushi", "Ramen", "KBBQ", "Cloudly with a Chance of Meatballs", "Ratatouille"];



//==========function for displaying button==========//
function renderButtons() {

  //-----deletes buttons prior to adding new gifs so there is no repeats-----//
  $("#buttons-view").empty();

  //-----Loops through the array of gifs-----//
  for (var i = 0; i < gifs.length; i++) {

    var newButton = $("<button>"); // creates a new button tag
    newButton.addClass("gif-button"); //adds a class to button
    newButton.attr("data-name", gifs[i]); // add data-name to button
    newButton.text(gifs[i]); // add text to button

    //-----adding buttons into the section "buttons-view"-----//
    $("#buttons-view").append(newButton); 
  }
}



//==========function for displaying gifs==========//
function displayGif() {
  
  //-----takes the value of the attribute "data-name"-----//
  var addGif = $(this).attr("data-name");
  console.log("Food button clicked: " + addGif);

  //-----API key for url-----//
  var APIKey = "dc6zaTOxFJmzC";

  //-----url that will be called-----//
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + addGif + "&limit=10&api_key=" + APIKey;
  console.log("URL: " + queryURL);

  //----------ajax is calling the url----------//
  $.ajax({ 
    url: queryURL,
    method: "GET"
  }).done(function(response) {

      //-----stores the response.data object into results-----//
      results = response.data;

      //-----deletes gifs to add new gif subjects-----//
      $("#gifs-appear-here").empty();

      //----------loops to create each gif----------//
      for (var i = 0; i < results.length; i++) {

        //-----Rating-----//
        var h = $("<h3>"); // creates a h3 tag
        h.text("Rating: " + results[i].rating.toUpperCase()); // grabs data object to h3 tag

        //-----Image-----//
        var image = $("<img>"); // creates the image tag
        image.attr("src", results[i].images.fixed_height_still.url); // grabs object's value to src
        image.attr("data-still", results[i].images.fixed_height_still.url); // grabs object's value to data-still
        image.attr("data-animate", results[i].images.fixed_height.url); // grabs object's value to data-animate
        image.attr("data-state", "still"); // add string "still" to data-state
        image.addClass("gif"); // calls a class "gif" to image

        //----Div-----//
        var newDiv = $("<div>"); //creates a div

        //-----add the h and image tags into the newDiv-----//
        newDiv.append(h, image); 

        //-----add that newDiv into the section "gifs-appear-here"-----//
        $("#gifs-appear-here").prepend(newDiv);
      }
  });
}


//==========calls renderButtons function to display the intial buttons==========//
renderButtons();



//==========Click button to add gif button==========//
$("#add-gif").on("click", function(event) {


  //-----allow users to press enter instead of the submit button-----//
  event.preventDefault();

  //-----grabs the value from textbox-----//
  var gif = $("#gif-input").val().trim();
  console.log("Adding Food Button: " + gif);

  //-----push the value grabbed from textbox into array-----//
  gifs.push(gif);

  //-----calls renderButtons-----//
  renderButtons();
});



//==========when child element(.gif-button) in document is clicked, run function==========//
$(document).on("click", ".gif-button", displayGif);



//==========when child element(.gif) in ID is clicked, run function==========//
$("#gifs-appear-here").on("click", ".gif", (function() {
  
  //-----grab value from data-state and store into "state"-----//
  var state = $(this).attr("data-state");

  //-----check condition of state-----//
  if(state === "still") {
    console.log("Animate");
    var animate = $(this).attr("data-animate");
    $(this).attr("src", animate);
    $(this).attr("data-state", "animate");
  }
  else {
    console.log("Still");
    var still  = $(this).attr("data-still")
    $(this).attr("src", still);
    $(this).attr("data-state", "still");
  }          
}));
