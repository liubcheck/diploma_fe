import {RootState} from '../store';

export const getCurrentProgress = (state: RootState) =>
  state.progress.currentProgress;
export const getTotalProgress = (state: RootState) =>
  state.progress.total_progress;
export const getUserTotalScore = (state: RootState) =>
  state.progress.total_score;
export const getUserAverageScore = (state: RootState) =>
  state.progress.average_score;
export const getAverageLessonAttemptsNumber = (state: RootState) =>
  state.progress.average_attempts_number;
export const getBestScore = (state: RootState) => state.progress.best_score;
export const getWorstScore = (state: RootState) => state.progress.worst_score;
export const getTestCountsByDay = (state: RootState) =>
  state.progress.test_counts_by_day;
export const getTopTenUsersByScore = (state: RootState) =>
  state.progress.top_10_users;
