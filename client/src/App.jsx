import { Routes, Route, Navigate, } from 'react-router-dom';
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

import { useGlobalContext } from './Context/Context';
import { useNavigate } from 'react-router-dom';




function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const 
    {
      rolePrivilege, 
      setRolePrivilege, 
      setUserInfo,
      deleteTicketModal, 
      setUsers, 
      createTicketResponse,
      editTicketResponse,
      startWorkingResponse,
      fetchTickets,
      userInfo
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
  const fetchUserRelatedData = async () => {
    if (userInfo?.userID) {
      try {
        const getRole = await axios.get(`http://localhost:3000/api/roles/${userInfo.role}`);
        const getUsers = await axios.get('http://localhost:3000/api/users');
        fetchTickets(userInfo)
        setUsers(getUsers.data);
        setRolePrivilege(getRole.data);

        if (window.location.pathname === '/') {
          navigate('/tickets');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  fetchUserRelatedData();
}, [userInfo]);



  return (
    <div className='position-relative'>
      {
        deleteTicketModal && <DeleteTicketModal/>
      }
      { createTicketResponse === "Created ticket successfully"? <CreateTicketToastResponse/> : null }
      { editTicketResponse === "Ticket updated successfully"? <EditTicketToastResponse/> : null }
      { startWorkingResponse === "Ticket is now in progress" ? <StartWorkingToastResponse/> : null }
      
      <Routes>
        
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot' element={<Forgot/>}/>
          <Route path='/403' element={<Page403/>}/>
          <Route element={<Layout />}>
            <Route path='/tickets' element={
              loading ? null : (rolePrivilege.tickets ? <Tickets /> : <Navigate to="/403" />)
            }/>

            <Route path='/users' element={
              loading ? null : (rolePrivilege.users ? <Users /> : <Navigate to="/403" />)
            }/>

            <Route path='/ticket/:id' element={
              loading ? null : (rolePrivilege.tickets ? <TicketInfo /> : <Navigate to="/403" />)
            }/>
          </Route>

      </Routes>
    </div>
      
  )
}

export default App
