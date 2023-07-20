import React, { useState, useEffect, useMemo } from 'react'
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
  CDropdownDivider,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CFormInput,
  CFormSelect,
  CFormLabel,
  CForm,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilAlignCenter, cilPencil, cilCreditCard } from '@coreui/icons'
import { urlDegafi, assetUrl, urlDegafiSetting, urlMahber } from 'src/endpoints'
import { customToast } from 'src/components/customToast'
import Pagination from 'src/components/Pagination'
import IdTemplate from 'src/components/IdTemplate'

let PageSize = 10

function Degafi({ user, setIsLodding }) {
  const Months = [
    { value: 0, name: 'Meskerem' },
    { value: 1, name: 'Tekemet' },
    { value: 2, name: 'Hedar' },
    { value: 3, name: 'Tahsas' },
    { value: 4, name: 'Ter' },
    { value: 5, name: 'Yekatit' },
    { value: 6, name: 'Megabit' },
    { value: 7, name: 'Miyazia' },
    { value: 8, name: 'Genbot' },
    { value: 9, name: 'Sene' },
    { value: 10, name: 'Hamele' },
    { value: 11, name: 'Nehase' },
  ]

  const [Mahber, setMahber] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXLId, setVisibleXLId] = useState(false)
  const [paymentModal, setPaymentModal] = useState(false)
  const [excelModal, setExcelModal] = useState(false)
  const [Degafi, setDegafi] = useState({})
  const [mahber, setmahber] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const [idCardGiven, setId] = useState(false)

  const [paymentMonth, setPaymentMonth] = useState('')
  const [paymentYear, setPaymentYear] = useState('')
  const [paymentMoneyPaid, setPaymentMondeyPaid] = useState('')
  const [paymentMoneyRemaining, setPaymentMoneyRemaining] = useState('')

  const [template, setTemplate] = useState([])

  const [excelFile, setExcelFile] = useState('')

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const naviagate = useNavigate()

  useEffect(() => {
    axios.get(urlMahber).then((res) => {
      setmahber(res.data.filter((m) => m.userId == user.id)[0])
    })
  })
  useEffect(() => {
    axios
      .get(`${urlDegafi}/?mahberId=${user.id}`)
      .then((res) => setMahber(res.data))
      .catch((err) => console.error(err))
  }, [])

  const idView = (item) => {
    //console.log('mmm', item)
    setDegafi(item)
    axios
      .get(`${urlDegafiSetting}/GetTemplate/?mahberId=${Mahber[0] && Mahber[0].mahberId}`)
      .then((res) => {
        //console.log('template', res.data)
        setTemplate(res.data)
      })
      .catch((err) => console.error(err))
  }

  const addDegafi = (e) => {
    e.preventDefault()
    naviagate('/Degafi/create')
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
    return imagePath
  }

  const editDegafi = (e, item) => {
    e.preventDefault()
    naviagate('edit', {
      state: {
        Mahber: item,
      },
    })
  }

  const getName = () => {

    
    var k = `${Degafi.degafiSetting.name} ( ${Degafi.degafiSetting.payment} 
         ETB ${Degafi.degafiSetting.paymentStyle === 0 ? 'Per Month' : 'Per Year'}  )`

    return k
  }

  const giveId = async (event, item) => {
    event.preventDefault()

    const formData = new FormData()
    formData.set('IdGiven', true)
    formData.set('ID', item)

    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlDegafi, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXLId(false)
          window.location.reload()
          customToast('Degafi Successfully Given an Id ', 0)
        })
        .catch((err) => {
          setIsLodding(false)
          customToast(err, 1)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)
    }
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return Mahber.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .filter((item) => idCardGiven === item.idGiven)
      .slice(firstPageIndex, lastPageIndex)
  }, [currentPage, Mahber, search, idCardGiven])

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.set('MoneyPayed', paymentMoneyPaid)
    formData.set('Month', paymentMonth)
    formData.set('Year', paymentYear)
    formData.set('MoneyRemaining', paymentMoneyRemaining)
    formData.set('DegafiId', Degafi.id)
    setIsLodding(true)
    axios
      .post(`${urlDegafi}/regiserPayment`, formData)
      .then((res) => {
        customToast('Successfully Paid ', 0)
        setPaymentModal(false)
        setIsLodding(false)
        window.location.reload()
      })
      .catch((err) => {
        setIsLodding(false)
        console.error(err)
      })
  }

  var calendar = $.calendars.instance('ethiopian', 'am')
  $('#popupDatepicker').calendarsPicker({ calendar: calendar })

  const ExcelInputHandler = (event) => {
    setExcelFile(event.target.files[0])
  }

  const handleExcelSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('excelFile', excelFile)
    formData.set('mahberId', mahber.id)

    //console.log('formdata', formData)

    setIsLodding(true)
    axios
      .post(`${urlDegafi}/fromExcel`, formData)
      .then((res) => {
        customToast('Successfully Imported ', 0)
        setPaymentModal(false)
        setIsLodding(false)
        window.location.reload()
      })
      .catch((err) => {
        setIsLodding(false)
        customToast('Invalid excel file please check the format and also empty values', 1)
        console.error(err)
      })
  }

  return (
    <>
      <CModal size="md" visible={excelModal} onClose={() => setExcelModal(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Add Fans From Excel </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CForm validated onSubmit={handleExcelSubmit}>
              <CCardBody>
                <MDBRow>
                  <MDBCol lg="6">
                    <CCol md={12}>
                      <CFormLabel htmlFor="formFileLg">Excel File</CFormLabel>
                      <CFormInput
                        type="file"
                        size="sm"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={ExcelInputHandler}
                        required
                        id="formFileLg"
                      />
                    </CCol>
                  </MDBCol>
                </MDBRow>

                <CCol xs={12} className="d-flex justify-content-end">
                  <CButton
                    className="text-right"
                    size="lg"
                    style={{
                      backgroundColor: '#b2322a',
                      color: '#fff',
                      borderColor: '#fff',
                    }}
                    type="submit"
                  >
                    Import
                  </CButton>
                </CCol>
              </CCardBody>
            </CForm>
          </CCardBody>
        </CModalBody>
      </CModal>
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
                        <MDBCardText>Phone number</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {Degafi && Degafi.phoneNumber}
                        </MDBCardText>
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
                        <MDBCardText>Gender</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {Degafi && Degafi.gender===0?"Male":"Female"}
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
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Occupation</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">
                          {Degafi && Degafi.jobType}
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
      <CModal size="xl" visible={visibleXLId} onClose={() => setVisibleXLId(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Id Preview </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            {template && (
              <IdTemplate
                headerAm={template.headerAmharic}
                headerEn={template.headerEnglish}
                subtitle={template.subtitle1}
                subtitle2={template.subtitle2}
                addressAm={template.addressAmharic}
                address={template.address}
                lo={template.logo}
                bg={template.backgroundImage}
                level={
                  template.degafiSettings &&
                  template.degafiSettings.filter((x) => x.id == Degafi.degafiSettingId)[0].name
                }
                level2={
                  template.degafiSettings &&
                  template.degafiSettings.filter((x) => x.id == Degafi.degafiSettingId)[0]
                    .amharicName
                }
                idno={Degafi && Degafi.idNumber}
                name={Degafi && Degafi.name}
                amharicName={Degafi && Degafi.amharicName}
                sex={Degafi && Degafi.gender}
                phoneNumber={Degafi && Degafi.phoneNumber}
                userPhoto={Degafi && Degafi.userPhoto}
                color={
                  template.degafiSettings &&
                  template.degafiSettings.filter((x) => x.id == Degafi.degafiSettingId)[0].color
                }
                tempback={template && template.backImage}
                giveId={giveId}
                id={Degafi && Degafi.id}
              />
            )}
          </CCardBody>
        </CModalBody>
      </CModal>
      <CModal size="xl" visible={paymentModal} onClose={() => setPaymentModal(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Fan Payment </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CCallout>
              {' '}
              <span
                style={{
                  fontSize: '22px',
                  color: 'rgb(233, 147, 19)',
                }}
              >
                Paymnet for Fan{' '}
                <b style={{ textDecoration: 'underline' }}>{Degafi && Degafi.name} </b>
                <span
                  style={{
                    fontSize: '18px',
                    color: 'rgb(233, 147, 19)',
                  }}
                >
                  {Degafi.degafiSetting && Degafi.degafiSetting.name} (
                  {Degafi.degafiSetting && Degafi.degafiSetting.payment} )
                </span>
              </span>
            </CCallout>

            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <CCard>
                    <CCardBody>
                      <CForm validated onSubmit={handleSubmit}>
                        <CRow>
                          <CCol sm={3}>
                            <CFormInput label="Current Date" type="text" id="popupDatepicker" />

                            <CFormSelect
                              value={paymentMonth}
                              required
                              onChange={(e) => setPaymentMonth(e.target.value)}
                              label={'Month'}
                            >
                              <option>---Select Month---</option>

                              {Months.map((item, index) => (
                                <option key={index} value={item.value}>
                                  {item.name}
                                </option>
                              ))}
                            </CFormSelect>
                          </CCol>
                          <CCol sm={3}>
                            <CFormInput
                              value={paymentYear}
                              required
                              onChange={(e) => setPaymentYear(e.target.value)}
                              type="number"
                              label={'Year'}
                            />
                          </CCol>
                          <CCol sm={3}>
                            <CFormInput
                              value={paymentMoneyPaid}
                              required
                              onChange={(e) => setPaymentMondeyPaid(e.target.value)}
                              type="number"
                              label={'Money Paid'}
                            />
                          </CCol>
                          <CCol sm={3}>
                            <CFormInput
                              value={paymentMoneyRemaining}
                              required
                              onChange={(e) => setPaymentMoneyRemaining(e.target.value)}
                              type="number"
                              label={'Money Reamining'}
                            />
                          </CCol>
                        </CRow>
                        <CCol
                          sm={12}
                          style={{
                            textAlign: 'right',
                            marginTop: '20px',
                          }}
                        >
                          <CButton
                            className="text-right bg-white"
                             style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                            type="submit"
                          >
                            Submit
                          </CButton>
                        </CCol>
                      </CForm>
                    </CCardBody>
                  </CCard>

                  <CTable align="middle" className="mb-0 border" hover responsive>
                    <CTableHead color="light">
                      <CTableRow>
                        <CTableHeaderCell>Month</CTableHeaderCell>
                        <CTableHeaderCell>Year</CTableHeaderCell>
                        <CTableHeaderCell>Money Paid</CTableHeaderCell>
                        <CTableHeaderCell>Money Remaining</CTableHeaderCell>
                        <CTableHeaderCell>Action</CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {//console.log('Degafi', Degafi)}

                      {Degafi.payments &&
                        Degafi.payments.map((payment, index) => (
                          <CTableRow v-for="item in tableItems" key={index}>
                            <CTableDataCell>{Months[payment.month].name}</CTableDataCell>
                            <CTableDataCell>{payment.year}</CTableDataCell>
                            <CTableDataCell>{payment.moneyPayed}</CTableDataCell>
                            <CTableDataCell>{payment.moneyRemaining}</CTableDataCell>
                            <CTableDataCell>
                              <CButton
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
                                <CIcon icon={cilPencil} />
                                &nbsp; Edit
                              </CButton>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                    </CTableBody>
                  </CTable>
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
                  label="Search By Id:"
                  value={idCardGiven}
                  onChange={() => setId(!idCardGiven)}
                  type="text"
                >
                  <option value={true}>Given</option>
                  <option value={false}>Not Given</option>
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
                <CCol sm={8}>
                  <strong>Degafi</strong> <small>List</small>
                </CCol>

                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={addDegafi}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Degafi
                  </CButton>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setExcelModal(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    From Excel
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
                    <CTableHeaderCell>Degafi Name</CTableHeaderCell>
                    <CTableHeaderCell>Degafi Type</CTableHeaderCell>
                    <CTableHeaderCell>Mahber</CTableHeaderCell>
                    <CTableHeaderCell>Phone Number</CTableHeaderCell>
                    <CTableHeaderCell>ID Card</CTableHeaderCell>

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
                            <strong>{user.fullName}</strong>
                          </div>
                          <div className="float-end">
                            {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                          </div>
                        </div>
                        {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                      </CTableDataCell>
                      <CTableDataCell>{item.phoneNumber}</CTableDataCell>
                      <CTableDataCell>{item.idGiven ? 'Given' : 'Not Given'}</CTableDataCell>
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
                                editDegafi(e, item)
                              }}
                            >
                              <CIcon icon={cilPencil} />
                              &nbsp; Edit
                            </CDropdownItem>

                            {!item.idGiven && (
                              <>
                                <CDropdownDivider />
                                <CDropdownItem
                                  onClick={(e) => {
                                    //giveId(e, item.id)
                                    idView(item)
                                    setVisibleXLId(true)
                                  }}
                                >
                                  <CIcon icon={cilCreditCard} />
                                  &nbsp; Give ID
                                </CDropdownItem>
                              </>
                            )}
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

export default Degafi
