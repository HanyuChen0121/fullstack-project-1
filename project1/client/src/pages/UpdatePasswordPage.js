import React from 'react';
import AuthForm from '../components/AuthForm';

const UpdatePasswordPage = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
            <h2 className="display-7 text-center">Update your password</h2>
            <p className="fs-10">Enter your email, we will send you the recovery link</p>
            <AuthForm action="updatePassword" />
        </div>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;
