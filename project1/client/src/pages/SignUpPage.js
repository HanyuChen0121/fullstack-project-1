import React from 'react';
import AuthForm from '../components/AuthForm';

const SignUpPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <h2 className="display-7 text-center">Sign up an account</h2>
          <AuthForm action="signUp" />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
