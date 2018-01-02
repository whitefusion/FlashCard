import {AsyncStorage} from "react-native"
import {Notifications, Permissions} from 'expo'

export const generateId = () => (Math.random().toString(36).substr(2, 32))
export const partial = (fn, ...args) => fn.bind(null,...args)

export const NOTIFICATION_KEY = "FlashCard:notification"

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
         .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification () {
  return {
    title :'bring it up ! ',
    body: 'dont forget to take a quiz today ! ',
    ios : {
      sound: true
    },
    android : {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
  .then(JSON.parse)
  .then((data) => {
    if(data === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS)
      .then(({status})=>{
        if(status === 'granted'){
          Notifications.cancelAllScheduledNotificationsAsync()

          let tomorrow = new Date()
          tomorrow.setDate(tomorrow.getDate()+1)
          tomorrow.setHours(12)
          tomorrow.setMinutes(0)
          
          Notifications.scheduleLocalNotificationAsync(
            createNotification(),
            {
              time: tomorrow,
              repeat: 'day'
            }
          )
          AsyncStorage.setItem(NOTIFICATION_KEY,JSON.stringify(true))
        }
      })
    }
  })
}