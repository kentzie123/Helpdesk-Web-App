import { useMemo } from "react";

const StatusBar = ({ label, count, total, barColor }) => (
  <div>
    <div className='d-flex justify-content-between fw-medium f-size-14'>
      <div className='mb-2'>{label}</div>
      <div className='text-muted'>{count} tickets</div>
    </div>
    <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
      <div
        className={`${barColor} h-100`}
        style={{ width: `${total ? (count / total) * 100 : 0}%` }}
      ></div>
    </div>
  </div>
);

const StatusDistributionCard = ({ tickets }) => {
  const {
    newTickets,
    openTickets,
    inProgressTickets,
    resolvedTickets,
  } = useMemo(() => {
    let newTickets = 0,
      openTickets = 0,
      inProgressTickets = 0,
      resolvedTickets = 0;

    for (const ticket of tickets) {
      switch (ticket.status) {
        case "New":
          newTickets++;
          break;
        case "Open":
          openTickets++;
          break;
        case "In Progress":
          inProgressTickets++;
          break;
        case "Resolved":
          resolvedTickets++;
          break;
        default:
          break;
      }
    }

    return { newTickets, openTickets, inProgressTickets, resolvedTickets };
  }, [tickets]);

  return (
    <div className='d-flex flex-column border rounded-3 shadow-sm gap-3 p-4 h-100'>
      <h4>Ticket Status Distribution</h4>
      <div className='d-flex flex-column gap-3'>
        <StatusBar
          label="New"
          count={newTickets}
          total={tickets.length}
          barColor="bg-primary"
        />
        <StatusBar
          label="Open"
          count={openTickets}
          total={tickets.length}
          barColor="bg-primary"
        />
        <StatusBar
          label="In Progress"
          count={inProgressTickets}
          total={tickets.length}
          barColor="bg-warning"
        />
        <StatusBar
          label="Resolved"
          count={resolvedTickets}
          total={tickets.length}
          barColor="bg-success"
        />
      </div>
    </div>
  );
};

export default StatusDistributionCard;
