import axios from "axios";
import { useGlobalContext } from "../../Context/Context"
import { useNavigate } from "react-router-dom";

const DeleteTicketModal = () => {
    const navigate = useNavigate();

    const { setDeleteTicketModal, selectedTicket, setTickets } = useGlobalContext();

    const handleDeleteTicket = async ()=>{
        try{
            await axios.delete (`http://localhost:3000/api/tickets/${selectedTicket.ticketId}`);
            await fetchTickets();
            setDeleteTicketModal(false);
            navigate('/ticket');
        }catch(err){
            console.log(err);
        }
    }

    const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets");
      setTickets(res.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

    const closeDeleteTicketModal= ()=>{
        setDeleteTicketModal(false);
    }
    return (
        <div className="position-absolute top-50 start-50 translate-middle z-3 bg-body shadow rounded-3 overflow-hidden">
            <div className='p-2 bg-danger text-light'>
                <div>Delete</div>
            </div>
            <div className="p-2">   
                <p>Are you sure you want to delete this ticket?</p>
                <div className='d-flex gap-3 justify-content-center'>
                    <button onClick={handleDeleteTicket} type='button' className='btn btn-danger'>Yes</button>
                    <button onClick={closeDeleteTicketModal} type='button' className='btn btn-secondary'>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteTicketModal