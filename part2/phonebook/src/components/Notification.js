const Notification = ({ notifObject }) => {
  if (notifObject === null) {
    return
  }
  return (
    <div className={"notification-box " + notifObject.type}>
      {notifObject.message}
    </div>
  )
}

export default Notification