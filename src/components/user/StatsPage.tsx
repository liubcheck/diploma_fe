import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUserTotalScore,
  fetchUserAverageScore,
  fetchBestScore,
  fetchWorstScore,
  fetchAverageLessonAttemptsNumber,
  fetchTopTenUsersByScore,
  fetchTestCountsByDay,
} from '../../redux/thunks/progressThunks';
import {
  getUserTotalScore,
  getUserAverageScore,
  getBestScore,
  getWorstScore,
  getAverageLessonAttemptsNumber,
  getTopTenUsersByScore,
  getTestCountsByDay,
} from '../../redux/selectors/progressSelector';
import TopUsersTable from './TopUsersTable';
import {AppDispatch} from '../../redux/store';
import LoadingPage from '../LoadingPage';

const StatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const totalScore = useSelector(getUserTotalScore);
  const averageScore = useSelector(getUserAverageScore);
  const bestScore = useSelector(getBestScore);
  const worstScore = useSelector(getWorstScore);
  const averageAttempts = useSelector(getAverageLessonAttemptsNumber);
  const topUsersData = useSelector(getTopTenUsersByScore);
  const testCountsByDay = useSelector(getTestCountsByDay);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      dispatch(fetchUserTotalScore()),
      dispatch(fetchUserAverageScore()),
      dispatch(fetchBestScore()),
      dispatch(fetchWorstScore()),
      dispatch(fetchAverageLessonAttemptsNumber()),
      dispatch(fetchTopTenUsersByScore()),
      dispatch(fetchTestCountsByDay()),
    ]).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <div className="container">
        <h1>Stats Overview</h1>
        <div>
          <h2>Total Score: {totalScore}</h2>
          <h2>Average Score: {averageScore.toFixed(2)}</h2>
          <h2>Best Score: {bestScore}</h2>
          <h2>Worst Score: {worstScore}</h2>
          <h2>Average Attempts per Lesson: {averageAttempts.toFixed(2)}</h2>
          <h2>Daily Test Counts:</h2>
          <ul>
            {Object.entries(testCountsByDay).map(([day, count]) => (
              <li key={day}>{`${day}: ${count}`}</li>
            ))}
          </ul>
        </div>
        <h1>Top 10 Users</h1>
        <TopUsersTable topUsersData={topUsersData} />
      </div>
    </main>
  );
};

export default StatsPage;
