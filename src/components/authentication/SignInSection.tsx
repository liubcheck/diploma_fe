import React from 'react';

interface Props {
  error: string;
}

const SignInSection = ({error}: Props) => {
  return (
    <div className="d-flex mt-2">
      {error && (
        <div id="error">
          <span className="login-error-message">{error}</span>
        </div>
      )}
      <div className="ms-auto">
        <button className="btn login-btn btn-outline-dark" type="submit">
          Увійти
        </button>
      </div>
    </div>
  );
};

export default SignInSection;
