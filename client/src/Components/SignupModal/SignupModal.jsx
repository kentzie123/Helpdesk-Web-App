import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './SignupModal.css';
import { API_BASE } from '../../config/api';
import { useGlobalContext } from '../../Context/Context';

const SignupModal = () => {
  const { setSignupView, setSignupInfo, setLoading, loading, setIsSignupRequestCodeSuccess } = useGlobalContext();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [isPassHidden, setIsPassHidden] = useState(true);
  const [isConfirmPassHidden, setIsConfirmPassHidden] = useState(true);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      setResponseMessage("Passwords don't match!");
      return;
    }

    try {
      await axios.post(`${API_BASE}/api/signup/generate-code`, {
        fullname,
        email,
        password
      });

      setLoading(false);
      setResponseMessage('');
      setSignupInfo({
        fullname,
        email,
        password
      });
      setFullname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');

      setIsSignupRequestCodeSuccess(true);
      setSignupView('verify-email');
    } catch (error) {
      setLoading(false);
      setResponseMessage(error.response?.data?.error || "Signup failed.");
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center flex-column vh-100'>
      <div className='text-center mb-4'>
        <h4 className='fw-bold'>Create your account</h4>
        <div className='text-muted f-size-14'>Join the helpdesk management system</div>
      </div>

      <form className='p-4 rounded-3 shadow border' onSubmit={handleSignup}>
        <h5 className='fw-medium text-center mb-4'>Sign Up</h5>

        <div className='signup-container d-flex flex-column gap-2'>
          <div>
            <label htmlFor="fullname-signup" className="form-label f-size-14 fw-medium">Fullname</label>
            <div className="position-relative">
              <i className="bi bi-person text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <input
                type="text"
                className="form-control ps-5 email-signin-input f-size-14"
                id="fullname-signup"
                placeholder="Enter your name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email-signup" className="form-label f-size-14 fw-medium">Email</label>
            <div className="position-relative">
              <i className="bi bi-envelope text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <input
                type="email"
                className="form-control ps-5 email-signin-input f-size-14"
                id="email-signup"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-signup" className="form-label f-size-14 fw-medium">Password</label>
            <div className="position-relative">
              <i className="bi bi-lock text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <i
                onClick={() => setIsPassHidden((prev) => !prev)}
                className={`bi ${isPassHidden ? 'bi-eye' : 'bi-eye-slash'} password-hide-icon text-secondary position-absolute top-50 end-0 translate-middle-y me-3 icon-bold`}
                style={{ cursor: 'pointer' }}
              ></i>
              <input
                type={isPassHidden ? 'password' : 'text'}
                className="form-control ps-5 pe-5 password-signin-input f-size-14"
                id="password-signup"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password-signup" className="form-label f-size-14 fw-medium">Confirm Password</label>
            <div className="position-relative">
              <i className="bi bi-lock text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
              <i
                onClick={() => setIsConfirmPassHidden(prev => !prev)}
                className={`bi ${isConfirmPassHidden ? 'bi-eye' : 'bi-eye-slash'} password-hide-icon text-secondary position-absolute top-50 end-0 translate-middle-y me-3 icon-bold`}
                style={{ cursor: 'pointer' }}
              ></i>
              <input
                type={isConfirmPassHidden ? 'password' : 'text'}
                className="form-control ps-5 pe-5 password-signin-input f-size-14"
                id="confirm-password-signup"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {responseMessage && (
            <div className="alert alert-info f-size-14 py-2 mt-2 text-center" role="alert">
              {responseMessage}
            </div>
          )}

          <button type='submit' className='btn btn-primary fw-medium' disabled={loading}>
              {loading ? 'Please wait...' : 'Create Account'}
          </button>

          <hr />

          <div className="text-center f-size-14">
            <span>Already have an account?</span>
            <Link className="text-decoration-none fw-medium ms-1" to={'/'}>
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupModal;
