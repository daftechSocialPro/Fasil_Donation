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
import { urlhomeHero, assetUrl, urlHomeHero } from 'src/endpoints'
function homeHero({ user }) {
  const [homeHeroes, setHomeHeros] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [homeHero, sethomeHero] = useState({})

  const naviagate = useNavigate()

  useEffect(() => {
    axios.get(urlHomeHero).then((res) => {
      setHomeHeros(res.data)


    })
  }, [])

  const addhomeHero = (e) => {
    e.preventDefault()
    naviagate('/homehero/create')
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

  const edithomeHero = (e, item) => {
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
          <CModalTitle>Home Hero Profile View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={getImage(homeHero.backgroundImage)}
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
                        <MDBCardText>Content 1</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {homeHero && homeHero.content1}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Content 2</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {homeHero && homeHero.content2}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Content 3</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {homeHero && homeHero.content3}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Content 4</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {homeHero && homeHero.content4}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Position</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {homeHero && homeHero.position}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>


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
                  <strong>Home Hero</strong> <small>List</small>
                </CCol>
                { homeHeroes.length<3 &&   <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={addhomeHero}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    add Home Hero
                  </CButton>
                </CCol>}
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell >
                      <CIcon icon={cilHome} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>content 1</CTableHeaderCell>
                    <CTableHeaderCell>content 2</CTableHeaderCell>
                    <CTableHeaderCell>content 3</CTableHeaderCell>
                    <CTableHeaderCell>content 4</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                  {homeHeroes.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                      <MDBCardImage
                      src={getImage(item.backgroundImage)}
                      alt="avatar"
                      style={{ height: '100px', borderRadius: '20px', border: 'solid #fff' }}
                      fluid
                    /><br/>{dateformat(item.createdAt)}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.content1}
                        </div>

                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.content2}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.content3}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.content4}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.position}</div>
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
                            sethomeHero(item)
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
                            edithomeHero(e, item)
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

export default homeHero
