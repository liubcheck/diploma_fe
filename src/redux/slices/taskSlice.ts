import {createSlice} from '@reduxjs/toolkit';
import {Variant} from './variantSlice';
import {
  createTask,
  deleteTask,
  fetchTasks,
  fetchTasksByLessonId,
  updateTask,
} from '../thunks/taskThunks';

export interface Task {
  id: number;
  question: string;
  taskType: string;
  variants?: Variant[];
  rightAnswer?: string;
}

export interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasksByLessonId.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
    builder.addCase(createTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.meta.arg);
    });
  },
});

export default TaskSlice.reducer;
