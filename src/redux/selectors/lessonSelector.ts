import {RootState} from '../store';

export const getAllLessons = (state: RootState) => state.lessons.lessons;
export const getCurrentLesson = (state: RootState) =>
  state.lessons.currentLesson;
