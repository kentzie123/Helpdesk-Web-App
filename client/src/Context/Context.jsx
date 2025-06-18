import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import socket from '../socket';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [navOpen, setNavOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
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

    socket.on('notificationCreated', (newNotification) => {     
      if(userInfo.userID === newNotification.receiverUserId){
        setPopupNotification(newNotification);
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
      setPopupNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
