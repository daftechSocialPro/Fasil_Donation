import React, { useEffect, useState } from 'react'
import { CForm, CCol, CFormInput, CButton, CFormSelect, CFormLabel, CRow } from '@coreui/react'
import axios from 'axios'
import { customToast } from 'src/components/customToast'
import { urlSeason, urlTeam } from 'src/endpoints'
function TeamCreate({ setIsLodding, setVisibleXL, getTeam }) {
  const [shortName, setShortName] = useState('')
  const [name, setName] = useState('')
  const [seasonId, setSeasonId] = useState('')
  const [img, setImg] = useState('')
  const [season, setSeason] = useState([])

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  useEffect(() => {
    axios
      .get(urlSeason)
      .then((res) => setSeason(res.data))
      .catch((err) => console.error(err))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData = new FormData()

    formData.append('Photo', img)
    formData.set('Name', name)
    formData.set('ShortName', shortName)
    formData.set('SeasonId', seasonId)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .post(urlTeam, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXL(false)
          setName('')
          setShortName('')
          setSeasonId('')
          setImg('')

          customToast('Team Successfully created', 0)
          getTeam()
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
      <CCol md={4}>
        {img && (
          <img
            style={{
              maxHeight: '200px',
              width: '60%',
              border: 'solid #fff',
              borderRadius: '20px',
            }}
            src={URL.createObjectURL(img)}
          />
        )}
      </CCol>
      <CCol md={8}>
        <CRow>
          <CCol md={6}>
            <CFormLabel htmlFor="formFileLg">Team Logo</CFormLabel>
            <CFormInput
              type="file"
              size="sm"
              accept="image/*"
              onChange={photoInputHandler}
              required
              id="formFileLg"
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="text"
              placeholder="name..."
              label="Team Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="text"
              placeholder="short name..."
              label="Short Name"
              required
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />
          </CCol>
          <CCol md={6}>
            <CFormSelect
              label="Season"
              required
              value={seasonId}
              onChange={(e) => setSeasonId(e.target.value)}
            >
              <option>--Select Season---</option>

              {season.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name} ({item.year} {item.isActive && 'on going'})
                </option>
              ))}
            </CFormSelect>
          </CCol>
        </CRow>
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

export default TeamCreate
