import React from 'react';
import TextInput from './TextInput';

interface Props {
  login: string;
  setLogin: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  error: string;
}

const LoginForm = ({
  login,
  setLogin,
  password,
  setPassword,
  onSubmit,
  error,
}: Props) => {
  return (
    <form onSubmit={onSubmit} className="form-signin position-relative">
      <TextInput
        label="Нікнейм або пошта"
        type="text"
        name="login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        autoFocus
      />
      <TextInput
        label="Пароль"
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="d-flex mt-2">
        {error && (
          <div id="error">
            <span className="login-error-message">{error}</span>
          </div>
        )}
        <div className="ms-auto">
          <button className="btn login-btn btn-outline-dark" type="submit">
            Увійти
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
