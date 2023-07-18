import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
import { cilEyedropper, cilPenAlt, cilTrash } from '@coreui/icons'
import { urlDegafiSetting, urlMahber } from 'src/endpoints'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { customToast } from 'src/components/customToast'

import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'

import IdTemplate from 'src/components/IdTemplate'
import AddDegafiId from './AddDegafiId'
import UpdateDegafiSetting from './UpdateDegafiSetting'

Quill.register('modules/imageResize', ImageResize)

function DegafiSetting({ user, setIsLodding }) {
  const [degafiSetting, setDegafiSetting] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXLUpdate, setVisibleXLUpdate] = useState(false)
  const [idVissible, setIdVissible] = useState(false)
  const [mahber, setMahber] = useState([])
  const [idInitial, setIdInitial] = useState('')
  const [startFrom,setStartFrom] =useState('')
  const [template, setTemplate] = useState([])
  const [ds, setDs] = useState([])

  useEffect(() => {
    getMahber()
  }, [])

  useEffect(() => {
    mahber &&
      axios
        .get(`${urlDegafiSetting}/GetTemplate/?mahberId=${mahber.id}`)
        .then((res) => {
          console.log('template', res.data)

          setTemplate(res.data)
          setDegafiSetting(res.data && res.data.degafiSettings)
        })
        .catch((err) => console.error(err))
  }, [mahber])

  useEffect(() => {
    mahber &&
      axios.get(`${urlDegafiSetting}/?userId=${mahber.id}`).then((res) => {
        setDegafiSetting(res.data)
      })
  }, [mahber])

  const getMahber = () => {
    axios.get(urlMahber).then((res) => {
      setMahber(res.data.filter((m) => m.userId == user.id)[0])
    })
  }

  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [amharicName, setAmharicName] = useState('')
  const [money, setMoney] = useState('')
  const [paymentStyle, setPaymentStyle] = useState(0)
  const [color, setColor] = useState('')
  
  const [hasPenality,setHasPenality] =useState(false)
  const [penalityAmount,setPenalityAmount]=useState(0)
  const [increasesEvery,setIncreasesEvery]=useState(0)
  const [multiplyAmount,setMultiplyAmount]=useState(0)


  const [l, setL] = useState('')
  const [l2, setL2] = useState('')
  const [cc, setCC] = useState('')
  const [idi, setIdi] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

    try {
      await axios
        .post(urlDegafiSetting, {
          name: name,
          payment: money,
          amharicName:amharicName,
          hasPenality:hasPenality,
          penalityAmount:penalityAmount,
          increasesEvery:increasesEvery,
          multiplyAmount:multiplyAmount,     
          color: color,
          description: description,
          IDtemplateId: template.id,
          startFrom:startFrom,
          IdInitial: idInitial,
          MahberId:mahber.id
        })
        .then((res) => {
          setIsLodding(false)
          setVisibleXL(false)
          setName('')
          setDescription('')
          setMoney('')
          setPaymentStyle('')
          setIdInitial('')

          customToast('Degafi Setting Successfully created', 0)
          window.location.reload()
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

  const deleteDegafi = (item) => {
    //'ad', item)
    setIsLodding(true)
    axios
      .delete(`${urlDegafiSetting}?desetingId=${item}`)
      .then((res) => {
        setIsLodding(false)
        window.location.reload()
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
          <CModalTitle>Add Degafi Setting </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Degafi Setting Add</CCallout>
                      </CCol>
                      <CCol xs={12}>
                        <CCard className="mb-4">
                          <CCardBody>
                            {template && (
                              <IdTemplate
                                headerAm={template.headerAmharic}
                                headerEn={template.headerEnglish}
                                subtitle={template.subtitle1}
                                subtitle2={template.subtitle2}
                                addressAm={template.addressAmharic}
                                address={template.address}
                                lo={template.logo}
                                bg={template.backgroundImage}
                                tempback={template.backImage}
                                color={color}
                                level={name}
                                level2={amharicName}
                                idInitial={idInitial}
                              />
                            )}
                            <br />
                            <CForm
                              className="row g-3 needs-validation"
                              validated
                              onSubmit={handleSubmit}
                            >
                              <CCol md={4}>
                                <CFormInput
                                  type="text"
                                  placeholder="name..."
                                  label="Name"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </CCol>
                              <CCol md={4}>
                                <CFormInput
                                  type="text"
                                  placeholder="name..."
                                  label="Amharic Name"
                                  required
                                  value={amharicName}
                                  onChange={(e) => setAmharicName(e.target.value)}
                                />
                              </CCol>

                              <CCol md={4}>
                                <CFormInput
                                  type="number"
                                  label="Payment"
                                  required
                                  value={money}
                                  onChange={(e) => setMoney(e.target.value)}
                                />
                              </CCol>

                              <CCol md={3}>
                                <CFormSelect
                                  type="text"
                                  label="Has Penality"
                                  required
                                  value={hasPenality}
                                  onChange={(e) => setHasPenality(!hasPenality)}
                                >
                                  <option value={false}>FALSE</option>
                                  <option value={true}>TRUE</option>
                                  </CFormSelect>
                                
                              </CCol>

                             {hasPenality && 
                             
                             <><CCol md={3}>
                                <CFormInput
                                  type="number"
                                  label="Penality Amount"
                                  required
                                  value={penalityAmount}
                                  onChange={(e) => setPenalityAmount(e.target.value)}
                                />
                              </CCol>
                              
                              <CCol md={3}>
                                <CFormInput
                                  type="text"
                                  label="Increases Every Day"
                                  required
                                  value={increasesEvery}
                                  onChange={(e) => setIncreasesEvery(e.target.value)}
                                />
                              </CCol>

                                 
                              <CCol md={3}>
                                <CFormInput
                                  type="text"
                                  label="Multiply Amount"
                                  required
                                  value={multiplyAmount}
                                  onChange={(e) => setMultiplyAmount(e.target.value)}
                                />
                              </CCol>
                              
                              </>
}
                 

                              <CCol md={3}>
                                <CFormInput
                                  type="text"
                                  placeholder="id initial..."
                                  label="Id Initial"
                                  required
                                  value={idInitial}
                                  onChange={(e) => setIdInitial(e.target.value)}
                                />
                              </CCol>
                              <CCol md={3}>
                                <CFormInput
                                  type="number"
                                  placeholder="start from..."
                                  label="Start From"
                                  required
                                  value={startFrom}
                                  onChange={(e) => setStartFrom(e.target.value)}
                                />
                              </CCol>
                              <CCol md={2}>
                                <CFormInput
                                  type="color"
                                  label="Color"
                                  required
                                  value={color}
                                  onChange={(e) => setColor(e.target.value)}
                                />
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
      <CModal size="xl" visible={visibleXLUpdate} onClose={() => setVisibleXLUpdate(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Update Degafi Setting </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <UpdateDegafiSetting template={template} ds={ds} setIsLodding={setIsLodding} setVisibleXL ={setVisibleXL } />
        </CModalBody>
      </CModal>
      <CModal size="xl" visible={idVissible} onClose={() => setIdVissible(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Add Degafi Id Template </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <AddDegafiId setIsLodding={setIsLodding} template={template} setVisibleXL={setVisibleXL} />
          </CCardBody>
        </CModalBody>
      </CModal>

      <CRow>
        <CCol xs={12}>
          <CCallout className="bg-white">
            <CCard>
              <CCardHeader>Fan Id</CCardHeader>

              {template && (
                <IdTemplate
                  headerAm={template.headerAmharic}
                  headerEn={template.headerEnglish}
                  subtitle={template.subtitle1}
                  subtitle2={template.subtitle2}
                  addressAm={template.addressAmharic}
                  address={template.address}
                  lo={template.logo}
                  bg={template.backgroundImage}
                  tempback= {template.backImage}
                  color={cc}
                  level={l}
                  level2={l2}
                  idInitial={idi}
                />
              )}
              <CCol sm={12} className="text-center">
                <CCol sm={12}>
                  <CButton
                    className=""
                    onClick={() => setIdVissible(true)}
                    style={{
                      backgroundColor: '#b2322a',
                      color: '#fff',
                      borderColor: '#fff',
                      marginBottom: '10px',
                    }}
                    type="submit"
                  >
                    {!template ? 'Add Degafi Id Template' : 'Update Degafi Id Template'}
                  </CButton>
                </CCol>
              </CCol>
            </CCard>
          </CCallout>
        </CCol>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="" style={{ backgroundColor: '#b2322a', color: '#fff' }}>
              <CRow>
                <CCol sm={10}>
                  <strong>Degafi Setting</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setVisibleXL(true)}
                     style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    {template && ' Add Degafi Setting'}
                  </CButton>
                </CCol>
              </CRow>
            </CCardHeader>

            <CCardBody>
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Amharic Name</CTableHeaderCell>
                    <CTableHeaderCell>ID Initial/start from</CTableHeaderCell>
                    <CTableHeaderCell>Payment</CTableHeaderCell>
                    <CTableHeaderCell>Penality </CTableHeaderCell>
                    <CTableHeaderCell>Increases EveryDay </CTableHeaderCell>
                    <CTableHeaderCell>Multiply Amount </CTableHeaderCell>
                    <CTableHeaderCell>Color Code</CTableHeaderCell>
                    
                    <CTableHeaderCell className='text-center'>Details</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {degafiSetting &&
                    degafiSetting.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.amharicName}</CTableDataCell>
                        <CTableDataCell>{item.idInitial}/{item.startFrom}</CTableDataCell>

                        <CTableDataCell>{item.payment}</CTableDataCell>
                        <CTableDataCell>
                          {item.hasPenality ?
                          
                          `${item.penalityAmount}` :'No Penality'
                          }
                          
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.hasPenality ? 
                          
                          `${item.increasesEvery}`  :'No Penality'
                          }
                          
                        </CTableDataCell>
                        <CTableDataCell>
                          {item.hasPenality ? 
                          
                          `${item.multiplyAmount}`  :'No Penality'
                          }
                          
                        </CTableDataCell>
                        <CTableDataCell>
                          <CFormInput
                          type='color'
                          value={item.color}
                          readOnly
                          /></CTableDataCell>
                      
                        <CTableDataCell>
                          <CButton
                            style={{
                              backgroundColor: '#b2322a',
                              color: '#fff',
                              borderColor: '#fff',
                            }}
                            onClick={() => {
                              deleteDegafi(item.id)
                              //setDegafi(item)
                            }}
                          >
                            <CIcon icon={cilTrash} />
                            &nbsp; Remove
                          </CButton>
                          &nbsp;
                          <CButton
                            style={{
                              backgroundColor: '#b2322a',
                              color: '#fff',
                              borderColor: '#fff',
                            }}
                            onClick={() => {
                              setL2(item.amharicName)
                              setL(item.name)
                              setCC(item.color)
                              setIdi(`${item.idInitial}${item.startFrom}`)
                            }}
                          >
                            <CIcon icon={cilEyedropper} />
                            &nbsp; Preview
                          </CButton>
                          &nbsp;
                          <CButton
                            style={{
                              backgroundColor: '#b2322a',
                              color: '#fff',
                              borderColor: '#fff',
                            }}
                            onClick={() => {
                              setDs(item)
                              setVisibleXLUpdate(true)
                            }}
                          >
                            <CIcon icon={cilPenAlt} />
                            &nbsp; Update
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

export default DegafiSetting
