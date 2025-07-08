import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useGlobalContext } from '../../Context/Context';
import axios from 'axios';

import EditTicketModal from '../../Components/EditTicketModal/EditTicketModal';

import './TicketInfo2.css';


const TicketInfo2 = () => {
    const { 
        setDeleteTicketModal, 
        selectedTicket, 
        fetchTicketInfo, 
        userInfo, 
        setChangeTicketStatusResponse, 
        setLoading,
        setShowRateTicketModal
    } = useGlobalContext();
    const { id } = useParams();
    
    const statusColors = {
        'Open': 'status-open',
        'New': 'status-new',
        'In Progress': 'status-in-progress',
        'For Approval': 'status-for-approval',
        'Resolved': 'status-resolved',
        'Closed': 'status-closed'
    };

    const priorityColors = {
        'Low': 'status-open',
        'Medium': 'status-new',
        'High': 'status-in-progress',
        'Urgent': 'text-bg-danger'
    }

    useEffect(() => {
        fetchTicketInfo(id);
    }, [id]);

    useEffect(() => {
        if (!selectedTicket) {
            console.error('Selected ticket is not available');
        }
        console.log('Selected ticket:', selectedTicket);
        
    }, [selectedTicket]);

    const handleChangeStatus = async (status) => {
        try{
            setLoading(true)
                await axios.patch(`http://localhost:3000/api/tickets/${selectedTicket.ticketId}`, {
                status,
                modifiedBy: userInfo.fullname
            });
            
            setChangeTicketStatusResponse('Ticket status changed successfully');
            console.log('working started');
            fetchTicketInfo(selectedTicket.ticketId);
            setLoading(false)
        } catch (error) {
        setChangeTicketStatusResponse("Error starting work on ticket");
        console.error('Error starting work on ticket:', error);
        setLoading(false)
        }
    };

    return (
        <div className='m-1'>
            {!selectedTicket ? 
                <div className='text-center mt-5'>
                    <h5 className='fw-medium'>Error loading ticket</h5>
                    <div className='text-muted f-size-14 mb-3'>Unable to load ticket details. Please try again.</div>
                    <Link to={'/tickets'}><button type='button' className='btn btn-primary'>Back to Tickets</button></Link>
                </div>
                :
                <div className='d-flex flex-column gap-3'>
                    <Link to={'/tickets'}>
                        <button type='button' className='btn btn-light fw-medium'><i class="bi bi-arrow-left me-2"></i> Back to Tickets</button>
                    </Link>

                    <div>
                        <div className='border rounded shadow-sm p-3'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h5 className='fw-medium'>Mobile app crashes on startup</h5>
                                    <div className='text-muted f-size-14'>#TICK-2025-9943</div>
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className={`${statusColors[selectedTicket.status]} rounded-pill fw-medium f-size-12 px-2 py-1`} style={{height:'25px'}}>{selectedTicket.status.toUpperCase()}</div>
                                    
                                    <div className={`${priorityColors[selectedTicket.priority]} rounded-pill fw-medium f-size-12 px-2 py-1`} style={{height:'25px'}}>{selectedTicket.priority.toUpperCase()}</div>                                   
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className='fw-medium'>Description</div>
                                <div className='text-muted f-size-14'>The mobile app crashes immediately after opening on iOS 17. This started after the latest app update.</div>
                            </div>

                            <hr />

                            <div className='my-4'>
                                <div className='fw-medium'>Update Status:</div>
                                <div className='d-flex flex-wrap gap-2 mt-3'>
                                    {
                                        ((selectedTicket.status !== 'In Progress' && selectedTicket.assignedTo === userInfo.fullname) || selectedTicket.status !== 'In Progress' && userInfo.role === 1) && 
                                        <button onClick={()=> handleChangeStatus('In Progress')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i class="bi bi-play icon-bold me-1" style={{fontSize:'20px'}}></i>Start Progress</button>
                                    }
                                    {
                                        selectedTicket.status === 'In Progress' && 
                                        <button onClick={()=> handleChangeStatus('Resolved')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i class="bi bi-check-circle icon-bold me-2"></i>Mark Resolved</button>
                                    }
                                    {
                                        selectedTicket.status === 'Resolved' && 
                                        <button onClick={()=> handleChangeStatus('Closed')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i class="bi bi-x-circle icon-bold me-2"></i>Close Ticket</button>
                                    }
                                    {
                                        selectedTicket.status === 'Closed' && 
                                        <button onClick={()=> handleChangeStatus('Open')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i class="bi bi-arrow-counterclockwise icon-bold me-2"></i>Reopen</button>
                                    }
                                </div>
                            </div>

                            <hr className='mt-4' />

                            <div className='row'>  
                                <div className='col-12 col-md-6'>
                                    <div className='mt-2'>
                                        <span><i class="bi bi-calendar4 icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Created:</span>
                                        <span className='text-muted f-size-14'>4 days ago</span>
                                    </div> 
                                    <div className='mt-2'>
                                        <span><i class="bi bi-person icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Assignee:</span>
                                        <span className='text-muted f-size-14'>Kent Adriane Goc-ong</span>
                                    </div> 
                                    <div className='mt-2'>
                                        <span><i class="bi bi-tag icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Category:</span>
                                        <span className='text-muted f-size-14'>Mobile</span>
                                    </div> 
                                </div>
                              
                                <div className='col-12 col-md-6'>
                                    <div className='mt-2'>
                                        <span><i class="bi bi-exclamation-circle icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Last Updated:</span>
                                        <span className='text-muted f-size-14'>17 minutes ago</span>
                                    </div> 
                                </div>
                            </div>

                            <div className='text-center mt-4'>
                                <button onClick={()=> setShowRateTicketModal(true)} type='button' className='btn btn-primary fw-medium'><i className='bi bi-star me-2'></i>Rate This Resolution</button>
                            </div>
                        </div>
                    </div>

                    <div className='border rounded shadow-sm p-3'>
                        <h5 className='fw-medium'>
                            <span>
                                <i className='bi bi-chat-left icon-bold me-2' style={{fontSize:'15px'}}></i>
                            </span>
                            <span>Comments (1)</span>
                        </h5>

                        <div className='mt-3' style={{maxHeight: '300px', overflowY: 'auto'}}>
                            <div className='border rounded p-3 mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle p-2 bg-secondary-subtle' style={{height: '35px', width:'35px'}}>KG</div>
                                        <div className='f-size-14'>
                                            <div className='fw-medium'>Kent Adriane Goc-ong</div>
                                            <div className="text-muted">6 minutes ago</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn btn-light'>
                                            <i className='bi bi-trash icon-bold text-danger'></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='comment f-size-14 text-muted mt-3'>
                                    Sample comment....
                                </div>
                            </div>
                            <div className='border rounded p-3 mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle p-2 bg-secondary-subtle' style={{height: '35px', width:'35px'}}>KG</div>
                                        <div className='f-size-14'>
                                            <div className='fw-medium'>Kent Adriane Goc-ong</div>
                                            <div className="text-muted">6 minutes ago</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn btn-light'>
                                            <i className='bi bi-trash icon-bold text-danger'></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='comment f-size-14 text-muted mt-3'>
                                    Sample comment....
                                </div>
                            </div>
                            <div className='border rounded p-3 mb-3'>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex align-items-center gap-2'>
                                        <div className='d-flex align-items-center justify-content-center rounded-circle p-2 bg-secondary-subtle' style={{height: '35px', width:'35px'}}>KG</div>
                                        <div className='f-size-14'>
                                            <div className='fw-medium'>Kent Adriane Goc-ong</div>
                                            <div className="text-muted">6 minutes ago</div>
                                        </div>
                                    </div>
                                    <div>
                                        <button className='btn btn-light'>
                                            <i className='bi bi-trash icon-bold text-danger'></i>
                                        </button>
                                    </div>
                                </div>
                                <div className='comment f-size-14 text-muted mt-3'>
                                    Sample comment....
                                </div>
                            </div>
                        </div>

                        <hr />

                        <div>
                            <div className='fw-medium'>Add Comment</div>
                            <div className='mt-2'>
                                <textarea className='form-control f-size-14' rows='4' placeholder='Add a comment...'/>
                            </div>

                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='button' className='btn btn-primary fw-medium'>Add Comment</button>
                            </div>
                        </div>

                    </div>

                </div>
            }
        </div>
    )
}

export default TicketInfo2