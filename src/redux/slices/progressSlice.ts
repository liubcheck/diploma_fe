import {createSlice} from '@reduxjs/toolkit';
import {
  saveProgress,
  fetchUserTotalProgress,
  fetchUserTotalScore,
  fetchTopTenUsersByScore,
  fetchUserAverageScore,
  fetchAverageLessonAttemptsNumber,
  fetchBestScore,
  fetchWorstScore,
  fetchTestCountsByDay,
  fetchAllUsersStats,
} from '../thunks/progressThunks';

export interface Progress {
  id: number;
  userEmail: string;
  isCompleted: boolean;
  score: number;
}

export interface ProgressState {
  currentProgress: Progress | null;
  total_progress: Progress[];
  total_score: number;
  average_score: number;
  average_attempts_number: number;
  best_score: number;
  worst_score: number;
  test_counts_by_day: Record<string, number>;
  top_10_users: Record<string, number>;
}

const initialState: ProgressState = {
  currentProgress: null,
  total_progress: [],
  total_score: 0,
  average_score: 0,
  average_attempts_number: 0,
  best_score: 0,
  worst_score: 0,
  test_counts_by_day: {},
  top_10_users: {},
};

const ProgressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    setCurrentProgress(state, action) {
      state.currentProgress = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(saveProgress.fulfilled, (state, action) => {
      state.currentProgress = action.payload;
    });
    builder.addCase(fetchUserTotalProgress.fulfilled, (state, action) => {
      state.total_progress = action.payload;
    });
    builder.addCase(fetchUserTotalScore.fulfilled, (state, action) => {
      state.total_score = action.payload;
    });
    builder.addCase(fetchUserAverageScore.fulfilled, (state, action) => {
      state.average_score = action.payload;
    });
    builder.addCase(
      fetchAverageLessonAttemptsNumber.fulfilled,
      (state, action) => {
        state.average_attempts_number = action.payload;
      }
    );
    builder.addCase(fetchBestScore.fulfilled, (state, action) => {
      state.best_score = action.payload;
    });
    builder.addCase(fetchWorstScore.fulfilled, (state, action) => {
      state.worst_score = action.payload;
    });
    builder.addCase(fetchTestCountsByDay.fulfilled, (state, action) => {
      state.test_counts_by_day = action.payload;
    });
    builder.addCase(fetchTopTenUsersByScore.fulfilled, (state, action) => {
      state.top_10_users = action.payload;
    });
    builder.addCase(fetchAllUsersStats.fulfilled, (state, action) => {
      state.total_score = action.payload.totalScore;
      state.average_score = action.payload.averageScore;
      state.average_attempts_number = action.payload.averageAttemptsNumber;
      state.best_score = action.payload.bestScore;
      state.worst_score = action.payload.worstScore;
      state.test_counts_by_day = action.payload.testCountsByDay;
      state.top_10_users = action.payload.topTenUsersData;
    });
  },
});

export const {setCurrentProgress} = ProgressSlice.actions;

export default ProgressSlice.reducer;
