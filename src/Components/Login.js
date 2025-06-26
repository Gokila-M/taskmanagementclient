// import React, { useState } from 'react';
// import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
// import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { useNavigate } from 'react-router-dom';
// import { UserLogin } from '../Utility/Apiservices';
// import toast, { Toaster } from 'react-hot-toast';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [erroremail, setErroremail] = useState('');
//   const [errorpassword, setErrorpassword] = useState('');
//   const navigate = useNavigate();

//   const validateEmailOrMobile = (value) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const mobileRegex = /^[6-9]\d{9}$/;
//   return emailRegex.test(value) || mobileRegex.test(value);
// };
// const handleSubmit = async () => {
//   if (!email) {
//     setErroremail('Please enter your email or mobile number');
//     return;
//   } else if (!validateEmailOrMobile(email)) {
//     setErroremail('Enter a valid email or 10-digit mobile number');
//     return;
//   } else {
//     setErroremail('');
//   }

//   if (!password) {
//     setErrorpassword('Please enter your password');
//     return;
//   } else {
//     setErrorpassword('');
//   }

//   const Data = await UserLogin({ email, password });

//   if (!Data?.ok) {
//     return toast.error(Data.data?.message || 'Invalid credentials');
//   }
//   toast.success('Login successful');
//   localStorage.setItem('token', JSON.stringify(Data.data.token));
//   navigate('/Dashboard');
// };

//   return (
//    <MDBContainer fluid className="p-3 my-5 h-custom">
//       <MDBRow>
//         <MDBCol col="10" md="6">
//           <img
//             src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
//             className="img-fluid"
//             alt="Sample"
//           />
//         </MDBCol>

//         <MDBCol col="4" md="6">
//           <div className="divider d-flex align-items-center my-4">
//             <p className="text-center fw-bold mx-3 mb-0">Login Your Account</p>
//           </div>

//           <MDBInput
//             wrapperClass="mb-4"
//             label="Email or Mobile"
//             id="emailInput"
//             type="text"
//             size="lg"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           {erroremail && <p style={{ color: 'red' }}>{erroremail}</p>}

//           <MDBInput
//             wrapperClass="mb-4"
//             label="Password"
//             id="passwordInput"
//             type="password"
//             size="lg"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {errorpassword && <p style={{ color: 'red' }}>{errorpassword}</p>}
//           <div className="text-center text-md-start mt-4 pt-2">
//             <MDBBtn className="mb-0 px-5" size="lg" onClick={handleSubmit}>
//               Login
//             </MDBBtn>
//             <p className="small fw-bold mt-2 pt-1 mb-2">
//              Don't have an account?{' '}
//             <Link to="/register" className="link-danger">
//              Register
//             </Link>
//             </p>
//           </div>
//         </MDBCol>
//       </MDBRow>

//       <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
//         <div className="text-white mb-3 mb-md-0">
//           Copyright © 2025. All rights reserved.
//         </div>

//         <div>
//           <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
//             <MDBIcon fab icon="linkedin-in" size="md" />
//           </MDBBtn>

//           <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
//             <MDBIcon fab icon="twitter" size="md" />
//           </MDBBtn>

//           <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
//             <MDBIcon fab icon="google" size="md" />
//           </MDBBtn>

//           <MDBBtn tag="a" color="none" className="mx-3" style={{ color: 'white' }}>
//             <MDBIcon fab icon='github' size="md" />
//           </MDBBtn>
//         </div>
//       </div>
//       <Toaster/>
//     </MDBContainer>
//   );
// };

// export default Login;

import React, { useState } from 'react';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';
import { UserLogin } from '../Utility/Apiservices';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Frame453 from "../images/Frame-453.png"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erroremail, setErroremail] = useState('');
  const [errorpassword, setErrorpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmailOrMobile = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;
    return emailRegex.test(value) || mobileRegex.test(value);
  };

  const handleSubmit = async () => {
    if (!email) {
      setErroremail('Please enter your email or mobile number');
      return;
    } else if (!validateEmailOrMobile(email)) {
      setErroremail('Enter a valid email or 10-digit mobile number');
      return;
    } else {
      setErroremail('');
    }

    if (!password) {
      setErrorpassword('Please enter your password');
      return;
    } else {
      setErrorpassword('');
    }

    const Data = await UserLogin({ email, password });

    if (!Data?.ok) {
      return toast.error(Data.data?.message || 'Invalid credentials');
    }
    toast.success('Login successful');
    localStorage.setItem('token', JSON.stringify(Data.data.token));
    navigate('/Dashboard');
  };

  return (
    <MDBContainer fluid className="vh-100" style={{ background: 'linear-gradient(135deg, #ffffff, #1c1ca1)' }}>
      <Toaster />
      <MDBRow className="h-100">       
        <MDBCol md="6" className="d-flex flex-column justify-content-center ps-5">
          <img src={Frame453} alt="lemonpay" style={{ width: '180px' }} />
          <h2 className="text-white mt-4">
            Join 1000<sup>+</sup> Businesses
          </h2>
          <h4 style={{ color: '#ffe600' }}>Powering Growth with Lemonpay!</h4>
        </MDBCol>
        <MDBCol md="6" className="d-flex align-items-center justify-content-center">
          <div className="bg-transparent text-white p-5 rounded" style={{ width: '100%', maxWidth: '450px' }}>
            <h3 className="fw-bold">Welcome Login System</h3>
            <p className="mb-4">Your gateway to seamless transactions and easy payments.</p>

            <MDBInput
              label="Email or Mobile"
              type="text"
              contrast
              className="mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {erroremail && <p style={{ color: 'salmon', fontSize: '0.9rem' }}>{erroremail}</p>}

            <div className="position-relative mb-3">
              <MDBInput
                label="Password"
                type={showPassword ? 'text' : 'password'}
                contrast
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <MDBIcon
                icon={showPassword ? 'eye-slash' : 'eye'}
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
            {errorpassword && <p style={{ color: 'salmon', fontSize: '0.9rem' }}>{errorpassword}</p>}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <input type="checkbox" className="me-2" />
                <label>Remember me</label>
              </div>
              <Link to="/register" className="text-white">Sign Up</Link>
            </div>

            <MDBBtn color="light" className="w-100" onClick={handleSubmit}>
              Sign in
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
