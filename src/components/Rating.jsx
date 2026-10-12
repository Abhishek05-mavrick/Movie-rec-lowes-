
import React from 'react';

export default function Rating({ value }) {
  return (
    <div
      className="rating"
      aria-label={`Rating: ${value} out of 10`}
    >
      <span aria-hidden="true">★</span>
      <span>{value}/10</span>
    </div>
  );
}
