import './OuterNotificationToast.css';
import { useEffect, useState } from 'react';

const OuterNotificationToast = ({ title, content, state, setState }) => {
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        let popupTimeout, stateTimeout;

        if (state) {
            setPopup(true);

            popupTimeout = setTimeout(() => {
                setPopup(false);
            }, 6000);

            stateTimeout = setTimeout(() => {
                setState(false);
            }, 7000);
        }

        return () => {
            clearTimeout(popupTimeout);
            clearTimeout(stateTimeout);
        };
    }, [state]);

    const handleClose = () => {
        setPopup(false);
        setTimeout(() => {
            setState(false);
        }, 400);
    };

    return (
        <div className={`d-flex justify-content-center flex-column position-fixed outer-notif-container ${popup ? 'fade-in-top' : 'fade-out-left'} p-0 border shadow rounded-2 overflow-hidden z-3 p-4`}>
            <i onClick={handleClose} className="outer-notif-close-btn bi bi-x position-absolute top-0 end-0 mt-1 me-2 icon-bold"></i>
            <div className="fw-bold f-size-14">{title}</div>
            <div className="f-size-14">{content}</div>
        </div>
    );
};

export default OuterNotificationToast;
