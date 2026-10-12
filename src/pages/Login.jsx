import React from 'react';
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password) {
      setError('Enter both your email and password to continue.');
      setIsLoggedIn(false);
      return;
    }

    if (!event.currentTarget.elements.namedItem('email').validity.valid) {
      setError('Enter a valid email address.');
      setIsLoggedIn(false);
      return;
    }

    setError('');
    setIsLoggedIn(true);
    onLogin();
  };

  return (
    <section className="auth-card">
      <p className="eyebrow">WELCOME BACK</p>
      <h1>Sign in</h1>
      <p className="auth-description">Sign in to keep your favorite movies close.</p>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="login-email">Email</label>
        <input
          autoComplete="email"
          aria-describedby={error ? 'login-error' : undefined}
          aria-invalid={Boolean(error)}
          id="login-email"
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          type="email"
          value={email}
        />
        <label htmlFor="login-password">Password</label>
        <input
          autoComplete="current-password"
          aria-describedby={error ? 'login-error' : undefined}
          aria-invalid={Boolean(error)}
          id="login-password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
        {error && <p className="form-message form-error" id="login-error" role="alert">{error}</p>}
        {isLoggedIn && <p className="form-message form-success" role="status">You’re signed in.</p>}
        <button className="button auth-submit" type="submit">
          Continue
        </button>
      </form>
    </section>
  );
}
