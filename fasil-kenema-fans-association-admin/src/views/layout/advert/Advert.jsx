import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dateFormat from 'dateformat'

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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {  cilImage, cilTrash } from '@coreui/icons'
import { assetUrl, urlAdvert } from 'src/endpoints'
import { MDBCol, MDBRow, MDBCard, MDBCardBody, MDBCardImage } from 'mdb-react-ui-kit'
import { customToast } from 'src/components/customToast'

import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import UpdateAdvert from './UpdateAdvert'

Quill.register('modules/imageResize', ImageResize)

function Advert({ setIsLodding }) {
  const [advert, setAdvert] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [updateVissible,setUpdateVissible]=useState(false)
  const [viewImg, setViewImg] = useState(null)
  const [ad,setAd]=useState([])
  const [position,setPosition]=useState(null)
  const Positions =[
   {index:0, value:'Left'},
   {index:1, value:'Right'},
   {index:2, value:'Top'},    
   {index:3, value:'Bottom'}
   ]

  useEffect(() => {
    getAdvert()
  }, [advert])

  const getAdvert = () => {
    axios.get(urlAdvert).then((res) => setAdvert(res.data))
  }

  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [img, setImg] = useState('')
  const [img2, setImg2] = useState('')


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
    formData.set('Postition',position)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .post(urlAdvert, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXL(false)
          setName('')
          setDescription('')
          setImg('')
          setImg2('')
          setFromDate('')
          setToDate('')
          customToast('Advert Successfully created', 0)
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

  const deleteAd = (item) => {
    //'ad', item)
    setIsLodding(true)
    axios
      .delete(`${urlAdvert}?advertId=${item}`)
      .then((res) => {
        getAdvert();
        setIsLodding(false)
        customToast('successfully Deleted', 0)
      })
      .catch((err) => {
        setIsLodding(false)
        customToast('something went wrong', 1)
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
        <CModalTitle>Add Advert </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Advert Add</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleSubmit}
                            >
                              <CCol md={3}>
                              {img2 && (
                                  <img
                                    style={{
                                      maxHeight: '400px',
                                      width: '100%',
                                      border: 'solid #fff',
                                      borderRadius: '20px',
                                    }}
                                    src={URL.createObjectURL(img2)}
                                  />
                                )}
                              </CCol>
                              <CCol md={6}>
                                {img && (
                                  <img
                                    style={{
                                      maxHeight: '400px',
                                      width: '100%',
                                      border: 'solid #fff',
                                      borderRadius: '20px',
                                    }}
                                    src={URL.createObjectURL(img)}
                                  />
                                )}
                              </CCol>
                              <CCol md={3}></CCol>

                              <CCol md={2}>
                                <CFormLabel htmlFor="formFileLg">Logo</CFormLabel>
                                <CFormInput
                                  type="file"
                                  size="sm"
                                  accept="image/*"
                                  onChange={photoInputHandler2}
                                  required
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
                                  required
                                  
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
                                  type="date"
                                  label="From Date"
                                  required
                                  value={fromDate}
                                  onChange={(e) => setFromDate(e.target.value)}
                                />
                              </CCol>
                              <CCol md={3}>
                                <CFormInput
                                  type="date"
                                  label="To Date"
                                  required
                                  value={toDate}
                                  onChange={(e) => setToDate(e.target.value)}
                                />
                              </CCol>

                              <CCol md={3}>
                               <CFormSelect
                               label='Position'
                               value={position}
                               onClick={(e)=>setPosition(e.target.value)}
                               required
                               >
                               
                                {Positions.map((item,index)=>

                                  <option value={item.index} key={index}>{item.value}</option>
                                )}

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
                                  Submit
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
        </CModalBody>
      </CModal>
      <CModal size="xl" visible={updateVissible} onClose={() => setUpdateVissible(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
        <CModalTitle>Update Advert </CModalTitle>
        </CModalHeader>
        <CModalBody>
        <UpdateAdvert setIsLodding={setIsLodding} ad={ad} setUpdateVissible={setUpdateVissible}/>
        </CModalBody>
      </CModal>

      <CModal size="xl" visible={viewImg} onClose={() => setViewImg(null)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Advert Picture </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Advert Picture</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleSubmit}
                            >
                              <CCol md={3}></CCol>
                              <CCol md={6}>
                                <img
                                  style={{
                                    border: 'solid #fff',
                                    borderRadius: '20px',
                                    width:'100%'
                                  }}
                                  src={getImage(viewImg)}
                                />
                              </CCol>
                              <CCol md={3}></CCol>
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
                  <strong>Advert</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setVisibleXL(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    Add Advert
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                       <CTableHeaderCell className="text-center">
                      <CIcon icon={cilImage} /> Logo
                    </CTableHeaderCell>
                    <CTableHeaderCell className="text-center">
                      <CIcon icon={cilImage} /> AdPhoto
                    </CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Position</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>From Date</CTableHeaderCell>
                    <CTableHeaderCell>To Date</CTableHeaderCell>

                    <CTableHeaderCell>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {advert.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={index}>
                      <CTableDataCell className="text-center">
                        <MDBCardImage
                          onClick={() => setViewImg(item.logo)}
                          src={getImage(item.logo)}
                          alt="avatar"
                          style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: '20px',
                            border: 'solid #fff',
                          }}
                          fluid
                        />
                      </CTableDataCell>
                       <CTableDataCell className="text-center">
                        <MDBCardImage
                          onClick={() => setViewImg(item.adPhoto)}
                          src={getImage(item.adPhoto)}
                          alt="avatar"
                          style={{
                            width: '120px',
                            height: '80px',
                            borderRadius: '20px',
                            border: 'solid #fff',
                          }}
                          fluid
                        />
                      </CTableDataCell>
                      
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{Positions[item.postition].value}</CTableDataCell>
                      <CTableDataCell>
                        <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                      </CTableDataCell>

                      <CTableDataCell>{dateFormat(item.fromDate)}</CTableDataCell>
                      <CTableDataCell>{dateFormat(item.toDate)}</CTableDataCell>

                      <CTableDataCell>
                      <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            setAd(item)
                            setUpdateVissible(true)
                          }}
                        >
                          <CIcon icon={cilTrash} />
                          &nbsp; Update
                        </CButton> &nbsp;
                        <CButton
                          style={{
                            backgroundColor: '#b2322a',
                            color: '#fff',
                            borderColor: '#fff',
                          }}
                          onClick={() => {
                            deleteAd(item.id)
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

export default Advert
