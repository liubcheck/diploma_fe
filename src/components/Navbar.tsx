import React from 'react';
import {NavLink} from 'react-router-dom';
import {useAuth} from './authentication/AuthProvider';

interface Props {
  handleLogout: () => void;
}

const Navbar = ({handleLogout}: Props) => {
  const authData = useAuth();

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid flex-row-reverse">
        <span>
          {authData.user?.username}
          {' ('}
          <NavLink to="/login" onClick={handleLogout} className="logout-link">
            Logout
          </NavLink>
          {')'}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
