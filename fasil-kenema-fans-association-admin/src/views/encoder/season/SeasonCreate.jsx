import React, { useState } from 'react'
import   {
CForm,
CCol,
CFormInput,
CButton 
} from '@coreui/react'
import axios from 'axios'
import { customToast } from 'src/components/customToast'
import { urlSeason } from 'src/endpoints'
function SeasonCreate({setIsLodding, setVisibleXL,getSeason}) {

  const [year,setYear] =useState('')
  const [name,setName ]= useState('')
  const [fromDate,setFromDate]=useState('')
  const [toDate,setToDate]= useState('')


  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData ={
      
      "Name":name,
      "FromDate":fromDate,
      "ToDate":toDate,
      "Year":year

    }


    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .post(urlSeason, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXL(false)
          setName('')
          setYear('')
         
          setFromDate('')
          setToDate('')
          customToast('Season Successfully created', 0)
          getSeason()
        })
        .catch((err) => {
          setIsLodding(false)
          customToast(err, 1)
        })
    } catch (error) {
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)
    }
  }

  return (

                    <CForm
                      className="row g-3 needs-validation"
                      validated
                      onSubmit={handleSubmit}
                    >
                                     

                                     <CCol md={3}>
                        <CFormInput
                          type="number"
                          placeholder="Year..."
                          label="Season Year"
                          required
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                        />
                      </CCol>

                      <CCol md={3}>
                        <CFormInput
                          type="text"
                          placeholder="name..."
                          label="Name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </CCol>
                      <CCol md={3}>
                        <CFormInput
                          type="date"
                          label="From Date"
                          required
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                        />
                      </CCol>
                      <CCol md={3}>
                        <CFormInput
                          type="date"
                          label="To Date"
                          required
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                        />
                      </CCol>

                    

                      <CCol xs={12} className="d-flex justify-content-end">
                        <CButton
                          size="lg"
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          type="submit"
                        >
                          Submit
                        </CButton>
                      </CCol>
                    </CForm>
              
  )
}

export default SeasonCreate