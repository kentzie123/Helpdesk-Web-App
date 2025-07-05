import './Forgot.css';
import { useState } from 'react';
import Forgot1 from '../../Components/ForgotPasswordS1/ForgotPasswordS1';
import Forgot2 from '../../Components/ForgotPasswordS2/ForgotPasswordS2';
import Forgot3 from '../../Components/ForgotPasswordS3/ForgotPasswordS3';

import { useGlobalContext } from '../../Context/Context';

const Forgot = () => {
  const {resetPassView} = useGlobalContext();

  return (
    <div>
      { resetPassView === 's1' && <Forgot1 /> }
      { resetPassView === 's2' && <Forgot2 /> }
      { resetPassView === 's3' && <Forgot3 /> }
    </div>
  )
}

export default Forgot