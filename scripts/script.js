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
            success: function(data) {
                console.log(data);
                displayMoviesData(data.Search);
            }
        });
    });
});

function displayMoviesData(moviesList) {
  /* Iterates through a list of OMDB movies and adds them to the DOM */
    var htmlString = '';
    moviesList.forEach(function(movie) {

        htmlString += '<div><h4>' + movie.Title + '</h4>';
        htmlString += '<img src="' + movie.Poster + '">';
        htmlString += '</div>';
    });
    $('#moviesDisplay').html(htmlString);
}
