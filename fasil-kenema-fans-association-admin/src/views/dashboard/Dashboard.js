import React, { useState, useEffect } from 'react'

import {
  CAvatar,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow, 
  
  CModalBody,
  CModal,
  CModalHeader,
  CModalTitle,

} from '@coreui/react'


import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'

import CIcon from '@coreui/icons-react'
import {
  cilPeople,
} from '@coreui/icons'



import WidgetsDropdown from '../widgets/WidgetsDropdown'
import axios from 'axios'
import { assetUrl, urlDashboard } from 'src/endpoints'


const Dashboard = ({ user }) => {

  const [dashboard, setDashboard] = useState([])
  const [dashboardTable, setDashboardTable] = useState([])
  const [visibleXL,setVisibleXL] =useState(false)
  const [mahberExec, setMahberExec] = useState([])
const [maName,setMaName]=useState('')
  useEffect(() => {
    axios
      .get(`${urlDashboard}/?userId=${user.id}`)
      .then((res) => setDashboard(res.data))
      .catch((err) => console.error(err))
    axios
      .get(`${urlDashboard}/table`)
      .then((res) => {
        setDashboardTable(res.data)
      
      })
      .catch((err) => console.error(err))
  }, [])
 

  const getImage = (item) => {
    return`${assetUrl}/${item}`
  }


  const setmexec =(item)=>{

    setMahberExec(item)
    setVisibleXL(true)
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
          <CModalTitle>Mahber Executives Profile View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>

{mahberExec.map((item ,index)=>
            <MDBRow key={index}>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={getImage(item.userPhoto)}
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
                        <MDBCardText className="text-muted">
                          { item.name}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mahber</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{maName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Position</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          { item.position}
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
                          {item.birthDate}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>From Date - To Date</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBRow>
                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                              {item.fromDate}
                            </MDBCardText>
                          </MDBCol>
                          <MDBCol sm="6">
                            <MDBCardText className="text-muted">
                              {item.toDate}
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
                    <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
         )}
         
         
         
          </CCardBody>
        </CModalBody>
      </CModal>





















      <WidgetsDropdown dashboard={dashboard} />

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>ማህበራት ስታስቲክስ</CCardHeader>
            <CCardBody>
              <br />

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell>Mahber Name</CTableHeaderCell>
                    <CTableHeaderCell>Mahber Alt Name</CTableHeaderCell>
                    <CTableHeaderCell>Mahber Executives</CTableHeaderCell>
                    <CTableHeaderCell>Number of Fans</CTableHeaderCell>
                    <CTableHeaderCell>Esatablished Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {dashboardTable.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <CAvatar size="md" src={getImage(item.image)} status="success" />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.mahberName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.mahberAltName}</div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div onClick={()=> {setMaName(item.mahberName); setmexec(item.mahberExecutives);}} style={{cursor:"pointer"}} className="float-start">
                            <strong>{item.mahberExecutives.length} view all</strong>
                          </div>
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div >{item.numberOfDegafi}</div> 
                      </CTableDataCell>
                      <CTableDataCell>
                        <strong>{item.establishedDate}</strong>
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

export default Dashboard
