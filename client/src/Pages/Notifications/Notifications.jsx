import NotificationCard from "../../Components/NotificationCard/NotificationCard"
import { useGlobalContext } from "../../Context/Context"
import './Notifications.css'
import { useState } from "react"

const Notifications = () => {
  const { notifications } = useGlobalContext();
  const [filterBy, setFilterBy]  = useState('All');

  const filteredNotifications = filterBy === 'All'
  ? notifications
  : notifications.filter(notification => notification.status === filterBy);

  const unreadCount = notifications.filter(n => n.status === 'Unread').length;

  return (
    <div className="p-2">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4>Notifications</h4>
          <div className="d-flex gap-2">
            <button type="button" className="btn btn-light border">Mark All Read</button>
            <button type="button" className="btn btn-light border">Clear All</button>
          </div>
        </div>

        <div className="d-flex gap-3 border-bottom pb-2 mb-3">
          <button onClick={()=> setFilterBy('All')} type="button" className={`btn ${filterBy === 'All' ? 'btn-primary' : 'btn-light'}`}>{`All (${notifications.length})`}</button>
          <button onClick={()=> setFilterBy('Unread')} type="button" className={`btn ${filterBy === 'Unread' ? 'btn-primary' : 'btn-light'}`}>{`Unread (${ unreadCount })`}</button>
        </div>


        <div className="d-flex flex-column gap-3 notification-list">
          {
            filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification)=>{
                return (
                  <NotificationCard key={notification.notificationId} notification={notification} />
                )
              })
            ) : (
              <div className="text-center text-secondary">
                <p>No notifications available</p>
                <p className="text-muted">You will see notifications here when you recieve them</p>
              </div>
            )
          }
          {/* <NotificationCard notification={notification}/> */}
        </div>
      </div>
    </div>
  )
}

export default Notifications