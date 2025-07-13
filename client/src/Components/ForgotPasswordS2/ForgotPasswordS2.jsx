import './ForgotPasswordS2.css';
import { Link } from 'react-router-dom';
import api from '../../api/api';

import { useState } from 'react';
import { useGlobalContext } from '../../Context/Context';


const Forgot2 = () => {
    const { resetCodeEmail, setResetPassView, setLoading, loading, setResetPassToken,resetPassVerificationCode, setResetPassVerificationCode } = useGlobalContext();
    const [error, setError] = useState('');

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            const res = await api.post(`/verify-code`, {
                email: resetCodeEmail,
                code: resetPassVerificationCode
            })
            setLoading(false);
            setResetPassToken(res.data.resetToken);
            setResetPassView('s3');
        }catch(err){
            setLoading(false); 
            setError(err.response.data.error);
        }
    }

    return (
        <div className='vh-100 d-flex align-items-center justify-content-center flex-column'>
        
            <div className='mb-4 text-center'>
                <h4 className='fw-bold'>Reset your password</h4>
                <div className='f-size-14 text-muted'>Enter the verification code sent to your email</div>
            </div>

            <form onSubmit={handleVerifyCode} className='forgot-pass-container d-flex flex-column gap-3 rounded-3 shadow border p-4'>
                <div>
                    <h5 className='fw-medium text-center'>Verify code</h5>
                    <div className='d-flex align-items-center justify-content-center gap-3'>
                    <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium'>1</div>
                    <div className='bg-primary' style={{width:'45px', height: '2px'}}></div>
                    <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium'>2</div>
                    <div className='bg-secondary-subtle' style={{width:'45px', height: '2px'}}></div>
                    <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 bg-secondary-subtle fw-medium text-muted'>3</div>
                    </div>
                </div>

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
                    value={resetPassVerificationCode}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d{0,6}$/.test(value)) {
                        setResetPassVerificationCode(value);
                        }
                    }}
                    />

                </div>

                <button type='submit' className='btn btn-primary fw-medium' disabled={loading}>
                    {loading ? 'Verifying...' : 'Verify code'}
                </button>

                <Link to={'/'} className='text-decoration-none f-size-14 text-center'>Didn't receive the code? Resend</Link>

                <hr />

                <Link to={'/'} className='text-decoration-none f-size-14 text-center'><i className="bi bi-arrow-left icon-bold me-1"></i> Back to login</Link>
            </form>

        </div>
    )
}

export default Forgot2