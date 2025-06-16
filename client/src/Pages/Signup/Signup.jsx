import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setResponseMessage("Passwords don't match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/create', {
        ProfilePic: "",
        fullname,
        email,
        password
      });

      setFullname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setResponseMessage(response.data.message);
      navigate('/');
    } catch (error) {
      setResponseMessage(error.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleSignup} className="login-form border shadow-sm rounded-2 p-4">
        <div className='d-flex flex-column align-items-center gap-4'>
          <div className='text-center'>
            <h3 className='fw-bold'>Sign up</h3>
            <p>Create your account</p>
          </div>

          <div className='d-flex flex-column gap-3 w-100'>
            <div className='position-relative'>
              <i className="bi bi-person-fill position-absolute top-50 translate-middle" style={{ left: '14px' }}></i>
              <input
                onChange={(e) => { setFullname(e.target.value); setResponseMessage(''); }}
                value={fullname}
                type="text"
                className="form-control p-2 ps-4"
                placeholder="Fullname"
              />
            </div>
            <div className='position-relative'>
              <i className="bi bi-envelope-fill position-absolute top-50 translate-middle" style={{ left: '14px' }}></i>
              <input
                onChange={(e) => { setEmail(e.target.value); setResponseMessage(''); }}
                value={email}
                type="email"
                className="form-control p-2 ps-4"
                placeholder="Email"
              />
            </div>
            <div className='position-relative'>
              <i className="bi bi-key-fill position-absolute top-50 translate-middle" style={{ left: '14px' }}></i>
              <input
                onChange={(e) => { setPassword(e.target.value); setResponseMessage(''); }}
                value={password}
                type="password"
                className="form-control p-2 ps-4"
                placeholder="Password"
              />
            </div>
            <div className='position-relative'>
              <i className="bi bi-key-fill position-absolute top-50 translate-middle" style={{ left: '14px' }}></i>
              <input
                onChange={(e) => { setConfirmPassword(e.target.value); setResponseMessage(''); }}
                value={confirmPassword}
                type="password"
                className="form-control p-2 ps-4"
                placeholder="Confirm Password"
              />
            </div>

            {responseMessage && (
              <div className={`text-center ${responseMessage === 'User created successfully' ? "text-success" : "text-danger"}`}>
                {responseMessage}
              </div>
            )}

            <button type="submit" className="btn btn-primary">Sign up</button>
          </div>

          <div className='text-center mt-4'>
            <div className='d-flex mt-1'>
              <div>Already have an account?</div>
              <Link className='text-decoration-none ms-2' to="/">Login</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
