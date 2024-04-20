import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Progress} from '../slices/progressSlice';

export const saveProgress = createAsyncThunk(
  'progress/save',
  async ({lessonId, score}: {lessonId: number; score: number}) => {
    const response = await axios.post(
      '/api/progress',
      {lessonId, score},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

export const fetchUserTotalProgress = createAsyncThunk(
  'progress/fetchUserTotalProgress',
  async () => {
    const response = await axios.get('/api/progress');
    return response.data as Progress[];
  }
);

export const fetchUserTotalScore = createAsyncThunk(
  'progress/fetchUserTotalScore',
  async () => {
    const response = await axios.get('/api/progress/total-score');
    return response.data as number;
  }
);
