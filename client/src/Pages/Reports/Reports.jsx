import './Reports.css';

const Reports = () => {
  return (
    <div className="d-flex flex-column gap-1 p-2">
        <div className="d-flex justify-content-between mb-1">
            <h4>Reports & Analytics</h4>
            <div className="d-flex flex-wrap gap-2">
                <button type="button" className="btn btn-primary f-size-14 fw-medium"><i className="bi bi-download me-1"></i> Export CSV</button>
                <button type="button" className="btn btn-light border f-size-14 fw-medium"><i className="bi bi-download me-1"></i> Export JSON</button>
            </div>
        </div>

        { /*Reports card stats*/ }
        <div className='row'>
            <div className='p-2 col-12 col-md-6 col-lg-3'>
                <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
                    <div className='bg-primary-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
                        <i className="text-primary bi bi-bar-chart-line reports-card-icon"></i>
                    </div>
                    <div>
                        <div className='text-muted'>Total Tickets</div>
                        <h4 className='fw-bold m-0'>5</h4>
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
                        <div className='text-muted'>Total Tickets</div>
                        <h4 className='fw-bold m-0'>5</h4>
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
                        <div className='text-muted'>Total Tickets</div>
                        <h4 className='fw-bold m-0'>5</h4>
                        <div className='f-size-12 text-success'>+0% from last week</div>
                    </div>
                </div>
            </div>
            <div className='p-2 col-12 col-md-6 col-lg-3 '>
                <div className="d-flex align-items-center gap-3 border rounded-3 p-3 shadow-sm">
                    <div className='bg-danger-subtle rounded-3 reports-icon-container d-flex align-items-center justify-content-center'>
                        <i className="text-danger bi bi-exclamation-triangle reports-card-icon"></i>
                    </div>
                    <div>
                        <div className='text-muted'>Total Tickets</div>
                        <h4 className='fw-bold m-0'>5</h4>
                        <div className='f-size-12 text-success'>+0% from last week</div>
                    </div>
                </div>
            </div>
        </div>

        <div className='row'>

            <div className="col-12 col-lg-6 p-2">
                <div className='d-flex flex-column border rounded-3 shadow-sm gap-3 p-4 h-100'>
                    <h4>Ticket Status Distribution</h4>
                    <div className='d-flex flex-column gap-3'>
                        <div>
                            <div className='d-flex justify-content-between fw-medium f-size-14'>
                                <div className='mb-2'>Open</div>
                                <div className='text-muted'>3 tickets</div>
                            </div>
                            <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                                <div className='bg-primary h-100' style={{width: `${(3/10)*100}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className='d-flex justify-content-between fw-medium f-size-14'>
                                <div className='mb-2'>In Progress</div>
                                <div className='text-muted'>3 tickets</div>
                            </div>
                            <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                                <div className='bg-warning h-100' style={{width: `${(3/10)*100}%`}}></div>
                            </div>
                        </div>

                        <div>
                            <div className='d-flex justify-content-between fw-medium f-size-14'>
                                <div className='mb-2'>Resolved</div>
                                <div className='text-muted'>4 tickets</div>
                            </div>
                            <div className='ticket-status-progress bg-secondary-subtle rounded-3 overflow-hidden'>
                                <div className='bg-success h-100' style={{width: `${(4/10)*100}%`}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-6 p-2">
                <div className='d-flex flex-column border rounded-3 shadow-sm gap-3 p-4'>
                    <h4>Team Overview</h4>

                    <div className='d-flex flex-column gap-2'>
                        <div className='d-flex align-items-center justify-content-between bg-body-secondary rounded-3 px-3 py-2'>
                            <div className='fw-medium'><i className="bi bi-people text-primary team-overview-icon me-2"></i> Active Staffs</div>
                            <div className='fw-bold f-size-16'>2</div>
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <div className='d-flex align-items-center justify-content-between bg-body-secondary rounded-3 px-3 py-2'>
                            <div className='fw-medium'><i className="bi bi-people text-success team-overview-icon me-2"></i> Total Clients</div>
                            <div className='fw-bold f-size-16'>2</div>
                        </div>
                    </div>
                    <div className='d-flex flex-column gap-2'>
                        <div className='d-flex align-items-center justify-content-between bg-body-secondary rounded-3 px-3 py-2'>
                            <div className='fw-medium'><i className="bi bi-graph-up-arrow text-primary team-overview-icon me-2"></i> Ticket Today</div>
                            <div className='fw-bold f-size-16'>2</div>
                        </div>
                    </div>
                    
                </div>
            </div>
            

        </div>

    </div>
  )
}

export default Reports