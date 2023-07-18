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
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { urlSeason } from 'src/endpoints'
import { cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import SeasonCreate from './SeasonCreate'
import SeasonUpdate from './SeasonUpdate'

function Season({setIsLodding }) {
  const [season, setSeason] = useState([])
  const [sseason, setSseason] =useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXLU,setVisibleXLU] =useState(false)

  useEffect(() => {
    getSeason()
  }, [])

  const getSeason =()=>{
    axios.get(urlSeason).then((res) => setSeason(res.data))
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
          <CModalTitle>Add Season </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Season Add</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>

                            <SeasonCreate setIsLodding={setIsLodding} setVisibleXL={setVisibleXL} getSeason={getSeason} />
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
          <CModalTitle>Update Season </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Season Update</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>

                            <SeasonUpdate setIsLodding={setIsLodding} season={sseason} setVisibleXLU={setVisibleXLU} getSeason={getSeason} />
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
                  <strong>Season</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                     onClick={()=>setVisibleXL(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Season
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Season Year</CTableHeaderCell>
                    <CTableHeaderCell>From Date</CTableHeaderCell>
                    <CTableHeaderCell>To Date</CTableHeaderCell>
                    <CTableHeaderCell>Ongoing Season</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {season.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>
                        <div>{item.year} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.fromDate}</div>
                      </CTableDataCell>
                      <CTableDataCell>{item.toDate}</CTableDataCell>
                      <CTableDataCell>{item.isActive? "On Going Season" :"Not"}</CTableDataCell>

                      <CTableDataCell>
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {setSseason(item);setVisibleXLU(true)}}
                        >
                          <CIcon icon={cilPen} />
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

export default Season
