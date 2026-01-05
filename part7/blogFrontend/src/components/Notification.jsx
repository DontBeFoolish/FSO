import { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import NotificationContext from '../contexts/NotificationContext';

function Notification() {
  const { notification } = useContext(NotificationContext);
  if (!notification) return null;
  return <Alert variant={notification.type}>{notification.message}</Alert>;
}

export default Notification;
