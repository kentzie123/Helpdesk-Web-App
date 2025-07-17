import defaultProfilePic from '../../assets/imgs/default.jpg';
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from '../../Context/Context';
import './TicketCard.css';

const TicketCard = ({ ticket, isSelected }) => {
    const { ticketId, ownerName, subject, assignedTo, status, createdDate, ownerPic } = ticket;
    const { timeAgo } = useGlobalContext();

    const statusColors = {
        'Open': 'status-open',
        'New': 'status-new',
        'In Progress': 'status-in-progress',
        'For Approval': 'status-for-approval',
        'Resolved': 'status-resolved',
        'Closed': 'status-closed'
    };




    return (
        <div className={`ticket shadow-sm p-1 rounded border ${isSelected ? 'border-primary' : ''}`}>
            <div className='p-1'>
                {/* Header with status and ticket ID */}
                <div className='d-flex justify-content-between border rounded p-1'>
                    <div className={`ticket-status border rounded px-2 py-1 ${statusColors[status] || 'bg-light'}`}>
                        {status}
                    </div>
                    <div className='ticket-id py-1 d-flex align-items-center'>
                        {ticketId}
                    </div>
                </div>
                
                {/* Main content */}
                <div className='d-flex justify-content-between py-3 px-1'>
                    <div className='d-flex align-items-center'>
                        <img 
                            className='ticket-owner-pic rounded-circle me-2' 
                            src={ownerPic ? ownerPic : defaultProfilePic} 
                            alt={`${ownerName}'s profile`} 
                            width="40" 
                            height="40"
                        />
                        <div>
                            <div className='fw-bold'>{ownerName}</div>
                            <div className='text-muted'>{subject}</div>
                        </div>
                    </div>
                    
                    <div className='text-muted small text-nowrap d-flex align-items-center'>
                        {timeAgo(createdDate)}
                    </div>
                </div>
                
                {/* Footer with assignee and action */}
                <div className='ticket-lower-info d-flex justify-content-between align-items-center px-1'>
                    <div className='d-flex align-items-center gap-1 small'>
                        <i className="bi bi-person"></i>
                        <span>{assignedTo? assignedTo : "Unassigned"}</span>       
                    </div>

                    <NavLink to={`/ticket/${ticketId}`} className='text-decoration-none'>
                        <button 
                        type='button' 
                        className='ticket-more-info btn btn-link p-0 d-flex align-items-center gap-1'
                        aria-label={`View details for ticket ${ticketId}`}
                        >
                            More <i className="bi bi-arrow-right-short"></i>
                        </button>
                    </NavLink>
                    
                </div>
            </div>
        </div>
    );
};

export default TicketCard;
