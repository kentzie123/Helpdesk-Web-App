import './Tickets.css';
import { useState } from 'react';
import TicketCard from '../../Components/TicketCard/TicketCard';
import { useGlobalContext } from '../../Context/Context';
import CreateTicketModal from '../../Components/CreateTicketModal/CreateTicketModal';

const Tickets = () => {
  const { tickets, selectedTickets, setSelectedTickets, setShowDeleteSelectedTicketsModal } = useGlobalContext();

  const handleToggleTicketSelection = (ticketId) => {
    setSelectedTickets(prev => 
      prev.includes(ticketId) ? prev.filter((id) => id !== ticketId)
      : [...prev, ticketId]
    )
  }
  
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    sort: 'newest'
  });

  const filteredTickets = tickets
    .filter(ticket => 
      ticket.ticketId.toLowerCase().includes(filters.search.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter(ticket => 
      filters.status ? ticket.status === filters.status : true
    )
    .sort((a, b) => {
      if (filters.sort === 'newest') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      } else {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
    });

  return (
    <div className="main-ticket-container p-2">
      <h4 className='mb-3'>Tickets</h4>
      <div className="border rounded shadow-sm container-fluid mb-3">
        <div className='row py-4 px-3'>
          <div className='col-md-3'>
            <select 
              className="form-select" 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className='col-md-3'>
            <select 
              className="form-select"
              value={filters.sort}
              onChange={(e) => setFilters({...filters, sort: e.target.value})}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
          <div className='col-md-3'>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by ID or Subject"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
          </div>
          <div className='col-md-3'>
            <button className='d-flex align-items-center gap-1 btn btn-primary w-100 h-100 fw-medium' type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              <i className="bi bi-plus-lg icon-bold"></i>
              <span>Create ticket</span>
            </button>
            <CreateTicketModal/>
          </div>
        </div>
      </div>
      <div className='border rounded shadow-sm py-4 px-3'>
        <div className='container-fluid'>
          <div className='d-flex justify-content-between mb-3'>
            <h4>Tickets ({tickets.length})</h4>
            { selectedTickets.length > 0 &&
              <button onClick={()=> {setShowDeleteSelectedTicketsModal(true); console.log('Selected Ticket:', selectedTickets)}} className='btn btn-danger fw-medium'><i className='bi bi-trash me-2 icon-bold'></i><span>Delete Selected ({selectedTickets.length})</span></button>
            }
          </div>
          <div className='tickets-container border border-secondary rounded m-1 row p-2 g-3 overflow-y-scroll'>
            {filteredTickets.map((ticket) => (
              <div className='ticket-container p-1 col-lg-3 col-md-6 col-12' key={ticket.ticketId} onClick={()=> {handleToggleTicketSelection(ticket._id);}}>
                <TicketCard isSelected={selectedTickets.includes(ticket._id)} ticket={ticket} />
              </div>    
            ))}
            
            {filteredTickets.length === 0 && (
              <div className="col-12 text-center py-5">
                <h5>No tickets found</h5>
                <p>Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;