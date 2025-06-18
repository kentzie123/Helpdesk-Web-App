import { useGlobalContext } from "../../Context/Context"
import { useState, useRef } from "react";
import axios from "axios";

import CreateTicketToastResponse from "../CreateTicketToastResponse/CreateTicketToastResponse";

const CreateTicketModal = () => {
    const { userInfo, users, setCreateTicketResponse, createTicketResponse } = useGlobalContext();
    const [ subject, setSubject ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ priority, setPriority ] = useState('');
    const [ assignedTo, setAssignedTo ] = useState({});
    const [ targetResolveDate, setTargetResolveDate ] = useState('');
    const createTicketClsBtn = useRef(null);

    const handleCreateTicket = async () => {
        try {
            const res = await axios.post('http://localhost:3000/api/tickets', {
                ownerPic: userInfo.profilePic,
                ownerName: userInfo.fullname,
                ownerUserId: userInfo.userID,
                subject,
                priority,
                category,
                description,
                assignedTo,
                targetResolveDate,
            });
           
            
            setSubject('');
            setDescription('');
            setCategory('');
            setPriority('');
            setAssignedTo({});
            setTargetResolveDate('');
            setCreateTicketResponse(res.data.message || "Created ticket successfully");
            createTicketClsBtn.current.click();      
            
        } catch (err) {
            setCreateTicketResponse(err.response?.data?.error || "Error creating ticket");
            
        }
    }

    return ( 
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="staticBackdrop" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static">
            { createTicketResponse !== "Created ticket successfully"? <CreateTicketToastResponse/> : null }
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Create ticket</h5>
                <button type="button" ref={createTicketClsBtn} className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="d-flex flex-column justify-content-between offcanvas-body">
                <div className='d-flex flex-column gap-3'> 
                    <div>
                        <div className='mb-1'>Subject</div>
                        <input className="form-control" type="text" onChange={(e)=>{ setSubject(e.target.value) }} value={subject}/>
                    </div>
                    <div>
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea  onChange={(e)=>{ setDescription(e.target.value) } } value={description} className="form-control" id="description" rows="3"></textarea>
                    </div>
                    <div>
                        <div className='mb-1'>Category</div>
                        <select onChange={(e)=>{setCategory(e.target.value)}} value={category} className="form-select" aria-label="Category">
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
                        <select onChange={(e)=>{setPriority(e.target.value)}} value={priority}  className="form-select form-select" aria-label="Priority">
                        <option value="" selected hidden>Select priority level</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <div className='mb-1'>Assign to</div>
                        <select 
                        onChange={(e)=> setAssignedTo(JSON.parse(e.target.value))} 
                        value={JSON.stringify(assignedTo)} 
                        className="form-select"
                        >
                        <option value="" hidden>Select Assignee</option>         
                        {
                            users.map((fn) => (
                            <option 
                                key={fn.userID} 
                                value={JSON.stringify({ userID: fn.userID, fullname: fn.fullname })}
                            >
                                {fn.fullname}
                            </option>
                            ))
                        }
                        </select>

                    </div>
                    <div>
                        <div className='mb-1'>Target resolve date</div>
                        <input onChange={(e)=>{setTargetResolveDate(e.target.value)}} value={targetResolveDate}  type="date" className="form-control"/>
                    </div>
                </div>
                <div>
                    <button onClick={handleCreateTicket} type='button' className='btn btn-success w-100'>Create</button>
                </div>
            </div>
        </div> 
    )
}

export default CreateTicketModal