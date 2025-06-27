import { useMemo } from "react"

const TeamOverviewCard = ({tickets, users}) => {
const activeStaffs = useMemo(()=> {
    return users.filter(user => user.role === 2).length
},[users]);
const totalClients = useMemo(()=> {
    return users.filter(user => user.role === 3).length
}, [users]);
const ticketsToday = useMemo(()=>{
    return tickets.filter(ticket => {
        const ticketDate = new Date(ticket.createdDate);
        const today = new Date();
        return ticketDate.getDate() === today.getDate() &&
                ticketDate.getMonth() === today.getMonth() &&
                ticketDate.getFullYear() === today.getFullYear();
    }).length
}, [tickets]);

  return (
    <div className='d-flex flex-column border rounded-3 shadow-sm gap-3 p-4 h-100'>
        <h4>Team Overview</h4>

        <div className='d-flex flex-column gap-2'>
            <div className='d-flex align-items-center justify-content-between bg-body-secondary rounded-3 px-3 py-2'>
                <div className='fw-medium'><i className="bi bi-people text-primary team-overview-icon me-2"></i> Active Staffs</div>
                <div className='fw-bold f-size-16'>{activeStaffs}</div>
            </div>
        </div>
        <div className='d-flex flex-column gap-2'>
            <div className='d-flex align-items-center justify-content-between bg-body-secondary rounded-3 px-3 py-2'>
                <div className='fw-medium'><i className="bi bi-people text-success team-overview-icon me-2"></i> Total Clients</div>
                <div className='fw-bold f-size-16'>{totalClients}</div>
            </div>
        </div>
        <div className='d-flex flex-column gap-2'>
            <div className='d-flex align-items-center justify-content-between bg-body-secondary rounded-3 px-3 py-2'>
                <div className='fw-medium'><i className="bi bi-graph-up-arrow text-primary team-overview-icon me-2"></i> Ticket Today</div>
                <div className='fw-bold f-size-16'>{ticketsToday}</div>
            </div>
        </div>
    </div>
  )
}

export default TeamOverviewCard