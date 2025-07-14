import React, { useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/api'
import socket from '../socket';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  //============================= STATE =============================
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [rolePrivilege, setRolePrivilege] = useState({});
  const [pagePrivilege, setPagePrivilege] = useState([]);
  const [privilegeLoaded, setPrivilegeLoaded] = useState(false);

  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketComments, setTicketComments] = useState([]);
  const [selectedTicketComment, setSelectedTicketComment] = useState(null);
  const [showDeleteTicketCommentModal, setShowDeleteTicketCommentModal] = useState(false);
  const [deleteTicketModal, setDeleteTicketModal] = useState(false);

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [deleteArticleModal, setDeleteArticleModal] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [popupNotification, setPopupNotification] = useState(null);
  const [showDeleteNotificationModal, setShowDeleteNotificationModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [deleteNotificationToastResponse, setDeleteNotificationToastResponse] = useState('');

  const [createTicketRatingResponse, setCreateTicketRatingResponse] = useState('');
  const [createTicketResponse, setCreateTicketResponse] = useState('');
  const [createArticleResponse, setCreateArticleResponse] = useState('');
  
  const [editArticleResponse, setEditArticleResponse] = useState('');
  const [editTicketResponse, setEditTicketResponse] = useState('');

  const [deleteTicketResponse, setDeleteTicketResponse] = useState('');
  const [deleteArticleResponse, setDeleteArticleResponse] = useState('');

  const [changeTicketStatusResponse, setChangeTicketStatusResponse] = useState('');
  const [showRateTicketModal, setShowRateTicketModal] = useState(false);

  const [navOpen, setNavOpen] = useState(false);


  //======================== FORGOT PASSWORD ========================
  const [resetPassView, setResetPassView] = useState('s1');
  const [resetPassToken, setResetPassToken] = useState('');
  const [resetPassVerificationCode, setResetPassVerificationCode] = useState('');
  const [isRequestCodeSuccess, setIsRequestCodeSuccess] = useState(false);
  const [isResetPasswordSucces, setIsResetPasswordSuccess] = useState(false);

  const [resetCodeEmail, setResetCodeEmail] = useState('');

  //============================ SIGNUP =============================
  const [signupView, setSignupView] = useState('signup');
  const [signupInfo, setSignupInfo] = useState({});
  const [isSignupRequestCodeSuccess, setIsSignupRequestCodeSuccess] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  //============================ FETCH ==============================
  const fetchAllUserRelatedData = async (user) => {
    try {
      await fetchPagePrivilege(Number(user.role));
      const [notificationsRes, roleRes, usersRes, articlesRes] = await Promise.all([
        api.get(`/notifications/${user.userID}`),
        api.get(`/roles/${user.role}`),
        api.get(`/users`),
        api.get(`/knowledge-base`)
      ]);
      fetchTickets(user);
      setNotifications(notificationsRes.data.notifications);
      setRolePrivilege(roleRes.data);
      setUsers(usersRes.data);
      setArticles(articlesRes.data);
      setPrivilegeLoaded(true);
      return true;
    } catch (error) {
      console.error('Error fetching user-related data:', error);
      return false;
    }
  };

  const fetchPagePrivilege = async (roleId) => {
    try {
      const res = await api.get(`/privilege/${roleId}`);
      setPagePrivilege(res.data);
    } catch (err) {
      console.error('Error fetching page privileges:', err);
    }
  };

  const fetchTickets = async (user) => {
    try {
      const res = await api.get(`/tickets/by-role`, {
        params: {
          role: user.role,
          fullname: user.fullname,
          userID: user.userID
        }
      });
      setTickets(res.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const fetchTicketInfo = async (id) => {
    try {
      const res = await api.get(`/tickets/${id}`);
      setSelectedTicket(res.data);
    } catch (error) {
      console.error('Error fetching ticket info:', error);
    }
  };

  const fetchArticleInfo = async (slug) => {
    try {
      const res = await api.get(`/knowledge-base/${slug}`);
      setSelectedArticle(res.data);
    } catch (error) {
      console.error('Error fetching article info:', error);
    }
  };

  const handleArticleInfoUpdate = async (slug, updatedFields) => {
    try {
      await api.put(`/knowledge-base/${slug}`, updatedFields);
    } catch (err) {
      console.error('Error updating article info:', err);
    }
  };


  //======================== DELETE HANDLERS ==========================

  const deleteTicketCommentHandler = async (id) => {
    try {
      await api.delete(`/ticket-comments/${id}`);
      setTicketComments(prev => prev.filter((comment)=> comment._id !== id));
    }catch(err){
      console.error('Error deleting ticket comments:', err);
    }
  }

  const deleteNotificationHandler = async (id) => {
    try {
      const res = await api.delete(`/notifications/${id}`);
      setNotifications(prev => prev.filter((notif) => notif.notificationId !== id));
      setDeleteNotificationToastResponse(res.data.message);   
    } catch(err){
      console.error('Error deleting notification:', err);
    }
  }
 
  //========================= PRIVILEGE CHECK =========================
  const canView = useCallback((pageName) => {
    const page = pagePrivilege.find(p => p.page === pageName);
    return page?.view;
  }, [pagePrivilege]);

  //=========================== HELPERS ==============================
  const formatNotificationDate = (dateString) => {
    const localDate = new Date(dateString);
    const now = new Date();

    const isToday = localDate.toDateString() === now.toDateString();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = localDate.toDateString() === yesterday.toDateString();

    const time = localDate.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    if (isToday) return `Today ${time}`;
    if (isYesterday) return `Yesterday ${time}`;
    return `${(localDate.getMonth() + 1).toString().padStart(2, '0')}/${localDate.getDate().toString().padStart(2, '0')}/${localDate.getFullYear()} ${time}`;
  };

  const timeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const seconds = Math.floor((now - date) / 1000);
      if (isNaN(seconds)) return dateString;
      if (seconds < 60) return `${seconds}s ago`;
      const minutes = Math.floor(seconds / 60);
      if (minutes < 60) return `${minutes}m ago`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h ago`;
      const days = Math.floor(hours / 24);
      return `${days}d ago`;
    } catch {
      return dateString;
    }
  };

  const timeAgo2 = (dateString) => {
      if (!dateString) return 'Recently';
      try {
          const date = new Date(dateString);
          const now = new Date();
          const seconds = Math.floor((now - date) / 1000);
          if (isNaN(seconds)) return 'Recently';

          if (seconds < 60) return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
          const minutes = Math.floor(seconds / 60);
          if (minutes < 60) return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
          const hours = Math.floor(minutes / 60);
          if (hours < 24) return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
          const days = Math.floor(hours / 24);
          if (days < 7) return days === 1 ? '1 day ago' : `${days} days ago`;
          const weeks = Math.floor(days / 7);
          if (weeks < 4) return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
          const months = Math.floor(days / 30);
          if (months < 12) return months === 1 ? '1 month ago' : `${months} months ago`;
          const years = Math.floor(days / 365);
          return years === 1 ? '1 year ago' : `${years} years ago`;
      } catch {
          return 'Recently';
      }
  };

  //========================= SOCKET LISTENERS ========================
  useEffect(() => {
    const handleTicketCreated = (newTicket) => {
      setTickets(prev => [newTicket, ...prev]);
    };
    const handleTicketUpdated = (updatedTicket) => {
      setTickets(prev => prev.map(ticket => ticket._id === updatedTicket._id ? updatedTicket : ticket));
    };
    const handleTicketDeleted = (deletedId) => {
      setTickets(prev => prev.filter(ticket => ticket._id !== deletedId));
    };

    const handleNotificationCreated = (newNotification) => {
      if (userInfo.userID === newNotification.receiverUserId) {
        setPopupNotification(newNotification);
        setNotifications(prev => [newNotification, ...prev]);
      }
    };
    const handleNotificationUpdated = (updatedNotification) => {
      if (userInfo.userID === updatedNotification.receiverUserId) {
        setNotifications(prev => prev.map(n => n._id === updatedNotification._id ? updatedNotification : n));
      }
    };
    const handleNotificationDeleted = (deletedId) => {
      setNotifications(prev => prev.filter(n => n._id !== deletedId));
    };

    const handleArticleCreated = (newArticle) => {
      setArticles(prev => [newArticle, ...prev]);
    };
    const handleArticleUpdated = (updatedArticle) => {
      setArticles(prev => prev.map(article => article._id === updatedArticle._id ? updatedArticle : article));
    };
    const handleArticleDeleted = (deletedId) => {
      setArticles(prev => prev.filter(article => article._id !== deletedId));
    };

    socket.on('ticketCreated', handleTicketCreated);
    socket.on('ticketUpdated', handleTicketUpdated);
    socket.on('ticketDeleted', handleTicketDeleted);

    socket.on('notificationCreated', handleNotificationCreated);
    socket.on('notificationUpdated', handleNotificationUpdated);
    socket.on('notificationDeleted', handleNotificationDeleted);

    socket.on('articleCreated', handleArticleCreated);
    socket.on('articleUpdated', handleArticleUpdated);
    socket.on('articleDeleted', handleArticleDeleted);

    return () => {
      socket.off('ticketCreated', handleTicketCreated);
      socket.off('ticketUpdated', handleTicketUpdated);
      socket.off('ticketDeleted', handleTicketDeleted);

      socket.off('notificationCreated', handleNotificationCreated);
      socket.off('notificationUpdated', handleNotificationUpdated);
      socket.off('notificationDeleted', handleNotificationDeleted);

      socket.off('articleCreated', handleArticleCreated);
      socket.off('articleUpdated', handleArticleUpdated);
      socket.off('articleDeleted', handleArticleDeleted);
    };
  }, [userInfo]);

  //============================ PROVIDER =============================
  return (
    <AppContext.Provider value={{
      articles, setArticles,
      canView,
      createTicketRatingResponse, setCreateTicketRatingResponse,
      createArticleResponse, setCreateArticleResponse,
      createTicketResponse, setCreateTicketResponse,
      deleteArticleModal, setDeleteArticleModal,
      deleteTicketModal, setDeleteTicketModal,
      editTicketResponse, setEditTicketResponse,
      editArticleResponse, setEditArticleResponse,
      deleteArticleResponse, setDeleteArticleResponse,
      deleteTicketResponse, setDeleteTicketResponse,
      fetchAllUserRelatedData,
      fetchArticleInfo,
      fetchPagePrivilege,
      fetchTicketInfo,
      fetchTickets,
      formatNotificationDate,
      handleArticleInfoUpdate,
      navOpen, setNavOpen,
      notifications, setNotifications,
      pagePrivilege, setPagePrivilege,
      popupNotification, setPopupNotification,
      privilegeLoaded, setPrivilegeLoaded,
      rolePrivilege, setRolePrivilege,
      selectedArticle, setSelectedArticle,
      selectedTicket, setSelectedTicket,
      changeTicketStatusResponse, setChangeTicketStatusResponse,
      resetPassView, setResetPassView,
      tickets, setTickets,
      timeAgo, timeAgo2,
      userInfo, setUserInfo,
      users, setUsers,
      loading, setLoading,
      isRequestCodeSuccess, setIsRequestCodeSuccess,
      isResetPasswordSucces, setIsResetPasswordSuccess,
      resetCodeEmail, setResetCodeEmail,
      resetPassToken, setResetPassToken,
      resetPassVerificationCode, setResetPassVerificationCode,
      signupInfo, setSignupInfo,
      isSignupRequestCodeSuccess, setIsSignupRequestCodeSuccess,
      signupView, setSignupView,
      isEmailVerified, setIsEmailVerified,
      showRateTicketModal, setShowRateTicketModal,
      selectedTicketComment, setSelectedTicketComment,
      showDeleteTicketCommentModal, setShowDeleteTicketCommentModal,
      deleteTicketCommentHandler,
      ticketComments, setTicketComments,
      showDeleteNotificationModal, setShowDeleteNotificationModal,
      deleteNotificationHandler,
      selectedNotification, setSelectedNotification,
      deleteNotificationToastResponse, setDeleteNotificationToastResponse
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };