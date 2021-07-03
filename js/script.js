function searchMovie() {
    $('#movie-list').html('');

    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey': '8dc93ab4',
            's': $('#searchInput').val()
        },
        success: function (result) {
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (index, data) {
                    $('#movie-list').append(`
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="${data.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${data.Title}</h5>
                                <p class="card-subtitle mb-4">${data.Year}</p>
                                <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Details</a>
                            </div>
                        </div>
                    </div>
                    `)
                });

                $('#searchInput').val('');
            } else {
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">${result.Error}</h1>
                </div>
                `);
            }
        }
    });
}

$('#searchButton').on('click', function () {
    searchMovie();
});

$('#searchInput').on('keyup', function (e) {
    if (e.keyCode === 13) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {
    $.ajax({
        url: 'http://www.omdbapi.com/',
        type: 'get',
        dataType: 'json',
        data: {
            "apikey": '8dc93ab4',
            "i": $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response == "True") {
                $('.modal-body').html(`
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="${movie.Poster}" class="img-fluid">
                        </div>
                        <div class="col-md-8">
                            <ul class="list-group">
                                <li class="list-group-item"><h4>${movie.Title}</h4></li>
                                <li class="list-group-item">Rating IMDb : ${movie.Ratings[0].Value}</li>
                                <li class="list-group-item">Genre :${movie.Genre}</li>
                                <li class="list-group-item">Director : ${movie.Director}</li>
                                <li class="list-group-item">Actors : ${movie.Actors}</li>
                                <li class="list-group-item">Plot : <br> ${movie.Plot}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                `)
            }
        }
    })
});