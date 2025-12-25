import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

function Notification() {
  const { notification } = useContext(NotificationContext)

  if (!notification.content) return null

  return (
    <div className={notification.style}>
      {notification.content}
    </div>
  );
}

export default Notification;
