import React, { useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import socket from '../socket';
import { API_BASE } from '../config/api';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {

  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [rolePrivilege, setRolePrivilege] = useState({});
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [deleteTicketModal, setDeleteTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState({})
  //--------------------------------------------------------------------
  const [createTicketResponse, setCreateTicketResponse] = useState('');
  const [editTicketResponse, setEditTicketResponse] = useState('');
  const [startWorkingResponse, setStartWorkingResponse] = useState('');
  const [createArticleResponse, setCreateArticleResponse] = useState('');
  //--------------------------------------------------------------------
  const [navOpen, setNavOpen] = useState(false);
  const [popupNotification, setPopupNotification] = useState(null);
  const [pagePrivilege, setPagePrivilege] = useState([]);
  const [privilegeLoaded, setPrivilegeLoaded] = useState(false);
  const [deleteArticleModal, setDeleteArticleModal] = useState(false);

  


  const fetchAllUserRelatedData = async (user) => {
  try {
    await fetchPagePrivilege(Number(user.role)); // sets pagePrivilege
    const [notificationsRes, roleRes, usersRes, articlesRes] = await Promise.all([
      axios.get(`${API_BASE}/api/notifications/${user.userID}`),
      axios.get(`${API_BASE}/api/roles/${user.role}`),
      axios.get(`${API_BASE}/api/users`),
      axios.get(`${API_BASE}/api/knowledge-base`)
    ]);

    fetchTickets(user); // sets tickets
    setNotifications(notificationsRes.data.notifications);
    setUsers(usersRes.data);
    setRolePrivilege(roleRes.data);
    setArticles(articlesRes.data);
    
    setPrivilegeLoaded(true);
    return true; // success
  } catch (error) {
    console.error('Error fetching user-related data:', error);
    return false;
  }
};








  // Fetch tickets based on user info
  const fetchTickets = async (user) => {
    try {
      const res = await axios.get(`${API_BASE}/api/tickets/by-role`, {
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

  // Fetch a single ticket info
  const fetchTicketInfo = async (id) => {
    try {
      const res = await axios.get(`${API_BASE}/api/tickets/${id}`);
      setSelectedTicket(res.data);
    } catch (error) {
      console.error('Error fetching ticket info:', error);
    }
  };

  const fetchArticleInfo = async (slug) =>{
    try {
      const res = await axios.get(`${API_BASE}/api/knowledge-base/${slug}`);
      setSelectedArticle(res.data);
    } catch(error) {
      console.error('Error fetching article info:', error);
    }
  }




  // Fetch page privileges for a specific role
  const fetchPagePrivilege = async (roleId) => {
  try {
    const res = await axios.get(`${API_BASE}/api/privilege/${roleId}`);
    setPagePrivilege(res.data);
    
  } catch (err) {
    console.error('Error fetching page privileges:', err);
  }
};

  const canView = useCallback((pageName) => {
    const page = pagePrivilege.find(p => p.page === pageName);
    return page?.view;
  },[pagePrivilege]);







  // Format date for notifications
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





  // Socket listeners
  useEffect(() => {

    const handleTicketCreated = (newTicket) => {
      setTickets(prev => [newTicket, ...prev]);
    };

    const handleTicketUpdated = (updatedTicket) => {
      setTickets(prev =>
        prev.map(ticket => ticket._id === updatedTicket._id ? updatedTicket : ticket)
      );
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
        setNotifications(prev =>
          prev.map(n => n._id === updatedNotification._id ? updatedNotification : n)
        );
      }
    };

    const handleNotificationDeleted = (notificationsDeletedId) => {
      setNotifications(prev => prev.filter(n => n._id !== notificationsDeletedId));
    }

    // Attach listeners
    socket.on('ticketCreated', handleTicketCreated);
    socket.on('ticketUpdated', handleTicketUpdated);
    socket.on('ticketDeleted', handleTicketDeleted);
    socket.on('notificationCreated', handleNotificationCreated);
    socket.on('notificationUpdated', handleNotificationUpdated);
    socket.on('notificationDeleted', handleNotificationDeleted)

    // Cleanup on unmount
    return () => {
      socket.off('ticketCreated', handleTicketCreated);
      socket.off('ticketUpdated', handleTicketUpdated);
      socket.off('ticketDeleted', handleTicketDeleted);
      socket.off('notificationCreated', handleNotificationCreated);
      socket.off('notificationUpdated', handleNotificationUpdated);
      socket.off('notificationDeleted', handleNotificationDeleted)
    };
  }, [userInfo]);









  return (
    <AppContext.Provider value={{
      fetchAllUserRelatedData,
      navOpen, setNavOpen,
      users, setUsers,
      userInfo, setUserInfo,
      rolePrivilege, setRolePrivilege,
      tickets, setTickets,
      deleteTicketModal, setDeleteTicketModal,
      selectedTicket, setSelectedTicket,
      createTicketResponse, setCreateTicketResponse,
      editTicketResponse, setEditTicketResponse,
      startWorkingResponse, setStartWorkingResponse,
      notifications, setNotifications,
      popupNotification, setPopupNotification,
      pagePrivilege,setPagePrivilege,
      privilegeLoaded, setPrivilegeLoaded,
      deleteArticleModal, setDeleteArticleModal,
      articles, setArticles,
      selectedArticle, setSelectedArticle,
      createArticleResponse, setCreateArticleResponse,
      fetchTickets,
      fetchTicketInfo,
      formatNotificationDate,
      fetchPagePrivilege,
      fetchArticleInfo,
      canView,
      timeAgo
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
