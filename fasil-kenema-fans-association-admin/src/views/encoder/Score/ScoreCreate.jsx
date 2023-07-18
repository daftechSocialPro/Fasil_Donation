import React, { useEffect, useState } from 'react'
import {
  CFormLabel,
  CForm,
  CFormInput,
  CAvatar,
  CFormSwitch,
  CButton,
  CCol,
  CRow,
  CFormSelect,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModal,
  CCardBody,
  CImage,
} from '@coreui/react'
import { assetUrl, urlMatch, urlPlayer } from 'src/endpoints'
import { customToast } from 'src/components/customToast'
import axios from 'axios'
import CIcon from '@coreui/icons-react'
import { cilSoccer, cilWalk } from '@coreui/icons'

import  yellow  from 'src/assets/yellow.png'
import red from 'src/assets/red.png'
const getImage = (item) => {
  return `${assetUrl}/${item}`
}
function ScoreCreate({ item, setIsLodding }) {


  const PlayerDid = [{value:0,name:'Goal'}, {value:2,name:'Yellow Card'}, {value:3,name:'Red Card'}]
  
  const [isFullTime, setIsFullTime] = useState(item.game == 2 ? true : false)
  const [matchStarted, setMatchStarted] = useState(item.game==1?true:false)
  const [team1Score, setTeam1Score] = useState(item.team1Score)
  const [team2Score, setTeam2Score] = useState(item.team2Score)

  const [playerDid,setPlayerDid]=useState('')
  const [playerId,setPlayerId]=useState('')

  const [teamId,setTeamId]=useState('')
  const [playerAssistId,setPlayerAssistId]=useState('')

  const [team1Players, setTeam1Players] = useState([])
  const [team2Players, setTeam2Players] = useState([])

  const [visibleXL, setVisibleXL] = useState(false)
  const [minute, setMinute] = useState(0)
  const [teamPlayers, setTeamPlayers] = useState([])

  useEffect(() => {
    axios
      .get(`${urlPlayer}/?teamID=${item.team1.id}`)
      .then((res) => setTeam1Players(res.data))
      .catch((err) => console.error(err))
  }, [])
  useEffect(() => {
    axios
      .get(`${urlPlayer}/?teamID=${item.team2.id}`)
      .then((res) => setTeam2Players(res.data))
      .catch((err) => console.error(err))
  }, [])

  const getTeamPlayers = (item) => {
    setTeamId(item)
    axios
      .get(`${urlPlayer}/?teamID=${item}`)
      .then((res) => setTeamPlayers(res.data))
      .catch((err) => console.error(err))
  }
    
 


  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData = new FormData()

    formData.set("Game",isFullTime?2:matchStarted?1:0)
    formData.set("matchId",item.id)
    formData.set("minute",minute)
    formData.set("playerDid",playerDid)
    formData.set("playerId",playerId)
    formData.set("teamId",teamId)
    formData.set("playerAssistId",playerAssistId)
  
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .put(`${urlMatch}/ScoreUpdate`, formData)
        .then((res) => {
          setIsLodding(false)
          customToast('Score Successfully Updated', 0)
          window.location.reload()
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
    <>
      <CModal size="md" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Ongoing Match</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <CRow>
              <CCol sm={4}>
                <CFormLabel>
                  <CAvatar size="md" src={getImage(item.team1.logo)} status={ item.game==1?'success':'danger'} /> &nbsp;
                  {item.team1.name}
                </CFormLabel>
              </CCol>
              <CCol sm={1} className="d-flex justify-content-end">
                <span style={{ fontSize: '28px' }}>{team1Score}</span>
              </CCol>
              <CCol sm={2} className="d-flex justify-content-center">
                <CFormLabel>:</CFormLabel>
              </CCol>
              <CCol sm={1}>
                <span style={{ fontSize: '28px' }}>{team2Score}</span>
              </CCol>
              <CCol sm={4} className="d-flex justify-content-end">
                <CFormLabel>
                  {item.team2.name} &nbsp;
                  <CAvatar size="md" src={getImage(item.team2.logo)} status={item.game==1?'success':'danger'} />
                </CFormLabel>
              </CCol>
              <hr />

              <CForm
                style={{ padding: '10px' }}
                className="row g-3 needs-validation"
                validated
                onSubmit={handleSubmit}
              >
                <CCol sm={12} className="d-flex justify-content-center">
                  <CFormSwitch
                    disabled={isFullTime}
                    checked={matchStarted}
                    onChange={(e) => setMatchStarted(!matchStarted)}
                    label="Match Started"
                  />
                  &nbsp;&nbsp;&nbsp;
                  <CFormSwitch
                    disabled={item.game === 2}
                    checked={isFullTime}
                    onChange={(e) => setIsFullTime(!isFullTime)}
                    label="Full Time"
                  />
                </CCol>
                <br />
                <CCol sm={12} className="d-flex justify-content-center">
                  <CFormLabel>Minute</CFormLabel>&nbsp;
                  <CCol sm={4}>
                    <CFormInput
                      type="number"
                      disabled={matchStarted == 0 || isFullTime}
                      value={minute}
                      onChange={(e) => setMinute(e.target.value)}
                    ></CFormInput>
                  </CCol>
                </CCol>
                <br />
                <CCol sm={12} className="d-flex justify-content-center">
                  <CCol sm={8}>
                    <CFormSelect value={playerDid}  onChange={(e)=>setPlayerDid(e.target.value)} disabled={matchStarted == 0 || isFullTime}>
                      <option>---Select Action ---</option>
                      {PlayerDid.map((item, index) => (
                        <option key={index} value={item.value}>{item.name}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  </CCol>
                  <CCol sm={12} className="d-flex justify-content-center">
                  
                  <CCol sm={8}>
                    <CFormSelect  disabled={matchStarted == 0 || isFullTime} onChange={(e) => getTeamPlayers(e.target.value)}>
                      <option>---Select Team ---</option>
                      <option value={item.team1.id}>{item.team1.name}</option>
                      <option value={item.team2.id}>{item.team2.name}</option>
                    </CFormSelect>
                  </CCol>
                  </CCol>
                  <CCol sm={12} className="d-flex justify-content-center">
                  
                  <CCol sm={8}>
                    <CFormSelect label={playerDid==0&&'Goal'} value={playerId} onChange={(e)=>setPlayerId(e.target.value)}  disabled={matchStarted == 0 || isFullTime} >
                      <option>---Select Player ---</option>
                      {teamPlayers.filter(x=>x.id!=playerAssistId).map((item, index) => (
                        <option key={index} value={item.id}>{item.fullName}</option>
                      ))}
                    </CFormSelect>
                  </CCol>
                  </CCol>
                  <CCol sm={12} className="d-flex justify-content-center">

                  {playerDid==='0'&&  <CCol sm={8}>
                    
                    <CFormSelect label="Assist" value={playerAssistId} onChange={(e)=>setPlayerAssistId(e.target.value)}  disabled={matchStarted == 0 || isFullTime} >
                      <option>---Select Player ---</option>
                      {teamPlayers.filter(x=>x.id!=playerId).map((item, index) => (
                        <option key={index} value={item.id}>{item.fullName}</option>
                      ))}
                    </CFormSelect>
                  </CCol>}
                </CCol>
                <hr />
                <CCol sm={12} className="d-flex justify-content-center">
                  <CCol sm={4} className="d-flex justify-content-center">
                    <CButton
                      style={{
                        backgroundColor: '#b2322a',
                        color: '#fff',
                        borderColor: '#fff',
                      }}
                      type="submit"
                    >
                      &nbsp; Update
                    </CButton>
                  </CCol>
                </CCol>
              </CForm>
            </CRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CRow>
        <CCol sm={4}>
          <CFormLabel>
            <CAvatar size="md" src={getImage(item.team1.logo)} status={item.game==1?'success':'danger'} /> &nbsp;
            {item.team1.name}
          </CFormLabel>
        </CCol>
        <CCol sm={1} className="d-flex justify-content-end">
          <span style={{ fontSize: '28px' }}>{team1Score}</span>
        </CCol>
        <CCol sm={2} className="d-flex justify-content-center">
          <CFormLabel>:</CFormLabel>
        </CCol>
        <CCol sm={1}>
          <span style={{ fontSize: '28px' }}>{team2Score}</span>
        </CCol>
        <CCol sm={4} className="d-flex justify-content-end">
          <CFormLabel>
            {item.team2.name} &nbsp;
            <CAvatar size="md" src={getImage(item.team2.logo)} status={item.game==1?'success':'danger'} />
          </CFormLabel>
        </CCol>
        <hr />
        <CRow>
          <CCol sm={5} style={{textAlign:'end'}}>
            {item.macthStats
              .sort((a, b) => a.minute - b.minute || a.playerDid - b.playerDid)
              .map((item, index) => (
                <>
                  <span key={index}>
                    {team1Players.filter((x) => x.id == item.playerId)[0] && (
                      <span>
                        {item.playerDid == 0 && <CIcon icon={cilSoccer} />}
                        {item.playerDid == 1 && <CIcon icon={cilWalk} />}
                        {item.playerDid == 2 &&  <CImage src={yellow} height={50}/>}
                        {item.playerDid == 3 && <CImage src={red} height={50}/> } &nbsp;
                        {team1Players.filter((x) => x.id == item.playerId)[0].fullName}
                        &nbsp;{item.minute}'
                      </span>
                    )}
                  </span>

                  <br />
                </>
              ))}
          </CCol>
          <CCol sm={2} />
          <CCol sm={5} >
            {item.macthStats
              .sort((a, b) => a.minute - b.minute || a.playerDid - b.playerDid)
              .map((item, index) => (
                <>
                  <span key={index}>
                    {team2Players.filter((x) => x.id == item.playerId)[0] && (
                      <span>
                        {item.playerDid == 0 && <CIcon icon={cilSoccer} />}{' '}
                        {item.playerDid == 1 && <CIcon icon={cilWalk} />} 
                        {item.playerDid == 2 &&  <CImage src={yellow} height={50}/>}
                        {item.playerDid == 3 && <CImage src={red} height={50}/>} &nbsp;
                        {team2Players.filter((x) => x.id == item.playerId)[0].fullName}{' '}
                        &nbsp;{item.minute}'
                      </span>
                    )}
                  </span>

                   <br /> 
                </>
              ))}
          </CCol>
        </CRow>

        <div className="d-flex justify-content-center mt-2">
          <div
            sm={6}
            className="d-flex justify-content-center"
            style={{
              borderTop: '1px solid burlywood',
              borderBottom: '1px solid burlywood',
              padding: '12px',
            }}
          >
            <CFormSwitch
              disabled
              checked={matchStarted}
              onChange={(e) => setMatchStarted(!matchStarted)}
              label="Match Started"
            />
            &nbsp;&nbsp;&nbsp;
            <CFormSwitch
              disabled
              checked={isFullTime}
              onChange={(e) => setIsFullTime(!isFullTime)}
              label="Full Time"
            />
            &nbsp;&nbsp;&nbsp;
            {item.game !== 2 && (
              <CButton
                style={{
                  backgroundColor: '#b2322a',
                  color: '#fff',
                  borderColor: '#fff',
                }}
                onClick={() => setVisibleXL(true)}
              >
                &nbsp; Update
              </CButton>
            )}
          </div>
        </div>
      </CRow>
    </>
  )
}

export default ScoreCreate
