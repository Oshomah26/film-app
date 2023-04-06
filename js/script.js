const global = {
    currentPage: window.location.pathname,
};

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link => {
        if(link.getAttribute('href') === global.currentPage){
            link.classList.add('active');
        }
    }))
}

// Init App 
function init(){
    switch(global.currentPage){
        case '/film-app/index.html':
            console.log('Home');
            break;
        case '/film-app/shows.html':
            console.log('Shows');
            break;
        case '/film-app/movie-details.html':
            console.log('Movie Details');
            break;
        case '/film-app/tv-details.html':
            console.log('TV Details');
            break;
        case '/film-app/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();

}

document.addEventListener('DOMContentLoaded', init)
