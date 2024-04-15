import React from 'react';
import TextInput from './TextInput';
import SignInSection from './SignInSection';

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
        label="Login"
        type="text"
        name="login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        autoFocus
      />
      <TextInput
        label="Password"
        type="password"
        name="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <SignInSection error={error} />
    </form>
  );
};

export default LoginForm;
