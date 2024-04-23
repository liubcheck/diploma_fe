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
          <div>
            <Button label="Create Lesson" link="/createLesson" />
            <Button label="Show Lessons" link="/grades" />
            <Button label="Stats" link="/stats" />
          </div>
        ) : (
          <div>
            <Button label="Practice" link="/grades" />
            <Button label="Stats" link="/stats" />
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default HomePage;
