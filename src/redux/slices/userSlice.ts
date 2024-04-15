import {createSlice} from '@reduxjs/toolkit';
import {Role} from './roleSlice';
import {fetchCurrentUser, registerUser} from '../thunks/userThunks';

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
}

export interface UserState {
  loggedInUser: User | null;
  users: User[];
  userForUpdate: User | null;
}

const initialState: UserState = {
  loggedInUser: null,
  users: [],
  userForUpdate: null,
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearLoggedInUser(state) {
      state.loggedInUser = null;
    },
    setUserForUpdate(state, action) {
      state.userForUpdate = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
});

export const {clearLoggedInUser, setUserForUpdate} = UserSlice.actions;

export default UserSlice.reducer;
