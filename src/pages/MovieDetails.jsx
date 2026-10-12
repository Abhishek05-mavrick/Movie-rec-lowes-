import { Link, useParams } from 'react-router-dom';
import { movies } from '../data/movies';
import Rating from '../components/Rating';

export default function MovieDetails() {
  const { movieId } = useParams();
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) return <section className="empty-state"><h1>Movie not found</h1><Link className="button" to="/">Back to discover</Link></section>;

  return (
    <article className="details">
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <div>
        <p className="eyebrow">{movie.genre} · {movie.year}</p>
        <h1>{movie.title}</h1>
        <Rating value={movie.rating} />
        <p className="details-description">{movie.description}</p>
        <Link className="button" to="/watchlist">Add to watchlist</Link>
      </div>
    </article>
  );
}
