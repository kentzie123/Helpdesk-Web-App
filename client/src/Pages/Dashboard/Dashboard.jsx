import './Dashboard.css'

import { useMemo } from 'react';
import { useGlobalContext } from '../../Context/Context'

import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { tickets, notifications, formatNotificationDate } = useGlobalContext();

  const totalTickets = useMemo(()=>{
    return tickets.length
  },[tickets])

  const countByStatus = (status) => tickets.filter(t => t.status === status).length;
  const countByPriority = (priority) => tickets.filter(t => t.priority === priority).length;

  const resolvedTickets = useMemo(() => countByStatus('Resolved'), [tickets]);
  const pendingTickets = useMemo(() => countByStatus('In Progress'), [tickets]);
  const urgentTickets = useMemo(() => countByPriority('Urgent'), [tickets]);


  const recentTickets = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD

    return tickets.filter(ticket => {
      const ticketDate = new Date(ticket.createdDate).toISOString().split('T')[0];
      return ticketDate === today;
    });
  }, [tickets]);

  const recentActivity = useMemo(() => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD

    return notifications.filter(notification => {
      const notificationDate = new Date(notification.createdAt).toISOString().split('T')[0];
      return notificationDate === today;
    });
  }, [notifications])


  const priorityColors = {
  'Urgent': 'bg-danger-subtle text-danger',
  'High': 'bg-warning-subtle text-warning',
  'Medium': 'bg-info-subtle text-info',
  'Low': 'bg-secondary-subtle text-secondary'
};




  
  const statusCards = useMemo(()=> (
    [
      {
        title: 'Total Tickets',
        total: totalTickets,
        bgColor: 'bg-primary-subtle',
        txtColor: 'text-primary',
        icon: 'bi-ticket-perforated'
      },
      {
        title: 'Resolved',
        total: resolvedTickets,
        bgColor: 'bg-success-subtle',
        txtColor: 'text-success',
        icon: 'bi-check2-circle'
      },
      {
        title: 'Pending',
        total: pendingTickets,
        bgColor: 'bg-warning-subtle',
        txtColor: 'text-warning',
        icon: 'bi-clock'
      },
      {
        title: 'Urgent',
        total: urgentTickets,
        bgColor: 'bg-danger-subtle',
        txtColor: 'text-danger',
        icon: 'bi-exclamation-triangle'
      }
    ]
  ),[totalTickets, resolvedTickets, pendingTickets, urgentTickets])

  return (
    <div className="p-2">
        <div className="d-flex flex-column gap-3">
          <h4>Dashboard</h4>
          <div className="row">
            {
              statusCards.map((status, index)=> (
                <div key={index} className="col-12 col-md-6 col-lg-3 mt-3">
                  <div className="d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3">
                    <div className={`stat-card-icon-container d-flex align-items-center justify-content-center rounded-3 ${status.bgColor}`}>
                      <i className={`stat-card-icon bi ${status.icon} ${status.txtColor}`}></i>
                    </div>
                    <div>
                      <h5 className='status-card-title text-muted m-0'>{status.title}</h5>
                      <h4 className='m-0'>{status.total}</h4>
                    </div>
                  </div>
                </div>
              ))
            }
            
          </div>
          <div className='row dashboard-content-container'>
            <div className="col-12 col-lg-6 p-3 ">
              <div className=' border shadow-sm rounded-3 p-3 '>
                <h5 className='mb-3'>Recent Tickets</h5>
                <div className='recent-ticket-container d-flex flex-column gap-2'>
                  {
                    recentTickets.length > 0 ?
                      recentTickets.map((ticket, index)=>(
                        <div key={index} className='d-flex justify-content-between bg-body-secondary p-3 rounded-2'>
                          <div className='d-flex flex-column justify-content-center'>
                            <div className='fw-medium'>{ticket.ticketId}</div>
                            <p className='recent-ticket-description text-muted m-0'>
                              {ticket.subject}
                            </p>    
                          </div>
                          <div className='d-flex flex-column justify-content-between gap-1'>
                            <div className={`recent-ticket-priority-status rounded-pill px-3 py-1 fw-medium ${priorityColors[`${ticket.priority}`]}`}>{ticket.priority}</div>
                            <Link className='recent-ticket-link text-decoration-none' to={`/ticket/${ticket.ticketId}`}>Details <i className="bi bi-arrow-right"></i></Link>
                          </div>
                        </div>
                      ))
                    : <p className='text-muted'>No recent ticket</p>                   
                  }       
                </div>
              </div>
            </div>
            
            
            <div className="col-12 col-lg-6 p-3 ">
              <div className=' border shadow-sm rounded-3 p-3'>
                <h5 className='mb-3'>Recent Activity</h5>
                <div className='recent-activity-container d-flex flex-column gap-3 p-1'>
                  {
                    recentActivity.length > 0 ? 
                      recentActivity.map((notif, index) => (
                        <div key={index} className='d-flex gap-3'>
                          <div className='circle bg-primary mt-2'></div>
                          <div>
                            <div className='recent-activity-descp fw-medium'>{notif.message}</div>
                            <div className='text-muted recent-activity-date'>{formatNotificationDate(notif.createdAt)}</div>
                          </div>
                        </div> 
                      ))

                      : <p className='text-muted'>No recent activity</p>
                  }                     
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Dashboard