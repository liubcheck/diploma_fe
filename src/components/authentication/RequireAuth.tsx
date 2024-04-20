import React from 'react';
import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {getLoggedInUser} from '../../redux/selectors/userSelector';

const RequireAuth = () => {
  const loggedInUser = useSelector(getLoggedInUser);
  const location = useLocation();

  return loggedInUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{from: location}} replace />
  );
};
export default RequireAuth;
