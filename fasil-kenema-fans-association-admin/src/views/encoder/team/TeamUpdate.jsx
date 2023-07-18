import React, { useState, useEffect } from 'react'
import {
  CForm,
  CCol,
  CFormInput,
  CButton,
  
  CFormSelect,
  CFormLabel,
  CRow,
} from '@coreui/react'
import axios from 'axios'
import { customToast } from 'src/components/customToast'
import { assetUrl, urlTeam ,urlSeason} from 'src/endpoints'
function TeamUpdate({ setIsLodding, setVisibleXLU, getTeam, Team }) {

  console.log('hello',Team)
  const [shortName, setShortName] = useState(Team.shortname)
  const [name, setName] = useState(Team.name)
  const [seasonId, setSeasonId] = useState(Team.seasonId)
  const [img, setImg] = useState(null)
  const [season, setSeason] = useState([])

  const getImage = (item) => {
    return `${assetUrl}/${item}`
  }

  useEffect(() => {
    axios
      .get(urlSeason)
      .then((res) => setSeason(res.data))
      .catch((err) => console.error(err))
  }, [])
  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData = new FormData()

    formData.append('Photo', img)
    formData.set('Name', name)
    formData.set('ShortName', shortName)
    formData.set('SeasonId', seasonId)
    formData.set('ID', Team.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .put(urlTeam, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXLU(false)
          setName('')
          setImg('')
          setSeasonId('')
          

          getTeam()
          customToast('Team Successfully Updated', 0)
          
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
        
          <img
            style={{
              maxHeight: '200px',
              width: '60%',
              border: 'solid #fff',
              borderRadius: '20px',
            }}
            src={img ? URL.createObjectURL(img) : getImage(Team.logo)}
          />
        
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
          Update
        </CButton>
      </CCol>
    </CForm>
  )
}

export default TeamUpdate
