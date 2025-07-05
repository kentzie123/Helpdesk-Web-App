// React & Router
import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Context
import { useGlobalContext } from './Context/Context';

// Layouts
import Layout from './Layouts/Layout';

// Pages
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Forgot from './Pages/Forgot/Forgot';
import Tickets from './Pages/Tickets/Tickets';
import TicketInfo from './Pages/TicketInfo/TicketInfo';
import Users from './Pages/Users/Users';
import Notifications from './Pages/Notifications/Notifications';
import Dashboard from './Pages/Dashboard/Dashboard';
import Reports from './Pages/Reports/Reports';
import KnowledgeBase from './Pages/KnowledgeBase/KnowledgeBase';
import ArticleInfo from './Pages/ArticleInfo/ArticleInfo';
import Page403 from './Pages/Page403/Page403';

// Components
import DeleteTicketModal from './Components/DeleteTicketModal/DeleteTicketModal';
import DeleteArticleModal from './Components/DeleteArticleModal/DeleteArticleModal';
import ToastNotification from './Components/ToastNotification/ToastNotification';
import NotificationToastResponse from './Components/NotificationToastResponse/NotificationToastResponse';
import LoadingSpinner from './Components/LoadingSpinner/LoadingSpinner';
import OuterNotificationToast from './Components/OuterNotificationToast/OuterNotificationToast';


// Route guard
const ProtectedRoute = ({ canAccess, children }) => {
  if (!canAccess) return <Navigate to="/403" />;
  return children;
};


function App() {
  const navigate = useNavigate();

  const {
    setUserInfo,
    deleteTicketModal, 
    userInfo,
    popupNotification,
    canView,
    fetchAllUserRelatedData,
    privilegeLoaded,
    deleteArticleModal,
    editTicketResponse, setEditTicketResponse,
    startWorkingResponse, setStartWorkingResponse,
    createArticleResponse, setCreateArticleResponse,
    createTicketResponse, setCreateTicketResponse,
    deleteArticleResponse, setDeleteArticleResponse,
    deleteTicketResponse, setDeleteTicketResponse,
    loading, setLoading,
    isRequestCodeSuccess, setIsRequestCodeSuccess,
    isResetPasswordSucces, setIsResetPasswordSuccess
  } = useGlobalContext();

  // Load saved user from localStorage
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUserInfo(savedUser);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch all user-related data if user is present
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
      {/* Modals */}
      {deleteArticleModal && <DeleteArticleModal />}
      {deleteTicketModal && <DeleteTicketModal />}

      {/* Toast Notifications */}
      {createTicketResponse && (
        <ToastNotification
          state={createTicketResponse}
          setState={setCreateTicketResponse}
          message="Created ticket successfully"
        />
      )}
      {editTicketResponse && (
        <ToastNotification
          state={editTicketResponse}
          setState={setEditTicketResponse}
          message="Ticket updated successfully"
        />
      )}
      {startWorkingResponse && (
        <ToastNotification
          state={startWorkingResponse}
          setState={setStartWorkingResponse}
          message="Ticket is now in progress"
        />
      )}
      {createArticleResponse && (
        <ToastNotification
          state={createArticleResponse}
          setState={setCreateArticleResponse}
          message="Created article successfully"
        />
      )}
      {deleteArticleResponse && (
        <ToastNotification
          state={deleteArticleResponse}
          setState={setDeleteArticleResponse}
          message="Article deleted successfully"
        />
      )}
      {deleteTicketResponse && (
        <ToastNotification
          state={deleteTicketResponse}
          setState={setDeleteTicketResponse}
          message="Ticket deleted successfully"
        />
      )}

      {/* Global Notification */}
      {popupNotification && <NotificationToastResponse />}
      {isRequestCodeSuccess && <OuterNotificationToast state={isRequestCodeSuccess} setState={setIsRequestCodeSuccess} title={'Request code sent'} content={'Please check your email for the password reset code.'}/>}
      { isResetPasswordSucces && <OuterNotificationToast state={isResetPasswordSucces} setState={setIsResetPasswordSuccess} title={'Password reset successful'} content={'Your password has been reset. You can now sign in with your new password.'}/>}

      {/* Loader */}
      {loading && <LoadingSpinner/>}
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/403" element={<Page403 />} />

        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Dashboard')}>
                  <Dashboard />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/tickets"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Tickets')}>
                  <Tickets />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/ticket/:id"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Tickets')}>
                  <TicketInfo />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/users"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Users')}>
                  <Users />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/notifications"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Notifications')}>
                  <Notifications />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/reports"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Reports')}>
                  <Reports />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/knowledge-base"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Knowledge Base')}>
                  <KnowledgeBase />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/knowledge-base/:slug"
            element={
              isReady && (
                <ProtectedRoute canAccess={canView('Knowledge Base')}>
                  <ArticleInfo />
                </ProtectedRoute>
              )
            }
          />
        </Route>

        {/* Fallback route for unmatched paths (optional) */}
        {/* <Route path="*" element={<Navigate to="/403" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
