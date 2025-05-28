import React, {useContext, useState} from 'react'


const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [ navOpen, setNavOpen] = useState(false);
    const [ users, setUsers ] = useState([]); 
    const [ userInfo, setUserInfo ] = useState({});
    const [ rolePrivilege, setRolePrivilege ] = useState({});
    const [ tickets, setTickets ] = useState([]);
    const [ deleteTicketModal, setDeleteTicketModal ] = useState(false);
    const [ selectedTicket, setSelectedTicket] = useState({});

    return(
        <AppContext.Provider value={{navOpen, setNavOpen, userInfo, setUserInfo, rolePrivilege, setRolePrivilege, tickets, setTickets, deleteTicketModal, setDeleteTicketModal, selectedTicket, setSelectedTicket, users, setUsers}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}


export {AppProvider, useGlobalContext};