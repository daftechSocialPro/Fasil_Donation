import React, { useState, useEffect } from 'react'

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
    CButton, CCardLink, CCallout

} from '@coreui/react'
import { urlVideos, assetUrl } from 'src/endpoints'


function Videos() {

    const [Videos, setVideos] = useState([]);
    const naviagate = useNavigate();


    useEffect(() => {
        getVideos()

    }, [])

    const getVideos = () => {


        axios.get(urlVideos).then((res) => {

            //res)

            setVideos(res.data)
        })
            .catch((err) => console.error((err)))



    }
    const addVideos = (e) => {
        e.preventDefault();
        naviagate("/Videos/create")

    }

    const getDate = (item) => {

        const startDate = moment(item);
        const timeEnd = moment(new Date());
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);

        const duration = diffDuration.minutes()
        if (duration > 60) {

            return diffDuration.hours();

        }

        return duration
    }

    const getImage = (item) => {

        const imagePath = `${assetUrl}/${item}`
        //'image path', imagePath)

        return imagePath;

    }


    return (
        <CRow>
            <CCol xs={12}>
                <CCallout className='bg-white'>


                </CCallout>

            </CCol>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader className='' style={{ backgroundColor: '#b2322a', color: '#fff' }}>
                        <CRow>
                            <CCol sm={10}>
                                <strong>Videos</strong> <small>List</small>
                            </CCol>
                            <CCol sm={2} className="d-flex justify-content-end">
                                <CButton className='text-right bg-white' onClick={addVideos} style={{  color: '#fff', borderColor: '#fff' }} type="submit">
                                    Add Videos
                                </CButton>


                            </CCol>
                        </CRow>



                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            {
                                Videos.map((item) => (
                                    <CCol lg={4} key={item.id}>
                                        <CCard className="mb-3">
                                            <video orientation="top" style={{ maxHeight: "260px" }} controls>
                                                <source src={getImage(item.img)} />
                                            </video>

                                            <CCardBody>


                                                <CCardTitle>{item.title}</CCardTitle>
                                                <CCardText>
                                                    {item.subTitle}
                                                </CCardText>
                                                <CCardText>
                                                    <small className="text-medium-emphasis">




                                                        created {getDate(item.createdAt)} mins ago</small>
                                                </CCardText>

                                                <CCardLink style={{ color: "#fff" }} href="#">Edit</CCardLink>
                                                <CCardLink style={{ color: "#fff" }} href="#">Remove</CCardLink>


                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                ))
                            }
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}




export default Videos