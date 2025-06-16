import { useState } from 'react';
import axios from 'axios'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Context/Context';


const Login = () => {

  const navigate = useNavigate();
  const { setUserInfo, setRolePrivilege, rolePrivilege } = useGlobalContext();
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleHidePassword = ()=>{
    setIsPassHidden(prev => !prev);
  }

  const handleLogin = async (e) =>{
    e.preventDefault();
    try {
      const loginUserResponse = await axios.post('http://localhost:3000/api/login', {
        email,
        password
      });
      setEmail('');
      setPassword('');
      localStorage.setItem('user', JSON.stringify(loginUserResponse.data.user));
      setResponseMessage(loginUserResponse.data.message);
      setUserInfo(loginUserResponse.data.user);
      console.log(loginUserResponse.data.user);
      

      const getRole = await axios.get(`http://localhost:3000/api/roles/${loginUserResponse.data.user.role}`);
      setRolePrivilege(getRole.data)
      navigate('/tickets');

    } catch(error){

      if (error.response) {
        setResponseMessage(error.response.data.error);
      } else {
        setResponseMessage('Something went wrong.');
      }
    }

  }





  return (
    <div className='login-container'>
        <form onSubmit={handleLogin} className="login-form border shadow-sm rounded-2 p-4">
            <div className='d-flex flex-column align-items-center gap-4'>
              <div className='text-center'>
                <h3 className='fw-bold'>Welcome Back</h3>
                <p>Enter your credentials to login</p>
              </div>
              
              <div className='d-flex flex-column gap-3 w-100'>
                <div className='position-relative'> 
                  <i className="bi bi-envelope-fill position-absolute top-50 translate-middle" style={{left: '14px'}}></i>
                  <input onChange={(e)=>{setEmail(e.target.value); setResponseMessage('')}} value={email} type="email" className="form-control p-2 ps-4" id="exampleFormControlInput1" placeholder="Email"/>
                </div>
                <div className='position-relative'> 
                  <i className="bi bi-key-fill position-absolute top-50 translate-middle" style={{left: '14px'}}></i>
                  <input onChange={(e)=>{setPassword(e.target.value); setResponseMessage('')}} value={password} type={isPassHidden?'password':'text'}  className="form-control ps-4" id="exampleFormControlInput2" placeholder="Password"/>
                  <i className={`${isPassHidden?'bi bi-eye-fill': 'bi bi-eye-slash-fill'} position-absolute top-50 end-0 translate-middle`} style={{cursor:"pointer"}} onClick={handleHidePassword}></i>
                </div>
                {responseMessage && <div className={`text-center ${responseMessage === 'Login successful'? "text-success": "text-danger"}`}>{responseMessage}</div>}
                <button type="submit" className="btn btn-primary">Login</button>
              </div>
              
              <div className='text-center mt-4'>
                <Link className='text-decoration-none' to="/forgot">Forgot password?</Link>
                <div className='d-flex mt-1'>
                  <div>Don't have an account?</div>
                  <Link className='text-decoration-none ms-2' to="/signup">Signup</Link>
                </div>
              </div>
            </div>
        </form>
    </div>
  )
}

export default Login