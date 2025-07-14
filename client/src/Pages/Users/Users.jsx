import './Users.css';
import api from '../../api/api'
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useGlobalContext } from '../../Context/Context';



const Users = () => {
  const { userInfo } = useGlobalContext();
  const [ allUsers, setAllUsers ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ usersPerPage, setUsersPerPage ] = useState(10);
  const [userFilters, setUserFilters] = useState({
    search: '',
    role: 'All Roles',
  });


  const roleColor = {
    'Admin' : 'text-danger bg-danger-subtle',
    'Staff' : 'text-primary bg-primary-subtle',
    'Client' : 'text-success bg-success-subtle'
  }

  const totalStaff = useMemo(() => {
    return allUsers.filter((user)=> (
      user.roleName === 'Staff'
    )).length
  }, [allUsers]);

  const totalClient = useMemo(() => {
    return allUsers.filter((user)=> (
      user.roleName === 'Client'
    )).length
  }, [allUsers]);

  

  useEffect(() => {
    if (!userInfo) return;

    (async () => {
      try {
        const res = await api.get('/users');
        setAllUsers(res.data);
        setCurrentPage(1);           
      } catch (err) {
        console.error('Error fetching all users:', err);
      }
    })();
  }, [userInfo, userFilters]);

  const filteredUsers = useMemo(() => {
    return allUsers
      .filter((user) =>
        user.fullname.toLowerCase().includes(userFilters.search.toLowerCase()) ||
        user.email.toLowerCase().includes(userFilters.search.toLowerCase())
      )
      .filter((user) =>
        userFilters.role === 'All Roles' || user.roleName === userFilters.role
      );
  }, [allUsers, userFilters]);

  const currentUsers = useMemo(() => {
    const start = (currentPage - 1) * usersPerPage;
    return filteredUsers.slice(start, start + usersPerPage);
  }, [filteredUsers, currentPage, usersPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);




  const pageNumbers = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );

  
  const goToPage = (page) => setCurrentPage(page);
  const goPrev   = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const goNext   = () => setCurrentPage((p) => Math.min(p + 1, totalPages));


  return (
    <div className='p-2'>
      <h4>Users Management</h4>
      <div className='container-fluid mt-4'>
        <div className='row border rounded shadow-sm py-4 px-3'>
          <div className='col-12 col-md-6 position-relative'> 
            <i className="bi bi-search icon-bold text-secondary position-absolute top-50 translate-middle ms-4"></i>
            <input value={userFilters.search} onChange={(e)=> setUserFilters({...userFilters, search: e.target.value})} type="text" className='form-control ps-5 f-size-14' placeholder='Search users by name and email'/>
          </div>
          <div className='col-12 col-md-6 mt-sm-3 mt-md-0 row'>
            <div className='col-12 col-md-9 d-flex gap-2 align-items-center'>
              <i className="bi bi-funnel icon-bold text-secondary"></i>
              <div className="dropdown w-100">
                <button className="btn btn-light border dropdown-toggle d-flex justify-content-between align-items-center w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {userFilters.role}
                </button>
                <ul className="dropdown-menu w-100">
                  <li><a className="dropdown-item" onClick={()=> setUserFilters({...userFilters, role: 'All Roles'}) }>All Roles</a></li>
                  <li><a className="dropdown-item" onClick={()=> setUserFilters({...userFilters, role: 'Admin'}) }>Admin</a></li>
                  <li><a className="dropdown-item" onClick={()=> setUserFilters({...userFilters, role: 'Staff'}) }>Staff</a></li>
                  <li><a className="dropdown-item" onClick={()=> setUserFilters({...userFilters, role: 'Client'}) }>Client</a></li>
                </ul>
              </div>
            </div>
            <button type='button' className='btn btn-primary col-12 col-md-3 mt-3 mt-md-0'>
              <i className='bi bi-plus me-2'></i>
              <span>Add User</span>
            </button>
          </div>
        </div>
      </div>
      

      <div className="row mt-4">
        <div className="col-12 col-lg-4">
          <div className="d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3">
            <div className='d-flex align-items-center justify-content-center rounded-3 bg-primary-subtle' style={{height: '48px', width:'48px'}}>
              <i className='bi bi-person-check f-size-24 icon-bold text-primary'></i>
            </div>
            <div>
              <h5 className='f-size-14 text-muted m-0'>Total Users</h5>
              <h4 className='m-0'>{allUsers.length}</h4>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3">
            <div className='d-flex align-items-center justify-content-center rounded-3 bg-success-subtle' style={{height: '48px', width:'48px'}}>
              <i className='bi bi-person-check f-size-24 icon-bold text-success'></i>
            </div>
            <div>
              <h5 className='f-size-14 text-muted m-0'>Active Staffs</h5>
              <h4 className='m-0'>{totalStaff}</h4>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4">
          <div className="d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3">
            <div className='d-flex align-items-center justify-content-center rounded-3 bg-violet-subtle' style={{height: '48px', width:'48px'}}>
              <i className='bi bi-person-check f-size-24 icon-bold text-violet'></i>
            </div>
            <div>
              <h5 className='f-size-14 text-muted m-0'>Clients</h5>
              <h4 className='m-0'>{totalClient}</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border rounded shadow-sm p-4">
        <div className='row justify-content-between align-items-center'>
          <div className='col-6 col-md-3'>
            <h4 className='mb-0'>All Users</h4>
          </div>
          <div className='col-6 col-md-3'>
            <select value={usersPerPage} onChange={(e)=> setUsersPerPage(e.target.value)} className="form-select" aria-label="Default select example">
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={15}>15 per page</option>
              <option value={20}>20 per page</option>
              <option value={25}>25 per page</option>
            </select>
          </div>
        </div>

        {/* ─────────────── Table ─────────────── */}
        <table className="users-table table mt-4">
          <thead>
            <tr className="p-4">
              <th scope="col" className="text-muted fw-medium f-size-14">Name</th>
              <th scope="col" className="text-muted fw-medium f-size-14">Email</th>
              <th scope="col" className="text-muted fw-medium f-size-14">Role</th>
              <th scope="col" className="text-muted fw-medium f-size-14">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user, idx) => (
                <tr key={idx} className="p-4">
                  <th scope="row" className="fw-medium">{user.fullname}</th>
                  <td>{user.email}</td>
                  <td>
                    <div
                      className={`${roleColor[user.roleName]} badge rounded-pill f-size-12 fw-medium text-center px-2`}
                    >
                      {user.roleName}
                    </div>
                  </td>
                  <td>
                    <button type="button" className="btn btn-light me-2">
                      <i className="bi bi-pencil-square icon-bold" />
                    </button>
                    <button type="button" className="btn btn-light">
                      <i className="bi bi-trash3 text-danger icon-bold" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-5 text-muted">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* ─────────────── Pagination UI ─────────────── */}
        <div className="d-flex justify-content-center mt-4">
          <nav aria-label="Users pagination">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                <button className="page-link" onClick={goPrev}>
                  Previous
                </button>
              </li>

              {pageNumbers.map((num) => (
                <li
                  key={num}
                  className={`page-item ${currentPage === num && 'active'}`}
                >
                  <button
                    className="page-link"
                    onClick={() => goToPage(num)}
                  >
                    {num}
                  </button>
                </li>
              ))}

              <li
                className={`page-item ${
                  currentPage === totalPages && 'disabled'
                }`}
              >
                <button className="page-link" onClick={goNext}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Users;