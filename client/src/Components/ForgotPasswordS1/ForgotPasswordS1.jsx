import './ForgotPasswordS1.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_BASE } from '../../config/api';

import { useGlobalContext } from '../../Context/Context';

const Forgot1 = () => {
  const { setResetPassView, setLoading, setIsRequestCodeSuccess, resetCodeEmail, setResetCodeEmail } = useGlobalContext();

  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState(null);

  const handleRequestResePassCode = async (e) => {
    setLoading(true);
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${API_BASE}/api/confirmation-code`, {
        email: resetCodeEmail,
      });

      setResetPassView('s2');
      setLoading(false);
      setIsRequestCodeSuccess(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response?.data?.error) {
        setError(err.response.data.error);

        if (err.response.data.cooldown) {
          const seconds = err.response.data.cooldown;
          setCooldown(seconds);
          if (countdownInterval) clearInterval(countdownInterval);

          const interval = setInterval(() => {
            setCooldown((prev) => {
              if (prev <= 1) {
                clearInterval(interval);
                return 0;
              }
              return prev - 1;
            });
          }, 1000);

          setCountdownInterval(interval);
        }
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // Clear alerts after 5 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className='vh-100 d-flex align-items-center justify-content-center flex-column'>
      <div className='mb-4 text-center'>
        <h4 className='fw-bold'>Reset your password</h4>
        <div className='f-size-14 text-muted'>Enter your email to receive a reset code</div>
      </div>

      <form onSubmit={handleRequestResePassCode} className='forgot-pass-container d-flex flex-column gap-3 rounded-3 shadow border p-4'>
        <div>
          <h5 className='fw-medium text-center'>Find your account</h5>
          <div className='d-flex align-items-center justify-content-center gap-3'>
            <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium'>1</div>
            <div className='bg-secondary-subtle' style={{ width: '45px', height: '2px' }}></div>
            <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 bg-secondary-subtle fw-medium text-muted'>2</div>
            <div className='bg-secondary-subtle' style={{ width: '45px', height: '2px' }}></div>
            <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 bg-secondary-subtle fw-medium text-muted'>3</div>
          </div>
        </div>

        {error && <div className="alert alert-light m-0 text-danger text-center f-size-14" role="alert"><i className="bi bi-exclamation-circle icon-bold me-2"></i>{error}</div>}

        <div>
          <label htmlFor="email-signup" className="form-label f-size-14 fw-medium">Email</label>
          <div className="position-relative">
            <i className="bi bi-envelope text-secondary position-absolute top-50 start-0 translate-middle-y ms-3 icon-bold"></i>
            <input
              type="email"
              className="form-control ps-5 email-signin-input f-size-14"
              id="email-signup"
              placeholder="Enter your email"
              value={resetCodeEmail}
              onChange={(e) => setResetCodeEmail(e.target.value)}
              disabled={cooldown > 0}
              required
            />
          </div>
        </div>

        <button type='submit' className='btn btn-primary fw-medium' disabled={cooldown > 0}>
          {cooldown > 0 ? `Please wait ${cooldown}s` : 'Send reset code'}
        </button>

        <hr />

        <Link to={'/'} className='text-decoration-none f-size-14 text-center'>
          <i className="bi bi-arrow-left icon-bold me-1"></i> Back to login
        </Link>
      </form>
    </div>
  );
};

export default Forgot1;