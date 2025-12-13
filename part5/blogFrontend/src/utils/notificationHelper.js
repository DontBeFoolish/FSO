const showNotification = (setNotifInfo, message, type, duration = 3000) => {
  setNotifInfo({ message, type });
  setTimeout(() => setNotifInfo(null), duration);
};

export default showNotification;
