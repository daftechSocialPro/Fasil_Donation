import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CCallout,
  CFormSwitch,
  CFormSelect,
} from '@coreui/react'
import { urlMatch, urlMatchWeek, urlSeason, urlTeam } from 'src/endpoints'
import { customToast } from '../../../components/customToast'
import { useNavigate } from 'react-router-dom'

function MatchCreate({ setIsLodding }) {
  const [matchWeek, setMatchWeek] = useState('')
  const [team1, setTeam1] = useState('')
  const [team2, setTeam2] = useState('')
  const [matchDate, setMatchDate] = useState('')
  const [seasonId, setSeasonId] = useState('')
  

  const [team, setTeam] = useState([])
  const [team3, setTeam3] =useState([])
  const [season, setSeason] = useState([])
  const [matchWeeks,setMatchWeeks] =useState([])

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(urlTeam).then((res) => {
      setTeam3(res.data)
    })
  }, [])

  useEffect(() => {
    axios.get(urlSeason).then((res) => setSeason(res.data.filter(x=>x.isActive)))
  }, [])

  useEffect(() => {
    axios.get(urlMatchWeek).then((res) => setMatchWeeks(res.data.filter(x=>x.isMatchWeek)))
  }, [])

const valueSetter=(value)=>{


  setSeasonId(value);
  setTeam(team3.filter(x=>x.seasonId==value))



}
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)


    const formData = new FormData()

    
    formData.set('team1Id', team1)
    formData.set('team2Id', team2)
    formData.set('matchDate', matchDate)
    formData.set('seasonsId', seasonId)
    formData.set('matchWeekId', matchWeek)

    
    try {
      
      axios
        .post(`${urlMatch}`,formData)

        .then((res) => {
          setIsLodding(false)
          customToast('Match Successfully created', 0)
          navigate('/match')
        })
        .catch((err) => {
          setIsLodding(false)
          customToast(err, 1)
          console.error(err)
        })
    } catch (error) {
      customToast(error, 1)
      console.error(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCallout className="bg-white">provide match</CCallout>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }}>
            <strong>Add </strong> <small>Match</small>
          </CCardHeader>
          <CCardBody>
            <CForm className="row g-3 needs-validation" validated onSubmit={handleSubmit}>
              <CCol xs="3">
                <CFormSelect
                  label="Team1"
                  required
                  value={team1}
                  onChange={(e) => {setTeam1(e.target.value)}}
                >
                  <option>--- Select Team 1 ---</option>

                  {team.filter(x=>x.id!=team2).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
              <CCol xs="3">
                <CFormInput
                  type="datetime-local"
                  label="Match Date Time"
                  required
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                />
              </CCol>
              <CCol xs="3">
                <CFormSelect
                  label="Team2"
                  required
                  value={team2}
                  onChange={(e) => setTeam2(e.target.value)}
                >
                  <option>--- Select Team 2 ---</option>

                  {team.filter(x=>x.id!=team1).map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
          
              <CCol xs="3">
                <CFormSelect
                  label="Match Week"
                  required
                  value={matchWeek}
                  onChange={(e) => setMatchWeek(e.target.value)}
                >
                  <option>--- Select MatchWeek ---</option>

                  {matchWeeks.map((item, index) => (
                    <option key={index} value={item.id}>
                      Match Week {item.matchWeek} {item.isMatchWeek && '( Is Match Week )'}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol xs="3">
                <CFormSelect
                  label="Season"
                  required
                  value={seasonId}
                  onChange={(e) => valueSetter(e.target.value)}
                >
                  <option>--- Select Season 2 ---</option>

                  {season.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name} ({item.year} {item.isActive && 'on going'})
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

         

              <hr />
              <div className="d-flex justify-content-end">
                <CCol xs="auto">
                  <CButton
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
              </div>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MatchCreate
