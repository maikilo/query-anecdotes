import { UseNotificationValue } from '../NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  const notification = UseNotificationValue()
  return notification !== '' && (<div style={style}>{notification}</div>)
}

export default Notification
