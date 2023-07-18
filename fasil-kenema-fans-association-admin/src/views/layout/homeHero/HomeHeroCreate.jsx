import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import { customToast } from '../../../components/customToast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
Quill.register('modules/imageResize', ImageResize)
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'

import {
  CCard,
  CCardHeader,
  CRow,
  CCol,
  CCardBody,
  CCallout,
  CButton,
  CFormInput,
  CFormLabel,
  CForm,
} from '@coreui/react'
import { urlHomeHero } from '../../../endpoints'

export default function TmretExecCreate({ user,setIsLodding }) {
  const [img, setImg] = useState('')
  const [content1, setContent1] = useState('')
  const [content2, setContent2] = useState('')
  const [content3, setcontent3] = useState('')
  const [content4, setcontent4] = useState('')
  const [position, setPosition] = useState('')

  const navigate = useNavigate()

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const handleSubmit = async (event) => {


    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.append('Photo', img)
    formData.set('content1', content1)
    formData.set('content2', content2)
    formData.set('content3', content3)
    formData.set('content4', content4)
    formData.set('position', position)
    
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
       setIsLodding(true)


      axios.defaults.withCredentials = true
      axios
        .post(urlHomeHero, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/homehero')
          customToast('Home Hero Successfully created', 0)
        })
        .catch((err) => {
          setIsLodding(false)
          alert(err)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)
    }
  }


  

  return (
    <CRow>
      <CCol xs={12}>
        <CCallout className="bg-white"></CCallout>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
            <CRow>
              <CCol sm={10}>
                <strong>Home Hero</strong> <small>Create Profile</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CForm validated onSubmit={handleSubmit}>
            <CCardBody>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      {img && (
                        <MDBCardImage
                          src={URL.createObjectURL(img)}
                          alt="avatar"
                          style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                          fluid
                        />
                      )}

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Photo</CFormLabel>
                          <CFormInput
                            type="file"
                            size="sm"
                            accept="image/*"
                            onChange={photoInputHandler}
                            required
                            id="formFileLg"
                          />
                        </CCol>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        {/* <MDBCol sm="3">
                          <MDBCardText>Content 1 </MDBCardText>
                        </MDBCol> */}
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="Content 1 ..."
                            required
                            value={content1}
                            onChange={(e) => setContent1(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="Content 2 ..."
                            required
                            value={content2}
                            onChange={(e) => setContent2(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        {/* <MDBCol sm="3">
                          <MDBCardText>Content 1 </MDBCardText>
                        </MDBCol> */}
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="Content 3 ..."
                            required
                            value={content3}
                            onChange={(e) => setcontent3(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="Content 4 ..."
                            required
                            value={content4}
                            onChange={(e) => setcontent4(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                   
                      <hr />
                      <MDBRow>
                     
                        <MDBCol sm="6">
                          <CFormInput
                            type="number"
                            placeholder="position ..."
                            required
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                     
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

              <CCol xs={12} className="d-flex justify-content-end">
                <CButton
                  className="text-right"
                  size="lg"
                  style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
                  type="submit"
                >
                  Save
                </CButton>
              </CCol>
            </CCardBody>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
  )
}
