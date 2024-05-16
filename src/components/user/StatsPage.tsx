import React from 'react';
import {useSelector} from 'react-redux';
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
import {getLoggedInUser} from '../../redux/selectors/userSelector';
import {translateDay} from '../utils/dayTranslation';
import Navbar from '../Navbar';

const StatsPage = () => {
  const user = useSelector(getLoggedInUser);
  const totalScore = useSelector(getUserTotalScore);
  const averageScore = useSelector(getUserAverageScore);
  const bestScore = useSelector(getBestScore);
  const worstScore = useSelector(getWorstScore);
  const averageAttempts = useSelector(getAverageLessonAttemptsNumber);
  const topUsersData = useSelector(getTopTenUsersByScore);
  const testCountsByDay = useSelector(getTestCountsByDay);

  const days = Object.entries(testCountsByDay);

  return (
    <main>
      <div className="container">
        <Navbar username={user!.username} />
        {user && user.role.name === 'USER' && (
          <>
            <div className="stats-title">Твоя Статистика</div>
            <div className="stats-column">
              <h3>* Загальний рахунок: {totalScore}</h3>
              <h3>* Середній рахунок: {averageScore?.toFixed(2)}</h3>
              <h3>* Найкращий результат: {bestScore}</h3>
              <h3>* Найгірший результат: {worstScore}</h3>
              <h3>
                * Середня кількість спроб на 1 урок:{' '}
                {averageAttempts.toFixed(2)}
              </h3>
              <h3>* Кількість проходжень уроків за останній тиждень:</h3>
              <ul>
                {days.map(([day, count]) => {
                  return <li key={day}>{`${translateDay(day)}: ${count}`}</li>;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="container">
        <div className="top-users-title">Топ 10 Учнів</div>
        <div className="top-users-column">
          <TopUsersTable topUsersData={topUsersData} />
        </div>
      </div>
    </main>
  );
};

export default StatsPage;
