import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setUserType } from '../actions/authActions';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ action }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('REGULAR'); // Default user type
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoginError('');

    if (action === 'signIn') {
      try{
        const response = await fetch('http://localhost:5000/api/auth/signin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, type})
        });

        const data = await response.json();
        if (data.token) {
          dispatch(setUser(data.id, data.token));
          dispatch(setUserType(data.type));
          navigate('/');      // Redirect to home page
        }else{
          setLoginError(data.message || 'Login failed. Please try again.');
        }

      } catch (error) {
        setLoginError('Login failed. Please try again.');
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
        dispatch(setUserType(data.type));
        navigate('/');      // Redirect to home page
      }
    }

    if (action === 'updatePassword'){
      navigate('/send-email');
    }

  
  };

  function getButtonText(action) {
    switch (action) {
      case 'signUp':
        return 'Sign Up';
      case 'signIn':
        return 'Sign In';
      case 'updatePassword':
        return 'Send';
      default:
        return 'Submit';
    }
  };

  return (
    <>
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

      {(action === 'signUp' || action === 'signIn') && (
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
      )}

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

      <button type="submit" className="btn btn-primary"> {getButtonText(action)} </button>
    </form>

    {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}
    </>
  );
};

export default AuthForm;
