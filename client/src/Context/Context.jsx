import React, {useContext, useState} from 'react'


const AppContext = React.createContext();

const AppProvider = ({children}) => {
    const [ navOpen, setNavOpen] = useState(false); 
    const [ userInfo, setUserInfo ] = useState({});
    const [ rolePrivilege, setRolePrivilege ] = useState({});
    const [ tickets, setTickets ] = useState([])

    return(
        <AppContext.Provider value={{navOpen, setNavOpen, userInfo, setUserInfo, rolePrivilege, setRolePrivilege, tickets, setTickets}}>
            {children}
        </AppContext.Provider>
    )
}

const useGlobalContext = () => {
    return useContext(AppContext);
}


export {AppProvider, useGlobalContext};