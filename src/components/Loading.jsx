export default function Loading({ message = 'Loading movies...' }) {
  return (
    <p className="loading" role="status">
      <span aria-hidden="true" className="loading-spinner" />
      {message}
    </p>
  );
}
