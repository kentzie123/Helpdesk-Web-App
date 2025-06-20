import { useEffect } from "react";
import { useGlobalContext } from "../../Context/Context";
import { NavLink } from 'react-router-dom';

const NotificationToastResponse = () => {
    const { popupNotification, setPopupNotification, formatNotificationDate } = useGlobalContext();

   
    useEffect(() => {
        if (popupNotification) {
            const timer = setTimeout(() => {
                setPopupNotification(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [popupNotification]);

    return (
        <div
            className={`toast position-fixed bottom-0 end-0 me-3 mb-3 p-0 border-0 fade show shadow-lg rounded-4 overflow-hidden z-3 ${popupNotification ? 'show' : 'hide'}`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            style={{
                backgroundColor: "#f9fafe", // subtle contrast background
                borderLeft: "6px solid #3f768c", // accent bar
                maxWidth: "360px",
                color: "#212529"
            }}
        >
            <div className="p-3">
                <div className="d-flex justify-content-between align-items-start">
                    <div className="d-flex align-items-center gap-2">
                        <i className="bi bi-bell-fill text-primary fs-5"></i>
                        <p className="fw-bold text-primary mb-0">Notification</p>
                    </div>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setPopupNotification(null)}
                        aria-label="Close"
                    ></button>
                </div>
                <h6 className="mt-2 mb-1 fw-semibold">{popupNotification?.title}</h6>
                <p className="mb-2 text-secondary">{popupNotification?.message}</p>
                <div className="d-flex justify-content-between align-items-center">
                    <small className="text-muted">
                        {popupNotification?.createdAt && formatNotificationDate(popupNotification.createdAt)}
                    </small>
                    <NavLink to={`/ticket/${popupNotification.ticketId}`} className="text-primary fw-medium text-decoration-none">
                        Details <i className="bi bi-arrow-right-circle"></i>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default NotificationToastResponse;
