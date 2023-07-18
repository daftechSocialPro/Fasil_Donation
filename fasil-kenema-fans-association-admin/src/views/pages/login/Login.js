import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { urlusers } from 'src/endpoints'
import logo from '../../../assets/logo.png'
import { customToast } from 'src/components/customToast'

const Login = ({ setIsLoggedIn,setIsLodding }) => {
  const naviage = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const onSubmit = (e) => {


    setIsLodding(true)
    e.preventDefault();

    axios.defaults.withCredentials = true;
    axios.post(`${urlusers}/login`, {
      email: email,
      password: password,

    })


      .then((res) => {
        setIsLoggedIn(true);
        setIsLodding(false);
        customToast("Welcome , 0");
        naviage("/dashboard")
      }
      )
      .catch((err) => {
        setIsLodding(false)
        customToast("Invalid Credentials", 1);
        //err)
      })


  }



  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm 
                  
                  validated
                  onSubmit={onSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type='email'
                        placeholder="email"
                        required
                      


                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        required
                      

                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type='submit' style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }} className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" style={{ color: '#fff' }} className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white  py-5" style={{ width: '44%', backgroundColor: '#b2322a' }}>
                <CCardBody className="text-center">
                  <div>
                    <img src={logo} style={{ maxHeight: '300px', padding: '40px' }} alt="logo" />
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
