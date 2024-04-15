import {RootState} from '../store';

export const selectFormData = (state: RootState) => state.form.formData;
export const selectFormErrors = (state: RootState) => state.form.formErrors;
