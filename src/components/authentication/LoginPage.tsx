import React, {useState} from 'react';
import LoginForm from './LoginForm';
import RegisterOption from './RegisterOption';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {loginUser} from '../../redux/thunks/userThunks';
import {
  fetchAllUsersStats,
  fetchTopTenUsersByScore,
} from '../../redux/thunks/progressThunks';
import {getLoggedInUser} from '../../redux/selectors/userSelector';

const LoginPage = () => {
  const user = useSelector(getLoggedInUser);
  const [loginData, setLoginData] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({loginData, password})).then(async () => {
        if (user && user.role.name === 'USER') {
          await dispatch(fetchAllUsersStats());
        } else {
          await dispatch(fetchTopTenUsersByScore());
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      if (!error?.status) {
        setError('No Server Response');
      } else if (error.status === 400) {
        setError('Missing login data or password');
      } else if (error.status === 401) {
        setError('Unauthorized');
      } else {
        setError('Invalid login data or password');
      }
      setLoginData('');
      setPassword('');
    }
  };

  return (
    <section className="login-section text-center">
      <div className="signin-container">
        <h1 className="login-title">Dali</h1>
        <LoginForm
          login={loginData}
          setLogin={setLoginData}
          password={password}
          setPassword={setPassword}
          onSubmit={handleLogin}
          error={error}
        />
        <RegisterOption />
      </div>
    </section>
  );
};

export default LoginPage;
