let slideIndex = 1;
const showDivs = (n) => {
  let i;
  const x = document.getElementsByClassName('moviePoster');
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[slideIndex-1].className = "moviePoster poster"
  }
  x[slideIndex-1].style.display = "block";
  x[slideIndex-1].className = "moviePoster poster rotatePoster"
};
const searchMovie = () => {
  const inputSearchValue = document.getElementById('movieSearch').value;
  const movieList = document.getElementById('movieList')

  getMoviesByName(inputSearchValue).then(response => {
    console.log(response);
    while (movieList.firstChild) {
      movieList.removeChild(movieList.firstChild);
    }

    response['Search'].map(movie => {
      const moviePosterLink = document.createElement('a');
      moviePosterLink.href = `views/movieDetails.html?id=${movie['imdbID']}`;
      const moviePoster = document.createElement('img');
      moviePoster.src = movie['Poster'];
      moviePoster.className = 'moviePoster poster';
      moviePosterLink.append(moviePoster);
      movieList.append(moviePosterLink);
    });
    showDivs(slideIndex);

  })
};
const getMoviesByName = async (movieName) => {
  return await fetch(`http://www.omdbapi.com/?apikey=51166cc3&s=${movieName}`)
    .then(response => response.json())
};
const plusDivs = (n) => {
  showDivs(slideIndex += n);
};



