import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import { useMutation } from '@tanstack/react-query';

import NotificationContext from './NotificationContext';
import blogService from '../services/blogs';
import loginService from '../services/login';

const reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const AuthContext = createContext();

export function AuthContextProvider(props) {
  const [user, dispatchUser] = useReducer(reducer, null);
  const { setNotification } = useContext(NotificationContext);

  useEffect(() => {
    const savedUser = window.localStorage.getItem('logged-blog-user');

    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        dispatchUser({ type: 'LOGIN', payload: parsedUser });
        blogService.setToken(parsedUser.token);
      } catch {
        window.localStorage.removeItem('logged-blog-user');
      }
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (newUser) => {
      dispatchUser({ type: 'LOGIN', payload: newUser });
      blogService.setToken(newUser.token);
      window.localStorage.setItem('logged-blog-user', JSON.stringify(newUser));
    },
    onError: () => {
      setNotification({ message: 'Invalid username/password', type: 'error' });
    },
  });

  const login = (credentials) => loginMutation.mutate(credentials);

  const logout = () => {
    dispatchUser({ type: 'LOGOUT' });
    blogService.setToken(null);
    window.localStorage.removeItem('logged-blog-user');
  };

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isLoggingIn: loginMutation.isLoading,
    loginError: loginMutation.isError,
    error: loginMutation.error,
  }), [user, loginMutation.isLoading, loginMutation.isError, loginMutation.error]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
