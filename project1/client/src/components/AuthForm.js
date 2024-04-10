import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ action }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('REGULAR'); // Default user type
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (action === 'signIn') {
        const response = await fetch('http://localhost:5000/api/auth/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            dispatch(setUser(data.id, data.token));
            navigate('/');      // Redirect to home page
        }
    }
    
    if (action === 'signUp') {
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, type })
      });
      const data = await response.json();
      if (data.token) {
        dispatch(setUser(data.id, data.token));
        navigate('/');      // Redirect to home page
      }
    }

    

    // Repeat the process for signIn and updatePassword with respective API endpoints
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {action === 'signUp' && (
        <div className="mb-3">
          <label htmlFor="type" className="form-label">User Type</label>
          <select
            className="form-select"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="REGULAR">Regular</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      )}
      <button type="submit" className="btn btn-primary">{action === 'signUp' ? 'Sign Up' : 'Sign In'}</button>
    </form>
  );
};

export default AuthForm;