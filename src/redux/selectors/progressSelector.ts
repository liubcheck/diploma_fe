import {RootState} from '../store';

export const getCurrentProgress = (state: RootState) =>
  state.progress.currentProgress;
export const getTotalProgress = (state: RootState) =>
  state.progress.total_progress;
export const getTotalScore = (state: RootState) => state.progress.total_score;
