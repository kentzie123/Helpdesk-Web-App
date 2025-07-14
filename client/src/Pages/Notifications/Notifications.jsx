import NotificationCard from "../../Components/NotificationCard/NotificationCard"
import { useGlobalContext } from "../../Context/Context";
import { useState, useMemo } from "react";
import api from "../../api/api";

import './Notifications.css';


const Notifications = () => {
  const { notifications, setNotifications, userInfo } = useGlobalContext();
  const [filterBy, setFilterBy]  = useState('All');

  const filteredNotifications = filterBy === 'All'
  ? notifications
  : notifications.filter(notification => notification.status === filterBy);

  const unreadCount = useMemo(()=>{
    return notifications.filter(n => n.status === 'Unread').length
  });

  const handleMarkAllRead = async () => {
    try {
      await api.put(`/notifications/mark-all-as-read/${userInfo.userID}`);
      
    } catch(err) {
      console.error('Error marking all notifications as read:', err);
    }
  }

  const handleClearAll = async () => {
    try {
      await api.delete(`/notifications/clear-all/${userInfo.userID}`);
      setNotifications([]);
    } catch(err) {
      console.error('Error clearing all notifications:', err)
    }
  }

  return (
    <div className="p-2">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h4>Notifications</h4>
          <div className="d-flex gap-2">
            <button onClick={handleMarkAllRead} type="button" className="btn btn-light border f-size-14">Mark All Read</button>
            <button onClick={handleClearAll} type="button" className="btn btn-light border f-size-14">Clear All</button>
          </div>
        </div>

        <div className="d-flex gap-3 border-bottom pb-2 mb-3">
          <button onClick={()=> setFilterBy('All')} type="button" className={`btn ${filterBy === 'All' ? 'btn-primary' : 'btn-light'} f-size-14`}>
            {`All (${notifications.length})`}
          </button>
          <button onClick={()=> setFilterBy('Unread')} type="button" className={`btn ${filterBy === 'Unread' ? 'btn-primary' : 'btn-light'} f-size-14`}>
            {`Unread (${ unreadCount })`}
          </button>
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