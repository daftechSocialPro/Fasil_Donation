import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import moment from 'moment'
import dateformat from 'dateformat'
import {
  CCol,
  CRow,
  CModalBody,
  CCallout,
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
  CDropdownDivider,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'

import CIcon from '@coreui/icons-react'
import { cilPeople, cilAlignCenter, cilDollar } from '@coreui/icons'
import { urlDegafi, assetUrl } from 'src/endpoints'

import Pagination from 'src/components/Pagination'

import { useNavigate } from 'react-router-dom'

let PageSize = 10

function FanPayment({ user }) {
  const months = [
    'መስከረም',
    'ጥምቀት',
    'ህዳር',
    'ታህሳስ',
    'ጥር',
    'የካቲት',
    'መጋቢት',
    'ሚያዚያ',
    'ግንቦት',
    'ሰኔ',
    'ሃምሌ',
    'ነሃሴ',
  ]
  const [Mahber, setMahber] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [status, setStatus] = useState('')
  const [Degafi, setDegafi] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [idCardGiven, setId] = useState(false)
  const navigate = useNavigate()
  const [ccDate, setCCDate] = useState('')
  useEffect(() => {
    axios
      .get(`${urlDegafi}/getDate`)
      .then((res) => setCCDate(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get(`${urlDegafi}/?mahberId=${user.id}`)
      .then((res) => setMahber(res.data))
      .catch((err) => console.error(err))
  }, [])

  const getDate = (item) => {
    const startDate = moment(item)
    const timeEnd = moment(new Date())
    const diff = timeEnd.diff(startDate)
    const diffDuration = moment.duration(diff)
    return diffDuration.days()
  }

  const getImage = (item) => {
    const imagePath = `${assetUrl}/${item}`
    return imagePath
  }

  const getName = () => {
    var k = `${Degafi.degafiSetting.name} ( ${Degafi.degafiSetting.payment} ETB   )`
    return k
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return Mahber.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => (status == 'not' ? item.payments.length == 0 : item.payments.length > 0))
      .slice(firstPageIndex, lastPageIndex)
  }, [currentPage, Mahber, search, status])

  const fanPayment = (item) => {
    navigate('/mahber/fanpaymentmodal', {
      state: {
        degafi: item,
      },
    })
  }

  const getPaymentStatus = (payments) => {
    if (payments.length == 0) {
      return 'Payment not started'
    } else {
      const payment = payments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
      return `Payment until   ${months[payment[0].endDate.split('/')[1] - 1]} ${
        payment[0].endDate.split('/')[0]
      } ${payment[0].endDate.split('/')[2]}`
    }
  }

  const getMonthValue = (payments) => {
    const payment = payments.sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))

    const endDate = payment[0].endDate.split('/')
    const currentDate = ccDate.split('/')
    if (endDate[2] == currentDate[2]) {
      if (currentDate[1] - endDate[1] > 0) {
        return `${currentDate[1] - endDate[1]} months late`
      } else {
        return `${endDate[1] - currentDate[1]} months ahead`
      }
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
          <CModalTitle>Degafi Profile View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="4">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    <MDBCardImage
                      src={getImage(Degafi.userPhoto)}
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
                        <MDBCardText className="text-muted">{Degafi && Degafi.name}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Mahber</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{user.fullName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />

                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Degafi Type</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {Degafi && Degafi.degafiSetting && getName()}
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
                          {Degafi && Degafi.birthDate}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>

                    <hr />
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <div dangerouslySetInnerHTML={{ __html: Degafi.description }}></div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>
      <CRow>
        <CCol xs={12}>
          <CCallout className="bg-white">
            <CRow>
              <CCol sm={3}>
                <CFormInput size="sm" label="Search By Name:" onChange={handleSearch} type="text" />
              </CCol>
              <CCol sm={3}>
                <CFormSelect
                  size="sm"
                  label="Payment Status:"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  type="text"
                >
                  <option value={'ahead'}>Month Late & Ahead</option>

                  <option value={'not'}>Not Yet Started</option>
                </CFormSelect>
              </CCol>

              <CCol sm={6} className="d-flex justify-content-end">
                <span
                  style={{
                    fontSize: '22px',
                    color: 'rgb(233, 147, 19)',
                  }}
                >
                  {' '}
                  Total Fans: {Mahber.length}{' '}
                </span>
              </CCol>
            </CRow>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
              <CRow>
                <CCol sm={10}>
                  <strong>Degafi</strong> <small>List</small>
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
                    <CTableHeaderCell>Degafi Name</CTableHeaderCell>
                    <CTableHeaderCell>Degafi Type</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Month</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentTableData.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>
                        <CAvatar
                          size="md"
                          src={getImage(item.userPhoto)}
                          status={item.isActive ? 'success' : 'danger'}
                        />
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                            {item.idNumber}
                          </span>
                        </div>
                        <div>
                          {item.name} ({item.amharicName})
                        </div>
                        <div className="small text-medium-emphasis">
                          <span>{getDate(item.createdAt) < 5 ? 'New' : 'Recurring'}</span> |
                          Registered: {dateformat(item.createdAt)}
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>
                          {item.degafiSetting.name} ( {item.degafiSetting.payment} ETB )
                        </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div className="clearfix">
                          <div className="float-start">
                            <strong>{getPaymentStatus(item.payments)}</strong>
                          </div>
                        </div>
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell style={{ textAlign: 'center' }}>
                        {item.payments.length == 0 ? '--' : getMonthValue(item.payments)}
                      </CTableDataCell>

                      <CTableDataCell>
                        <CDropdown
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                            padding: '10px',
                            borderRadius: '10px',
                            textAlign: 'center',
                            listStyle: 'none',
                            cursor: 'pointer',
                          }}
                          variant="nav-item"
                        >
                          <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
                            <CIcon icon={cilAlignCenter} /> &nbsp; Action
                          </CDropdownToggle>
                          <CDropdownMenu className="pt-0" placement="bottom-end">
                            <CDropdownDivider />
                            <CDropdownItem
                              onClick={() => {
                                setVisibleXL(!visibleXL)
                                //'item', item)
                                setDegafi(item)
                              }}
                            >
                              <CIcon icon={cilAlignCenter} />
                              &nbsp; Detail
                            </CDropdownItem>
                            <CDropdownDivider />

                            <CDropdownItem
                              onClick={(e) => {
                                fanPayment(item)
                              }}
                            >
                              <CIcon icon={cilDollar} />
                              &nbsp; Payment
                            </CDropdownItem>
                          </CDropdownMenu>
                        </CDropdown>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={Mahber.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default FanPayment
