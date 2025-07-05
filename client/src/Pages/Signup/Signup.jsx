import SignupModal from "../../Components/SignupModal/SignupModal";
import VerifyEmail from "../../Components/VerifyEmail/VerifyEmail";

import { useState } from "react";

const Signup = () => {
  const [view, setView] = useState('verify-email');

  return (
    <div>
      { view === 'signup' && <SignupModal/> }
      { view === 'verify-email' && <VerifyEmail/> }
    </div>
  )
}

export default Signup