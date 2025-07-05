import './ForgotPasswordS3.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { API_BASE } from '../../config/api';
import { useGlobalContext } from '../../Context/Context';

const Forgot3 = () => {
    const { resetPassVerificationCode, setResetPassVerificationCode, resetCodeEmail, setResetCodeEmail, resetPassToken, setResetPassToken, setLoading, loading, setResetPassView, setIsResetPasswordSuccess } = useGlobalContext();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPassHidden, setIsPassHidden] = useState(true);
    const [isConfirmPassHidden, setIsConfirmPassHidden] = useState(true);

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        if (password !== confirmPassword) {
            setLoading(false);
            return setError('Passwords do not match!');
        }

        try{
            await axios.post(`${API_BASE}/api/reset-password`, {
                email: resetCodeEmail,
                code: resetPassVerificationCode, 
                resetToken: resetPassToken, 
                newPassword: password
            })
            setLoading(false);
            setIsResetPasswordSuccess(true);
            setResetPassVerificationCode('');
            setResetCodeEmail('');
            setResetPassToken('');
            navigate('/');
            setResetPassView('s1');
        }catch(err){
            setLoading(false);
            console.log(err);
            
            setError(err.response?.data?.error || 'Something went wrong!');
        }
    }

    return (
        <div className='vh-100 d-flex align-items-center justify-content-center flex-column'>
            
            <div className='mb-4 text-center'>
                <h4 className='fw-bold'>Reset your password</h4>
                <div className='f-size-14 text-muted'>Create a new password for your account</div>
            </div>

            <form onSubmit={handleChangePassword} className='forgot-pass-container d-flex flex-column gap-3 rounded-3 shadow border p-4'>
                <div>
                    <h5 className='fw-medium text-center'>New password</h5>
                    <div className='d-flex align-items-center justify-content-center gap-3'>
                    <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium'>1</div>
                    <div className='bg-primary' style={{width:'45px', height: '2px'}}></div>
                    <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium'>2</div>
                    <div className='bg-primary' style={{width:'45px', height: '2px'}}></div>
                    <div className='d-flex justify-content-center align-items-center forgot-pass-stage rounded-circle p-3 text-bg-primary fw-medium'>3</div>
                    </div>
                </div>

                {error && <div className="alert alert-light m-0 text-danger f-size-14" role="alert"><i className="bi bi-exclamation-circle icon-bold me-2"></i>{error}</div>}

                <div>
                    <label htmlFor="password-signup" className="form-label f-size-14 fw-medium">New Password</label>
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
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="confirm-password-signup" className="form-label f-size-14 fw-medium">Confirm New Password</label>
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
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>  
                </div>

                <button type='submit' className='btn btn-primary fw-medium' disabled={loading}>
                    {loading ? 'Saving...' : 'Change Password'}
                </button>

                <hr />

                <Link to={'/'} className='text-decoration-none f-size-14 text-center'><i className="bi bi-arrow-left icon-bold me-1"></i> Back to login</Link>


            </form>

        </div>
    )
}

export default Forgot3