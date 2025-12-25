import { useMutation } from "@tanstack/react-query";
import { createContext, useReducer, useEffect } from "react";
import loginService from '../services/login'
import blogService from '../services/blogs'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(authReducer, null)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('loggedBlogappUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      dispatchUser({ type: 'LOGIN', payload: parsedUser })
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      dispatchUser({ type: 'LOGIN', payload: user })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    }
  })

  const login = (credentials) => {
    loginMutation.mutate(credentials)
  }

  const logout = () => {
    dispatchUser({ type: 'LOGOUT' })
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext