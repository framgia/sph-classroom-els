import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthApi from '../../api/Auth';

export const getUser = createAsyncThunk('auth/getUser', async () => {
  const response = await AuthApi.getUser({});

  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isFetching: true,
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isFetching = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isFetching = false;
    },
  },
});

export default authSlice.reducer;
