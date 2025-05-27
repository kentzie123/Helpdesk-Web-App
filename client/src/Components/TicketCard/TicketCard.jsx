import profile1 from '../../assets/imgs/profile1.jpg';
import { NavLink } from 'react-router-dom';

const TicketCard = ({ ticket }) => {
    const { ticketId, ownerName, subject, assignedTo, status, createdDate } = ticket;

    const statusColors = {
    'Open': 'bg-secondary text-white',         // Neutral, awaiting action
    'New': 'bg-info text-dark',                // Informational, recently created
    'In Progress': 'bg-warning text-dark',     // Action ongoing, needs attention
    'For Approval': 'bg-primary text-white',   // Important, pending higher action
    'Resolved': 'bg-success text-white',       // Success, issue addressed
    'Closed': 'bg-dark text-white'             // Final, no further action needed
};


    const timeAgo = (dateString) => {
        try {
            const [day, month, year] = dateString.split('-');
            const date = new Date(`${year}-${month}-${day}T00:00:00`);
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);

            if (isNaN(seconds)) return dateString;

            if (seconds < 60) return `${seconds}s ago`;
            const minutes = Math.floor(seconds / 60);
            if (minutes < 60) return `${minutes}m ago`;
            const hours = Math.floor(minutes / 60);
            if (hours < 24) return `${hours}h ago`;
            const days = Math.floor(hours / 24);
            return `${days}d ago`;
        } catch {
            return dateString;
        }
    };

    return (
        <div className='ticket-container p-1 col-lg-3 col-md-6 col-12'>
            <div className='ticket shadow-sm p-1 border rounded'>
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
                                src={profile1} 
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
                            <span>{assignedTo}</span>       
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
        </div>
    );
};

export default TicketCard;
