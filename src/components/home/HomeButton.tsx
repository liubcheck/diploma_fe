import React from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
  label: string;
  link?: string;
  onClick?: () => void;
}

const Button = ({label, link = undefined, onClick}: Props) => {
  const navigate = useNavigate();

  const handeClick = link ? () => navigate(link) : onClick;

  return (
    <div>
      <button
        onClick={handeClick}
        className="btn login-btn btn-outline-dark"
        style={{margin: '5px'}}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
