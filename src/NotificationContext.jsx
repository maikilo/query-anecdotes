import { createContext, useReducer, useContext } from "react"

export const NotificationContext = createContext()

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      console.log(action)
      return action.payload
    case 'CLEAR':
      return ''
    default:
      state
  }
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

	return (
		<NotificationContext.Provider value={[notification, notificationDispatch]}>
			{props.children}
		</NotificationContext.Provider>
	)
}

export const UseNotificationValue = () => {
  const notificationState = useContext(NotificationContext)
  return notificationState[0]
}

export const UseNotificationDispatch = () => {
  const notificationState = useContext(NotificationContext)
  return notificationState[1]
}