import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import dateformat from 'dateformat'
import  {customToast} from '../../../components/customToast'
import {
  CForm,
  CFormInput,
  CCol,
  CRow,
  CModalBody,
  CCallout,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CAvatar,
  CModal,
  CModalHeader,
  CModalTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import dateFormat from 'dateformat'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilAlignCenter } from '@coreui/icons'
import { urlMahber, urlusers, assetUrl } from 'src/endpoints'

function Mahber({setIsLodding}) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [Mahber, setMahber] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [addvisibleXL, setAddVisibleXL] = useState(false)
  const [degafi, setDegafi] = useState({})


  useEffect(() => {
    getMahber()
  }, [])

  const getMahber = () => {
    axios
      .get(`${urlusers}/getMahber`)
      .then((res) => {
         setMahber(res.data)
      })
      .catch((err) => console.error(err))
  }
 
  const getDate = (item) => {
    const startDate = moment(item)
    const timeEnd = moment(new Date())
    const diff = timeEnd.diff(startDate)
    const diffDuration = moment.duration(diff)
    return diffDuration.days()
  }

  const getImage = (item) => {
    const imagePath = `${assetUrl}/${item}`
    //'image path', imagePath)
    return imagePath
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

   

    try {
      axios
        .post(`${urlMahber}/register`, {
          email: email,
          name: name,
        })

        .then((res) => {
          setName('')
          setEmail('')
          setIsLodding(false)
          setAddVisibleXL(false)

          customToast('Mahber Successfully created', 0)
          getMahber()
        })
        .catch((err) => {
            setIsLodding(false)
          customToast(err, 1)
          console.error(err)
        })
    } catch (error) {
      customToast(error, 1)
      console.error(error)
    }
  }

  return (
    <>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Profile View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    {degafi && (
                      <MDBCardImage
                        src={getImage(degafi.logo)}
                        alt="avatar"
                        style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                        fluid
                      />
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {degafi && degafi.fullName}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{degafi && degafi.email}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Alt Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText>
                          {' '}
                          <MDBCardText className="text-muted">{degafi && degafi.name}</MDBCardText>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>WebSite Address</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText>
                          {' '}
                          <MDBCardText className="text-muted">
                            {degafi && degafi.websiteAdress}
                          </MDBCardText>
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Established Date</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {degafi && degafi.establishedDate}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <div dangerouslySetInnerHTML={{ __html: degafi.description }}></div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CModal size="xl" visible={addvisibleXL} onClose={() => setAddVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>  <strong>Add </strong> <small>Mahber</small> </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
           

              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">
                          Just provide an email we will send user credential using the email
                          provided and the degafi mahbers will complete their profile
                        </CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                        
                          <CCardBody>
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleSubmit}
                            >
                              <CCol xs="5">
                                <CFormInput
                                  type="text"
                                  placeholder="Mahber Name"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </CCol>
                              <CCol xs="5">
                                <CFormInput
                                  type="email"
                                  placeholder="name@example.com"
                                  required
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                />
                              </CCol>

                              <CCol xs="2">
                                <CButton
                                  style={{
                                    backgroundColor: '#b2322a',
                                    color: '#fff',
                                    borderColor: '#fff',
                                  }}
                                  type="submit"
                                >
                                  Submit
                                </CButton>
                              </CCol>
                            </CForm>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>              
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CRow>
        <CCol xs={12}>
          <CCallout className="bg-white"></CCallout>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="" style={{ backgroundColor: '#b2322a', color: '#fff' }}>
              <CRow>
                <CCol sm={10}>
                  <strong>Mahber</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setAddVisibleXL(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Mahber
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Degafi Mahber Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Website Address</CTableHeaderCell>
                    <CTableHeaderCell>Establidhed Date</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Mahber.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <CAvatar
                          size="md"
                          src={getImage(item.logo)}
                          status={item.isActive && item.establishedDate ? 'success' : 'danger'}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.fullName} ({item.name})
                        </div>
                        <div className="small text-medium-emphasis">
                          <span>{getDate(item.createdAt) < 5 ? 'New' : 'Recurring'}</span> |
                          Registered: {dateformat(item.createdAt)}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.email}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{item.websiteAdress}</strong>
                          </div>
                          <div className="float-end">
                            {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                          </div>
                        </div>
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.establishedDate&&dateFormat(item.establishedDate)}
                      </CTableDataCell>
                      <CTableDataCell>
                      { item.establishedDate ?  <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            setVisibleXL(!visibleXL)
                            setDegafi(item)
                          }}
                        >
                     <CIcon icon={cilAlignCenter} />
                          &nbsp; Detail
                        </CButton>:"Profile not set yet"}
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Mahber
