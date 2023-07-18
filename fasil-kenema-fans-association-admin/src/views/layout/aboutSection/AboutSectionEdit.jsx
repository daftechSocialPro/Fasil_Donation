import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import { customToast } from '../../../components/customToast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
Quill.register('modules/imageResize', ImageResize)
import { MDBCol, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import { useLocation } from 'react-router-dom'

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
  CFormSwitch,
  CForm,
} from '@coreui/react'
import { assetUrl, urlAboutSection } from '../../../endpoints'


function AboutSectionEdit({ user ,setIsLodding}) {
  const location = useLocation()

  const AboutSection = location.state.tmret

  console.log("df",AboutSection)

  //AboutSection)

  const [img, setImg] = useState('')
  const [title, setTitle] = useState(AboutSection.title)
  const [subTitle, setSubTitle] = useState(AboutSection.subTitile)
  const [description, setDescription] = useState(AboutSection.description)
 


  const navigate = useNavigate()

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    
    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.append('Photo', img)
    formData.set('id',AboutSection.id)
    formData.set('title', title)
    formData.set('subTitile', subTitle)
    formData.set('description', description)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlAboutSection, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/AboutSection')
          customToast('Next Match Successfully updated', 0)
        })
        .catch((err) => {
          setIsLodding(false)
          alert(err)
          console.error(err)
        })
    } catch (error) {
      setIsLodding(false)
      customToast(error, 1)
      console.error(error)
    }
  }

  const getImage = (item) => {
    return `${assetUrl}/${item}`
  }

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      matchVisual: false,
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  }

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
    'video',
  ]
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
                <strong>Next Match</strong> <small>Update</small>
              </CCol>
            </CRow>
          </CCardHeader>
          <CForm validated onSubmit={handleSubmit}>
            <CCardBody>
              <MDBRow>
                <MDBCol lg="4">
                  <MDBCard className="mb-4">
                    <MDBCardBody className="text-center">
                      <MDBCardImage
                        src={img ? URL.createObjectURL(img) : getImage(AboutSection.image)}
                        alt="avatar"
                        style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                        fluid
                      />

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Section Image</CFormLabel>
                          <CFormInput
                            type="file"
                            size="sm"
                            accept="image/*"
                            onChange={photoInputHandler}
                            
                            id="formFileLg"
                          />
                     
                        </CCol>
                      </div>
                     
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>

               
                <MDBCol lg="8">
                  <MDBCard className="mb-4">
                    <MDBCardBody>
                      <MDBRow>
                        {/* <MDBCol sm="3">
                          <MDBCardText>Content 1 </MDBCardText>
                        </MDBCol> */}
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="title ..."
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </MDBCol>
                        <MDBCol sm="6">
                          <CFormInput
                            type="text"
                            placeholder="subtitle ..."
                            required
                            value={subTitle}
                            onChange={(e) => setSubTitle(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                
                      <CCol xs={12}>
                                <CFormLabel htmlFor="formFileLg">Description</CFormLabel>
                                <ReactQuill
                                  formats={formats}
                                  modules={modules}
                                  theme="snow"
                                  required
                                  value={description}
                                  onChange={setDescription}
                                />
                              </CCol>
                     
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>

              <CCol xs={12} className="d-flex justify-content-end">
                <CButton
                  className="text-right"
                  size="lg"
                  style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
                  type="submit"
                >
                  Update
                </CButton>
              </CCol>
            </CCardBody>
          </CForm>
        </CCard>
      </CCol>
    </CRow>
    
  )
}

export default AboutSectionEdit
