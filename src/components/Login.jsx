import React, { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      // Simple mock authentication
      onLogin(username);
    } else {
      setError('Please enter both username and password.');
    }
  };

  return (
    <div className="mobile-card fade-in" style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem' }}>
      <div className="tab-header" style={{ paddingBottom: '1.5rem', textAlign: 'center' }}>
        <h2>Welcome Back</h2>
        <p className="tab-subtitle">Enter your account details before scanning documents</p>
      </div>

      {error && (
        <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <User size={16} /> Username or Email
          </label>
          <input
            type="text"
            className="mobile-textarea"
            style={{ minHeight: 'auto', padding: '0.85rem', borderRadius: '10px' }}
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            <Lock size={16} /> Password
          </label>
          <input
            type="password"
            className="mobile-textarea"
            style={{ minHeight: 'auto', padding: '0.85rem', borderRadius: '10px' }}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-mobile-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem' }}>
          Log In <ArrowRight size={18} />
        </button>
      </form>
    </div>
  );
};

export default Login;
