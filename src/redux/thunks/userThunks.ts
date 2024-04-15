import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {User} from '../slices/userSlice';

axios.defaults.headers.common['Content-Type'] = 'application/json';

export const loginUser = createAsyncThunk(
  'users/login',
  async ({loginData, password}: {loginData: string; password: string}) => {
    const response = await axios.post(
      '/api/users/login',
      JSON.stringify({loginData, password})
    );
    axios.defaults.headers.common['Authorization'] =
      `Bearer ${response.data.token}`;
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
);

export const logoutUser = createAsyncThunk('users/logout', async () => {
  localStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
});

export const registerUser = createAsyncThunk(
  'users/register',
  async (user: Omit<User, 'id'>) => {
    const response = await axios.post(
      '/api/users/registration',
      JSON.stringify(user)
    );
    return response.data;
  }
);

export const fetchCurrentUser = createAsyncThunk<User, void, {}>(
  'users/me',
  async () => {
    const response = await axios.get('/api/users/me');
    return response.data as User;
  }
);
