import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import roleReducer from './slices/roleSlice';
import variantReducer from './slices/variantSlice';
import taskReducer from './slices/taskSlice';
import lessonReducer from './slices/lessonSlice';
import formReducer from './slices/formSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    roles: roleReducer,
    variants: variantReducer,
    tasks: taskReducer,
    lessons: lessonReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
