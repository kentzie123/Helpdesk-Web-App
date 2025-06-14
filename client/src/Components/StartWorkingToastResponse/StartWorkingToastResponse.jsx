import { useEffect } from "react";
import { useGlobalContext } from "../../Context/Context";

const StartWorkingToastResponse = () => {
    const { startWorkingResponse, setStartWorkingResponse } = useGlobalContext();

    useEffect(() => {
        if (startWorkingResponse) {
            const timer = setTimeout(() => {
                setStartWorkingResponse("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [startWorkingResponse]);

    return (
        <div className={`toast position-fixed top-0 start-0 ms-3 mt-3 p-1 z-3 ${startWorkingResponse === 'Ticket is now in progress' ? 'text-bg-success' : 'text-bg-danger'} border-0 fade ${startWorkingResponse ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
            <div className="d-flex">
                <div className="toast-body">
                    {startWorkingResponse}
                </div>
                <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    );
}

export default StartWorkingToastResponse