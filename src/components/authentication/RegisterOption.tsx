import React from 'react';
import {NavLink} from 'react-router-dom';

const RegisterOption = () => {
  return (
    <div className="d-flex mt-2 justify-content-center">
      <span>
        Don't have an account? <NavLink to="/register">Register</NavLink>
      </span>
    </div>
  );
};

export default RegisterOption;
