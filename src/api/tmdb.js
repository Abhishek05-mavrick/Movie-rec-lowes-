const API_BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const token = import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN;
const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const genreNames = {
  28: 'Action',
  35: 'Comedy',
  18: 'Drama',
  878: 'Sci-Fi',
  27: 'Horror',
  10749: 'Romance',
};

const request = async (path, params = {}) => {
  const url = new URL(`${API_BASE_URL}${path}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  if (!token && apiKey) url.searchParams.set('api_key', apiKey);

  const response = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error(`TMDB request failed (${response.status})`);
  return response.json();
};

const normalizeMovie = (movie) => ({
  id: movie.id,
  title: movie.title || movie.original_title,
  genre: genreNames[movie.genre_ids?.find((id) => genreNames[id])]
    || genreNames[movie.genres?.find((genre) => genreNames[genre.id])?.id]
    || 'Drama',
  rating: Number(movie.vote_average?.toFixed(1) || 0),
  year: Number((movie.release_date || '').slice(0, 4)) || 0,
  poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '',
  description: movie.overview || 'No description is available for this movie yet.',
});

export const isTmdbConfigured = Boolean(token || apiKey);

export async function getPopularMovies(page = 1) {
  const data = await request('/movie/popular', { language: 'en-US', page });
  return data.results.map(normalizeMovie);
}

export async function discoverMovies({
  page = 1, sortBy = 'popularity.desc', genreId, minimumVotes,
} = {}) {
  const data = await request('/discover/movie', {
    language: 'en-US',
    include_adult: 'false',
    include_video: 'false',
    page,
    sort_by: sortBy,
    ...(genreId ? { with_genres: genreId } : {}),
    ...(minimumVotes ? { 'vote_count.gte': minimumVotes } : {}),
  });
  return {
    movies: data.results.map(normalizeMovie),
    totalPages: data.total_pages,
  };
}

export async function getMovieRail({ sortBy, genreId, minimumVotes, pages = 1 } = {}) {
  const responses = await Promise.all(
    Array.from({ length: pages }, (_, index) => discoverMovies({
      page: index + 1,
      sortBy,
      genreId,
      minimumVotes,
    })),
  );
  return responses.flatMap((response) => response.movies);
}

export async function searchMovies(query, page = 1) {
  const data = await request('/search/movie', {
    query,
    include_adult: 'false',
    language: 'en-US',
    page,
  });
  return {
    movies: data.results.map(normalizeMovie),
    totalPages: data.total_pages,
  };
}

export async function getMovieDetails(id) {
  return normalizeMovie(await request(`/movie/${id}`, { language: 'en-US' }));
}
