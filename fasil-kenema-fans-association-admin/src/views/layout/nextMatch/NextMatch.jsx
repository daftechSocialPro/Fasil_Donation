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
import {  assetUrl, urlNextMatch } from 'src/endpoints'
function nextMatch({ user }) {
  const [NextMatches, setNextMatches] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [nextMatch, setnextMatch] = useState({})

  const naviagate = useNavigate()

  useEffect(() => {
    axios.get(urlNextMatch).then((res) => {
      setNextMatches(res.data)
    })
  }, [])

  const addnextMatch = (e) => {
    e.preventDefault()
    naviagate('/nextmatch/create')
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

  const editnextMatch = (e, item) => {
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
          <CModalTitle>Next Match View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={getImage(nextMatch.awayLogo)}
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
                        <MDBCardText>Season Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {nextMatch && nextMatch.seasonName}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Match Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {nextMatch && nextMatch.matchName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Match Date Time </MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {nextMatch && nextMatch.matchDateTime}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Location Stadium</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted"> {nextMatch && nextMatch.locationStadium}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Is Away</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {nextMatch && nextMatch.isAway?"True":"False"}
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
                  <strong>Next Match</strong> <small>List</small>
                </CCol>
              { NextMatches.length===0 && <CCol sm={2} className="d-flex justify-content-end" >
                  <CButton
                    className="text-right bg-white"
                    onClick={addnextMatch}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    add Next Match
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
                    <CTableHeaderCell>Season Name</CTableHeaderCell>
                    <CTableHeaderCell>Match Name</CTableHeaderCell>
                    <CTableHeaderCell>Match DateTime</CTableHeaderCell>
                    <CTableHeaderCell>Location Stadium</CTableHeaderCell>
                    <CTableHeaderCell>IsAway</CTableHeaderCell>
                        
                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>

                  {NextMatches.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                      <MDBCardImage
                      src={getImage(item.awayLogo)}
                      alt="avatar"
                      style={{ width: '150px', borderRadius: '20px', border: 'solid #fff' }}
                      fluid
                    /><br/>
                      <span className='text-center'> {item.otherTeamName} </span>   <br/>
                       {dateformat(item.createdAt)}
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.seasonName}
                        </div>

                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.matchName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.matchDateTime}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.locationStadium}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.isAway?"True":"False"}</div>
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
                            setnextMatch(item)
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
                            editnextMatch(e, item)
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

export default nextMatch
