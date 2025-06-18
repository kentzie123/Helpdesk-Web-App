import './TicketInfo.css';

import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGlobalContext } from '../../Context/Context';
import axios from 'axios';

import EditTicketModal from '../../Components/EditTicketModal/EditTicketModal';



const TicketInfo = () => {
  const { setDeleteTicketModal, selectedTicket, fetchTicketInfo, userInfo, setStartWorkingResponse } = useGlobalContext();
  const { id } = useParams();


  const handleStartWorking = async () => {
    try{
      const res = await axios.patch(`http://localhost:3000/api/tickets/${selectedTicket.ticketId}`, {
        status: 'In Progress',
        modifiedBy: userInfo.fullname
      });
      setStartWorkingResponse("Ticket is now in progress");
      console.log('working started');
      
      fetchTicketInfo(selectedTicket.ticketId);
    } catch (error) {
      setStartWorkingResponse("Error starting work on ticket");
      console.error('Error starting work on ticket:', error);
    }
  };


  const EditAndDeleteTicketButtons = () => {
    return (
      <div className='d-flex justify-content-between mt-2'>
        <div>
          <button
            className="btn btn-primary me-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#staticBackdrop"
            aria-controls="staticBackdrop"
          ><i className="bi bi-pencil-square"></i> Edit</button>
          
          <button onClick={openDeleteTicketModal} type='button' className='btn btn-danger'>
            <i className="bi bi-trash-fill"></i> Delete
          </button>
    
        </div>
        <div>
            <button className="btn btn-success" type="button" onClick={handleStartWorking}>
              <i className="bi bi-play-fill"></i> Start Working
            </button>
        </div>
      </div>
    )
  }


  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = () => {
    if (!selectedTicket?.targetResolveDate || selectedTicket.status === 'Closed') return false;
    const targetDate = new Date(selectedTicket.targetResolveDate);
    const now = new Date();
    return now > targetDate;
  };

  const openDeleteTicketModal = () => {
    setDeleteTicketModal(true);
  };

  useEffect(() => {
    fetchTicketInfo(id);
  }, [id]);

  return (
    <div className='border rounded shadow-sm m-2 p-2'>
      <Link to='/tickets'>
        <button type='button' className='btn btn-secondary'>
          <i className="bi bi-arrow-left"></i> Back
        </button>
      </Link>

      <div className='border border-secondary rounded mt-2'>
        <div className='ticket-info-header d-flex align-items-center gap-2 p-2 py-3'>
          <div className='h5 fw-bold m-0'>Overview</div>
          {isOverdue() && (
            <div className='bg-danger text-light px-2' title="Target resolve date has passed and this ticket is still open.">OVERDUE</div>
          )}
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
                    <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.modifiedBy}</div>
                  </div>
                  <div className='p-2'>
                    <div className='text-center p-1 opacity-75'>Target Resolved Date</div>
                    <div className='text-center fs-10 fw-bold p-1'>{formatDate(selectedTicket.targetResolveDate)}</div>
                  </div>
                </div>

                <div className='col-6'>
                  <div className='p-2'>
                    <div className='text-center p-1 opacity-75'>Created on</div>
                    <div className='text-center fs-10 fw-bold p-1'>{formatDate(selectedTicket.createdDate)}</div>
                  </div>
                  <div className='p-2'>
                    <div className='text-center p-1 opacity-75'>Last Modified on</div>
                    <div className='text-center fs-10 fw-bold p-1'>{selectedTicket.modifiedBy}</div>
                  </div>
                  <div className='p-2'>
                    <div className='text-center p-1 opacity-75'>Resolved Date</div>
                    <div className='text-center fs-10 fw-bold p-1'>
                      {selectedTicket.resolvedDate ? formatDate(selectedTicket.resolvedDate) : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-12 col-lg-4'></div>
          </div>
        </div>
      </div>
      {
        userInfo.role === 1 ? (
          <EditAndDeleteTicketButtons />
        ) : selectedTicket.status === 'New' || selectedTicket.status === 'Open' ? (
          userInfo.fullname === selectedTicket.assignedTo ? (
            <EditAndDeleteTicketButtons />
          ) : null
        ) : null
      }

      <EditTicketModal />

    </div>
  );
};

export default TicketInfo;
