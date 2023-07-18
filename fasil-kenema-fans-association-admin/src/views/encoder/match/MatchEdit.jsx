import React, { useState,useEffect } from 'react'
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
    CFormSelect
} from '@coreui/react'
import { urlMatch,urlTeam,urlSeason,urlMatchWeek } from 'src/endpoints'
import { customToast } from '../../../components/customToast'
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom'

function MatchEdit({setIsLodding}) {

    const location = useLocation()

    const match = location.state.match;

    const [matchWeek, setMatchWeek] = useState(match.matchWeekId)
    const [team1, setTeam1] = useState(match.team1Id)
    const [team2, setTeam2] = useState(match.team2Id)
    const [matchDate, setMatchDate] = useState(match.matchDate)
    const [seasonId, setSeasonId] = useState(match.seasonsId)
    
  
    const [team, setTeam] = useState([])
    const [team3, setTeam3] =useState([])
    const [season, setSeason] = useState([])
    const [matchWeeks,setMatchWeeks] =useState([])


    useEffect(() => {
        axios.get(urlTeam).then((res) => {
            setTeam(res.data)
          setTeam3(res.data)
         
        })
      }, [])
    
      useEffect(() => {
        axios.get(urlSeason).then((res) => setSeason(res.data))
      }, [])
    
      useEffect(() => {
        axios.get(urlMatchWeek).then((res) => setMatchWeeks(res.data))
      }, [])
    
    const valueSetter=(value)=>{
    
    
      setSeasonId(value);
      setTeam(team3.filter(x=>x.seasonId==value))
    
    
    
    }





    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLodding(true)





        try {

            const formData = new FormData()

    
            formData.set('team1Id', team1)
            formData.set('team2Id', team2)
            formData.set('matchDate', matchDate)
            formData.set('seasonsId', seasonId)
            formData.set('matchWeekId', matchWeek)
            formData.set('ID', match.id)
        
            


            axios.put(`${urlMatch}`,formData)

                .then((res) => {               
                    
                    setIsLodding(false)
                    customToast("Match Successfully updated", 0)
                    navigate("/match")

                }
                ).catch((err) => {
                    setIsLodding(false)
                    customToast(err, 1)
                    console.error(err)
                })

        }
        catch (error) {
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
          <strong>Update </strong> <small>Match</small>
        </CCardHeader>
        <CCardBody>
          <CForm className="row g-3 needs-validation" validated onSubmit={handleSubmit}>
            <CCol xs="3">
              <CFormSelect
                label="Team1"
                required
                value={team1}
                onChange={(e) => setTeam1(e.target.value)}
              >
                <option>--- Select Team 1 ---</option>

                {team.map((item, index) => (
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
                label="Team1"
                required
                value={team2}
                onChange={(e) => setTeam2(e.target.value)}
              >
                <option>--- Select Team 2 ---</option>

                {team.map((item, index) => (
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
                  Update
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

export default MatchEdit