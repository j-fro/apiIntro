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
    searchResults = movieData.Search;
    displayMoviesData(searchResults, '#moviesDisplay');
    // Wire up the movie buttons to add onto the wishlist
    $('.addToWishlist').on('click', function() {
        var imdbId = $(this).parent().data('imdbid');
        addToWishlist(imdbId);
    });
}

function displayMoviesData(moviesList, displayId) {
    /* Iterates through a list of OMDB movies and adds them to the DOM */
    var htmlString = '';
    moviesList.forEach(function(movie) {
        htmlString += '<div class="movie" data-imdbID="' + movie.imdbID + '"><h4>' + movie.Title + '</h4>';
        htmlString += '<img src="' + movie.Poster + '" />';
        htmlString += addButton(displayId);
        htmlString += '</div>';
    });
    $(displayId).html(htmlString);
}

function addButton(displayId) {
    /* Returns a string containing a button element based on which list it's
    being used for */
    if (displayId === '#moviesDisplay') {
        return '<button class="addToWishlist">Add to Wishlist</button>';
    } else if (displayId === '#wishlistBody') {
        return '<button class="removeFromWishlist">Remove</button>';
    }
}

function addToWishlist(idToFind) {
    // Find the movie that matches the selected ID
    var movie = searchSearchResults(idToFind, searchResults);
    wishlist.push(movie);
    displayMoviesData(wishlist, '#wishlistBody');
    // Wire up the remove button to delete the item from the wishlist
    $('.removeFromWishlist').on('click', function() {
        var imdbID = $(this).parent().data('imdbid');
        removeFromWishlist(imdbID, wishlist);
        displayMoviesData(wishlist, '#wishlistBody');
    });
}

function removeFromWishlist(idToFind, searchArray) {
    for (var i = 0; i < searchArray.length; i++) {
        searchArray.splice(i, 1);
    }
}

function searchSearchResults(idToFind, searchArray) {
    /* Looks through the search results array to find a movie with a matching ID */
    for (var i = 0; i < searchArray.length; i++) {
        if (searchArray[i].imdbID === idToFind) {
            return searchArray[i];
        }
    }
}
