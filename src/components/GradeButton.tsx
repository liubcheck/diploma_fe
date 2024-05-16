import React from 'react';
import {useNavigate} from 'react-router-dom';

interface Props {
  grade: number;
}

const GradeButton = ({grade}: Props) => {
  const navigate = useNavigate();

  const handleGradeClick = (grade: number) => {
    navigate(`/${grade}/subjects`);
  };

  return (
    <button
      key={grade}
      onClick={() => handleGradeClick(grade)}
      className="btn grade-btn btn-outline-dark"
      style={{margin: '5px'}}
    >
      {`${grade}`}
    </button>
  );
};

export default GradeButton;
