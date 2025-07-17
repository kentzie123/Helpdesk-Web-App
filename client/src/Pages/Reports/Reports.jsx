import { useState, useRef, useEffect } from 'react';
import StatusDistributionCard from '../../Components/StatusDistributionCard/StatusDistributionCard';
import TeamOverviewCard from '../../Components/TeamOverviewCard/TeamOverviewCard';
import './Reports.css';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useGlobalContext } from '../../Context/Context';

const Reports = () => {
  const { users, tickets } = useGlobalContext();
  const [state, setState] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 7)), // Default: last 7 days
    endDate: new Date(),
    key: 'selection',
    color: '#3f51b5',
  });

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  // Calculate metrics based on filtered tickets
  const filteredTickets = tickets.filter(ticket => {
    const ticketDate = new Date(ticket.createdDate);
    return ticketDate >= state.startDate && ticketDate <= state.endDate;
  });

  // Calculate statistics
  const totalTickets = filteredTickets.length;
  const resolvedTickets = filteredTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
  const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;
  
  // Calculate average response time (in hours)
  const avgResponseTime = filteredTickets.length > 0 
    ? filteredTickets.reduce((sum, ticket) => {
        if (ticket.resolvedDate) {
          const created = new Date(ticket.createdDate);
          const resolved = new Date(ticket.resolvedDate);
          return sum + (resolved - created) / (1000 * 60 * 60); // Convert ms to hours
        }
        return sum;
      }, 0) / filteredTickets.length
    : 0;

  const highPriorityTickets = filteredTickets.filter(t => t.priority === 'High' || t.priority === 'Urgent').length;

  // Weekly activity data
  const getWeeklyActivity = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayTickets = tickets.filter(ticket => {
        const ticketDate = new Date(ticket.createdDate);
        return (
          ticketDate.getDate() === date.getDate() &&
          ticketDate.getMonth() === date.getMonth() &&
          ticketDate.getFullYear() === date.getFullYear()
        );
      });
      
      const dayResolved = dayTickets.filter(t => 
        t.status === 'Resolved' || t.status === 'Closed'
      ).length;
      
      days.push({
        date,
        ticketsCount: dayTickets.length,
        resolvedCount: dayResolved,
        resolutionRate: dayTickets.length > 0 
          ? Math.round((dayResolved / dayTickets.length) * 100) 
          : 0
      });
    }
    
    return days;
  };

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Export functions
  const exportToCSV = () => {
    // Implement CSV export logic
    console.log('Exporting to CSV', filteredTickets);
  };

  const exportToJSON = () => {
    // Implement JSON export logic
    console.log('Exporting to JSON', filteredTickets);
  };

  return (
    <div className="d-flex flex-column gap-1 p-2">
      <div className="d-flex justify-content-between mb-1">
        <h4>Reports & Analytics</h4>
        <div className="d-flex flex-wrap gap-2 align-items-start">
          <div className="position-relative" ref={pickerRef}>
            <button
              type="button"
              className="btn btn-light border f-size-14 fw-medium text-muted"
              onClick={() => setShowPicker(!showPicker)}
            >
              <i className="bi bi-calendar-event me-2"></i>
              {state?.startDate && state?.endDate
                ? `${state.startDate.toDateString()} - ${state.endDate.toDateString()}`
                : 'Select date range'}
            </button>

            {showPicker && (
              <div className="position-absolute bg-white border rounded shadow-sm mt-2 z-3" style={{ zIndex: 999 }}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) => setState({ ...item.selection, color: '#3f51b5' })}
                  moveRangeOnFirstSelection={false}
                  ranges={[state]}
                />
              </div>
            )}
          </div>

          <button 
            type="button" 
            className="btn btn-primary f-size-14 fw-medium"
            onClick={exportToCSV}
          >
            <i className="bi bi-download me-1"></i> Export CSV
          </button>
          <button 
            type="button" 
            className="btn btn-light border f-size-14 fw-medium"
            onClick={exportToJSON}
          >
            <i className="bi bi-download me-1"></i> Export JSON
          </button>
        </div>
      </div>

      {/* Reports card stats */}
      <div className='row'>
        <div className='p-2 col-12 col-md-6 col-lg-3'>
          <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
            <div className='bg-primary-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
              <i className="text-primary bi bi-bar-chart-line reports-card-icon"></i>
            </div>
            <div>
              <div className='text-muted fw-medium'>Total Tickets</div>
              <h4 className='fw-bold m-0'>{totalTickets}</h4>
              {/* TODO: Implement comparison with previous period */}
              <div className='f-size-12 text-success'>+0% from last week</div>
            </div>
          </div>
        </div>
        <div className='p-2 col-12 col-md-6 col-lg-3 '>
          <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
            <div className='bg-success-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
              <i className="text-success bi bi-check2-circle reports-card-icon"></i>
            </div>
            <div>
              <div className='text-muted fw-medium'>Resolution Rate</div>
              <h4 className='fw-bold m-0'>{resolutionRate}%</h4>
              <div className='f-size-12 text-success'>+0% from last week</div>
            </div>
          </div>
        </div>
        <div className='p-2 col-12 col-md-6 col-lg-3 '>
          <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
            <div className='bg-warning-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
              <i className="text-warning bi bi-clock reports-card-icon"></i>
            </div>
            <div>
              <div className='text-muted fw-medium'>Avg Response Time</div>
              <h4 className='fw-bold m-0'>{avgResponseTime.toFixed(1)} hours</h4>
              <div className='f-size-12 text-success'>+0.2h from last week</div>
            </div>
          </div>
        </div>
        <div className='p-2 col-12 col-md-6 col-lg-3 '>
          <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
            <div className='bg-danger-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
              <i className="text-danger bi bi-exclamation-triangle reports-card-icon"></i>
            </div>
            <div>
              <div className='text-muted fw-medium'>High Priority</div>
              <h4 className='fw-bold m-0'>{highPriorityTickets}</h4>
              <div className='f-size-12 text-danger'>+2 from yesterday</div>
            </div>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className="col-12 col-lg-6 p-2">
          <StatusDistributionCard tickets={filteredTickets} />
        </div>
        <div className="col-12 col-lg-6 p-2">
          <TeamOverviewCard tickets={tickets} users={users} />
        </div>
      </div>

      <div className='d-flex flex-column border rounded-3 shadow-sm gap-3 mt-2 p-3'>
        <h4>Weekly Activity</h4>
        <div className='d-flex flex-column gap-3'>
          {getWeeklyActivity().map((day, index) => (
            <div
              key={index}
              className='d-flex align-items-center justify-content-between rounded-3 border px-3 py-2'
            >
              <div>
                <div className='fw-medium'>
                  {day.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
                <div className='f-size-14 text-muted'>{day.ticketsCount} tickets created</div>
              </div>
              <div>
                <div className='text-success fw-medium'>{day.resolvedCount} resolved</div>
                <div className='f-size-14 text-muted'>{day.resolutionRate}% rate</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;