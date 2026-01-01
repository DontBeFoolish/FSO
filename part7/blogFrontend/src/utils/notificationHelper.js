const showNotification = (setNotifInfo, message, type, duration = 2500) => {
  setNotifInfo({ message, type });
  setTimeout(() => setNotifInfo(null), duration);
};

export default showNotification;
