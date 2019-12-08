const urlParams = new URLSearchParams(window.location.search);
const movie = urlParams.get('id');
let favorite = urlParams.get('favorite');
const favoriteIcon = document.getElementById('favoriteIcon');

favoriteIcon.className = favorite ? 'fas fa-star' : 'far fa-star';


const getMovieById = async (movie) => {
  return await fetch(`http://www.omdbapi.com/?i=${movie}&apikey=51166cc3`)
    .then(response => response.json())
};
const getMovie = () => {
  getMovieById(movie).then(response => {
    document.getElementById('movieName').innerHTML = response['Title'];
    document.getElementById('moviePoster').src = response['Poster'];
    document.getElementById('movieActors').innerHTML = response['Actors'];
    document.getElementById('moviePlot').innerHTML = response['Plot'];
  })
};

const goBack = () => {
  window.history.back();
};

const favoriteMovie = () => {
  if (!favorite) {
    let favorites = [];
    if (window.localStorage.getItem('favorites')) {
      const favoritesJson = window.localStorage.getItem('favorites');
      favorites = JSON.parse(favoritesJson);
    }
    favorites.push(movie);

    window.localStorage.setItem('favorites', JSON.stringify(favorites));
    favorite = true;
    favoriteIcon.className = favorite ? 'fas fa-star' : 'far fa-star';


  } else {
    if (window.localStorage.getItem('favorites')) {
      const favoritesList = JSON.parse(window.localStorage.getItem('favorites'));
      const index = favoritesList.indexOf(movie);
      if (index > -1) {
        favoritesList.splice(index, 1);
      }

      window.localStorage.setItem('favorites', JSON.stringify(favoritesList));
      favorite = false;
      favoriteIcon.className = favorite ? 'fas fa-star' : 'far fa-star';




    }
  }

};





