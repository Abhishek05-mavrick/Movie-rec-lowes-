export default function Rating({ value }) {
  const hasRating = typeof value === 'number' && Number.isFinite(value);
  const displayRating = hasRating ? value.toFixed(1) : 'Not rated';

  return (
    <span className="rating" aria-label={hasRating ? `Rating ${displayRating} out of 10` : 'Not rated'}>
      <span aria-hidden="true">★</span> {displayRating}
    </span>
  );
}
