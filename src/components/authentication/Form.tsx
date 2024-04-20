import React from 'react';
import FormGroup from './FormGroup';
import {User} from '../../redux/slices/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../redux/store';
import {validateForm, handleValidation} from '../utils/validate';
import {updateField} from '../../redux/slices/formSlice';
import {
  selectFormData,
  selectFormErrors,
} from '../../redux/selectors/formSelector';

interface Props {
  onSubmit: (formData: User) => Promise<void>;
  handleCancel: () => void;
}

const Form = ({onSubmit, handleCancel}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const formData = useSelector(selectFormData);
  const formErrors = useSelector(selectFormErrors);

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      dispatch(updateField(field, value));
      handleValidation(field, value, formData, formErrors, dispatch);
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm(formErrors)) return;
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <FormGroup
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleChange('username')}
        error={formErrors.username}
      />
      <FormGroup
        label="Email"
        name="email"
        type="text"
        value={formData.email}
        onChange={handleChange('email')}
        error={formErrors.email}
      />
      <FormGroup
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange('password')}
        error={formErrors.password}
      />
      <FormGroup
        label="Password again"
        name="repeatPassword"
        type="password"
        value={formData.repeatPassword}
        onChange={handleChange('repeatPassword')}
        error={formErrors.repeatPassword}
      />
      <button type="submit" className="btn btn-outline-dark me-2">
        Ok
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="btn btn-outline-dark"
      >
        Cancel
      </button>
    </form>
  );
};

export default Form;
