import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCol,
  CRow,
  CCallout,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CAvatar,
} from '@coreui/react'

import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { assetUrl, urlTeam } from 'src/endpoints'
import { cilPen, cilPeople } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import TeamCreate from './TeamCreate'
import TeamUpdate from './TeamUpdate'
import { useNavigate } from 'react-router-dom'
function Team({ setIsLodding }) {
  const [Team, setTeam] = useState([])
  const [sTeam, setSTeam] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXLU, setVisibleXLU] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    getTeam()
  }, [Team])

  const getTeam = () => {
    axios.get(`${urlTeam}/getAllTable`).then((res) => setTeam(res.data))
  }

  const getImage = (item) => {
    return `${assetUrl}/${item}`
  }

  const navigateTo = (team)=>{

    navigate("/player",{
      state:{
        team : team
      }
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
          <CModalTitle>Add Team </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Team Add</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <TeamCreate
                              setIsLodding={setIsLodding}
                              setVisibleXL={setVisibleXL}
                              getTeam={getTeam}
                            />
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

      <CModal size="xl" visible={visibleXLU} onClose={() => setVisibleXLU(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Update Team </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Team Update</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <TeamUpdate
                              setIsLodding={setIsLodding}
                              Team={sTeam}
                              setVisibleXLU={setVisibleXLU}
                              getTeam={getTeam}
                            />
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
            <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
              <CRow>
                <CCol sm={10}>
                  <strong>Team</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setVisibleXL(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Team
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell >
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>

                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Short Name</CTableHeaderCell>
                    <CTableHeaderCell>Season</CTableHeaderCell>
                    <CTableHeaderCell>Mp</CTableHeaderCell>
                    <CTableHeaderCell>W</CTableHeaderCell>
                    <CTableHeaderCell>D</CTableHeaderCell>
                    <CTableHeaderCell>L</CTableHeaderCell>
                    <CTableHeaderCell>GF</CTableHeaderCell>
                    <CTableHeaderCell>GA</CTableHeaderCell>
                    <CTableHeaderCell>GD</CTableHeaderCell>
                    <CTableHeaderCell>Pts</CTableHeaderCell>

                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Team.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <CAvatar
                          size="md"
                          src={getImage(item.logo)}
                          status={ 'success'}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.name} </div>
                        <div className="small text-medium-emphasis">
                          <span>{item.shortName}</span>
                        </div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <div>{item.shortname} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.seasonName} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.mp} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.win} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.draw} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.lost} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.gf} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.ga} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.gd} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.pts} </div>
                      </CTableDataCell>

                      <CTableDataCell>
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            setSTeam(item)
                            setVisibleXLU(true)
                          }}
                        >
                          <CIcon icon={cilPen} />
                          &nbsp; Edit
                        </CButton>  &nbsp; |   &nbsp;
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            navigateTo(item)
                           
                          }}
                        >
                          <CIcon icon={cilPeople} />
                          &nbsp; Players
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

export default Team
