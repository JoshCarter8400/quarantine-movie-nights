var popcornBtn = document.querySelector("#search-btn");
var searchGenre = document.querySelector("#genre-dropdown");
var actorInput = document.querySelector("#actor-input");

var getPersonId = function(actor) {


    var apiUrl =
        "https://api.themoviedb.org/3/search/person?api_key=0bd9398a9daad70a50c685a4f8c0a74b&language=en-US&query=" + encodeURIComponent(actor) + "&page=1&include_adult=false";


    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            if (data.results.length === 0) {
                displayError("No matches found for " + actorInput.value + ".");
                return;
            }
            var searchOption = {
                actor: data.results[0].id,
                genre: $("#genre-dropdown").val().trim()
            }
            getMovies(searchOption);

        });

    });




};

var searchHandler = function(event) {
    var searchGenre = document.getElementById("genre-dropdown");
    var actorInput = document.querySelector("#actor-input");

    var actor = actorInput.value.trim();

    if (!actor) {
        displayError("Please Enter Actor or Actress");
        return;
    }

    getPersonId(actor);
};


// options should be an object with genre and actor properties
function getMovies(options) {
    
    
    var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0bd9398a9daad70a50c685a4f8c0a74b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";
  
    // add the desired genre and actor to the query string
    // hardcoded genre for now
    apiUrl += "&with_genres=" + options.genre; //options.genre;
    apiUrl += "&with_cast=" + options.actor;

    // fetch from the API
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                // data.results will be an array of movie info
                if (data.results.length === 0) {
                    displayError("No matches found for " + searchGenre.selectedOptions[0].innerHTML + " movies with " + actorInput.value + ".");
                    return;
                }
                displayMovies(data.results);

            });
        } else {
            displayError("Error: " + response.statusText);
        }

    }).catch(function(error) {
        displayError("Unable to connect to TMDb");
    });
}


function displayMovies(movieData) {
    var movieListEl = document.getElementById("now-playing");
    var tempHtml = "";

    for (var i = 0; i < movieData.length; i++) {
        tempHtml += "<li class='is-size-4' data-movie-id='" + movieData[i].id + "'>" + movieData[i].title;
        tempHtml += " <span class='icon has-text-info is-medium'><i class='fas fa-lg fa-plus-square'></i></span></li>";
    }

    movieListEl.innerHTML = tempHtml;
}


function displayError(errMsg) {
    $(".modal-card-title").text(errMsg);
    $(".modal").addClass("is-active is-clipped");
}


popcornBtn.addEventListener("click", searchHandler);
// this allows the user to search by using the enter button instead of just the search button click event
actorInput.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        searchHandler(event);
    }
})


$("#close-modal-btn").click(function() {
    $(".modal").removeClass("is-active");
});
$(".modal-background").click(function() {
    $(".modal").removeClass("is-active");
});