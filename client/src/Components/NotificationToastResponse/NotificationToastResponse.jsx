import { useEffect } from "react";
import { useGlobalContext } from "../../Context/Context";
import { NavLink } from 'react-router-dom';

const NotificationToastResponse = () => {
 const { popupNotification, setPopupNotification } = useGlobalContext();

 const formatNotificationDate = (dateString) => {
    const localDate = new Date(dateString); // Automatically converts from UTC to browser-local time
    const now = new Date();

    const isToday = localDate.toDateString() === now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = localDate.toDateString() === yesterday.toDateString();

    const time = localDate.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });

    if (isToday) return `Today ${time}`;
    if (isYesterday) return `Yesterday ${time}`;
    return `${(localDate.getMonth() + 1).toString().padStart(2, '0')}/${localDate.getDate().toString().padStart(2, '0')}/${localDate.getFullYear()} ${time}`;
};

    
    useEffect(() => {
        if (popupNotification) {
            const timer = setTimeout(() => {
                setPopupNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [popupNotification]);

    return (
        <div className={`toast position-fixed  bottom-0 end-0 me-3 mb-3 p-1 z-3 border-0 fade bg-white ${popupNotification ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="p-3">
                <div className="d-flex">
                    <p className="fw-bold text-primary">Notification</p>
                    <button type="button" className="btn-close me-2 m-auto" onClick={() => setPopupNotification(null)} aria-label="Close"></button>
                </div>
                <h5>{popupNotification.title}</h5>
                <p>{popupNotification.message}</p>
                <div className="d-flex justify-content-between">
                    <div>{popupNotification.createdAt && formatNotificationDate(popupNotification.createdAt)}</div>
                    <NavLink to={`/ticket/${popupNotification.ticketId}`} className='text-decoration-none'>
                        Details <i className="bi bi-arrow-right"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default NotificationToastResponse