import { createContext, useCallback, useMemo, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return { message: action.payload.message, type: action.payload.type };
    case 'CLEAR':
      return null;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export function NotificationContextProvider(props) {
  const [notification, notificationDispatch] = useReducer(reducer, null);

  const setNotification = useCallback((notiData) => {
    notificationDispatch({
      type: 'SET',
      payload: { message: notiData.message, type: notiData.type },
    });
    setTimeout(
      () => {
        notificationDispatch({ type: 'CLEAR' });
      },
      (notiData.time ?? 5) * 1000,
    );
  }, []);

  const value = useMemo(
    () => ({ notification, setNotification }),
    [notification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
