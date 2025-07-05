import './VerifyEmail.css';

import { Link } from 'react-router-dom';

const VerifyEmail = () => {
  return (
    <div className='vh-100 d-flex justify-content-center align-items-center flex-column'>
        <div className='text-center mb-4'>
            <i className='bi bi-check2-circle text-success icon-bold' style={{fontSize: '50px'}}></i>
            <h3 className='fw-bold'>Verify your email</h3>
            <div className='f-size-14 text-muted'>We've sent a verification code to sample@email.com</div>
        </div>
        <form className='verify-email-container d-flex flex-column gap-3 rounded-3 shadow border p-4'>
            <h5 className='text-center'>Email Verification</h5>
            <div>
                <label htmlFor="forgot-pass-code" className="form-label f-size-14 fw-medium">Verification Code</label>
                <input
                    type="email"
                    className="form-control email-signin-input f-size-14 text-center"
                    id="forgot-pass-code"
                    placeholder="Enter 6-digit code"
                    required
                />
            </div>
            <button type='submit' className='btn btn-primary f-size-14 fw-medium'>Verify Email</button>
            <Link className='f-size-14 text-decoration-none text-center'>Didn't receive the code? Resend</Link>
        </form>
    </div>
  )
}

export default VerifyEmail