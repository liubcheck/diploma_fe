import React, {useState} from 'react';
import LoginForm from './LoginForm';
import RegisterOption from './RegisterOption';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {loginUser} from '../../redux/thunks/userThunks';
import {fetchTopTenUsersByScore} from '../../redux/thunks/progressThunks';

const LoginPage = () => {
  const [loginData, setLoginData] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogin = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({loginData, password})).then(async () => {
        await dispatch(fetchTopTenUsersByScore());
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
        <h1 className="login-title">Diploma</h1>
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
