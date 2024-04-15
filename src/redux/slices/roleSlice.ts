import {createSlice} from '@reduxjs/toolkit';
import {fetchRoles} from '../thunks/roleThunks';

export interface Role {
  id: number;
  name: string;
}

export interface RoleState {
  roles: Role[];
}

const initialState: RoleState = {
  roles: [],
};

const RoleSlice = createSlice({
  name: 'roles',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRoles.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
  },
});

export default RoleSlice.reducer;
