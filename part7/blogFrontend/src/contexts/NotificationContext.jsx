import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { content: action.payload.content, time: action.payload.time }
    case 'CLEAR':
      return { content: '', time: 0 }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const setNotification = (content, time = 5) => {
    notificationDispatch({ type: 'SET', payload: { content, time }})
    setTimeout(() => {
      notificationDispatch({ type: 'CLEAR' })
    }, time * 1000);
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext