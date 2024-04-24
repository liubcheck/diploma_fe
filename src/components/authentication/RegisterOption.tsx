import React from 'react';
import {NavLink} from 'react-router-dom';

const RegisterOption = () => {
  return (
    <div className="d-flex mt-2 justify-content-center">
      <span>
        Нема акаунту? <NavLink to="/register">Зареєструйся!</NavLink>
      </span>
    </div>
  );
};

export default RegisterOption;
