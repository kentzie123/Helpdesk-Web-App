import { useGlobalContext } from "../../Context/Context"
import { useState } from "react";

const CreateTicketModal = () => {
    const { users } = useGlobalContext();
    const [ subject, setSubject ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ category, setCategory ] = useState('');
    const [ priority, setPriority ] = useState('');
    const [ assignTo, setAssignTo ] = useState('');
    const [ targetResolveDate, setTargetResolveDate ] = useState('');

    const handleCreateTicket = async ()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/tickets/create', {

            })
        }catch(err){
            console.log('Server error', err);
            
        }
    }
    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="staticBackdrop" aria-labelledby="offcanvasRightLabel" data-bs-backdrop="static">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Create ticket</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="d-flex flex-column justify-content-between offcanvas-body">
                <div className='d-flex flex-column gap-3'> 
                <div>
                    <div className='mb-1'>Subject</div>
                    <input onChange={(e)=>{ setSubject(e.target.value) }} value={subject} type="text" className="form-control" aria-label="Subject" aria-describedby="basic-addon1"></input>
                </div>
                <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea  onChange={(e)=>{ setDescription(e.target.value) } } value={description} className="form-control" id="description" rows="3"></textarea>
                </div>
                <div>
                    <div className='mb-1'>Category</div>
                    <select className="form-select form-select" aria-label="Category">
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
                <div>
                    <div className='mb-1'>Priority</div>
                    <select className="form-select form-select" aria-label="Priority">
                    <option selected hidden>Select priority level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                    </select>
                </div>
                <div>
                    <div className='mb-1'>Assign to</div>
                    <select className="form-select" aria-label="Priority">         
                        {
                            users.map((fn) => (
                                <option key={fn.userID} value={fn.fullname}>{fn.fullname}</option>
                            ))
                        }
                    </select>    
                </div>
                <div>
                    <div className='mb-1'>Target resolve date</div>
                    <input type="date" className="form-control"/>
                </div>
                </div>
                <div>
                <button type='button' className='btn btn-success w-100'>Create</button>
                </div>
            </div>
        </div>
    )
}

export default CreateTicketModal