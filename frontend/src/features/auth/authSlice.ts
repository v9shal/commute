import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/cookieUtils';

interface AuthState {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

const tokenFromCookie = getCookie('token');
const usernameFromCookie = getCookie('username');

const initialState: AuthState = {
  username: usernameFromCookie || null,
  token: tokenFromCookie || null,
  isAuthenticated: !!tokenFromCookie,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; username: string }>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.token = null;
      state.username = null;
      state.isAuthenticated = false;
      document.cookie = 'token=; Max-Age=-99999999;';
      document.cookie = 'username=; Max-Age=-99999999;';
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;