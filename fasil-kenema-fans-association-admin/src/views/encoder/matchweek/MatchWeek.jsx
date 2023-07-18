import React, { useState, useMemo, useEffect } from 'react'
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
  CFormSwitch,
} from '@coreui/react'

import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'

import { cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import MatchWeekCreate from './MatchWeekCreate'
import MatchWeekUpdate from './MatchWeekUpdate'
import { urlMatchWeek } from 'src/endpoints'

import Pagination from 'src/components/Pagination'
let PageSize = 5

function MatchWeek({ setIsLodding }) {
  const [MatchWeek, setMatchWeek] = useState([])
  const [sMatchWeek, setSMatchWeek] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXLU, setVisibleXLU] = useState(false)

  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getMatchWeek()
  }, [])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return MatchWeek.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, MatchWeek])

  const getMatchWeek = () => {
    axios.get(urlMatchWeek).then((res) => setMatchWeek(res.data))
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
          <CModalTitle>Add MatchWeek </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">MatchWeek Add</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <MatchWeekCreate
                              setIsLodding={setIsLodding}
                              setVisibleXL={setVisibleXL}
                              getMatchWeek={getMatchWeek}
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
          <CModalTitle>Update MatchWeek </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">MatchWeek Update</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <MatchWeekUpdate
                              setIsLodding={setIsLodding}
                              MatchWeek={sMatchWeek}
                              setVisibleXLU={setVisibleXLU}
                              getMatchWeek={getMatchWeek}
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
                  <strong>MatchWeek</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setVisibleXL(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add MatchWeek
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CTable align="middle" className="mb-0 border" hover responsive>
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Match Week </CTableHeaderCell>
                      <CTableHeaderCell>Is Match Week</CTableHeaderCell>

                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentTableData.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>{item.matchWeek}</CTableDataCell>
                        <CTableDataCell>
                          <div>
                            {item.isMatchWeek ? (
                              <CFormSwitch checked={true} disabled label="Is Match Week" />
                            ) : (
                              <CFormSwitch disabled checked={false} label="Is Not Match Week" />
                            )}{' '}
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
                              setSMatchWeek(item)
                              setVisibleXLU(true)
                            }}
                          >
                            <CIcon icon={cilPen} />
                            &nbsp; Edit
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={MatchWeek.length}
                  pageSize={PageSize}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default MatchWeek
