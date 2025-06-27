import { useMemo } from "react";

const StatusDistributionCard = ({tickets}) => {
    const newTickets = useMemo(()=>{
        return tickets.filter(ticket => ticket.status === 'New').length;
    }, [tickets]);


    const openTickets = useMemo(()=>{
        return tickets.filter(ticket => ticket.status === 'Open').length;
    }, [tickets]);

    const inProgressTickets = useMemo(()=>{
        return tickets.filter(ticket => ticket.status === 'In Progress').length
    },[tickets]);

    const resolvedTickets = useMemo(()=>{
        return tickets.filter(ticket => ticket.status === 'Resolved').length
    },[tickets]);

  return (
    <div className='d-flex flex-column border rounded-3 shadow-sm gap-3 p-4 h-100'>
        <h4>Ticket Status Distribution</h4>
        <div className='d-flex flex-column gap-3'>
            <div>
                <div className='d-flex justify-content-between fw-medium f-size-14'>
                    <div className='mb-2'>New</div>
                    <div className='text-muted'>{newTickets} tickets</div>
                </div>
                <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                    <div className='bg-primary h-100' style={{width: `${(newTickets/tickets.length)*100}%`}}></div>
                </div>
            </div>
            <div>
                <div className='d-flex justify-content-between fw-medium f-size-14'>
                    <div className='mb-2'>Open</div>
                    <div className='text-muted'>{openTickets} tickets</div>
                </div>
                <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                    <div className='bg-primary h-100' style={{width: `${(openTickets/tickets.length)*100}%`}}></div>
                </div>
            </div>

            <div>
                <div className='d-flex justify-content-between fw-medium f-size-14'>
                    <div className='mb-2'>In Progress</div>
                    <div className='text-muted'>{inProgressTickets} tickets</div>
                </div>
                <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                    <div className='bg-warning h-100' style={{width: `${(inProgressTickets/tickets.length)*100}%`}}></div>
                </div>
            </div>

            <div>
                <div className='d-flex justify-content-between fw-medium f-size-14'>
                    <div className='mb-2'>Resolved</div>
                    <div className='text-muted'>{resolvedTickets} tickets</div>
                </div>
                <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                    <div className='bg-success h-100' style={{width: `${(resolvedTickets/tickets.length)*100}%`}}></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default StatusDistributionCard