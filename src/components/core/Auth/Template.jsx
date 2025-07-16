import React, { useState } from 'react';
import Spinner from '../../Spinner';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function Template({ title, description1, description2, image, formType }) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-richblack-900">
      {loading ? (
        <Spinner />
      ) : (
        <div className="w-11/12 max-w-6xl flex flex-col-reverse md:flex-row gap-8 items-center p-4">
          {/* Left: Form section */}
          <div className="w-full md:w-1/2 text-white flex flex-col gap-6">
            <h1 className="text-3xl font-bold">{title}</h1>

            <p className="text-richblack-200 text-sm sm:text-base">
              <span>{description1} </span>
              <span className="text-blue-100 font-semibold">{description2}</span>
            </p>

            {formType === 'signup' ? <SignupForm /> : <LoginForm />}
          </div>

          {/* Right: Image section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src={image}
              alt="auth illustration"
              className="max-w-full h-auto rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Template;
