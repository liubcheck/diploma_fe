import {FormErrors} from '../../redux/slices/formSlice';
import {FormFields} from '../../redux/slices/formSlice';
import {updateErrors} from '../../redux/slices/formSlice';
import {AppDispatch} from '../../redux/store';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateField = (
  name: keyof FormFields,
  value: string,
  formData: FormFields
): string | null => {
  switch (name) {
    case 'email': {
      if (!value) return 'Field is required';
      if (value.length < 1) return 'Min length is 1 character';
      if (value.length > 50) return 'Max length is 50 characters';
      if (!EMAIL_REGEX.test(value)) return 'Not a well-formed email address';
      break;
    }
    case 'username': {
      if (!value) return 'Field is required';
      if (value.length < 1) return 'Min length is 1 character';
      if (value.length > 50) return 'Max length is 50 characters';
      break;
    }
    case 'password': {
      if (!value) return 'Field is required';
      if (value.length < 8) return 'Min length is 8 characters';
      if (value.length > 72) return 'Max length is 72 characters';
      break;
    }
    case 'repeatPassword': {
      if (!value) return 'Field is required';
      if (value !== formData.password) {
        return 'Passwords must be the same';
      }
      break;
    }
    default: {
      break;
    }
  }
  return null;
};

const validateForm = (formErrors: FormErrors): boolean => {
  return Object.keys(formErrors).length === 0;
};

const handleValidation = (
  field: keyof FormFields,
  value: string,
  formData: FormFields,
  formErrors: FormErrors,
  dispatch: AppDispatch
) => {
  const error = validateField(
    field as keyof FormFields,
    value.toString(),
    formData
  );
  const newErrors = {...formErrors};

  if (error) {
    newErrors[field as keyof FormErrors] = error;
  } else {
    delete newErrors[field as keyof FormErrors];
  }
  dispatch(updateErrors(newErrors));
};

export {handleValidation, validateForm};
