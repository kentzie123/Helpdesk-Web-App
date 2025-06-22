import './Tickets.css';
import { useState } from 'react';
import TicketCard from '../../Components/TicketCard/TicketCard';
import { useGlobalContext } from '../../Context/Context';
import CreateTicketModal from '../../Components/CreateTicketModal/CreateTicketModal';

const Tickets = () => {
  const { tickets } = useGlobalContext();
  
  
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
      <div className='border rounded-2 p-2'>
        <div className='row mb-3 g-2'>
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
            <button className='d-flex gap-1 btn btn-success w-100' type="button" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">
              <i className="bi bi-plus-lg"></i>
              <span>Create ticket</span>
            </button>
          </div>

          <CreateTicketModal/>
        </div>

        <div className='tickets-container border border-secondary rounded m-1 row p-2 g-3 overflow-y-scroll'>
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.ticketId} ticket={ticket} />
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
  );
};

export default Tickets;