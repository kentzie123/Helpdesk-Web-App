import './TopNav.css';
import defaultProfilePic from '../../assets/imgs/default.jpg';
import { useGlobalContext } from '../../Context/Context';
import { Link} from 'react-router-dom';

const TopNav = () => {
  const { navOpen, setNavOpen, userInfo, notifications } = useGlobalContext();
  const unreadCount = notifications.filter(n => n.status === 'Unread').length;

  return (
    <div className='p-2 border'>
      <div className='d-flex align-items-center justify-content-between'>
        <div className='d-flex align-items-center gap-2'>
          <i
            className="side-nav-btn bi bi-list"
            onClick={() => setNavOpen(prev => !prev)}
          ></i>
        </div>

        <div className='d-flex align-items-center gap-3'>
          <div className='sm-text'>Welcome {userInfo?.fullname || 'Guest'}!</div>

          <Link to="/notifications" className="position-relative text-dark text-decoration-none">
            <i className="bi bi-bell-fill fs-5"></i>
            {unreadCount > 0 && (
              <span className="notification-badge">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </Link>

          <img
            className='profile-pic rounded-circle bg-primary border'
            src={!userInfo.profilePic ? defaultProfilePic : userInfo.profilePic}
            alt={`${userInfo.fullname} profile pic`}
          />
        </div>

      </div>
    </div>
  );
};

export default TopNav;
