var searchResults = [];
var wishlist = [];

$(document).ready(function() {
    console.log('jq ready');

    $('#searchButton').on('click', function() {
        var movieTitle = $('#searchIn').val();
        // Assemble search URL
        var searchUrl = 'http://www.omdbapi.com/?s=' + movieTitle;
        console.log(searchUrl);
        // Hit the OMDB API with an AJAX call
        $.ajax({
            url: searchUrl,
            dataType: 'JSON',
            success: parseMovieData
        });
    });
});

function parseMovieData(movieData) {
    /* Parses movie data from API call and displays it on the DOM */
    console.log("Search data:", movieData.Search);
    searchResults = searchResults.concat(movieData.Search);
    console.log("New array:", searchResults);
    displayMoviesData(searchResults);
    $('.addToWishlist').on('click', function() {
        var imdbId = $(this).parent().data('imdbid');
        addToWishlist(imdbId);
    });
}

function displayMoviesData(moviesList) {
    /* Iterates through a list of OMDB movies and adds them to the DOM */
    var htmlString = '';
    moviesList.forEach(function(movie) {
        htmlString += '<div data-imdbID="' + movie.imdbID + '"><h4>' + movie.Title + '</h4>';
        htmlString += '<img src="' + movie.Poster + '" />';
        htmlString += '<button class="addToWishlist">Add to Wishlist</button>';
        htmlString += '</div>';
    });
    $('#moviesDisplay').html(htmlString);
}

function addToWishlist(idToFind) {
    var movie = searchSearchResults(idToFind, searchResults);
    console.log(movie);
    wishlist.push(movie);
}

function searchSearchResults(idToFind, searchArray) {
    console.log("ID: ", idToFind);
    /* Looks through the search results array to find a movie with a matching ID */
    for (var i = 0; i < searchArray.length; i++) {
      if (searchArray[i].imdbID === idToFind) {
        return searchArray[i];
      }
    }
}
