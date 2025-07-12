import './Users.css';

const Users = () => {
  const roleColor = {
    'Admin' : 'text-danger bg-danger-subtle'
  }

  return (
    <div className='p-2'>
      <div className='d-flex justify-content-between'>
        <h4>Users Management</h4>
        <button type='button' className='btn btn-primary'>
          <i className='bi bi-plus me-2'></i>
          <span>Add User</span>
        </button>
      </div >
      <div className='container-fluid mt-4'>
        <div className='row border rounded shadow-sm py-4 px-3'>
          <div className='col-12 col-md-6 position-relative'> 
            <i className="bi bi-search icon-bold text-secondary position-absolute top-50 translate-middle ms-4"></i>
            <input type="text" className='form-control ps-5 f-size-14' placeholder='Search users by name and email'/>
          </div>
          <div className='col-12 col-md-6 mt-sm-3 mt-md-0 row'>
            <div className='col-9 d-flex gap-2 align-items-center'>
              <i className="bi bi-funnel icon-bold text-secondary"></i>
              <div className="dropdown w-100">
                <button className="btn btn-light border dropdown-toggle d-flex justify-content-between align-items-center w-100" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  All Roles
                </button>
                <ul className="dropdown-menu w-100">
                  <li><a className="dropdown-item" href="#">Admin</a></li>
                  <li><a className="dropdown-item" href="#">User</a></li>
                  <li><a className="dropdown-item" href="#">Client</a></li>
                </ul>
              </div>
            </div>
            <div className='d-flex align-items-center justify-content-center col-3 text-muted f-size-14'>
              6 - 6 users
            </div>
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
              <h4 className='m-0'>6</h4>
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
              <h4 className='m-0'>2</h4>
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
              <h4 className='m-0'>4</h4>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 border rounded shadow-sm p-4">
        <h4>All Users</h4>
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
            <tr className="p-4">
              <th scope="row" className='fw-medium'>Kent Adriane Goc-ong</th>
              <td>admin@email.com</td>
              <td>
                <div className='badge rounded-pill f-size-12 fw-medium text-danger bg-danger-subtle text-center px-2'>Admin</div>
              </td>
              <td>
                <button type='button' className='btn btn-light'>
                  <i className="bi bi-pencil-square icon-bold"></i>
                </button>
                <button type='button' className='btn btn-light'>
                  <i className="bi bi-trash3 text-danger icon-bold"></i>
                </button>
              </td>
            </tr>
            <tr className="p-4">
              <th scope="row" className='fw-medium'>Kent Adriane Goc-ong</th>
              <td>admin@email.com</td>
              <td>
                <div className='badge rounded-pill f-size-12 fw-medium text-primary bg-primary-subtle text-center px-2'>Staff</div>
              </td>
              <td>
                <button type='button' className='btn btn-light'>
                  <i className="bi bi-pencil-square icon-bold"></i>
                </button>
                <button type='button' className='btn btn-light'>
                  <i className="bi bi-trash3 text-danger icon-bold"></i>
                </button>
              </td>
            </tr>
            <tr className="p-4">
              <th scope="row" className='fw-medium'>Kent Adriane Goc-ong</th>
              <td>admin@email.com</td>
              <td>
                <div className='badge rounded-pill f-size-12 fw-medium text-success bg-success-subtle text-center px-2'>Client</div>
              </td>
              <td>
                <button type='button' className='btn btn-light'>
                  <i className="bi bi-pencil-square icon-bold"></i>
                </button>
                <button type='button' className='btn btn-light'>
                  <i className="bi bi-trash3 text-danger icon-bold"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
} 

export default Users