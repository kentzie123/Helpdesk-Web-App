import './SignUpVerifyEmail.css';

import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../Context/Context';
import api from '../../api/api';
import { useState } from 'react';

const SignUpVerifyEmail = () => {
    const navigate = useNavigate();
    const [verificationCode, setVerificationCode] = useState('');
    const [error, setError] = useState('');
    const { signupInfo, setLoading, setIsEmailVerified, loading } = useGlobalContext();
    
    const handleVerifyEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            await api.post(`/signup/create-account`,{
                email: signupInfo.email,
                password: signupInfo.password,
                fullname: signupInfo.fullname,
                code: verificationCode
            });
            setLoading(false);
            setIsEmailVerified(true);
            setError('');
            navigate('/');
        }catch(err){
            setLoading(false);
            setError(err.response?.data?.error || 'Something went wrong!');
            console.log(err);
        }

    }

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center flex-column'>
            <div className='text-center mb-4'>
                <i className='bi bi-check2-circle text-success icon-bold' style={{fontSize: '50px'}}></i>
                <h3 className='fw-bold'>Verify your email</h3>
                <div className='f-size-14 text-muted'>{`We've sent a verification code to ${signupInfo.email}`}</div>
            </div>
            <form onSubmit={handleVerifyEmail} className='verify-email-container d-flex flex-column gap-3 rounded-3 shadow border p-4'>
                <h5 className='text-center'>Email Verification</h5>

                {error && <div className="alert alert-light m-0 text-danger f-size-14" role="alert"><i className="bi bi-exclamation-circle icon-bold me-2"></i>{error}</div>}

                <div>
                    <label htmlFor="forgot-pass-code" className="form-label f-size-14 fw-medium">Verification Code</label>
                    <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d{6}"
                    maxLength={6}
                    className="form-control email-signin-input f-size-14 text-center"
                    id="forgot-pass-code"
                    placeholder="Enter 6-digit code"
                    required
                    value={verificationCode}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                        setVerificationCode(value);
                        }
                    }}
                    />

                </div>

                <button type='submit' className='btn btn-primary fw-medium' disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify Email'}
                </button>
                <Link className='f-size-14 text-decoration-none text-center'>Didn't receive the code? Resend</Link>
            </form>
        </div>
    )
}

export default SignUpVerifyEmail;