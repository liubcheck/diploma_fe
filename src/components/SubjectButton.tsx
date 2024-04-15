import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';

interface Props {
  subject: string;
}

const SubjectButton = ({subject}: Props) => {
  const navigate = useNavigate();
  const {grade} = useParams();

  const handleSubjectClick = () => {
    navigate(`/${grade}/${subject}/lessons`);
  };

  return (
    <button
      onClick={handleSubjectClick}
      className="btn login-btn btn-outline-dark"
    >
      {subject}
    </button>
  );
};

export default SubjectButton;
