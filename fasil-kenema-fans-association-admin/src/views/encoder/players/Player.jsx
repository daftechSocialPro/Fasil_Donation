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

import dateFormat from 'dateformat'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilAlignCenter, cilPencil } from '@coreui/icons'
import { urlPlayer, assetUrl } from 'src/endpoints'
import { useLocation } from 'react-router-dom'
function Player({user}) {
  const location = useLocation()
  const team = location.state.team
  const [Players, setPlayers] = useState([])
  const [player,setPlayer]=useState([])
  const [visibleXL,setVisibleXL]=useState(false)

  const naviagate = useNavigate()
  const positions = ['GK', 'RB', 'LB', 'CB', 'DMF', 'RMF', 'LMF', 'CM', 'CF', 'RW', 'LW', 'AMF']

  useEffect(() => {
    axios.get(`${urlPlayer}/?teamID=${team.id}`).then((res) => {
        setPlayers(res.data)
    })
  }, [])

  const addPlayer = (e) => {
    e.preventDefault()
    naviagate('/Player/playerCreate',{
        state:{
            team:team
        }
    })
  }
  const editPlayer = (e,item) => {
    e.preventDefault()

    //item)
    naviagate('/Player/playerEdit', {
      state: {
        player: item,
      },
    })
  }

  const getImage=(item)=>{

    return `${assetUrl}/${item}`
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
          <CModalTitle>Player Profile View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={getImage(player.playerImage)}
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
                        <MDBCardText>Full Name</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{player.fullName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Team</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{team.name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Position</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          { positions[player.postition]}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Date of Birth</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                           {dateformat(player.birthDate)}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Physcial</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBRow>
                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                             Height :- {player.height} cm
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                             Weight :- {player.weight} kg
                            </MDBCardText>
                          </MDBCol>
                        </MDBRow>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <div dangerouslySetInnerHTML={{ __html: player.description }}></div>
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
                  <strong>Player</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={addPlayer}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Player
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
                    <CTableHeaderCell>FullName</CTableHeaderCell>
                    <CTableHeaderCell>Team</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>
                    <CTableHeaderCell>Height</CTableHeaderCell>
                    <CTableHeaderCell>Weight</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Players.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <CAvatar
                          size="md"
                          src={getImage(item.playerImage)}
                          status={'success'}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.fullName} 
                        </div>
                
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{team.name}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{positions[item.postition]}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.height} cm</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.weight} kg</div>
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
                            setPlayer(item)
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
                            marginLeft: '5px',
                          }}
                          onClick={(e) => {
                            editPlayer(e, item)
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

export default Player
