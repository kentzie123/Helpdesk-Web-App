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

import { useGlobalContext } from './Context/Context';
import { useNavigate } from 'react-router-dom';



function App() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { userInfo, rolePrivilege, setRolePrivilege, setUserInfo, setTickets, deleteTicketModal, setUsers, users } = useGlobalContext();

  useEffect(() => {
  const checkLogin = async () => {
    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser) {
      setUserInfo(savedUser);
      try {
        const getRole = await axios.get(`http://localhost:3000/api/roles/${savedUser.role}`);
        const getTickets = await axios.get('http://localhost:3000/api/tickets');
        const getUsers = await axios.get('http://localhost:3000/api/users');
        setUsers(getUsers.data);      
        setTickets(getTickets.data);
        setRolePrivilege(getRole.data);

        if (window.location.pathname === '/') {
          navigate('/ticket');
        }
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  };

  checkLogin();
}, []);


  return (
    <div className='position-relative'>
      {
        deleteTicketModal && <DeleteTicketModal/>
      }
      <Routes>
        
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/forgot' element={<Forgot/>}/>
          <Route path='/403' element={<Page403/>}/>
          <Route element={<Layout />}>
            <Route path='/ticket' element={
              loading ? null : (rolePrivilege.tickets ? <Tickets /> : <Navigate to="/403" />)
            }/>

            <Route path='/user' element={
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
