import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dateformat from 'dateformat'
import { useNavigate } from 'react-router-dom'
import {
  CCol,
  CRow,
  CCallout,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

import { urlMatch } from 'src/endpoints'
import { cilPen } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { cilTrash } from '@coreui/icons'

function Match({ user, setIsLodding }) {
  const [match, setMatch] = useState([])
  const naviagate = useNavigate()
  useEffect(() => {
    axios.get(`${urlMatch}/score`).then((res) => setMatch(res.data))
  }, [])

  const addMatch = () => {
    naviagate('/match/create')
  }
  const updatematch = (item) => {
    //"match",item)
    naviagate('update',
    {
      state:{
        match:item
      }
    })
  }

  const deleteMatch = (item) => {
   
    setIsLodding(true)
    axios
      .delete(`${urlMatch}?matchId=${item}`)
      .then((res) => {
        customToast('successfully Deleted', 0)
        getAdvert()
        setIsLodding(false)
        
      })
      .catch((err) => {
        setIsLodding(false)
        customToast('something went wrong', 1)
      })
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCallout className="bg-white"></CCallout>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
              <CRow>
                <CCol sm={10}>
                  <strong>Match</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={addMatch}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Match
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>

                    <CTableHeaderCell>Season</CTableHeaderCell>
                    <CTableHeaderCell>Match Week</CTableHeaderCell>
                    <CTableHeaderCell>Team 1 </CTableHeaderCell>
                    <CTableHeaderCell>Team Abb</CTableHeaderCell>
                    <CTableHeaderCell>Team 2 </CTableHeaderCell>
                    <CTableHeaderCell>Team 2 Abb</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {match.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell>{item.seasons.name} {item.seasons.isActive&&"(on Going)"}</CTableDataCell>
                      <CTableDataCell>{item.matchWeek.matchWeek} {item.matchWeek.isMatchWeek && "( Is Match Week )"}</CTableDataCell>
                      <CTableDataCell>
                        <div>{item.team1.name} </div>
                      </CTableDataCell>
                      <CTableDataCell>
                        <div>{item.team1.shortName}</div>
                      </CTableDataCell>
                      <CTableDataCell>{item.team2.name}</CTableDataCell>
                      <CTableDataCell>{item.team2.shortName}</CTableDataCell>
                      <CTableDataCell>{dateformat(item.matchDate)}</CTableDataCell>
                     

                      <CTableDataCell>
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            updatematch(item)
                          }}
                        >
                          <CIcon icon={cilPen} />
                          &nbsp; Edit
                        </CButton>
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            deleteMatch(item.id)
                            //setDegafi(item)
                          }}
                        >
                          <CIcon icon={cilTrash} />
                          &nbsp; Remove
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Match
