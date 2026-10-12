import { genres, movies } from '../src/data/movies.js';

const allowedGenres = new Set(genres.slice(1));
const valid = movies.length >= 15
  && movies.length <= 20
  && new Set(movies.map((movie) => movie.id)).size === movies.length
  && movies.every((movie) => (
    Number.isInteger(movie.id)
    && typeof movie.title === 'string'
    && allowedGenres.has(movie.genre)
    && typeof movie.rating === 'number'
    && typeof movie.year === 'number'
    && typeof movie.poster === 'string'
    && typeof movie.description === 'string'
  ));

if (!valid) {
  console.error('Movie data contract validation failed.');
  process.exit(1);
}

console.log(`Movie data contract passed for ${movies.length} movies.`);
