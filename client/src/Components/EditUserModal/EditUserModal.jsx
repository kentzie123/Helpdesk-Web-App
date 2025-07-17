import { useEffect, useState } from "react";
import api from "../../api/api";
import { useGlobalContext } from "../../Context/Context";

const EditUserModal = () => {
  const { setLoading, loading, selectedUser } = useGlobalContext();
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Optional new password
  const [role, setRole] = useState({ roleName: 'Client', roleId: 3 });

  useEffect(() => {
    if (selectedUser) {
      setFullname(selectedUser.fullname || '');
      setEmail(selectedUser.email || '');
      setPassword(''); // Never set old password
      setRole({
        roleName: selectedUser.roleName,
        roleId: selectedUser.role
      });
    }
  }, [selectedUser]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {
        email,
        fullname,
        role
      };

      if (password.trim() !== '') {
        payload.password = password;
      }

      await api.patch(`/users/${selectedUser.userID}`, payload);
      setLoading(false);
      console.log('Successfully updated user!');
    } catch (err) {
      setLoading(false);
      console.error('Failed to update user!', err);
    }
  };

  return (
    <div className="offcanvas offcanvas-end" tabIndex="-1" id="updateUserModal" aria-labelledby="offcanvasRightLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasRightLabel">Edit User</h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <form onSubmit={updateUserHandler} className="d-flex flex-column justify-content-between offcanvas-body">
        <div className="d-flex flex-column gap-3">
          <div>
            <div className='mb-1'>Fullname</div>
            <input 
              onChange={(e) => setFullname(e.target.value)} 
              placeholder="Enter new fullname" 
              value={fullname} 
              className="form-control" 
              type="text" 
              required 
            />
          </div>
          <div>
            <div className='mb-1'>Email</div>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter new email" 
              value={email} 
              className="form-control" 
              type="email" 
              required 
            />
          </div>
          <div>
            <div className='mb-1'>New Password (optional)</div>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter new password" 
              value={password} 
              className="form-control" 
              type="password"
            />
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
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserModal;
