import {RootState} from '../store';

export const getAllLessons = (state: RootState) => state.lessons.lessons;
