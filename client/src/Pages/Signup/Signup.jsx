import SignupModal from "../../Components/SignupModal/SignupModal";
import VerifyEmail from "../../Components/VerifyEmail/SignUpVerifyEmail";

import { useGlobalContext } from "../../Context/Context";
import { useState } from "react";

const Signup = () => {
  const { signupView} = useGlobalContext();

  return (
    <div>
      { signupView === 'signup' && <SignupModal/> }
      { signupView === 'verify-email' && <VerifyEmail/> }
    </div>
  )
}

export default Signup