import React, { useState } from 'react'
import   {
CForm,
CCol,
CFormInput,
CButton ,
CFormSwitch
} from '@coreui/react'
import axios from 'axios'
import { customToast } from 'src/components/customToast'
import { urlMatchWeek } from 'src/endpoints'

function MatchWeekUpdate({setIsLodding, setVisibleXLU,getMatchWeek,MatchWeek}) {


  const [matchWeek, setMatchWeek] = useState(MatchWeek.matchWeek)
  const [isMatchWeek, setIsMatchWeek] = useState(MatchWeek.isMatchWeek)


  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData ={      
      "matchWeek": matchWeek,
      "isMatchWeek": isMatchWeek,
      "ID":MatchWeek.id
    }


    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .put(urlMatchWeek, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXLU(false)
          setMatchWeek('')
          setIsMatchWeek(false)

          customToast('MatchWeek Successfully Updated', 0)
          getMatchWeek()
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
    <CForm className="row g-3 needs-validation" validated onSubmit={handleSubmit}>
    <CCol md={3}>
      <CFormInput
        type="number"
        placeholder="match week..."
        label="MatchWeek"
        required
        value={matchWeek}
        onChange={(e) => setMatchWeek(e.target.value)}
      />
    </CCol>

    <CCol md={3}>
      <CFormSwitch
        checked={isMatchWeek}
        onChange={() => setIsMatchWeek(!isMatchWeek)}
        label="Is On going MatchWeek"
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
        Update
      </CButton>
    </CCol>
  </CForm>
  )
}

export default MatchWeekUpdate