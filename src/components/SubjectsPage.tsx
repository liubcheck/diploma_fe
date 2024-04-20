import React from 'react';
import SubjectButton from './SubjectButton';
import {useSelector} from 'react-redux';
import {getLoggedInUser} from '../redux/selectors/userSelector';
import Navbar from './Navbar';

const subjects = ['Math', 'Science', 'History'];

const SubjectsPage = () => {
  const user = useSelector(getLoggedInUser);

  return (
    <React.Fragment>
      <Navbar username={user!.username} />
      <section className="home-section text-center">
        {subjects.map(subject => (
          <div key={subject}>
            <SubjectButton key={subject} subject={subject} />
          </div>
        ))}
      </section>
    </React.Fragment>
  );
};

export default SubjectsPage;
