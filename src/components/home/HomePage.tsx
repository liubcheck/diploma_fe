import React from 'react';
import Button from './HomeButton';
import Navbar from '../Navbar';
import {useSelector} from 'react-redux';
import {getLoggedInUser} from '../../redux/selectors/userSelector';

const HomePage = () => {
  const user = useSelector(getLoggedInUser);

  return (
    <React.Fragment>
      <section className="home-section text-center">
        <Navbar username={user!.username} />
        {user?.role?.name === 'ADMIN' ? (
          <React.Fragment>
            <Button label="Create Lesson" link="/createLesson" />
            <Button label="Show Lessons" link="/grades" />
          </React.Fragment>
        ) : (
          <Button label="Practice" link="/grades" />
        )}
      </section>
    </React.Fragment>
  );
};

export default HomePage;
