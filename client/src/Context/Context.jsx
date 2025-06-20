import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [rolePrivilege, setRolePrivilege] = useState({});
  const [tickets, setTickets] = useState([]);
  const [deleteTicketModal, setDeleteTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState({});
  const [createTicketResponse, setCreateTicketResponse] = useState("");
  const [editTicketResponse, setEditTicketResponse] = useState("");
  const [startWorkingResponse, setStartWorkingResponse] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [popupNotification, setPopupNotification] = useState(null);

  // Fetch tickets initially
  const fetchTickets = async (userInfo) => {
    try {
      const res = await axios.get("http://localhost:3000/api/tickets/by-role",{
        params: {role: userInfo.role, fullname: userInfo.fullname, userID: userInfo.userID}
      });
      
      setTickets(res.data);
      
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  // Fetch one ticket info
  const fetchTicketInfo = async (id) => {
    try {
      const getSelectedTicket = await axios.get(`http://localhost:3000/api/tickets/${id}`);
      setSelectedTicket(getSelectedTicket.data);
    } catch (err) {
      console.log(err);
    }
  };

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
            hour12: true,
        });

        if (isToday) return `Today ${time}`;
        if (isYesterday) return `Yesterday ${time}`;
        return `${(localDate.getMonth() + 1).toString().padStart(2, '0')}/${localDate.getDate().toString().padStart(2, '0')}/${localDate.getFullYear()} ${time}`;
    };

  // Setup socket listeners for live updates
  useEffect(() => {
    // When a ticket is created
    socket.on('ticketCreated', (newTicket) => {
      setTickets(prev => [newTicket, ...prev]);
    });

    // When a ticket is updated
    socket.on('ticketUpdated', (updatedTicket) => {
      setTickets(prev =>
        prev.map(ticket => ticket._id === updatedTicket._id ? updatedTicket : ticket)
      );
    });

    // When a ticket is deleted
    socket.on('ticketDeleted', (deletedId) => {
      setTickets(prev => prev.filter(ticket => ticket._id !== deletedId));
    });


    //Notification Socket

    // When a notification is created
    socket.on('notificationCreated', (newNotification) => {     
      if(userInfo.userID === newNotification.receiverUserId){
        setPopupNotification(newNotification);
        setNotifications(prev => [newNotification, ...prev]);
      }
    })

    // When a notification is updated
    socket.on('notificationUpdated', (updatedNotification) => {
      if(userInfo.userID === updatedNotification.receiverUserId){
        setNotifications(prev =>
          prev.map( notification => notification._id === updatedNotification._id ? updatedNotification : notification)
        )
      }
    })

    // Cleanup on unmount
    return () => {
      socket.off('ticketCreated');
      socket.off('ticketUpdated');
      socket.off('ticketDeleted');
      socket.off('notificationCreated');
    };
  }, [userInfo]);

  return (
    <AppContext.Provider value={{
      startWorkingResponse, 
      setStartWorkingResponse,
      fetchTicketInfo,
      editTicketResponse,
      setEditTicketResponse,
      createTicketResponse,
      setCreateTicketResponse,
      fetchTickets,
      navOpen,
      setNavOpen,
      userInfo,
      setUserInfo,
      rolePrivilege,
      setRolePrivilege,
      tickets,
      setTickets,
      deleteTicketModal,
      setDeleteTicketModal,
      selectedTicket,
      setSelectedTicket,
      users,
      setUsers,
      notifications, 
      setNotifications,
      popupNotification, 
      setPopupNotification,
      formatNotificationDate
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
