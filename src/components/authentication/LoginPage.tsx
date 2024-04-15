import React, {useEffect, useState} from 'react';
import LoginForm from './LoginForm';
import RegisterOption from './RegisterOption';
import {useNavigate} from 'react-router-dom';
import {useAuth} from './AuthProvider';
import Toast from '../common/Toast';

const LoginPage = () => {
  const [loginData, setLoginData] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const {login: authLogin} = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const toastMessage = localStorage.getItem('toast-message');
    if (toastMessage) {
      setMessage(toastMessage);
      setShowToast(true);
      localStorage.removeItem('toast-message');
    }
    const loginErrorMessage = localStorage.getItem('loginErrorMessage');
    if (loginErrorMessage) {
      setError(loginErrorMessage);
      localStorage.clear();
    }
  }, []);

  const handleLogin = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    try {
      await authLogin({loginData, password});
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setLoginData('');
      setPassword('');
    }
  };

  return (
    <section className="login-section text-center">
      <div className="signin-container">
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
      <Toast
        message={message}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </section>
  );
};

export default LoginPage;
