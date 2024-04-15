import React from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
  label: string;
  link: string;
}

const HomeButton = ({label, link}: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => navigate(link)}
        className="btn login-btn btn-outline-dark"
      >
        {label}
      </button>
    </div>
  );
};

export default HomeButton;
