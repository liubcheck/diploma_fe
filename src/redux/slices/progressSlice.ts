import {createSlice} from '@reduxjs/toolkit';
import {
  saveProgress,
  fetchUserTotalProgress,
  fetchUserTotalScore,
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
}

const initialState: ProgressState = {
  currentProgress: null,
  total_progress: [],
  total_score: 0,
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
      //state.total_progress.push(action.payload);
    });
    builder.addCase(fetchUserTotalProgress.fulfilled, (state, action) => {
      state.total_progress = action.payload;
    });
    builder.addCase(fetchUserTotalScore.fulfilled, (state, action) => {
      state.total_score = action.payload;
    });
  },
});

export const {setCurrentProgress} = ProgressSlice.actions;

export default ProgressSlice.reducer;
