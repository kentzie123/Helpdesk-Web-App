import { useState, useEffect, useRef } from 'react';
import { useGlobalContext } from '../../Context/Context';
import axios from 'axios';
import EditTicketToastResponse from '../EditTicketToastResponse/EditTicketToastResponse';

const EditTicketModal = () => {

    const editTicketClsBtn = useRef(null);
    const { users, selectedTicket, editTicketResponse, setEditTicketResponse, userInfo, fetchTicketInfo } = useGlobalContext();
        
    const [editSubject, setSubject] = useState('');
    const [editDescription, setDescription] = useState('');
    const [editCategory, setCategory] = useState('');
    const [editPriority, setPriority] = useState('');
    const [editAssignedTo, setAssignedTo] = useState('');
    const [editTargetResolveDate, setTargetResolveDate] = useState('');

    useEffect(() => {
        if (selectedTicket) {
            setSubject(selectedTicket.subject || '');
            setDescription(selectedTicket.description || '');
            setCategory(selectedTicket.category || '');
            setPriority(selectedTicket.priority || '');
            setAssignedTo(selectedTicket.assignedTo || '');
            const formattedDate = selectedTicket.targetResolveDate
            ? new Date(selectedTicket.targetResolveDate).toISOString().split('T')[0]
            : '';
            setTargetResolveDate(formattedDate);
        }
    }, [selectedTicket]);

    const handleEditTicket = async () => {
        try {
            const res = await axios.patch(`http://localhost:3000/api/tickets/${selectedTicket.ticketId}`, {
                subject: editSubject,
                description: editDescription,
                category: editCategory,
                priority: editPriority,
                assignedTo: editAssignedTo,
                targetResolveDate: editTargetResolveDate,
                modifiedBy: userInfo.fullname
            });
            fetchTicketInfo(selectedTicket.ticketId);
            editTicketClsBtn.current.click();
            setEditTicketResponse(res.data.message || "Ticket updated successfully");

        } catch (err) {
            setEditTicketResponse(err.response?.data?.error || "Error updating ticket");
        }
    }
        


    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="staticBackdrop" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static">
            { editTicketResponse !== "Ticket updated successfully"? <EditTicketToastResponse/> : null }
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit ticket</h5>
                <button ref={editTicketClsBtn} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="d-flex flex-column justify-content-between offcanvas-body">
                <div className='d-flex flex-column gap-3'> 
                    <div>
                        <div className='mb-1'>Subject</div>
                        <input className="form-control" type="text" onChange={(e)=>{ setSubject(e.target.value) }} value={editSubject}/>
                    </div>
                    <div>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea  onChange={(e)=>{ setDescription(e.target.value) } } value={editDescription} className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div>
                        <div className='mb-1'>Category</div>
                        <select onChange={(e)=>{setCategory(e.target.value)}} value={editCategory} className="form-select" aria-label="Category">
                            <option value="" selected hidden>Select a category</option>
                            <option value="Technical Issue">Technical Issue</option>
                            <option value="Account Access">Account Access</option>
                            <option value="Hardware Request">Hardware Request</option>
                            <option value="Software Installation">Software Installation</option>
                            <option value="Network Problem">Network Problem</option>
                            <option value="Maintenance Request">Maintenance Request</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <div className='mb-1'>Priority</div>
                        <select onChange={(e)=>{setPriority(e.target.value)}} value={editPriority}  className="form-select form-select" aria-label="Priority">
                        <option value="" selected hidden>Select priority level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <div className='mb-1'>Assign to</div>
                        <select onChange={(e)=>{setAssignedTo(e.target.value)}} value={editAssignedTo}  className="form-select" aria-label="Priority">
                            <option value="" selected hidden>Select Assignee</option>         
                            {
                                users.map((fn) => (
                                    <option key={fn.userID} value={fn.fullname}>{fn.fullname}</option>
                                ))
                            }
                        </select>    
                    </div>
                    <div>
                        <div className='mb-1'>Target resolve date</div>
                        <input onChange={(e)=>{setTargetResolveDate(e.target.value)}} value={editTargetResolveDate}  type="date" className="form-control"/>
                    </div>
                </div>
                <div>
                    <button onClick={handleEditTicket} type='button' className='btn btn-primary w-100'>Confirm Edit</button>
                </div>
            </div>
        </div>
    )
}

export default EditTicketModal