import { useGlobalContext } from "../../Context/Context";
import "./NotificationCard.css"
import api from "../../api/api";
import { Link } from 'react-router-dom'

const NotificationCard = ({notification}) => {
    const { formatNotificationDate, setShowDeleteNotificationModal, setSelectedNotification } = useGlobalContext();
    const {title, message, status, createdAt, type, ticketId} = notification;
    const notificationType = {
        'Ticket Assignment': 'bi-ticket-perforated bg-primary-subtle text-primary',
        'Ticket Update': 'bi-info-circle bg-dark-subtle text-dark'
    }

    const handleMarkAsRead = async (notificationId) => {
        try{
            await api.patch(`/notifications/${notificationId}`)
        } catch(err){
            console.error("Error marking notification as read:", err);
        }
    }

    return (
        <div className={`shadow-sm rounded-2 px-3 py-4 border ${ status === 'Unread' ? 'border-primary' : 'border-light-subtle' }`}>
            <div className="d-flex justify-content-between">
                <div className="d-flex gap-3">
                    <i className={`type d-flex align-items-center justify-content-center bi ${notificationType[type]} p-3`}></i>
                    <div className="d-flex flex-column gap-1">
                        <div className="d-flex align-items-center gap-2">
                            <div className="fw-bold">{title}</div>
                            {status === 'Unread' ? <div className="unread-icon bg-primary"></div> : null}
                        </div>
                        <div className="text-secondary">{message}</div>
                        <div className="text-muted notification-created">{formatNotificationDate(createdAt)}</div>
                    </div>  
                </div>

                <div>
                    {
                        status === 'Unread' ? (
                            <button onClick={()=>{handleMarkAsRead(notification.notificationId)}} type="button" className="btn btn-light text-success"><i className="bi bi-check2"></i></button>
                        ) : (
                            <button type="button" disabled className="btn btn-light text-secondary"><i className="bi bi-check2"></i></button>
                        )
                    }

                    <button onClick={()=> {setShowDeleteNotificationModal(true); setSelectedNotification(notification) }} type="button" className="btn btn-light text-danger"><i className="bi bi-trash"></i></button>

                    <Link to={`/ticket/${ticketId}`} onClick={()=>{handleMarkAsRead(notification.notificationId)}}>
                        <button type="button" className="btn btn-light text-primary">
                            Info <i className="bi bi-arrow-right-short"></i>
                        </button>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default NotificationCard