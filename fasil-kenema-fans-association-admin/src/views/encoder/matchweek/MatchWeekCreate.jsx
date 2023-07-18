import React, { useState } from 'react'
import { CForm, CCol, CFormInput, CButton, CFormSwitch } from '@coreui/react'
import axios from 'axios'
import { customToast } from 'src/components/customToast'
import { urlMatchWeek } from 'src/endpoints'

function MatchWeekCreate({ setIsLodding, setVisibleXL, getMatchWeek }) {
  const [matchWeek, setMatchWeek] = useState('')
  const [isMatchWeek, setIsMatchWeek] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData = {
      matchWeek: matchWeek,
      isMatchWeek: isMatchWeek,
    }

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .post(urlMatchWeek, formData)
        .then((res) => {
          if (res.data) {
        
            customToast("Match Week Can Not be Duplicated", 1)
            setIsLodding(false)
          } else {
            setIsLodding(false)
            setVisibleXL(false)
            setMatchWeek('')
            setIsMatchWeek(false)

            customToast('MatchWeek Successfully created', 0)
            getMatchWeek()
          }
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
          label="Is On going Season"
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

export default MatchWeekCreate
