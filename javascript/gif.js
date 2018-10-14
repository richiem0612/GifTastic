var gifs = ["Animals", "Cars", "Work", "School","Friends"]

function showGifs() {

  $(".images").empty()
  var buttonPressed = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Y0tDbiz9vG6Uj4CoWaKTw8cLvf2KZnoc";

  $.ajax({
    url: queryURL,
    method: "GET",
    data: {
      q: buttonPressed,
      limit: "10",
      rating: "g",
    }
  }).done(function (response) {

    console.log(response);

    var dataResponse = response.data;
    dataResponse.forEach(function (element) {
      var imgURL = element.images.fixed_width.url;
      var myImg = $("<img class='responsive gifImage'>");
      myImg.attr("src", imgURL);
      $(".images").append(myImg);
    });
  });
}

$("#searchBtnn").on("click", function (event) {
  // event.preventDefault() can be used to prevent an event's default behavior.
  event.preventDefault();
  // Here we grab the text from the input box
  var gifName = $("#searchTerm").val().trim();
  console.log(gifName);
  gifs.push(gifName);
  $('#searchTerm').val('');
  addButtons()
});

function addButtons() {
  $(".buttons").empty();
  for (var i = 0; i < gifs.length; i++) {
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)var button = $("<button>");
    var button = $("<button>");
    // Adding a class
    button.addClass("gifName btn btn-danger");
    // Adding a data-attribute with a value of the movie at index i
    button.attr("data-name", gifs[i]);
    // Providing the button's text with a value of the movie at index i
    button.text(gifs[i]);
    // Adding the button to the HTML
    $(".buttons").append(button);
  }
}

$(document).on("click",".gifName",showGifs)

addButtons();