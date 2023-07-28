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
  CFormSwitch
} from '@coreui/react'
import { urlHomeHero, urlNextMatch } from '../../../endpoints'

export default function TmretExecCreate({ user,setIsLodding }) {
  const [img, setImg] = useState('')
  const [SeasonName, setSeasonName] = useState('')
  const [MatchName, setMatchName] = useState('')
  const [MatchDateTime, setMatchDateTime] = useState('')
  const [LocationStadium, setLocationStadium] = useState('')
  const [IsAway, setIsAway] = useState(false)
  const [OtherTeamName, setOtherTeamName] = useState('')

  const navigate = useNavigate()

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const handleSubmit = async (event) => {


    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.append('Photo', img)
    formData.set('SeasonName', SeasonName)
    formData.set('MatchName', MatchName)
    formData.set('MatchDateTime', MatchDateTime)
    formData.set('LocationStadium', LocationStadium)
    formData.set('IsAway', IsAway)
    formData.set('OtherTeamName',OtherTeamName)
    
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
       setIsLodding(true)

      axios.defaults.withCredentials = true
      axios
        .post(urlNextMatch, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/nextmatch')
          customToast('Next Match Successfully created', 0)
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
                <strong>Next Match</strong> <small>Create Profile</small>
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
                          <CFormLabel htmlFor="formFileLg"> 2nd Team Logo</CFormLabel>
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
                            placeholder="Season Name ..."
                            required
                            value={SeasonName}
                            onChange={(e) => setSeasonName(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="Match Name ..."
                            required
                            value={MatchName}
                            onChange={(e) => setMatchName(e.target.value)}
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
                            type="datetime-local"
                            placeholder=" match date time..."
                            required
                            value={MatchDateTime}
                            onChange={(e) => setMatchDateTime(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="location stadium ..."
                            required
                            value={LocationStadium}
                            onChange={(e) => setLocationStadium(e.target.value)}
                          />
                        </MDBCol>
                      
                      </MDBRow>
                   
                      <hr />
                      <MDBRow>

                      <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="Other Team Name ..."
                            required
                            value={OtherTeamName}
                            onChange={(e) => setOtherTeamName(e.target.value)}
                          /></MDBCol>
                     
                      <MDBCol sm="3">
                        <CFormSwitch  checked={IsAway} onChange={()=>setIsAway(!IsAway)}  label="Is Away" />
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
