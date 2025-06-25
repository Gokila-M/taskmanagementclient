import React, { useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../Utility/Apiservices'; // Make sure path is correct
import { toast, Toaster } from 'react-hot-toast';

function CreateUser() {
  const [Name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');

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
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100">
      <Toaster />
      <MDBCard className="text-black w-100" style={{ maxWidth: '900px', borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="user me-3" size='lg' />
                <MDBInput label='Your Name' type='text' value={Name} onChange={(e) => setName(e.target.value)} className='w-100' />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="phone me-3" size='lg' />
                <MDBInput label='Mobile Number' type='text' value={mobile} onChange={(e) => setMobile(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="envelope me-3" size='lg' />
                <MDBInput label='Email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="lock me-3" size='lg' />
                <MDBInput label='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBIcon fas icon="key me-3" size='lg' />
                <MDBInput label='Repeat Password' type='password' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} />
              </div>

              <MDBBtn className='mb-4' size='lg' onClick={handleSubmit}>Register</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default CreateUser;
