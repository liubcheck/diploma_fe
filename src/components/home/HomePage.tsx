import React from 'react';
import Button from './HomeButton';
import {useAuth} from '../authentication/AuthProvider';
import {useNavigate} from 'react-router-dom';
import Navbar from '../Navbar';

const HomePage = () => {
  const {user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate('/login');
  };

  return (
    <React.Fragment>
      <section className="home-section text-center">
        <Navbar handleLogout={handleLogout} />
        {user?.role?.name === 'ADMIN' ? (
          <Button label="Create Lesson" link="/createLesson" />
        ) : (
          <Button label="Practice" link="/grades" />
        )}
      </section>
    </React.Fragment>
  );
};

export default HomePage;
