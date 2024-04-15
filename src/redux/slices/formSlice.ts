import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from './userSlice';

export interface FormFields {
  id?: number;
  username: string;
  password: string;
  repeatPassword: string;
  email: string;
}

export interface FormErrors {
  username?: string;
  password?: string;
  repeatPassword?: string;
  email?: string;
}

export interface FormState {
  formData: FormFields;
  formErrors: FormErrors;
}

const initialState: FormState = {
  formData: {
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
  },
  formErrors: {},
};

interface UpdateFieldActionPayload<T extends keyof FormFields> {
  field: T;
  value: FormFields[T];
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: {
      reducer: <T extends keyof FormFields>(
        state: FormState,
        action: PayloadAction<UpdateFieldActionPayload<T>>
      ) => {
        const {field, value} = action.payload;
        state.formData[field] = value;
      },
      prepare: <T extends keyof FormFields>(
        field: T,
        value: FormFields[T]
      ) => ({
        payload: {field, value},
      }),
    },
    updateErrors(state: FormState, action: PayloadAction<FormErrors>) {
      state.formErrors = action.payload;
    },
    resetForm(state: FormState) {
      state.formData = initialState.formData;
      state.formErrors = initialState.formErrors;
    },
    bulkUpdate: (state: FormState, action: PayloadAction<User>) => {
      const user: User = action.payload;
      state.formData = {
        ...state.formData,
        id: user.id,
        username: user.username,
        email: user.email,
      };
    },
  },
});

export const {updateField, updateErrors, resetForm, bulkUpdate} =
  formSlice.actions;

export default formSlice.reducer;
