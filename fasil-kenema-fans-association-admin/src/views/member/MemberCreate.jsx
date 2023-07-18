import React, { useState, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { customToast } from '../../components/customToast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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
import { urlMahber, urlMember, assetUrl } from '../../endpoints';

export default function MemberCreate({ user }) {

  const [img, setImg] = useState('');
  const [description, setDescription] = useState('');
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('')
  const [birthDate, setBirthDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [degafiMahberId, setDegafiMahberId] = useState('')

  const navigate = useNavigate();


  useEffect(() => {

    axios.get(`${urlMahber}/getbyid/?mahberId=${user.id}`)
      .then((res) => setDegafiMahberId(res.data.id))

  }, [degafiMahberId])


  const photoInputHandler = (event) => {
    setImg(event.target.files[0]);
  };


  const handleSubmit = async (event) => {
    customToast("please wait", 2);

    event.preventDefault()

    const formData = new FormData();

    formData.append("Photo", img);
    formData.set("name", fullName);
    formData.set("position", position);
    formData.set("birthDate", birthDate);
    formData.set("fromDate", fromDate);
    formData.set("toDate", toDate);
    formData.set("Description", description);
    formData.set("DegafiMahberId", degafiMahberId)

    const form = event.currentTarget
    if (form.checkValidity() === false) {

      event.stopPropagation()
    }
    try {

      axios.defaults.withCredentials = true;
      axios.post(urlMember, formData).then((res) => {

        navigate("/members")
        customToast("Member Successfully created", 0)


      }
      ).catch((err) => {
        alert(err)
        console.error(err)
      })

    }
    catch (error) {
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
          <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className=''>
            <CRow>
              <CCol sm={10}>
                <strong>Member</strong> <small>Profile</small>
              </CCol>

            </CRow>



          </CCardHeader>
          <CForm validated onSubmit={handleSubmit}>
            <CCardBody>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      {img &&

                        <MDBCardImage
                          src={URL.createObjectURL(img)}
                          alt="avatar"

                          style={{ width: '280px', borderRadius: '20px', border: "solid #fff" }}
                          fluid />
                      }

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Photo</CFormLabel>
                          <CFormInput type="file" size="sm" accept='image/*' onChange={photoInputHandler} required id="formFileLg" />
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
                          <CFormInput
                            type="text"
                            placeholder="full name ..."
                            required
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}

                          />


                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Position</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="position..."
                            required
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}

                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Date of Birth</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="date"
                            placeholder="date of birth ..."
                            required
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}

                          />

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
                              <CFormInput
                                type="date"
                                placeholder="from date ..."
                                required
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}

                              />
                            </MDBCol>
                            <MDBCol sm="6">
                              <CFormInput
                                type="date"
                                placeholder="link ..."
                                required
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}

                              />
                            </MDBCol>

                          </MDBRow>


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
                <CButton className='text-right' size='lg' style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }} type="submit">
                  Save
                </CButton>
              </CCol>

            </CCardBody>
          </CForm>
        </CCard>


      </CCol>
    </CRow>
  );
}