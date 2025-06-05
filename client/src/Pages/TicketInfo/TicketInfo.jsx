import './TicketInfo.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useGlobalContext } from '../../Context/Context';
import EditTicketModal from '../../Components/EditTicketModal/EditTicketModal';


const TicketInfo = () => {
  const { setDeleteTicketModal,selectedTicket, setSelectedTicket } = useGlobalContext();
  const { id } = useParams();
  
  const openDeleteTicketModal = ()=>{
    setDeleteTicketModal(true);
  }

  useEffect(()=>{

    const handleSelectedTicket = async () => {
      try{
        const getSelectedTicket = await axios.get(`http://localhost:3000/api/tickets/${id}`);
        setSelectedTicket(getSelectedTicket.data); 
      } catch(err){
        console.log(err);  
      }     
    } 

     
    handleSelectedTicket();
    
  },[id])
  

  return (
    <div className='border rounded shadow-sm m-2 p-2'>
        <Link to='/ticket'>
          <button type='button' className='btn btn-secondary'><i className="bi bi-arrow-left"></i> Back</button>
        </Link>

        <div className='border border-secondary rounded mt-2'>
          <div className='ticket-info-header d-flex align-items-center gap-2 p-3'>
            <div className='ticket-overview-title'>Overview</div>
            <div className='bg-danger text-light px-2'>OVERDUE</div>
          </div>


          <div className='container-fluid p-2'>
            <div className='row p-2'>
              <div className='col-12 col-lg-4'>
                <div className='row gap-1'>
                  <div className='col rounded border p-2'>
                    <div className='text-center p-1 opacity-75'>Category</div>
                    <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.category}</div>
                  </div>
                  <div className='col rounded border p-2'>
                    <div className='text-center p-1 opacity-75'>Status</div>
                    <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.status}</div>
                  </div>
                  <div className='col rounded border p-2'>
                    <div className='text-center p-1 opacity-75'>Priority</div>
                    <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.priority}</div>
                  </div>
                  <div className='col rounded border p-2'>
                    <div className='text-center p-1 opacity-75'>Ticket ID</div>
                    <div className='ticket-info-info text-center fs-10 fw-bold p-1'>{selectedTicket.ticketId}</div>
                  </div>
                </div>

                <div className='my-4'>
                  <div className='text-success fw-bold fs-4'>{selectedTicket.subject}</div>
                  <div>{selectedTicket.description}</div>
                </div>
              </div>
              <div className='col-12 col-lg-4'>
                <div className='row'>
                  <div className='col-6'>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Created by</div>
                      <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.ownerName}</div>
                    </div>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Assigned to</div>
                      <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.assignedTo}</div>
                    </div>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Modified by</div>
                      <div className='text-center fs-10 fw-bold p-1'>Juan Cardo</div>
                    </div>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Target Resolved Date</div>
                      <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.targetResolveDate}</div>
                    </div>
                  </div>

                  <div className='col-6'>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Created on</div>
                      <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.createdDate}</div>
                    </div>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Last Modified on</div>
                      <div className='text-center fs-10 fw-bold p-1'>Juan Cardo</div>
                    </div>
                    <div className='p-2'>
                      <div className='text-center p-1 opacity-75'>Resolved Date</div>
                      <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.resolvedDate? selectedTicket.resolvedDate : 'N/A'}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-12 col-lg-4'></div>
            </div>
          </div>
        </div>
        <div className='mt-2'>
          <button className="btn btn-primary me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
            <i className="bi bi-pencil-square"></i> Edit
          </button>
          <EditTicketModal/>
          <button onClick={openDeleteTicketModal} type='button' className='btn btn-danger'><i className="bi bi-trash-fill"></i> Delete</button>
        </div>
    </div>
  )
}

export default TicketInfo