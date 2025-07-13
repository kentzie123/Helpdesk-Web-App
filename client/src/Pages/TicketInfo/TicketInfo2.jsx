import { Link, useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useGlobalContext } from '../../Context/Context';
import api from '../../api/api';

import './TicketInfo2.css';


const TicketInfo2 = () => {
    const [ticketRating, setTicketRating] = useState(null);
    const [comment, setComment] = useState('');
    const { 
        selectedTicket, 
        fetchTicketInfo, 
        userInfo, 
        setChangeTicketStatusResponse, 
        setLoading,
        setShowRateTicketModal,
        timeAgo2,
        setShowDeleteTicketCommentModal,
        setSelectedTicketComment,
        ticketComments, setTicketComments
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
        setTicketRating(null);
        const fetchTicketComments = async () => {
            try {
                const ticketRateingResponse = await api.get(`/ticket-ratings/${selectedTicket.ticketId}`);
                console.log(ticketRateingResponse);
                setTicketRating(ticketRateingResponse.data);
                const ticketComments = await api.get(`/ticket-comments/${selectedTicket.ticketId}`);
                setTicketComments(ticketComments.data);
            }catch (err) {
                console.error('Error fetching ticket comments:', err);
            }
        }

        if(selectedTicket){
            fetchTicketComments();
        }
        
    }, [selectedTicket]);


    const handleAddTicketComment = async (e) => {
        e.preventDefault();
        try{
            setLoading(true);

            const newComment  = {
                ticketId: selectedTicket.ticketId,
                userId: userInfo.userID, 
                fullname: userInfo.fullname, 
                comment
            } 
            await api.post(`/ticket-comments`, newComment);

            setComment(prev => [...prev, newComment]); 
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error('Error creating ticket comment:', err);
        }
    }

    const handleChangeStatus = async (status) => {
        try{
            setLoading(true)
                await api.patch(`/tickets/${selectedTicket.ticketId}`, {
                status,
                modifiedBy: userInfo.fullname
            });
            
            setChangeTicketStatusResponse('Ticket status changed successfully');
            fetchTicketInfo(selectedTicket.ticketId);
            setLoading(false)
        } catch (error) {
        setChangeTicketStatusResponse("Error starting work on ticket");
        console.error('Error starting work on ticket:', error);
        setLoading(false)
        }
    };
    
    function getInitials(fullname) {
        if (!fullname) return '';

        const parts = fullname.trim().split(' ');
        const firstInitial = parts[0]?.charAt(0).toUpperCase();

        if (parts.length === 1) return firstInitial;
        
        const lastInitial = parts[parts.length - 1]?.charAt(0).toUpperCase();
        return `${firstInitial}${lastInitial}`;
    }


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
                        <button type='button' className='btn btn-light fw-medium'><i className="bi bi-arrow-left me-2"></i> Back to Tickets</button>
                    </Link>

                    <div>
                        <div className='border rounded shadow-sm p-3'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <h5 className='fw-medium'>{selectedTicket.subject}</h5>
                                    <div className='text-muted f-size-14'>#{selectedTicket.ticketId}</div>
                                </div>
                                <div className='d-flex gap-2'>
                                    <div className={`${statusColors[selectedTicket.status]} rounded-pill fw-medium f-size-12 px-2 py-1`} style={{height:'25px'}}>{selectedTicket.status.toUpperCase()}</div>
                                    
                                    <div className={`${priorityColors[selectedTicket.priority]} rounded-pill fw-medium f-size-12 px-2 py-1`} style={{height:'25px'}}>{selectedTicket.priority.toUpperCase()}</div>                                   
                                </div>
                            </div>

                            <div className='mt-4'>
                                <div className='fw-medium'>Description</div>
                                <div className='text-muted f-size-14'>{selectedTicket.description}</div>
                            </div>

                            <hr />

                            <div className='my-4'>
                                <div className='fw-medium'>Update Status:</div>
                                <div className='d-flex flex-wrap gap-2 mt-3'>
                                    {
                                        ((selectedTicket.status !== 'In Progress' && selectedTicket.assignedTo === userInfo.fullname) || selectedTicket.status !== 'In Progress' && userInfo.role === 1) && 
                                        <button onClick={()=> handleChangeStatus('In Progress')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i className="bi bi-play icon-bold me-1" style={{fontSize:'20px'}}></i>Start Progress</button>
                                    }
                                    {
                                        selectedTicket.status === 'In Progress' && 
                                        <button onClick={()=> handleChangeStatus('Resolved')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i className="bi bi-check-circle icon-bold me-2"></i>Mark Resolved</button>
                                    }
                                    {
                                        selectedTicket.status === 'Resolved' && 
                                        <button onClick={()=> handleChangeStatus('Closed')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i className="bi bi-x-circle icon-bold me-2"></i>Close Ticket</button>
                                    }
                                    {
                                        selectedTicket.status === 'Closed' && 
                                        <button onClick={()=> handleChangeStatus('Open')} type='button' className='update-status-btn btn btn-light border fw-medium d-flex align-items-center py-1 px-2'><i className="bi bi-arrow-counterclockwise icon-bold me-2"></i>Reopen</button>
                                    }
                                </div>
                            </div>

                            <hr className='mt-4' />

                            <div className='row'>  
                                <div className='col-12 col-md-6'>
                                    <div className='mt-2'>
                                        <span><i className="bi bi-calendar4 icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Created:</span>
                                        <span className='text-muted f-size-14'>{timeAgo2(selectedTicket.createdDate)}</span>
                                    </div> 
                                    <div className='mt-2'>
                                        <span><i className="bi bi-person icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Assignee:</span>
                                        <span className='text-muted f-size-14'>{selectedTicket.assignedTo}</span>
                                    </div> 
                                    <div className='mt-2'>
                                        <span><i className="bi bi-tag icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Category:</span>
                                        <span className='text-muted f-size-14'>{selectedTicket.category}</span>
                                    </div> 
                                </div>
                              
                                <div className='col-12 col-md-6'>
                                    <div className='mt-2'>
                                        <span><i className="bi bi-exclamation-circle icon-bold me-2 text-secondary" style={{fontSize:'15px'}}></i></span>
                                        <span className='fw-medium f-size-14 me-1'>Last Updated:</span>
                                        <span className='text-muted f-size-14'>{timeAgo2(selectedTicket.createdDate)}</span>
                                    </div> 
                                </div>
                            </div>

                            {(selectedTicket.status === 'Resolved' && !ticketRating) && 
                                <div className='text-center mt-4'>
                                    <button onClick={()=> setShowRateTicketModal(true)} type='button' className='btn btn-primary fw-medium'><i className='bi bi-star me-2'></i>Rate This Resolution</button>
                                </div>
                            }

                            {ticketRating &&
                                <div className='bg-success-subtle p-4 rounded-3 mt-4'>
                                    <h5 className='fw-medium'>
                                        <i className='bi bi-star text-warning icon-bold me-2'></i><span>Customer Rating</span>
                                    </h5>
                                    <div>
                                        <div className='d-flex align-items-center gap-1'>
                                            {[...Array(5)].map((_,index)=> (
                                                <i key={index} className={`bi ${index < (ticketRating.rating || 0) ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`} style={{fontSize: '20px'}}></i>
                                            ))}
                                            <span className='ms-2 text-muted'>{ticketRating.rating}/5 stars</span>
                                        </div>
                                        <p className="fst-italic mt-2 mb-0 text-muted">"{ticketRating.comment}"</p>
                                    </div>
                                </div>
                            }
                            
                        </div>
                    </div>

                    <div className='border rounded shadow-sm p-3'>
                        <h5 className='fw-medium'>
                            <span>
                                <i className='bi bi-chat-left icon-bold me-2' style={{fontSize:'15px'}}></i>
                            </span>
                            <span>Comments ({ticketComments.length})</span>
                        </h5>

                        <div className='mt-3' style={{maxHeight: '300px', overflowY: 'auto'}}>
                            {
                                ticketComments.map((comment, index)=>(
                                    <div key={index} className='border rounded p-3 mb-3'>
                                        <div className='d-flex justify-content-between'>
                                            <div className='d-flex align-items-center gap-2'>
                                                <div className='d-flex align-items-center justify-content-center rounded-circle p-2 bg-secondary-subtle' style={{height: '35px', width:'35px'}}>{getInitials(comment.fullname)}</div>
                                                <div className='f-size-14'>
                                                    <div className='fw-medium'>{comment.fullname}</div>
                                                    <div className="text-muted">{timeAgo2(comment.createdAt)}</div>
                                                </div>
                                            </div>
                                            <div>
                                                {userInfo.userID === comment.userId && 
                                                    <button onClick={()=> {setShowDeleteTicketCommentModal(true); setSelectedTicketComment(comment)}} className='btn btn-light'>
                                                        <i className='bi bi-trash icon-bold text-danger'></i>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                        <div className='comment f-size-14 text-muted mt-3'>
                                            {comment.comment}
                                        </div>
                                    </div>
                                ))
                            }
                            
                            
                        </div>

                        <hr />

                        <form onSubmit={handleAddTicketComment}>
                            <div className='fw-medium'>Add Comment</div>
                            <div className='mt-2'>
                                <textarea value={comment} onChange={(e)=> setComment(e.target.value)} className='form-control f-size-14' rows='4' placeholder='Add a comment...'/>
                            </div>

                            <div className='mt-3 d-flex justify-content-end'>
                                <button type='submit' className='btn btn-primary fw-medium'>Add Comment</button>
                            </div>
                        </form>

                    </div>

                </div>
            }
        </div>
    )
}

export default TicketInfo2