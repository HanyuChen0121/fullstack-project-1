import React from 'react';
import AuthForm from '../components/AuthForm';

const SignInPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
            <h2 className="display-7 text-center">Sign in to your account</h2>
            <AuthForm action="signIn" />
            <div className="d-flex justify-content-between">
              <p>Don't have an account? <a href="/signup">Sign Up</a></p>
              <p><a href="/update-password">Forgot password?</a></p>
            </div>
        </div>
      </div>
    </div>

  );
};

export default SignInPage;
