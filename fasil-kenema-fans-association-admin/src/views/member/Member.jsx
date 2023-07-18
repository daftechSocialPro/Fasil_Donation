import React, { useState, useEffect } from 'react'

import axios from 'axios'
import moment from 'moment'
import dateformat from 'dateformat'
import { useNavigate } from 'react-router-dom'
import {



    CCol,

    CRow,

    CModalBody,
    CCallout,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CAvatar,
    CModal,
    CModalHeader,
    CModalTitle,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,

} from '@coreui/react'
import {
    MDBCol,

    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,

} from 'mdb-react-ui-kit';


import dateFormat from 'dateformat'
import CIcon from '@coreui/icons-react'
import { cilPeople, cilAlignCenter } from '@coreui/icons'
import { urlMahber, assetUrl, urlMember } from 'src/endpoints'
function Member({ user }) {


    const [member, setmember] = useState([]);
    const [visibleXL, setVisibleXL] = useState(false);
    const [degafi, setDegafi] = useState({});
    const [degafiMahberId, setDegafiMahberId] = useState('');
    const naviagate = useNavigate();





    useEffect(() => {

        axios.get(`${urlMahber}/getbyid/?mahberId=${user.id}`)
            .then((res) => setDegafiMahberId(res.data.id))

    }, [degafiMahberId])



    useEffect(() => {
        getmember()

    }, [member])

    const getmember = () => {

        axios.get(`${urlMember}/?mahberId=${degafiMahberId}`).then((res) => {

            //member)

            setmember(res.data)
        })
            .catch((err) => console.error((err)))



    }
    const addmember = (e) => {
        e.preventDefault();
        naviagate("/members/create")

    }

    const getDate = (item) => {

        const startDate = moment(item);
        const timeEnd = moment(new Date());
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);


        return diffDuration.days()
    }

    const getImage = (item) => {

        const imagePath = `${assetUrl}/${item}`
        //'image path', imagePath)

        return imagePath;

    }
    return (

        <>



            <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
                <CModalHeader style={
                    {
                        backgroundColor: '#b2322a', color: '#fff'
                    }
                }>
                    <CModalTitle>Profile View </CModalTitle>
                </CModalHeader>
                <CModalBody>

                    <CCardBody>
                        <MDBRow>
                            <MDBCol lg="4">
                                <MDBCard className="mb-4">
                                    <MDBCardBody className="text-center">


                                        <MDBCardImage
                                            src={getImage(degafi.photo)}
                                            alt="avatar"

                                            style={{ width: '280px', borderRadius: '20px', border: "solid #fff" }}
                                            fluid />


                                        {/* <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Photo</CFormLabel>
                          <CFormInput type="file" size="sm" accept='image/*' onChange={photoInputHandler} required id="formFileLg" />
                        </CCol>
                      </div> */}
                                    </MDBCardBody>
                                </MDBCard>


                            </MDBCol>


                            <MDBCol lg="8">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Full Name</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">
                                                <MDBCardText className="text-muted">{degafi && degafi.name}</MDBCardText>

                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Mahber</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">

                                                <MDBCardText className="text-muted">{user.fullName}</MDBCardText>

                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                     
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Position</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">

                                                <MDBCardText className="text-muted">{degafi && degafi.position}</MDBCardText>

                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>Date of Birth</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">

                                                <MDBCardText className="text-muted">{degafi && degafi.birthDate}</MDBCardText>


                                            </MDBCol>
                                        </MDBRow>
                                        <hr />
                                        <MDBRow>
                                            <MDBCol sm="3">
                                                <MDBCardText>From Date - To Date</MDBCardText>
                                            </MDBCol>
                                            <MDBCol sm="9">

                                                <MDBRow>
                                                    <MDBCol sm="6">

                                                        <MDBCardText className="text-muted">{degafi && degafi.fromDate}</MDBCardText>


                                                    </MDBCol>
                                                    <MDBCol sm="6">

                                                        <MDBCardText className="text-muted">{degafi && degafi.toDate}</MDBCardText>


                                                    </MDBCol>

                                                </MDBRow>


                                            </MDBCol>
                                        </MDBRow>
                                        <hr />




                                    </MDBCardBody>
                                </MDBCard>


                            </MDBCol>
                            <MDBCol lg="12">
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <div dangerouslySetInnerHTML={{ __html: degafi.description }}></div>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>



                    </CCardBody>


                </CModalBody>
            </CModal>




            <CRow>
                <CCol xs={12}>
                    <CCallout className='bg-white'>

                    </CCallout>

                </CCol>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className=''>
                            <CRow>
                                <CCol sm={10}>
                                    <strong>Member</strong> <small>List</small>
                                </CCol>
                                <CCol sm={2} className="d-flex justify-content-end">
                                    <CButton className='text-right bg-white' onClick={addmember}  style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }} type="submit">
                                        Add member
                                    </CButton>


                                </CCol>
                            </CRow>



                        </CCardHeader>
                        <CCardBody>



                            <CTable align="middle" className="mb-0 border" hover responsive>
                                <CTableHead color="light">
                                    <CTableRow>
                                        <CTableHeaderCell className="text-center">
                                            <CIcon icon={cilPeople} />
                                        </CTableHeaderCell>
                                        <CTableHeaderCell>Degafi member Name</CTableHeaderCell>
                                        <CTableHeaderCell >Position</CTableHeaderCell>
                                        <CTableHeaderCell>Mahber</CTableHeaderCell>
                                        <CTableHeaderCell>Working Date</CTableHeaderCell>

                                        <CTableHeaderCell>Details</CTableHeaderCell>

                                    </CTableRow>
                                </CTableHead>
                                <CTableBody>
                                    {member.map((item, index) => (
                                        <CTableRow v-for="item in tableItems" key={index}>
                                            <CTableDataCell >
                                                <CAvatar size="md" src={getImage(item.photo)} status={item.isActive ? 'success' : 'danger'} />
                                            </CTableDataCell>
                                            <CTableDataCell >
                                                <div>{item.fullName} ({item.name})</div>
                                                <div className="small text-medium-emphasis">
                                                    <span>{getDate(item.createdAt) < 5 ? 'New' : 'Recurring'}</span> | Registered:{' '}
                                                    {dateformat(item.createdAt)}
                                                </div>
                                            </CTableDataCell>
                                            <CTableDataCell >
                                                <div>{item.position}</div>
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <div className="clearfix">
                                                    <div className="float-start">
                                                        <strong>{user.fullName}</strong>
                                                    </div>
                                                    <div className="float-end">
                                                        {/* <small className="text-medium-emphasis">{item.usage.period}</small> */}
                                                    </div>
                                                </div>
                                                {/* <CProgress thin color={item.usage.color} value={item.usage.value} /> */}
                                            </CTableDataCell>
                                            <CTableDataCell >
                                                {dateFormat(item.fromDate)}- {dateFormat(item.toDate)}
                                            </CTableDataCell>
                                            <CTableDataCell>
                                                <CButton style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }} onClick={() => { setVisibleXL(!visibleXL); setDegafi(item) }}>

                                                    <CIcon icon={cilAlignCenter} />&nbsp;
                                                    Detail</CButton>
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

export default Member