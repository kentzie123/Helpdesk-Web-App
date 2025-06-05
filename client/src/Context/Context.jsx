import React, {useContext, useState} from 'react'
import axios from 'axios';

const AppContext = React.createContext();

    

const AppProvider = ({children}) => {
    const [ navOpen, setNavOpen] = useState(false);
    const [ users, setUsers ] = useState([]); 
    const [ userInfo, setUserInfo ] = useState({});
    const [ rolePrivilege, setRolePrivilege ] = useState({});
    const [ tickets, setTickets ] = useState([]);
    const [ deleteTicketModal, setDeleteTicketModal ] = useState(false);
    const [ selectedTicket, setSelectedTicket] = useState({});
    const [ createTicketResponse, setCreateTicketResponse ] = useState("");
    const [ editTicketResponse, setEditTicketResponse] = useState("");

    const fetchTickets = async () => {
        try {
        const res = await axios.get("http://localhost:3000/api/tickets");
        setTickets(res.data);
        } catch (error) {
        console.error("Error fetching tickets:", error);
        }
    };
    return(
        <AppContext.Provider value={{editTicketResponse, setEditTicketResponse, createTicketResponse, setCreateTicketResponse, fetchTickets, navOpen, setNavOpen, userInfo, setUserInfo, rolePrivilege, setRolePrivilege, tickets, setTickets, deleteTicketModal, setDeleteTicketModal, selectedTicket, setSelectedTicket, users, setUsers}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}


export {AppProvider, useGlobalContext};