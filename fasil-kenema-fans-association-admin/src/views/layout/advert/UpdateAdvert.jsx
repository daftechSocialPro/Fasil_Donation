import React, { useState } from 'react'
import axios from 'axios'
import { assetUrl, urlAdvert } from 'src/endpoints'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { customToast } from 'src/components/customToast'

import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'

Quill.register('modules/imageResize', ImageResize)
import {
  CCol,
  CRow,
  CCallout,
  CButton,
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
function UpdateAdvert({ ad, setIsLodding,setUpdateVissible }) {
  const [description, setDescription] = useState(ad.description)
  const [name, setName] = useState(ad.name)
  const [fromDate, setFromDate] = useState(ad.fromDate)
  const [toDate, setToDate] = useState(ad.toDate)
  const [img, setImg] = useState('')
  const [img2, setImg2] = useState('')
  const [position, setPosition] = useState(ad.postition)

  const Positions = [
    { index: 0, value: 'Left' },
    { index: 1, value: 'Right' },
    { index: 2, value: 'Top' },
    { index: 3, value: 'Bottom' },
  ]

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const photoInputHandler2 = (event) => {
    setImg2(event.target.files[0])
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const formData = new FormData()

    formData.append('Photo', img)
    formData.append('Photo2', img2)
    formData.set('Name', name)
    formData.set('FromDate', fromDate)
    formData.set('ToDate', toDate)
    formData.set('Description', description)
    formData.set('Postition', position)
    formData.set('ID', ad.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .put(urlAdvert, formData)
        .then((res) => {
          setIsLodding(false)
          setUpdateVissible(false)
          setName('')
          setDescription('')
          setImg('')
          setImg2('')
          setFromDate('')
          setToDate('')
          customToast('Advert Successfully Updated', 0)
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

  const getImage = (item) => {
    return `${assetUrl}/${item}`
  }
  return (
    <CCardBody>
      <MDBRow>
        <MDBCol lg="12">
          <MDBCard className="mb-4">
            <MDBCardBody>
              <CRow>
                <CCol xs={12}>
                  <CCallout className="bg-white">Advert Update</CCallout>
                </CCol>
                <CCol xs={12}>
                  <CCard className="mb-4">
                    <CCardBody>
                      <CForm className="row g-3 needs-validation" validated onSubmit={handleSubmit}>
                        <CCol md={4}>
                          <img
                            style={{
                              maxHeight: '400px',
                              width: '100%',
                              border: 'solid #fff',
                              borderRadius: '20px',
                            }}
                            src={img2 ? URL.createObjectURL(img2) : getImage(ad.logo)}
                          />
                        </CCol>
                        <CCol md={8}>
                          <img
                            style={{
                              maxHeight: '400px',
                              width: '100%',
                              border: 'solid #fff',
                              borderRadius: '20px',
                            }}
                            src={img ? URL.createObjectURL(img) : getImage(ad.adPhoto)}
                          />
                        </CCol>
                        <hr />

                        <CCol md={2}>
                          <CFormLabel htmlFor="formFileLg">Logo</CFormLabel>
                          <CFormInput
                            type="file"
                            size="sm"
                            accept="image/*"
                            onChange={photoInputHandler2}
                            id="formFileLg"
                          />
                        </CCol>
                        <CCol md={2}>
                          <CFormLabel htmlFor="formFileLg">Ad Photo</CFormLabel>
                          <CFormInput
                            type="file"
                            size="sm"
                            accept="image/*"
                           
                            onChange={photoInputHandler}
                            id="formFileLg"
                          />
                        </CCol>

                        <CCol md={2}>
                          <CFormInput
                            type="text"
                            placeholder="name..."
                            label="Name"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormInput
                            type="datetime"
                            label="From Date"
                            required
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                          />
                        </CCol>
                        <CCol md={3}>
                          <CFormInput
                            type="datetime"
                            label="To Date"
                            required
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </CCol>

                        <CCol md={3}>
                          <CFormSelect
                            label="Position"
                            value={position}
                            onClick={(e) => setPosition(e.target.value)}
                            required
                          >
                            
                            {Positions.map((item, index) => (
                              <option value={item.index} key={index}>
                                {item.value}
                              </option>
                            ))}
                          </CFormSelect>
                        </CCol>

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

                        <CCol xs={12} className="d-flex justify-content-end">
                          <CButton
                            size="lg"
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
                      </CForm>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </CCardBody>
  )
}

export default UpdateAdvert
