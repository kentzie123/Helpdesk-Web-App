import { useState } from "react"
import api from "../../api/api";
import { useGlobalContext } from "../../Context/Context";

const CreateUserModal = () => {
    const { setLoading, loading } = useGlobalContext();
    const [ fullname, setFullname] = useState('');
    const [ email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ role, setRole ] = useState({roleName: 'Client', roleId: 3});

    const createUserHandler = async (e) => {
        e.preventDefault();
        try{
            setLoading(true)
            await api.post('/users/create-user', {
                email,
                fullname,
                password,
                role
            })
            setFullname('');
            setEmail('');
            setPassword('');
            setRole({ roleName: 'Client', roleId: 3 });
            setLoading(false);
            console.log('Successfully created user!');
        }catch(err){
            setLoading(false);
            console.log(err);
            console.log('failed user creation!!!')
        }
    }

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="createUserModal" aria-labelledby="offcanvasRightLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">Create User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <form onSubmit={createUserHandler} className="d-flex flex-column justify-content-between offcanvas-body">
                <div className="d-flex flex-column gap-3">
                    <div>
                        <div className='mb-1'>Fullname</div>
                        <input onChange={(e) => setFullname(e.target.value)} placeholder="Enter fullname"  value={fullname} className="form-control" type="text" required/>
                    </div>
                    <div>
                        <div className='mb-1'>Email</div>
                        <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" value={email} className="form-control" type="email" required/>
                    </div>
                    <div>
                        <div className='mb-1'>Password</div>
                        <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter password"  value={password} className="form-control" type="text" required/>
                    </div>
                    <div>   
                        <div className='mb-1'>Role</div>
                        <select 
                            required
                            onChange={(e) => setRole(JSON.parse(e.target.value))}
                            value={JSON.stringify(role)}
                            className="form-select"
                            aria-label="Default select example"
                            >
                            <option value={JSON.stringify({ roleName: 'Client', roleId: 3 })}>Client</option>
                            <option value={JSON.stringify({ roleName: 'Staff', roleId: 2 })}>Staff</option>
                            <option value={JSON.stringify({ roleName: 'Admin', roleId: 1 })}>Admin</option>
                            </select>
                    </div>
                </div>

                <div>
                    <button type='submit' className='btn btn-primary w-100' disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
  )
}

export default CreateUserModal