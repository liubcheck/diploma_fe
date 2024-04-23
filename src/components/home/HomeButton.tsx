import React from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
  label: string;
  link?: string;
  onClick?: () => void;
}

const HomeButton = ({label, link, onClick}: Props) => {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={link ? () => navigate(link) : onClick}
        className="btn login-btn btn-outline-dark"
        style={{margin: '5px'}}
      >
        {label}
      </button>
    </div>
  );
};

export default HomeButton;
