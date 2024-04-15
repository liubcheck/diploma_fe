import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Lesson} from '../slices/lessonSlice';

export const fetchLessons = createAsyncThunk('lessons/fetch', async () => {
  const response = await axios.get('/api/lessons');
  return response.data;
});

export const fetchLessonById = createAsyncThunk<Lesson, number>(
  'lessons/fetchById',
  async (lessonId: number) => {
    const response = await axios.get(`/api/lessons/${lessonId}`);
    return response.data as Lesson;
  }
);

export const createLesson = createAsyncThunk(
  'lessons/create',
  async (lesson: Omit<Lesson, 'id'>) => {
    const response = await axios.post('/api/lessons', lesson, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }
);

export const updateLesson = createAsyncThunk(
  'lessons/update',
  async (lesson: Lesson) => {
    const response = await axios.put(
      `/api/lessons/${lesson.id}`,
      JSON.stringify(lesson)
    );
    return response.data;
  }
);

export const deleteLesson = createAsyncThunk(
  'lessons/delete',
  async (lessonId: number) => {
    const response = await axios.delete(`/api/lessons/${lessonId}`);
    return response.data;
  }
);

export const fetchLessonsByGradeAndSubject = createAsyncThunk<
  Lesson[],
  {grade: number; subject: string}
>('lessons/fetchByGradeAndSubject', async ({grade, subject}) => {
  const response = await axios.get(`/api/lessons/${grade}/${subject}`);
  return response.data as Lesson[];
});
