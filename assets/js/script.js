var popcornBtn = document.querySelector("#search-btn")
var searchGenre = document.querySelector("#genre-dropdown")
var actorInput = document.querySelector("#actor-input")



var getPersonId = function (actor) {


  var apiUrl =
    "https://api.themoviedb.org/3/search/person?api_key=0bd9398a9daad70a50c685a4f8c0a74b&language=en-US&query=" + encodeURIComponent(actor) + "&page=1&include_adult=false"


  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      console.log(data)

    })

  });




};

var searchHandler = function (event) {
  var searchGenre = document.querySelector("#genre-dropdown")
  var actorInput = document.querySelector("#actor-input")

  var actor = actorInput.value.trim();

  if (!actor) {

    $(".modal-content").text("Please Enter Actor or Actress")
    $(".modal").addClass("is-active is-clipped")
  }

  $("#close-modal-btn").click(function () {
    $(".modal").removeClass("is-active");
  });
}



// options should be an object with genre and actor properties
function getMovies(options) {
  var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0bd9398a9daad70a50c685a4f8c0a74b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

  // add the desired genre and actor to the query string
  apiUrl += "&with_genres=" + options.genre;
  apiUrl += "&with_cast=" + options.actor;

  // fetch from the API
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // data.results will be an array of movie info
        displayMovies(data.results);
      });
    } else {
      displayError("Error: " + response.statusText);
    }

  }).catch(function (error) {
    displayError("Unable to connect to TMDb");
  });
}



popcornBtn.addEventListener("click", searchHandler)
