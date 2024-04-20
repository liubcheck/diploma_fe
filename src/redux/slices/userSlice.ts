import {createSlice} from '@reduxjs/toolkit';
import {Role} from './roleSlice';
import {fetchCurrentUser, loginUser, registerUser} from '../thunks/userThunks';
import cookie from 'js-cookie';

export interface User {
  id: number;
  email: string;
  username: string;
  role: Role;
}

export interface UserState {
  loggedInUser: User | null;
  token: string | null | undefined;
  users: User[];
}

const initialState: UserState = {
  loggedInUser: null,
  token: null,
  users: [],
};

const UserSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logout(state) {
      state.loggedInUser = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
        state.token = cookie.get('token');
      });
  },
});

export const {logout} = UserSlice.actions;

export default UserSlice.reducer;
