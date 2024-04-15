import {RootState} from '../store';

export const getLoggedInUser = (state: RootState) => state.user.loggedInUser;
export const getAllUsers = (state: RootState) => state.user.users;
export const getUserForUpdate = (state: RootState) => state.user.userForUpdate;
