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

export const fetchUserAverageScore = createAsyncThunk(
  'progress/fetchUserAverageScore',
  async () => {
    const response = await axios.get('/api/progress/average-score');
    return response.data as number;
  }
);

export const fetchAverageLessonAttemptsNumber = createAsyncThunk(
  'progress/fetchAverageLessonAttemptsNumber',
  async () => {
    const response = await axios.get('/api/progress/average-attempts-number');
    return response.data as number;
  }
);

export const fetchBestScore = createAsyncThunk(
  'progress/fetchBestScore',
  async () => {
    const response = await axios.get('/api/progress/best-score');
    return response.data as number;
  }
);

export const fetchWorstScore = createAsyncThunk(
  'progress/fetchWorstScore',
  async () => {
    const response = await axios.get('/api/progress/worst-score');
    return response.data as number;
  }
);

export const fetchTestCountsByDay = createAsyncThunk(
  'progress/fetchTestCountsByDay',
  async () => {
    const response = await axios.get('/api/progress/tests-count-by-day');
    return response.data as {[key: string]: number};
  }
);

export const fetchTopTenUsersByScore = createAsyncThunk(
  'progress/fetchTopTenUsersByScore',
  async () => {
    const response = await axios.get('/api/progress/top-10');
    return response.data;
  }
);
