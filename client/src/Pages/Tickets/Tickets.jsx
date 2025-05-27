import './Tickets.css';
import { useState } from 'react';
import TicketCard from '../../Components/TicketCard/TicketCard';
import { useGlobalContext } from '../../Context/Context';

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

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="staticBackdrop" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasRightLabel">Create ticket</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="d-flex flex-column justify-content-between offcanvas-body">
              <div> 
                <div className='mb-3'>
                  <div className='mb-1'>Subject</div>
                  <input type="text" class="form-control" aria-label="Subject" aria-describedby="basic-addon1"></input>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlTextarea1" className="form-label">Example textarea</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div className='mb-3'>
                  <div className='mb-1'>Category</div>
                    <select class="form-select form-select" aria-label="Category">
                      <option selected hidden>Select a category</option>
                      <option value="technical">Technical Issue</option>
                      <option value="account">Account Access</option>
                      <option value="hardware">Hardware Request</option>
                      <option value="software">Software Installation</option>
                      <option value="network">Network Problem</option>
                      <option value="maintenance">Maintenance Request</option>
                      <option value="other">Other</option>
                    </select>
                </div>
                <div className="mb-3">
                  <div className='mb-1'>Priority</div>
                  <select class="form-select form-select" aria-label="Priority">
                    <option selected hidden>Select priority level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div className='mb-3'>
                  <div className='mb-1'>Assign to</div>
                  <select class="form-select form-select" aria-label="Priority">
                    {
                      
                    }
                  </select>    
                </div>
              </div>
              <div>
                <button type='button' className='btn btn-success w-100'>Create</button>
              </div>
            </div>
          </div>
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