export default function Rating({ value }) {
  return <span className="rating" aria-label={`Rating ${value} out of 10`}>★ {value}</span>;
}
