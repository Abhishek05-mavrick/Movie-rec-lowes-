
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

async function request(endpoint) {
  if (!API_KEY) {
    throw new Error('TMDB API key is missing. Check your .env file.');
  }

  const separator = endpoint.includes('?') ? '&' : '?';

  const response = await fetch(
    `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status}`);
  }

  return response.json();
}


const genreNames = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

export const allGenres = [
  'All',
  ...Object.values(genreNames),
];

function formatMovie(movie) {
  const genres = (movie.genre_ids || [])
    .map((id) => genreNames[id])
    .filter(Boolean);

  return {
    id: movie.id,
    title: movie.title,
    genre: genres[0] || 'Other',
    genres,
    rating: movie.vote_average ?? 0,
    year: movie.release_date
      ? Number(movie.release_date.slice(0, 4))
      : 'N/A',
    poster: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '',
    description: movie.overview || 'No description available.',
  };
}


export async function getPopularMovies(page = 1) {
  const data = await request(
    `/movie/popular?language=en-US&page=${page}`
  );

  return {
    movies: data.results.map(formatMovie),
    totalPages: data.total_pages,
  };
}

export async function searchMovies(query, page = 1) {
  const data = await request(
    `/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=${page}`
  );

  return {
    movies: data.results.map(formatMovie),
    totalPages: data.total_pages,
  };
}
