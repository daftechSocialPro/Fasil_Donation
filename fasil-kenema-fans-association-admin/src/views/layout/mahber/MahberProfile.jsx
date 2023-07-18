import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { customToast } from '../../../components/customToast';
import axios from 'axios'

Quill.register('modules/imageResize', ImageResize);
import {
    MDBCol,

    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,

} from 'mdb-react-ui-kit';

import {
    CCard,
    CCardHeader,
    CRow,
    CCol,
    CCardBody,
    CCallout,
    CButton,
    CFormInput,
    CFormLabel,
    CForm
} from '@coreui/react'
import { urlMahber, assetUrl } from '../../../endpoints';

export default function MahberProfile({ user,setIsLodding }) {

    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [name, setName] = useState('');
    const [websiteAdress, setWeb] = useState('')
    const [establishedDate, setDate] = useState('');
    const [mahber, setMahber] = useState({})

    useEffect(() => {
        axios.get(`${urlMahber}/getbyid/?mahberId=${user.id}`)
            .then((res) => setMahber(res.data))
    }, [])

    useEffect(() => {
        setName(mahber.name)

    }, [mahber.name])
    useEffect(() => {
        setWeb(mahber.websiteAdress)

    }, [mahber.websiteAdress])
    useEffect(() => {
        setDate(mahber.establishedDate)

    }, [mahber.establishedDate])

    useEffect(() => {
        setDescription(mahber.description)

    }, [mahber.description])


    const photoInputHandler = (event) => {
        setImg(event.target.files[0]);
    };


    const handleSubmit = async (event) => {
        

        event.preventDefault()
        setIsLodding(true)

        //"save")
        const formData = new FormData();

        formData.append("Photo", img);
        formData.set("name", name);
        formData.set("websiteAdress", websiteAdress);
        formData.set("establishedDate", establishedDate);
        formData.set("description", description);

        

        const form = event.currentTarget
        if (form.checkValidity() === false) {

            event.stopPropagation()
        }
        try {

             axios.defaults.withCredentials = true
             axios.post(urlMahber, formData).then((res) => {
                               
                setIsLodding(false)
                window.location.reload()
                customToast("Profile Successfully created", 0)
                

            }
            ).catch((err) => {
                setIsLodding(false)
                alert(err)
                console.error(err)
            })

        }
        catch (error) {
            setIsLodding(false)
            customToast(error, 1)
            console.error(error)

        }
    }

    const handleUpdate = async (event) => {

        event.preventDefault()
        setIsLodding(true)

        

        //"update")

        const formData = new FormData();

        formData.append("Photo", img);
        formData.set("name", name);
        formData.set("websiteAdress", websiteAdress);
        formData.set("establishedDate", establishedDate);
        formData.set("description", description);
        formData.set("ID",mahber.id)

        const form = event.currentTarget
        if (form.checkValidity() === false) {

            event.stopPropagation()
        }
        try {
            axios.defaults.withCredentials = true
             axios.put(urlMahber, formData).then((res) => {
                               
                setIsLodding(false)
                customToast("Profile Successfully Updated", 0)
                

            }
            ).catch((err) => {
                setIsLodding(false)
                alert(err)
                console.error(err)
            })

        }
        catch (error) {
            setIsLodding(false)
            customToast(error, 1)
            console.error(error)

        }
    }


    const modules = {
        toolbar: [
            [{ header: '1' }, { header: '2' }, { font: [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' }
            ],
            ['link', 'image', 'video'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false
        },
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    };


    const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video'
    ];

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
                    <CCardHeader className=''>
                        <CRow>
                            <CCol sm={10}>
                                <strong>Mahber</strong> <small>Profile</small>
                            </CCol>

                        </CRow>



                    </CCardHeader>
                    <CForm validated onSubmit={!mahber?handleSubmit:handleUpdate}>
                        <CCardBody>
                            <MDBRow>
                                <MDBCol lg="4">
                                    <MDBCard className="mb-4">
                                        <MDBCardBody className="text-center">
                                            {

                                                !mahber || img
                                                ? <MDBCardImage
                                                    src={img &&URL.createObjectURL(img)}
                                                    alt="mahber logo"

                                                    style={{ width: '280px', borderRadius: '20px', border: "solid #fff" }}
                                                    fluid /> : <img style={{ width: '280px', borderRadius: '20px', border: "solid #fff" }} src={getImage(mahber.logo)} />}

                                             <div className="d-flex justify-content-center mb-10">
                                                <CCol md={4}>
                                                    <CFormLabel htmlFor="formFileLg">Logo</CFormLabel>
                                                    <CFormInput type="file" size="sm" accept='image/*' onChange={photoInputHandler}  id="formFileLg" />
                                                </CCol>
                                            </div>
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

                                                    <MDBCardText className="text-muted">{user && user.fullName}</MDBCardText>


                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Email</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <MDBCardText className="text-muted">{user && user.email}</MDBCardText>
                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Alt Name</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="alternative name ..."
                                                        required
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}

                                                    />

                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>WebSite Address</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <CFormInput
                                                        type="text"
                                                        placeholder="link ..."
                                                        required
                                                        value={websiteAdress}
                                                        onChange={(e) => setWeb(e.target.value)}

                                                    />

                                                </MDBCol>
                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>establishedDate</MDBCardText>
                                                </MDBCol>
                                                <MDBCol sm="9">
                                                    <CFormInput
                                                        type="date"

                                                        required
                                                        value={establishedDate}
                                                        onChange={(e) => setDate(e.target.value)}

                                                    />
                                                </MDBCol>

                                            </MDBRow>
                                            <hr />
                                            <MDBRow>
                                                <MDBCol sm="3">
                                                    <MDBCardText>Description</MDBCardText>
                                                </MDBCol>

                                                <MDBCol sm="9">

                                                    <ReactQuill formats={formats} modules={modules} theme="snow" required value={description} onChange={setDescription} />

                                                </MDBCol>



                                            </MDBRow>
                                            <hr />


                                        </MDBCardBody>
                                    </MDBCard>


                                </MDBCol>
                            </MDBRow>


                            <CCol xs={12} className='d-flex justify-content-end'>
                                {!mahber ? <CButton className='text-right' size='lg' style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }} type="submit">
                                    Save
                                </CButton> :
                                    <CButton className='text-right' size='lg' style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }} type="submit">
                                        Update
                                    </CButton>}
                            </CCol>

                        </CCardBody>
                    </CForm>
                </CCard>


            </CCol>
        </CRow>
    );
}