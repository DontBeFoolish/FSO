import { useContext } from 'react';
import NotificationContext from '../context/NotificationContext';

function Notification() {
  const { notification } = useContext(NotificationContext);
  if (!notification) return null;

  return <div className={notification.type}>{notification.message}</div>;
}

export default Notification;
