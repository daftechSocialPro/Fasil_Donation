import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCol,
  CRow,
  CCallout,
  CCard,
  CCardBody,
  CCardHeader,

} from '@coreui/react'
import {  urlMatch } from 'src/endpoints'
import ScoreCreate from './ScoreCreate'
function Score({setIsLodding}) {
  const [score, setScore] = useState([])

  useEffect(() => {
    axios
      .get(`${urlMatch}/score`)
      .then((res) => setScore(res.data))
      .catch((err) => console.error(err))
  }, [])

  

  return (
    <CRow>
      <CCol xs={12}>
        <CCallout className="bg-white"></CCallout>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
            <CRow>
              <CCol sm={10}>
                <strong>Score</strong> <small>List</small>
              </CCol>
              <CCol sm={2} className="d-flex justify-content-end"></CCol>
            </CRow>
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol sm={1} />
              <CCol sm={10}>
                <CRow>
                  <div className="d-flex justify-content-center">
                    <CCol sm={4} className="d-flex justify-content-center">
                      Match Week {score[0] && score[0].matchWeek.matchWeek}
                    </CCol>
                  </div>
                </CRow>
                <hr />

                {score.map((item, index) => (
                <div key={index}>
                  <ScoreCreate setIsLodding={setIsLodding}  item={item} />
                  <hr/>
                  
                  </div>
                ))}
              </CCol>
              <CCol sm={1} />
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Score
