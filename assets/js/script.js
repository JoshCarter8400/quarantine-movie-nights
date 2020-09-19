var popcornBtn = document.querySelector("#search-btn")
var searchGenre = document.querySelector("#genre-dropdown")
var actorInput = document.querySelector("#actor-input")



var getPersonId = function(actor) {


    var apiUrl =
        "https://api.themoviedb.org/3/search/person?api_key=0bd9398a9daad70a50c685a4f8c0a74b&language=en-US&query=" + encodeURIComponent(actor) + "&page=1&include_adult=false"


    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data)

        })






    });




};

var searchHandler = function(event) {
    var searchGenre = document.querySelector("#genre-dropdown")
    var actorInput = document.querySelector("#actor-input")

    var actor = actorInput.value.trim();

    if (!actor) {
        $(".modal-content").text("Please Enter Actor or Actress")
        $(".modal").addClass("is-active")

    }
}

popcornBtn.addEventListener("click", searchHandler)