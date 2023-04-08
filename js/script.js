const global = {
    currentPage: window.location.pathname,
};

async function displayPopularMovies() {
    const {results} = await fetchAPIData('movie/popular');
    console.log(results);

    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
                movie.poster_path ? `<img
                src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                class="card-img-top"
                alt="Movie Title"
              />`
              :
              `<img
              src="/film-app/images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          `;

    document.querySelector('#popular-movies').appendChild(div);
    })
}

// function for displaying popular TV shows
async function displayPopularTVshows() {
    const {results} = await fetchAPIData('/tv/popular');
    console.log(results);

    results.forEach(tvShow => {
        const div = document.createElement('div');
        div.classList.add('card');

        div.innerHTML = `
        <a href="tv-details.html?id=${tvShow.id}">
          ${
              tvShow.poster_path ? `<img
              src="https://image.tmdb.org/t/p/w500${tvShow.poster_path}"
              class="card-img-top"
              alt="Show Title"
            />`
            :
            `<img
            src="/film-app/images/no-image.jpg"
            class="card-img-top"
            alt="${tvShow.name}"
          />`
          }
        </a>
        <div class="card-body">
          <h5 class="card-title">${tvShow.name}</h5>
          <p class="card-text">
            <small class="text-muted">First aired: ${tvShow.first_air_date}</small>
          </p>
        `;

        document.querySelector('#popular-shows').appendChild(div);
    });
}

// Display Movie Details
async function displayMovieDetails(){
    const movieId = window.location.search.split('=')[1];
    
    const movie = await fetchAPIData(`movie/${movieId}`);

    // Overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document. createElement('div');

    div.innerHTML = `
    <div class="details-top">
      <div>
      ${
                movie.poster_path ? `<img
                src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
                class="card-img-top"
                alt="Movie Title"
              />`
              :
              `<img
              src="/film-app/images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
            }
      </div>
      <div>
        <h2>${movie.title}</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed(1)}/ 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
        ${movie.overview}
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
      <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
           <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
           <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
           <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`).join(',  ')}</div>
    </div>
  `
//`
//     <div>
//     ${
//         movie.poster_path ? `<img
//         src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
//         class="card-img-top"
//         alt="Movie Title"
//       />`
//       :
//       `<img
//       src="/film-app/images/no-image.jpg"
//       class="card-img-top"
//       alt="${movie.title}"
//     />`
//     }
//     </div>
//     <div>
//       <h2>${movie.title}</h2>
//       <p>
//         <i class="fas fa-star text-primary"></i>
//         ${movie.vote_average.toFixed(1)}/ 10
//       </p>
//       <p class="text-muted">Release Date: ${movie.release_date}</p>
//       <p>
//         ${movie.overview}
//       </p>
//       <h5>Genres</h5>
//       <ul class="list-group">
//         ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
//       </ul>
//       <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
//     </div>
    
//   </div>
//   <div class="details-bottom">
//     <h2>Movie Info</h2>
//     <ul>
//       <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
//       <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
//       <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
//       <li><span class="text-secondary">Status:</span> ${movie.status}</li>
//     </ul>
//     <h4>Production Companies</h4>
//     <div class="list-group">${movie.production_companies.map((company) => `<span>${company.name}</span>`)}</div>
// `;

document.querySelector('#movie-details').appendChild(div);

console.log(div);
}

// Display backdrop on details pages

function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw'; 
    overlayDiv.style.postion = 'absolute'; 
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if(type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
    }
    console.log(overlayDiv)
} 

// Fetch data from TMDB API 
async function fetchAPIData(endpoint){
    const API_KEY = '6de87faa466bd8a2a676726d35e5fe02';
    const API_URL = 'https://api.themoviedb.org/3/';

    showSpinner()

    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();

    hideSpinner()

    return data;
}

function showSpinner(){
    document.querySelector('.spinner').classList.add('show');
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    }))
}

function addCommasToNumber(number){
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g,',');
}

// Init App 
function init(){
    switch(global.currentPage){
        case '/film-app/index.html':
            displayPopularMovies();
            break;
        case '/film-app/shows.html':
            displayPopularTVshows();
            break;
        case '/film-app/movie-details.html':
            displayMovieDetails();
            break;
        case '/film-app/tv-details.html':
            console.log('Film Dettails')
            break;
        case '/film-app/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();

}

document.addEventListener('DOMContentLoaded', init)
