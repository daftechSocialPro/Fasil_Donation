import React, { useState, useEffect, useMemo, useRef } from 'react'

import axios from 'axios'
import moment from 'moment'

import { useNavigate } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardImage,
  CCol,
  CCardTitle,
  CCardText,
  CRow,
  CCardHeader,
  CCardLink,
  CCallout,
  CModalBody,
  CButton,
  CModal,
  CModalTitle,
  CModalHeader,
 
} from '@coreui/react'

import { urlNews, assetUrl } from 'src/endpoints'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import dateFormat from 'dateformat'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilObjectGroup } from '@coreui/icons'

import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
import { customToast } from 'src/components/customToast'
import Pagination from 'src/components/Pagination'
let PageSize = 3


















function News({ user }) {
  const [news, setNews] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [ne, setNe] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
 
  const naviagate = useNavigate()


  let connection = null;
  const connectionRef = useRef(connection);

  if (!connectionRef.current) {
    connection = new HubConnectionBuilder()
      .withUrl("https://localhost:7065/ws/Encoder", {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets,
      })
      .configureLogging(LogLevel.Information)
      .build();
    connection
      .start()
      .then(() => {
        //console.log("Connection started.......!");
        
      })
      .catch((err) => //console.log("Error while connect with server",err));

      

    connectionRef.current = connection;
  }


 
  useEffect(() => {
    getNews()  
   
  }, [])

  
  if (connection) {
    connection.on("getNews", (result) => {
      setNews(result);
      customToast("News Updated",0)
    });
  }
 
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;  
    return news.slice(firstPageIndex, lastPageIndex);
  }, [currentPage,news]);

  const getNews = () => {
    axios
      .get(urlNews)
      .then((res) => {
        user.userRole === 1
          ? setNews(res.data.filter((x) => x.userId === user.id))
          : setNews(res.data)
      })
      .catch((err) => console.error(err))
  }

  const addNews = (e) => {
    e.preventDefault()
    naviagate('/news/create')
  }

  const getDate = (item) => {
    const startDate = moment(item)
    const timeEnd = moment(new Date())
    const diff = timeEnd.diff(startDate)
    const diffDuration = moment.duration(diff)
    return (
      diffDuration.days() +
      ' days ' +
      diffDuration.hours() +
      ' hrs ' +
      diffDuration.minutes() +
      ' mins'
    )
  }

  const getImage = (item) => {
    const imagePath = `${assetUrl}/${item}`
    //'image path', imagePath)
    return imagePath
  }

  const navigateTo = (e, item) => {
    e.preventDefault()
    naviagate('/news/edit', {
      state: {
        news: item,
      },
    })
  }

  return (
    <>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
        <CModalTitle>News Public View </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody className="text-center">
                    {ne && (
                      <MDBCardImage
                        src={getImage(ne.img)}
                        alt="avatar"
                        style={{ borderRadius: '20px', border: 'solid #fff' }}
                        fluid
                      />
                    )}
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <h4 style={{ fontWeight: 'bold' }}>{ne.title}</h4>
                    <hr />
                    <h6>
                      By: {ne.user && ne.user.fullName} | ON: {dateFormat(ne.createdAt)}
                    </h6>
                    <h6 style={{ fontWeight: 'bold' }}>{ne.subTitle}</h6>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>

              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <div dangerouslySetInnerHTML={{ __html: ne.description }}></div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </CCardBody>
        </CModalBody>
      </CModal>

      <CRow>
        <CCol xs={12}>
          <CCallout className="bg-white"></CCallout>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="" style={{ backgroundColor: '#b2322a', color: '#fff' }}>
              <CRow>
                <CCol sm={10}>
                  <strong>News</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={addNews}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add News
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>
            <CCardBody>
              <>
              <CRow>
                {currentTableData.map((item) => (
                  <CCol lg={4} key={item.id}>
                    <CCard className="mb-3">
                      <CCardImage
                        orientation="top"
                        style={{ maxHeight: '260px' }}
                        src={getImage(item.img)}
                      />
                      <CCardBody>
                        <CCardTitle>{item.title}</CCardTitle>
                        <CCardText>{item.subTitle}</CCardText>
                        <CCardText>
                          <small className="text-medium-emphasis">
                            created {getDate(item.createdAt)} ago <br />
                            {/* updated {item.updatedAt!="-infinity"&&getDate(item.updatedAt)} ago */}
                          </small>
                        </CCardText>
                        <div className="d-flex justify-content-between">
                          <CCardLink
                            style={{ color: '#fff', cursor: 'pointer', textDecoration: 'none' }}
                            onClick={(e) => navigateTo(e, item)}
                          >
                            <CIcon icon={cilPencil} />
                            &nbsp; Edit
                          </CCardLink>
                          &nbsp;
                          <CCardLink
                            onClick={(e) => {
                              setNe(item)
                              setVisibleXL(true)
                            }}
                            style={{ color: '#fff', cursor: 'pointer', textDecoration: 'none' }}
                          >
                            <CIcon icon={cilObjectGroup} />
                            &nbsp; Public View
                          </CCardLink>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCol>
                ))}
              </CRow>
              <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={news.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      
      </>

              
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default News

