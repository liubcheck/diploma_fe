import {RootState} from '../store';

export const getLoggedInUser = (state: RootState) => state.user.loggedInUser;
export const getCurrentToken = (state: RootState) => state.user.token;
export const getAllUsers = (state: RootState) => state.user.users;
