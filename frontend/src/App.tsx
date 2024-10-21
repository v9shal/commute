import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from './features/auth/authSlice';
import { getCookie } from './utils/cookieUtils';
import ProtectedRoute from './protectedRoutes';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home';
import Skills from './components/Skill';
import Resource from './components/Resource';
import SearchResults from './components/Search';
import PageNotFound from './components/PageNotFound';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated);

  useEffect(() => {
    const token = getCookie('token');
    const username = getCookie('username');
    if (token && username && !isAuthenticated) {
      dispatch(setCredentials({ token, username }));
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<PageNotFound />} />
        
        {/* Protected Routes */}
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/addSkill" element={<ProtectedRoute element={<Skills />} />} />
        <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/addResource" element={<ProtectedRoute element={<Resource />} />} />
        <Route path="/home/search" element={<ProtectedRoute element={<SearchResults />} />} />
        <Route path="/home/profile" element={<ProtectedRoute element={<Profile />} />} />
      </Routes>
    </Router>
  );
}

export default App;
