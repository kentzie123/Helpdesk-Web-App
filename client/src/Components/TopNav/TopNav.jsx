import './TopNav.css';
import { useGlobalContext } from '../../Context/Context';

const TopNav = () => {
  const { navOpen, setNavOpen } = useGlobalContext();

  return (
    <div className='p-2 border'>
        <div className='d-flex align-items-center justify-content-between'>
            <div className='d-flex align-items-center gap-2'>
              <i className="side-nav-btn bi bi-list" onClick={() => setNavOpen(prev => !prev)}></i>
              <h4 className='m-0'>Tickets</h4>
            </div>
            <div className='d-flex align-items-center gap-3'>
                <div className='sm-text'>Welcome Kent Adriane Goc-ong!</div>
                <i className="bi bi-bell-fill"></i>
                <img className='profile-pic rounded-circle bg-primary border' src="" alt="" />
            </div>
        </div>
    </div>
  )
}

export default TopNav