import React, { useState, useEffect, useRef ,useMemo} from 'react'
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
import { urlDesignSetting, urlMahber } from 'src/endpoints'
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { customToast } from 'src/components/customToast'
import Pagination from 'src/components/Pagination'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'

import IdTemplate from 'src/components/IdTemplate'
import AddDesignId from './AddDesignId'
import UpdateDesignSetting from './UpdateDesignSetting'

Quill.register('modules/imageResize', ImageResize)

function DesignSetting({ user, setIsLodding }) {

  const [DesignSetting, setDesignSetting] = useState([])
  const [visibleXL, setVisibleXL] = useState(false)
  const [visibleXLUpdate, setVisibleXLUpdate] = useState(false)
  const [idVissible, setIdVissible] = useState(false)
  const [mahber, setMahber] = useState([])
  const [idInitial, setIdInitial] = useState('')
  const [startFrom, setStartFrom] = useState('')
  const [template, setTemplate] = useState([])
  const [ds, setDs] = useState([])
  const [innerImage, setInnerImage] = useState('')
  const [idImage, setIdImage] = useState('')


  useEffect(() => {
    axios
      .get(`${urlDesignSetting}/GetTemplate`)
      .then((res) => {      
        setTemplate(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  useEffect(() => {
    axios.get(`${urlDesignSetting}`).then((res) => {
      setDesignSetting(res.data)
    })
  }, [])


  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const [amharicName, setAmharicName] = useState('')
  const [money, setMoney] = useState('')
  const [paymentStyle, setPaymentStyle] = useState(0)
  const [color, setColor] = useState('')
  const [hasPenality, setHasPenality] = useState(false)
  const [penalityAmount, setPenalityAmount] = useState(0)
  const [increasesEvery, setIncreasesEvery] = useState(0)
  const [multiplyAmount, setMultiplyAmount] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  let PageSize = 3

  const photoInputHandler = (e) => {
    setInnerImage(e.target.files[0])
  }
  const photoInputHandler2 = (event) => {
    setIdImage(event.target.files[0])
  }


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
    event.preventDefault()

    const formData = new FormData()
    formData.append('Photo', idImage)
    formData.append('Photo2', innerImage)
    formData.set('name', name)
    formData.set('payment', money)
    formData.set('amharicName', amharicName)
    formData.set('hasPenality', hasPenality)
    formData.set('penalityAmount', penalityAmount)
    formData.set('increasesEvery', increasesEvery)
    formData.set('multiplyAmount', multiplyAmount)
    formData.set('color', color)
    formData.set('description', description)
    formData.set('IDtemplateId', template.id)
    formData.set('startFrom', startFrom)
    formData.set('IdInitial', idInitial)
    try {
      await axios
        .post(urlDesignSetting, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXL(false)
          setName('')
          setDescription('')
          setMoney('')
          setPaymentStyle('')
          setIdInitial('')

          customToast('Design Setting Successfully created', 0)
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

  const deleteDesign = (item) => {
    
    setIsLodding(true)
    axios
      .delete(`${urlDesignSetting}?desetingId=${item}`)
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

  
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return DesignSetting.slice(firstPageIndex, lastPageIndex)
  }, [currentPage,DesignSetting])

  return (
    <>
      <CModal size="xl" visible={visibleXL} onClose={() => setVisibleXL(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Add Design Setting </CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CCardBody>
            <MDBRow>
              <MDBCol lg="12">
                <MDBCard className="mb-4">
                  <MDBCardBody>
                    <CRow>
                      <CCol xs={12}>
                        <CCallout className="bg-white">Design Setting Add</CCallout>
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
                                money={money}
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
                              <CCol md={4}>
                                <CFormLabel htmlFor="formFileLg">Id Image</CFormLabel>
                                <CFormInput
                                  type="file"
                                  size="sm"
                                  accept="image/*"
                                  onChange={photoInputHandler}

                                  id="formFileLg"
                                />
                              </CCol>
                              <CCol md={4}>
                                <CFormLabel htmlFor="formFileLg">Inner Image</CFormLabel>
                                <CFormInput
                                  type="file"
                                  size="sm"
                                  accept="image/*"
                                  onChange={photoInputHandler2}

                                  id="formFileLg"
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
          <CModalTitle>Update Design Setting </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <UpdateDesignSetting template={template} ds={ds} setIsLodding={setIsLodding} setVisibleXL={setVisibleXL} />
        </CModalBody>
      </CModal>
      <CModal size="xl" visible={idVissible} onClose={() => setIdVissible(false)}>
        <CModalHeader
          style={{
            backgroundColor: '#b2322a',
            color: '#fff',
          }}
        >
          <CModalTitle>Add Design Id Template </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CCardBody>
            <AddDesignId setIsLodding={setIsLodding} template={template} setVisibleXL={setVisibleXL} />
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
                  tempback={template.backImage}
                  color={cc}
                  level={l}
                  level2={l2}
                  money={money}
                  idInitial={idi}
                  innerImage={innerImage}
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
                    {!template ? 'Add Design Id Template' : 'Update Design Id Template'}
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
                  <strong>Design Setting</strong> <small>List</small>
                </CCol>
                <CCol sm={2} className="d-flex justify-content-end">
                  <CButton
                    className="text-right bg-white"
                    onClick={() => setVisibleXL(true)}
                    style={{ color: 'rgb(178, 50, 42)', borderColor: '#fff' }}
                    type="submit"
                  >
                    {template && ' Add Design Setting'}
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
                  {DesignSetting &&
                    currentTableData.map((item, index) => (
                      <CTableRow v-for="item in tableItems" key={index}>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.amharicName}</CTableDataCell>
                        <CTableDataCell>{item.idInitial}/{item.startFrom}</CTableDataCell>

                        <CTableDataCell>{item.payment}</CTableDataCell>
                        <CTableDataCell>
                          {item.hasPenality ?

                            `${item.penalityAmount}` : 'No Penality'
                          }

                        </CTableDataCell>
                        <CTableDataCell>
                          {item.hasPenality ?

                            `${item.increasesEvery}` : 'No Penality'
                          }

                        </CTableDataCell>
                        <CTableDataCell>
                          {item.hasPenality ?

                            `${item.multiplyAmount}` : 'No Penality'
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
                              deleteDesign(item.id)
                              //setDesign(item)
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
                              setMoney(item.payment)
                              setInnerImage(item.innerImage)
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
              <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={DesignSetting.length}
              pageSize={PageSize}              
              onPageChange={(page) => setCurrentPage(page)}
            />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default DesignSetting
