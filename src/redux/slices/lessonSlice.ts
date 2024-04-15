import {createSlice} from '@reduxjs/toolkit';
import {Task} from './taskSlice';
import {
  createLesson,
  deleteLesson,
  fetchLessons,
  fetchLessonsByGradeAndSubject,
  updateLesson,
} from '../thunks/lessonThunks';

export interface Lesson {
  id: number;
  subject: string;
  grade: number;
  title: string;
  tasks: Task[];
}

export interface LessonState {
  lessons: Lesson[];
}

const initialState: LessonState = {
  lessons: [],
};

const LessonSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchLessons.fulfilled, (state, action) => {
      state.lessons = action.payload;
    });
    builder.addCase(createLesson.fulfilled, (state, action) => {
      state.lessons.push(action.payload);
    });
    builder.addCase(updateLesson.fulfilled, (state, action) => {
      const index = state.lessons.findIndex(
        lesson => lesson.id === action.payload.id
      );
      if (index !== -1) {
        state.lessons[index] = action.payload;
      }
    });
    builder.addCase(deleteLesson.fulfilled, (state, action) => {
      state.lessons = state.lessons.filter(
        lesson => lesson.id !== action.meta.arg
      );
    });
    builder.addCase(
      fetchLessonsByGradeAndSubject.fulfilled,
      (state, action) => {
        state.lessons = action.payload;
      }
    );
  },
});

export default LessonSlice.reducer;
