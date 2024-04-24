import React from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../redux/store';
import {useNavigate} from 'react-router-dom';
import {logoutUser} from '../redux/thunks/userThunks';

interface Props {
  username: string;
}

const Navbar = ({username}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid flex-row-reverse">
        <span>
          {username}
          {' ('}
          <a href="" onClick={handleLogout} className="logout-link">
            Вийти
          </a>
          {')'}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
