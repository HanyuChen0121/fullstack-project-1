import React from 'react';
import AuthForm from '../components/AuthForm';

const SignInPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
            <AuthForm action="signIn" />
            <p>New to here? You can <a href="/signin">Sign In</a> instead.</p>
        </div>
      </div>
    </div>

  );
};

export default SignInPage;
