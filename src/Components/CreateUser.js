
import Frame453 from "../images/Frame-453.png"

import React, { useState } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Utility/Apiservices';
import { toast, Toaster } from 'react-hot-toast';

function CreateUser() {
  const [Name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!Name || !mobile || !email || !password || !confirmpassword) {
      return toast.error('All fields are required');
    }

    if (password !== confirmpassword) {
      return toast.error('Passwords do not match');
    }

    const body = { Name, mobile, email, password, confirmpassword };
    const response = await createUser(body);

    if (!response.ok) {
      return toast.error(response.data?.message || 'Registration failed');
    }

    toast.success('User registered successfully');
    navigate('/');
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
            <h3 className="fw-bold">Welcome Sign Up System</h3>
            <p className="mb-4">Your gateway to seamless transactions and easy payments.</p>

            <MDBInput
              label="Name"
              type="text"
              className="mb-3"
              contrast
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />

            <MDBInput
              label="Mobile Number"
              type="text"
              className="mb-3"
              contrast
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />

            <MDBInput
              label="Email"
              type="email"
              className="mb-3"
              contrast
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <div className="position-relative mb-3">
              <MDBInput
                label="Confirm Password"
                type={showConfirm ? 'text' : 'password'}
                contrast
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
              <MDBIcon
                icon={showConfirm ? 'eye-slash' : 'eye'}
                className="position-absolute end-0 top-50 translate-middle-y me-3"
                style={{ cursor: 'pointer' }}
                onClick={() => setShowConfirm(!showConfirm)}
              />
            </div>

            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <input type="checkbox" className="me-2" />
                <label>Remember me</label>
              </div>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/')}
              >
                Sign In
              </span>
            </div>

            <MDBBtn color="light" className="w-100" onClick={handleSubmit}>
              Sign Up
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default CreateUser;
