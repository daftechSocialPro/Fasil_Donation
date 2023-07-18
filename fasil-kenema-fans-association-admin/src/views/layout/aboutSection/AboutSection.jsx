import React, { useState, useEffect } from 'react'

import axios from 'axios'
import moment from 'moment'
import dateformat from 'dateformat'
import { useNavigate } from 'react-router-dom'
import {
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


import CIcon from '@coreui/icons-react'
import { cilPeople, cilAlignCenter, cilPencil, cilHome } from '@coreui/icons'
import {  assetUrl, urlAboutSection } from 'src/endpoints'
function AboutSection({ user }) {
  const [AboutSectiones, setAboutSectiones] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [AboutSection, setAboutSection] = useState({})

  const naviagate = useNavigate()

  useEffect(() => {
    axios.get(urlAboutSection).then((res) => {
      setAboutSectiones(res.data)
    })
  }, [])

  const addAboutSection = (e) => {
    e.preventDefault()
    naviagate('/AboutSection/create')
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

  const editAboutSection = (e, item) => {
    e.preventDefault()

    //item)
    naviagate('edit', {
      state: {
        tmret: item,
      },
    })
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
          <CModalTitle>About Section </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={getImage(AboutSection.image)}
                      alt="avatar"
                      style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                      fluid
                    />

                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="8">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Tilte</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {AboutSection && AboutSection.title}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Sub Title</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {AboutSection && AboutSection.subTitile}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Description </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> 
                      <div dangerouslySetInnerHTML={{__html:AboutSection && AboutSection.description}}>
                       </div></MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    


                    <hr />
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
            <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
              <CRow>
                <CCol sm={10}>
                  <strong>About Section</strong> <small>List</small>
                </CCol>
              { AboutSectiones.length===0 && <CCol sm={2} className="d-flex justify-content-end" >
                  <CButton
                    className="text-right bg-white"
                    onClick={addAboutSection}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    add About Section
                  </CButton>
                </CCol>}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilHome} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Title</CTableHeaderCell>
                    <CTableHeaderCell>Subtitle</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                                          
                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                  {AboutSectiones.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                      <MDBCardImage
                      src={getImage(item.image)}
                      alt="avatar"
                      style={{ width: '150px', borderRadius: '20px', border: 'solid #fff' }}
                      fluid
                    /><br/>

                        {dateformat(item.createdAt)}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.title}
                        </div>

                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.subTitile}</div>
                      </CTableDataCell>
                      <CTableDataCell>

                      <div dangerouslySetInnerHTML={{__html:item.description}}>
                       </div>
                      </CTableDataCell>
                   

                      <CTableDataCell>
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            setVisibleXL(!visibleXL)
                            setAboutSection(item)
                          }}
                        >
                          <CIcon icon={cilAlignCenter} />
                          &nbsp; Detail
                        </CButton>
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                            marginLeft: "5px"
                          }}
                          onClick={(e) => {
                            editAboutSection(e, item)
                          }}
                        >
                          <CIcon icon={cilPencil} />
                          &nbsp; Edit
                        </CButton>
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

export default AboutSection
