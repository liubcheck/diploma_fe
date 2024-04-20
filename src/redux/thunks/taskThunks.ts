import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Task} from '../slices/taskSlice';

export const fetchTasks = createAsyncThunk('tasks/fetch', async () => {
  const response = await axios.get('/api/tasks');
  return response.data;
});

export const fetchTaskById = createAsyncThunk<Task, number>(
  'tasks/fetchById',
  async (taskId: number) => {
    const response = await axios.get(`/api/tasks/${taskId}`);
    return response.data as Task;
  }
);

export const fetchTasksByLessonId = createAsyncThunk(
  'tasks/fetchByLessonId',
  async (lessonId: number) => {
    const response = await fetch(`/api/tasks/lesson/${lessonId}`);
    const data = await response.json();
    return data;
  }
);

export const createTask = createAsyncThunk('tasks/create', async () => {
  const response = await axios.post('/api/tasks');
  return response.data;
});

export const updateTask = createAsyncThunk(
  'tasks/update',
  async (task: Task) => {
    const response = await axios.put(
      `/api/lessons/${task.id}`,
      JSON.stringify(task)
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/delete',
  async (taskId: number) => {
    const response = await axios.delete(`/api/tasks/${taskId}`);
    return response.data;
  }
);
