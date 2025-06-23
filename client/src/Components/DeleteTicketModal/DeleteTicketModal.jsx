import axios from "axios";
import { useGlobalContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/api";

const DeleteTicketModal = () => {
    const navigate = useNavigate();
    const { setDeleteTicketModal, selectedTicket } = useGlobalContext();

    const handleDeleteTicket = async () => {
        try {
            await axios.delete(`API_BASE/api/tickets/${selectedTicket.ticketId}`);
            setDeleteTicketModal(false);
            navigate('/tickets');
        } catch (err) {
            console.error(err);
        }
    };

    const closeDeleteTicketModal = () => {
        setDeleteTicketModal(false);
    };

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 z-3"
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-4 shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <div className="text-center">
                    <i className="bi bi-exclamation-triangle-fill text-danger fs-1 mb-3"></i>
                    <h5 className="fw-bold mb-2 text-danger">Confirm Deletion</h5>
                    <p className="text-secondary">
                        Are you sure you want to permanently delete this ticket?
                    </p>
                </div>
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={closeDeleteTicketModal} className="btn btn-outline-secondary w-100 me-2">
                        Cancel
                    </button>
                    <button onClick={handleDeleteTicket} className="btn btn-danger w-100 ms-2">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteTicketModal;
