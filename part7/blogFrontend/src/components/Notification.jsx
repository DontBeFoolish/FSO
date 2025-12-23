function Notification({ info }) {
  if (!info) return null;

  return (
    <div className={info.type}>{info.message}</div>
  );
}

export default Notification;
