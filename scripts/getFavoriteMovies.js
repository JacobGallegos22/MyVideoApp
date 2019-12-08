const favoriteMovieList = document.getElementById('favoriteMovieList');
let favoriteSlideIndex = 1;
const showFavoriteDivs = (n) => {
  let i;
  const x = document.getElementsByClassName('movieFavoritePoster');
  if (n > x.length) {favoriteSlideIndex = 1}
  if (n < 1) {favoriteSlideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[favoriteSlideIndex-1].className = "movieFavoritePoster poster"
  }
  x[favoriteSlideIndex-1].style.display = "block";
  x[favoriteSlideIndex-1].className = "movieFavoritePoster poster rotatePoster"
};

const plusFavoriteDivs = (n) => {
  showFavoriteDivs(favoriteSlideIndex += n);
};

const fetchFavoriteMovieById = async (movie) => {
  return await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=51166cc3`)
    .then(response => response.json())
};

const getFavoriteMovies = () => {
  if (window.localStorage.getItem('favorites')) {
    const favoriteMoviesIds = JSON.parse(window.localStorage.getItem('favorites'));
    favoriteMoviesIds.map(id => {
      fetchFavoriteMovieById(id).then(response => {
        const moviePosterLink = document.createElement('a');
        moviePosterLink.href = `views/movieDetails.html?id=${response['imdbID']}&favorite=true`;
        const poster = document.createElement('img');
        poster.src = response['Poster'];
        poster.className = 'movieFavoritePoster poster';
        moviePosterLink.append(poster);
        favoriteMovieList.append(moviePosterLink);
        showFavoriteDivs(favoriteSlideIndex)
      });

    })
  } else {
    favoriteMovieList.innerHTML = "No Movies To display"
  }
};

getFavoriteMovies();


