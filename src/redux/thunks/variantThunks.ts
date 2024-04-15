import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Variant} from '../slices/variantSlice';

export const fetchVariants = createAsyncThunk('variants/fetch', async () => {
  const response = await axios.get('/api/variants');
  return response.data;
});

export const fetchVariantById = createAsyncThunk<Variant, number>(
  'variants/fetchById',
  async (variantId: number) => {
    const response = await axios.get(`/api/variants/${variantId}`);
    return response.data as Variant;
  }
);

export const createVariant = createAsyncThunk('variants/create', async () => {
  const response = await axios.post('/api/variants');
  return response.data;
});

export const updateVariant = createAsyncThunk(
  'variants/update',
  async (variant: Variant) => {
    const response = await axios.put(
      `/api/lessons/${variant.id}`,
      JSON.stringify(variant)
    );
    return response.data;
  }
);

export const deleteVariant = createAsyncThunk(
  'variants/delete',
  async (variantId: number) => {
    const response = await axios.delete(`/api/variants/${variantId}`);
    return response.data;
  }
);
