import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Forgot from './Pages/Forgot/Forgot';
import Tickets from './Pages/Tickets/Tickets';
import Users from './Pages/Users/Users';
import Layout from './Layouts/Layout';
import Page403 from './Pages/Page403/Page403';
import TicketInfo from './Pages/TicketInfo/TicketInfo';
import DeleteTicketModal from './Components/DeleteTicketModal/DeleteTicketModal';
import CreateTicketToastResponse from './Components/CreateTicketToastResponse/CreateTicketToastResponse';
import EditTicketToastResponse from './Components/EditTicketToastResponse/EditTicketToastResponse';
import StartWorkingToastResponse from './Components/StartWorkingToastResponse/StartWorkingToastResponse';
import NotificationToastResponse from './Components/NotificationToastResponse/NotificationToastResponse';
import Notifications from './Pages/Notifications/Notifications';
import Dashboard from './Pages/Dashboard/Dashboard';
import Reports from './Pages/Reports/Reports';
import KnowledgeBase from './Pages/KnowledgeBase/KnowledgeBase';
import DeleteArticleModal from './Components/DeleteArticleModal/DeleteArticleModal';

import { useGlobalContext } from './Context/Context';


const ProtectedRoute = ({ canAccess, children }) => {
  if (!canAccess) return <Navigate to="/403" />;
  return children;
};

function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    rolePrivilege,
    setUserInfo,
    deleteTicketModal,
    createTicketResponse,
    editTicketResponse,
    startWorkingResponse,
    userInfo,
    popupNotification,
    canView,
    fetchAllUserRelatedData,
    privilegeLoaded,
    deleteArticleModal
  } = useGlobalContext();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUserInfo(savedUser);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (userInfo?.userID) {
        setLoading(true);
        const success = await fetchAllUserRelatedData(userInfo);
        if (success && window.location.pathname === '/') {
          navigate('/tickets');
        }
        setLoading(false);
      }
    };

    loadUserData();
  }, [userInfo]);


  const isReady = !loading && privilegeLoaded;

  return (
    <div className="position-relative">
      {/* Modals and Toasts */}
      {deleteArticleModal && <DeleteArticleModal/>}
      {deleteTicketModal && <DeleteTicketModal />}
      {createTicketResponse && <CreateTicketToastResponse />}
      {editTicketResponse && <EditTicketToastResponse />}
      {startWorkingResponse && <StartWorkingToastResponse />}
      {popupNotification && <NotificationToastResponse />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/403" element={<Page403 />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Dashboard')}>
                  <Dashboard />
                </ProtectedRoute>
              ) : null
            }
          />
          <Route
            path="/tickets"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Tickets')}>
                  <Tickets />
                </ProtectedRoute>
              ) : null
            }
          />
          <Route
            path="/users"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Users')}>
                  <Users />
                </ProtectedRoute>
              ) : null
            }
          />
          <Route
            path="/notifications"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Notifications')}>
                  <Notifications />
                </ProtectedRoute>
              ) : null
            }
          />
          <Route
            path="/ticket/:id"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Tickets')}>
                  <TicketInfo />
                </ProtectedRoute>
              ) : null
            }
          />
          <Route
            path="/reports"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Reports')}>
                  <Reports />
                </ProtectedRoute>
              ) : null
            }
          />
          <Route
            path="/knowledge-base"
            element={
              isReady ? (
                <ProtectedRoute canAccess={canView('Knowledge Base')}>
                  <KnowledgeBase />
                </ProtectedRoute>
              ) : null
            }
          />
        </Route>

        {/* Optional fallback for unmatched routes */}
        <Route path="*" element={<Navigate to="/403" />} />
      </Routes>
    </div>
  );
}

export default App;
