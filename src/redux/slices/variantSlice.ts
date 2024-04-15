import {createSlice} from '@reduxjs/toolkit';
import {
  createVariant,
  deleteVariant,
  fetchVariants,
  updateVariant,
} from '../thunks/variantThunks';

export interface Variant {
  id?: number;
  value: string;
  isRight: boolean;
}

export interface VariantState {
  variants: Variant[];
}

const initialState: VariantState = {
  variants: [],
};

const VariantSlice = createSlice({
  name: 'variants',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchVariants.fulfilled, (state, action) => {
      state.variants = action.payload;
    });
    builder.addCase(createVariant.fulfilled, (state, action) => {
      state.variants.push(action.payload);
    });
    builder.addCase(updateVariant.fulfilled, (state, action) => {
      const index = state.variants.findIndex(
        variant => variant.id === action.payload.id
      );
      if (index !== -1) {
        state.variants[index] = action.payload;
      }
    });
    builder.addCase(deleteVariant.fulfilled, (state, action) => {
      state.variants = state.variants.filter(
        variant => variant.id !== action.meta.arg
      );
    });
  },
});

export default VariantSlice.reducer;
