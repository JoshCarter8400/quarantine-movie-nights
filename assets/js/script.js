var popcornBtn = document.querySelector("#search-btn");
var searchGenre = document.querySelector("#genre-dropdown");
var actorInput = document.querySelector("#actor-input");
var watchListBtn = document
var savedMovies = [];


var searchHandler = function () {
    var actorInput = document.querySelector("#actor-input");
    var actor = actorInput.value.trim();

    if (!actor) {
        displayError("Please enter an actor name");
        return;
    }

    document.getElementById("now-playing").innerHTML = "";
    getPersonId(actor);
};


var getPersonId = function (actor) {
    var apiUrl = "https://api.themoviedb.org/3/search/person?api_key=0bd9398a9daad70a50c685a4f8c0a74b";
    apiUrl += "&language=en-US&page=1&include_adult=false&query=" + encodeURIComponent(actor);

    fetch(apiUrl).then(function (response) {
        response.json().then(function (data) {
            if (data.results.length === 0) {
                displayError("No matches found for " + actorInput.value + ".");
                return;
            }
            var searchOption = {
                actor: data.results[0].id,
                genre: $("#genre-dropdown").val()
            }
            getMovies(searchOption);
        });
    });
};


// options should be an object with genre and actor properties
function getMovies(options) {
    var apiUrl = "https://api.themoviedb.org/3/discover/movie?api_key=0bd9398a9daad70a50c685a4f8c0a74b";
    apiUrl += "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    // add the desired genre and actor to the query string
    apiUrl += "&with_genres=" + options.genre;
    apiUrl += "&with_cast=" + options.actor;

    // fetch from the API
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                // data.results will be an array of movie info
                if (data.results.length === 0) {
                    displayError("No matches found for " + searchGenre.selectedOptions[0].innerHTML + " movies with " + actorInput.value + ".");
                    return;
                }
                for (var i = 0; i < data.results.length; i++) {
                    getImdbId(data.results[i].id);
                }

            });
        } else {
            displayError("Error: " + response.statusText);
        }

    }).catch(function (error) {
        displayError("Unable to connect to TMDb");
    });
}


function getImdbId(tmdbId) {
    var apiUrl = "https://api.themoviedb.org/3/movie/" + tmdbId + "/external_ids?api_key=0bd9398a9daad70a50c685a4f8c0a74b";

    // fetch from the API
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                getMovieInfo(data.imdb_id);
            });
        } else {
            displayError("Error: " + response.statusText);
        }

    }).catch(function (error) {
        displayError("Unable to connect to TMDb");
    });
}


function getMovieInfo(imdbId) {
    var plotApi = "http://www.omdbapi.com/?apikey=3797140b&i=" + imdbId

    fetch(plotApi).then(function (response) {
        response.json().then(function (data) {
            displayMovie(data);
        })
    })
}


function displayMovie(movieData) {
    var movieListEl = document.getElementById("now-playing");
    var tempHtml = "<div class='card'><header class='card-header'>";
    tempHtml += "<p class='card-header-title movie-title' id='title'>" + movieData.Title + "</p>";
    tempHtml += "</header><div class='card-content'><div class='content movie-summary'>";
    tempHtml += movieData.Plot;
    tempHtml += "</div></div><footer class='card-footer'><a href='#' class='card-footer-item'>Click here to save to Watch List</a></footer></div>";

    movieListEl.innerHTML += tempHtml;

var addMovie = function(){
    savedMovies = document.querySelector("#saved-movies");
    title = document.querySelector("#title");
    let newTitle = document.createElement("li");
    newTitle = title;
   $(title).clone().appendTo(savedMovies);

};
watchListBtn.addEventListener("click", addMovie);

}




function displayError(errMsg) {
    $(".modal-card-title").text(errMsg);
    $(".modal").addClass("is-active is-clipped");
}
saveInfo();


popcornBtn.addEventListener("click", searchHandler);
// this allows the user to search by using the enter button instead of just the search button click event
actorInput.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        searchHandler();
    }
})


$("#close-modal-btn").click(function () {
    $(".modal").removeClass("is-active");
});
$(".modal-background").click(function () {
    $(".modal").removeClass("is-active");
});