import React, { useState, useEffect } from 'react'
import {
  CCol,
  CRow,
  CCallout,
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormInput,
  CForm,
  CButton,
  CCardHeader,
} from '@coreui/react'
import { MDBCol, MDBRow, MDBCard } from 'mdb-react-ui-kit'
import { customToast } from 'src/components/customToast'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { urlDegafi } from 'src/endpoints'
import { useRef } from 'react'

function FanPaymentsModal({ setIsLodding }) {


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
  const [ccDate, setCCDate] = useState('')
  const [month, setMonth] = useState('')
  const [paymentMoneyPaid, setPaymentMondeyPaid] = useState(0)
  const [startDate, setStartDate] = useState('')
  const [penality, setPenlaity] = useState(0)
  const location = useLocation()
  const [payments, setPayments] = useState([])
  const inputRef = useRef(null);
  const Degafi = location.state && location.state.degafi
  var calendar = $.calendars.instance('ethiopian', 'am')

  payments[0]
    && $('#popupDatepicker').calendarsPicker({
        calendar: calendar,
        minDate: payments[0].endDate,
      })

  useEffect(() => {
    getPayment()
  }, [])
  const getPayment = () => {
    axios
      .get(`${urlDegafi}/getPayment?fanId=${Degafi.id}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err))
  }

  const getAmharicDate = (value) => {
    const date = value.split('/')
    const amDate = `${months[parseInt(date && date[1]) - 1]} ${date && date[0]} ${date && date[2]}`
    return amDate
  }

  const getValue = (value) => {
    const money = Degafi.degafiSetting && Degafi.degafiSetting.payment * value
    setMonth(value)
    setPaymentMondeyPaid(money)
  }

  useEffect(() => {
    axios
      .get(`${urlDegafi}/getPenality?startDate=${startDate}&degafiId=${Degafi.id}`)
      .then((res) => setPenlaity(res.data))
      .catch((err) => console.error(err))
  }, [startDate])

  useEffect(() => {
    axios
      .get(`${urlDegafi}/getDate`)
      .then((res) => setCCDate(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleSubmit = (event) => {

    event.preventDefault()
    const formData = new FormData()
    formData.set('MoneyPayed', paymentMoneyPaid)
    formData.set('Month', month)
    formData.set('StartDate', $('#popupDatepicker').val())
    formData.set('DegafiId', Degafi.id)
    setIsLodding(true)
    axios
      .post(`${urlDegafi}/regiserPayment`, formData)
      .then((res) => {
        customToast('Successfully Paid ', 0)
        getPayment()
        setIsLodding(false)
        window.location.reload()
      })
      .catch((err) => {
        setIsLodding(false)
        console.error(err)
      })
  }
 

  return (
    <CCard className="mb-4">
      <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
        <CRow>
          <CCol sm={10}>
            <strong>Payment</strong>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        <CCallout>
          {' '}
          <span
            style={{
              fontSize: '22px',
              color: 'rgb(233, 147, 19)',
            }}
          >
            <h2 style={{ color: '#fff' }}>{` ${months[ccDate.split('/')[1] - 1]} ${
              ccDate.split('/')[0]
            } ${ccDate.split('/')[2]}`}</h2>
            Paymnet for Fan <b style={{ textDecoration: 'underline' }}>{Degafi && Degafi.name} </b>
            <span
              style={{
                fontSize: '18px',
                color: 'rgb(233, 147, 19)',
              }}
            >
              {Degafi.degafiSetting && Degafi.degafiSetting.name} (
              {Degafi.degafiSetting && Degafi.degafiSetting.payment}
              {' ETB '})
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
                        <CFormInput
                          label="Start Date"
                         value={!payments[0]?'01/01/2015':''}
                         readOnly={!payments[0]}
                          type="text"
                          required
                          id="popupDatepicker"
                       
                        />
                      </CCol>

                      <CCol sm={3}>
                        <CFormInput
                          value={month}
                          required
                          onChange={(e) => getValue(e.target.value)}
                          type="number"
                          label={'Month Count (የስንት ወር)'}
                        />
                      </CCol>
                      <CCol sm={2}>
                        <CFormInput
                          value={paymentMoneyPaid}
                          required
                          readOnly
                          type="number"
                          label={'Money Paid'}
                        />
                      </CCol>
                      <CCol sm={2}>
                        <CFormInput
                          value={penality}
                          required
                          readOnly
                          type="number"
                          label={'Penality'}
                        />
                      </CCol>
                      <CCol sm={2}>
                        <CFormInput
                          value={penality + paymentMoneyPaid}
                          required
                          readOnly
                          type="number"
                          label={'Total'}
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
                    <CTableHeaderCell>From Date</CTableHeaderCell>
                    <CTableHeaderCell></CTableHeaderCell>
                    <CTableHeaderCell>To Date</CTableHeaderCell>
                    <CTableHeaderCell>Money Paid</CTableHeaderCell>
                    <CTableHeaderCell>Penality</CTableHeaderCell>
                    <CTableHeaderCell>Total</CTableHeaderCell>

                    {/* <CTableHeaderCell>Action</CTableHeaderCell> */}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {payments.map((payment, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{getAmharicDate(payment.startDate)}</CTableDataCell>
                      <CTableDataCell>እስከ</CTableDataCell>
                      <CTableDataCell>{getAmharicDate(payment.endDate)}</CTableDataCell>
                      <CTableDataCell>{payment.moneyPayed}</CTableDataCell>
                      <CTableDataCell>{payment.penality}</CTableDataCell>
                      <CTableDataCell>{payment.moneyPayed + payment.penality}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </CCardBody>
    </CCard>
  )
}

export default FanPaymentsModal
