import React from 'react';
import {User} from '../../redux/slices/userSlice';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {registerUser} from '../../redux/thunks/userThunks';
import Form from './Form';

const RegisterPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleRegister = async (formData: User) => {
    dispatch(registerUser(formData as User))
      .unwrap()
      .then(() => {
        navigate('/login');
      })
      .catch(error => {
        console.error('Failed to register user:', error);
      });
  };

  const handleCancel = async () => {
    navigate('/login');
  };

  return (
    <main>
      <div className="container">
        <h1>Register user</h1>
        <Form onSubmit={handleRegister} handleCancel={handleCancel} />
      </div>
    </main>
  );
};

export default RegisterPage;
