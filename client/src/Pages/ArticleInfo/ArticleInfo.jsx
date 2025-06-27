import './ArticleInfo.css';

const ArticleInfo = () => {
  return (
    <div className='px-5 py-3'>
        <div className='d-flex flex-column gap-4'>
            <button className='btn btn-light fw-medium' style={{width: '210px'}}><i className='bi bi-arrow-left me-2'></i> Back to Knowledge Base</button>
            <div class="card border-0 shadow-sm p-4 d-flex flex-column gap-2 rounded-3 position-relative">
                <div class="d-flex justify-content-between align-items-start">
                    <div class="d-flex align-items-center gap-3 text-body-secondary">
                        <span class="badge rounded-pill text-primary bg-primary-subtle">Security</span>
                        <span class="text-muted small"><i class="bi bi-eye me-1 icon-bold"></i>570 views</span>
                    </div>
                    <div class="d-flex align-items-center gap-1 ">
                        <i class="bi bi-star-fill text-warning"></i>
                        <span class="fw-semibold">4.90</span>
                        <span class="text-muted small">(10 ratings)</span>
                    </div>
                </div>

                <h5 class="fw-bold mt-1 mb-2">Setting Up Two-Factor Authentication</h5>

                <div class="d-flex flex-wrap gap-3 text-muted small align-items-center">
                    <div><i class="bi bi-person me-1 icon-bold"></i> By Emily Davis</div>
                    <div><i class="bi bi-calendar-event me-1 icon-bold"></i> Published 3 days ago</div>
                    <div><i class="bi bi-clock me-1 icon-bold"></i> Updated 21 minutes ago</div>
                </div>
            </div>
            <div className='p-4 border shadow-sm rounded-3' style={{whiteSpace: 'pre-wrap'}}>
                {`# Two-Factor Authentication Setup

                ## What is 2FA?

                Two-factor authentication adds an extra layer of security to your account by requiring two forms of verification.

                ## Setup Steps

                1. Log into your account
                2. Go to Security Settings
                3. Click 'Enable 2FA'
                4. Choose your preferred method:
                - SMS verification
                - Authenticator app (recommended)
                - Email verification

                ## Using Authenticator Apps

                1. Download an authenticator app (Google Authenticator, Authy, etc.)
                2. Scan the QR code displayed
                3. Enter the 6-digit code from your app
                4. Save your backup codes in a secure location

                ## Important Notes

                - Keep backup codes safe and accessible
                - Update your phone number if using SMS
                - Test 2FA before fully enabling`}
            </div>

            <div className='p-4 border shadow-sm rounded-3'>
                <div><i class="bi bi-tag text-body-secondary icon-bold"></i> Tags</div>
                <div className='d-flex gap-3 mt-2'>
                    {
                        ['2fa','security','setup'].map((tag)=>(
                            <div className='badge rounded-pill border text-dark'>#{tag}</div>
                        ))
                    }
                </div>
            </div>

            <div className='p-4 border shadow-sm rounded-3'>
                <h5 className='fw-medium m-0'><i class="bi bi-hand-thumbs-up me-2"></i>Was this article helpful?</h5>
                <div className="mt-2">
                    <div className='d-flex justify-content-between f-size-14'>
                        <div className="d-flex align-items-center gap-3">
                            <div className='fw-medium'>Rate this article</div>
                            <div className='d-flex gap-1 f-size-16'>
                                <i class="bi bi-star icon-bold opacity-25"></i>
                                <i class="bi bi-star icon-bold opacity-25"></i>
                                <i class="bi bi-star icon-bold opacity-25"></i>
                                <i class="bi bi-star icon-bold opacity-25"></i>
                                <i class="bi bi-star icon-bold opacity-25"></i>
                            </div>
                        </div>
                        <div>
                            <div className='text-muted'><i className='bi bi-star-fill text-warning icon-bold me-2'></i> Average: 8.5 (13 ratings)</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='d-flex align-items-center gap-3 p-4 border shadow-sm rounded-3'>
                <div className='d-flex align-items-center justify-content-center rounded-circle bg-primary-subtle text-primary fw-medium' style={{width:'45px', height:'45px'}}>JC</div>
                <div>
                    <div className='fw-medium'>Juan Cardo</div>
                    <div className='text-muted f-size-14'>Knowledge Base Contributor</div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ArticleInfo