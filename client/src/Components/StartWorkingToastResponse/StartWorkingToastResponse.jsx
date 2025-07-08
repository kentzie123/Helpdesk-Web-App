import { useEffect } from "react";
import { useGlobalContext } from "../../Context/Context";

const StartWorkingToastResponse = () => {
    const { changeTicketStatusResponse, setChangeTicketStatusResponse } = useGlobalContext();

    useEffect(() => {
        if (changeTicketStatusResponse) {
            const timer = setTimeout(() => {
                setChangeTicketStatusResponse("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [changeTicketStatusResponse]);

    return (
        <div className={`toast position-fixed top-0 start-0 ms-3 mt-3 p-1 z-3 ${changeTicketStatusResponse === 'Ticket is now in progress' ? 'text-bg-success' : 'text-bg-danger'} border-0 fade ${changeTicketStatusResponse ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {changeTicketStatusResponse}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    );
}

export default StartWorkingToastResponse