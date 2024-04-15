import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRoles = createAsyncThunk('roles/fetch', async () => {
  const response = await axios.get('/api/roles');
  return response.data;
});
