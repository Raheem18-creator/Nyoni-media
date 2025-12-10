 // API ya TMDB - UNATAKIWA KUBADILISH API KEY YAKO
const API_KEY = 'c2c2e2f6d45b7d5e5e5e5e5e5e5e5e5e'; // Badilisha hii kwa API Key yako halisi
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Vipengele vya DOM
const searchInput = document.getElementById('movieSearch');
const searchBtn = document.getElementById('searchBtn');
const movieResults = document.getElementById('movieResults');
const loading = document.getElementById('loading');
const noResults = document.getElementById('noResults');
const movieModal = document.getElementById('movieModal');
const closeModal = document.querySelector('.close-modal');
const modalDetails = document.getElementById('modalDetails');
const filterBtns = document.querySelectorAll('.filter-btn');
const currentYearSpan = document.getElementById('currentYear');

// Weka mwaka wa sasa kwenye hakimiliki
currentYearSpan.textContent = new Date().getFullYear();

// Hali ya kuanzia
let currentFilter = 'popular';
let currentPage = 1;

// Chagua API Key yako halisi hapa:
// 1. Nenda https://www.themoviedb.org/signup
// 2. Jiunge kwa bure
// 3. Nenda kwenye Settings > API
// 4. Chagua "Developer" na uombe API Key
// 5. Weka API Key yako hapa chini badala ya ile ya mfano:
// const API_KEY = 'API_KEY_YAKO_HALISI';

// Anza kwa kuonyesha filamu zinazovuma
document.addEventListener('DOMContentLoaded', () => {
    fetchMovies(currentFilter);
    setupEventListeners();
});

// Weka masikioni ya matukio
function setupEventListeners() {
    // Tafuta kwa kugonga kitufe
    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            searchMovies(query);
        } else {
            fetchMovies(currentFilter);
        }
    });

    // Tafuta kwa kubonyeza Enter
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            if (query) {
                searchMovies(query);
            }
        }
    });

    // Futa viwango vya kutafuta
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            fetchMovies(currentFilter);
        });
    });

    // Funga modal
    closeModal.addEventListener('click', () => {
        movieModal.classList.add('hidden');
    });

    // Funga modal kwa kubonyeza nje
    window.addEventListener('click', (e) => {
        if (e.target === movieModal) {
            movieModal.classList.add('hidden');
        }
    });
}

// Pata filamu kutoka API
async function fetchMovies(filterType) {
    showLoading();
    clearResults();
    
    let endpoint = '';
    switch(filterType) {
        case 'popular':
            endpoint = '/movie/popular';
            break;
        case 'top_rated':
            endpoint = '/movie/top_rated';
            break;
        case 'upcoming':
            endpoint = '/movie/upcoming';
            break;
        default:
            endpoint = '/movie/popular';
    }
    
    try {
        const response = await fetch(
            `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US&page=${currentPage}`
        );
        
        if (!response.ok) {
            throw new Error('Hitilafu katika kupata filamu');
        }
        
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('Hitilafu:', error);
        showError('Hitilafu katika kupata filamu. Tafadhali jaribu tena.');
    }
}

// Tafuta filamu maalum
async function searchMovies(query) {
    showLoading();
    clearResults();
    
    try {
        const response = await fetch(
            `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=${currentPage}`
        );
        
        if (!response.ok) {
            throw new Error('Hitilafu katika kutafuta');
        }
        
        const data = await response.json();
        
        if (data.results.length === 0) {
            showNoResults();
        } else {
            displayMovies(data.results);
        }
    } catch (error) {
        console.error('Hitilafu:', error);
        showError('Hitilafu katika kutafuta. Tafadhali jaribu tena.');
    }
}

// Onyesha filamu kwenye ukurasa
function displayMovies(movies) {
    hideLoading();
    
    movies.forEach(movie => {
        const movieCard = createMovieCard(movie);
        movieResults.appendChild(movieCard);
    });
}

// Unda kadi ya filamu
function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    
    // Picha ya filamu
    const poster = movie.poster_path 
        ? `<img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" class="movie-poster">`
        : `<div class="poster-placeholder"><i class="fas fa-film fa-3x"></i><p>Hakuna picha</p></div>`;
    
    // Tathmini kwa nyota
    const ratingStars = getStarRating(movie.vote_average / 2);
    
    card.innerHTML = `
        ${poster}
        <div class="movie-info">
            <h3 class="movie-title">${movie.title}</h3>
            <div class="movie-details">
                <span>${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</span>
                <span class="rating">${ratingStars} ${movie.vote_average.toFixed(1)}/10</span>
            </div>
            <p class="movie-overview">${movie.overview ? movie.overview.substring(0, 100) + '...' : 'Hakuna maelezo.'}</p>
        </div>
    `;
    
    // Bonyeza kadi kwa maelezo zaidi
    card.addEventListener('click', () => showMovieDetails(movie.id));
    
    return card;
}

// Pata tathmini ya nyota
function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    
    return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
}

// Onyesha maelezo kamili ya filamu
async function showMovieDetails(movieId) {
    showLoading();
    
    try {
        const response = await fetch(
            `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
        );
        
        if (!response.ok) {
            throw new Error('Hitilafu katika kupata maelezo');
        }
        
        const movie = await response.json();
        displayMovieModal(movie);
    } catch (error) {
        console.error('Hitilafu:', error);
        showError('Hitilafu katika kupata maelezo ya filamu.');
    }
}

// Onyesha modal ya maelezo ya filamu
function displayMovieModal(movie) {
    hideLoading();
    
    // Pata trailer ikiwepo
    const trailer = movie.videos.results.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    
    // Pata wanaoigiza wakuu
    const cast = movie.credits.cast.slice(0, 5).map(actor => actor.name).join(', ');
    
    modalDetails.innerHTML = `
        <div class="modal-movie-header">
            <h2>${movie.title}</h2>
            <div class="modal-meta">
                <span>${movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}</span> • 
                <span>${movie.runtime ? movie.runtime + ' min' : 'N/A'}</span> • 
                <span class="modal-rating">★ ${movie.vote_average.toFixed(1)}/10</span>
            </div>
        </div>
        
        <div class="modal-content-body">
            <div class="modal-poster-section">
                ${movie.poster_path ? `<img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" class="modal-poster">` : 
                  `<div class="modal-poster-placeholder"><i class="fas fa-film fa-5x"></i></div>`}
                
                ${trailer ? 
                  `<button id="trailerBtn" class="trailer-btn">
                    <i class="fab fa-youtube"></i> Angalia Trailer
                   </button>` : ''}
            </div>
            
            <div class="modal-info-section">
                <h3>Maelezo</h3>
                <p>${movie.overview || 'Hakuna maelezo yaliyopatikana.'}</p>
                
                <div class="modal-details-grid">
                    <div class="detail-item">
                        <strong><i class="fas fa-theater-masks"></i> Wahusika:</strong>
                        <p>${cast || 'Hakuna taarifa'}</p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-user-friends"></i> Msimamizi:</strong>
                        <p>${movie.director || 'Hakuna taarifa'}</p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-tags"></i> Aina:</strong>
                        <p>${movie.genres.map(g => g.name).join(', ') || 'Hakuna taarifa'}</p>
                    </div>
                    
                    <div class="detail-item">
                        <strong><i class="fas fa-globe"></i> Lugha:</strong>
                        <p>${movie.spoken_languages.map(l => l.english_name).join(', ') || 'Hakuna taarifa'}</p>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <a href="report-error.html" class="action-btn report-btn">
                        <i class="fas fa-bug"></i> Ripoti Hitilafu
                    </a>
                    <button class="action-btn close-btn" id="modalCloseBtn">
                        <i class="fas fa-times"></i> Funga
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Weka matukio kwenye vitu vipya vya modal
    if (trailer) {
        document.getElementById('trailerBtn').addEventListener('click', () => {
            window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank');
        });
    }
    
    document.getElementById('modalCloseBtn').addEventListener('click', () => {
        movieModal.classList.add('hidden');
    });
    
    // Onyesha modal
    movieModal.classList.remove('hidden');
}

// Chaguo za kusaidia
function showLoading() {
    loading.classList.remove('hidden');
    movieResults.innerHTML = '';
}

function hideLoading() {
    loading.classList.add('hidden');
}

function clearResults() {
    movieResults.innerHTML = '';
    noResults.classList.add('hidden');
}

function showNoResults() {
    hideLoading();
    noResults.classList.remove('hidden');
}

function showError(message) {
    hideLoading();
    movieResults.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle fa-3x"></i>
            <h3>${message}</h3>
            <p>Tafadhali hakikisha umeweka API Key sahihi na una mtandao.</p>
        </div>
    `;
                             }
