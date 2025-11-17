// Select form, input, results, and message div
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');
const message = document.getElementById('message');

// Your OMDb API key (replace 'YOUR_API_KEY' with your actual key)
const API_KEY = 'thewdb'; // demo key (limited)
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

// Listen for form submit
form.addEventListener('submit', function(e) {
  e.preventDefault(); // prevent page reload
  const query = input.value.trim();
  if(query === '') return;
  searchMovies(query);
});

// Fetch movies from OMDb
function searchMovies(query) {
  results.innerHTML = '';
  message.textContent = 'Loading...';
  fetch(API_URL + encodeURIComponent(query))
    .then(response => response.json())
    .then(data => {
      if(data.Response === 'True') {
        message.textContent = '';
        displayMovies(data.Search);
      } else {
        message.textContent = data.Error;
      }
    })
    .catch(err => {
      message.textContent = 'Something went wrong!';
      console.error(err);
    });
}

// 
function displayMovies(movies) {
  movies.forEach(movie => {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
      .then(response => response.json())
      .then(details => {
        const card = document.createElement('div');
        card.classList.add('movie-card');
        card.innerHTML = `
          <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>Year: ${movie.Year}</p>
          <p>Type: ${movie.Type}</p>
          <p>IMDB Rating: ${details.imdbRating !== 'N/A' ? '⭐'.repeat(Math.round(details.imdbRating/2)) : 'No rating'}</p>

        `;
        results.appendChild(card);
      })
      .catch(err => console.error(err));
  });
}
