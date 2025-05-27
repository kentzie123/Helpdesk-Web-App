import React, {useContext, useState} from 'react'


const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [ navOpen, setNavOpen] = useState(false); 
    const [ userInfo, setUserInfo ] = useState({});
    const [ rolePrivilege, setRolePrivilege ] = useState({});
    const [ tickets, setTickets ] = useState([]);
    const [ deleteModal, setDeleteModal ] = useState(false);
    const [ selectedTicket, setSelectedTicket] = useState({});

    return(
        <AppContext.Provider value={{navOpen, setNavOpen, userInfo, setUserInfo, rolePrivilege, setRolePrivilege, tickets, setTickets, deleteModal, setDeleteModal, selectedTicket, setSelectedTicket}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}


export {AppProvider, useGlobalContext};