const DeleteTicketCommentModal = ({setShowModal, deleteHandler, selectedItemId, selectedItemContent, title, message }) => {
    
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 z-3"
            aria-modal="true"
            role="dialog"
        >
            <div className="d-flex flex-column gap-2 bg-white rounded-3 shadow p-4 m-2" style={{maxWidth:'500px'}}>
                <div className="d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-danger-subtle p-3" style={{width: '45px', height: '45px'}}>
                        <i className="bi bi-exclamation-triangle text-danger icon-bold" style={{fontSize:'21px'}}></i>
                    </div>
                    <div className="f-size-16 fw-medium">{title}</div>
                </div>
                <div className="text-muted f-size-14">
                    {message}
                </div>
                <div className="fw-bold f-size-14 text-truncate" style={{ maxWidth: "175px" }}>{selectedItemContent}</div>
                <div className="fw-bold text-danger f-size-14">This action cannot be undone.</div>
                <div className="d-flex justify-content-end gap-3">
                    <button onClick={()=> setShowModal(false)} className="btn btn-light border f-size-14">Close</button>
                    <button onClick={()=>{ deleteHandler(selectedItemId); setShowModal(false)}} className="btn btn-danger f-size-14"><i className="bi bi-trash"></i> Delete</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteTicketCommentModal;