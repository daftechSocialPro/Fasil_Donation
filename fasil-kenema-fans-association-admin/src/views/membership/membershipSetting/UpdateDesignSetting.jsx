import React, { useState } from 'react'
import axios from 'axios'
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
import { MDBCol, MDBRow, MDBCard, MDBCardBody } from 'mdb-react-ui-kit'
import { customToast } from 'src/components/customToast'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import IdTemplate from 'src/components/IdTemplate'
import { urlDegafiSetting } from 'src/endpoints'
Quill.register('modules/imageResize', ImageResize)

function UpdateDesignSetting({ template, setIsLodding, ds, setVisibleXL }) {
  const [description, setDescription] = useState(ds && ds.description)
  const [name, setName] = useState(ds && ds.name)
  const [amharicName, setAmharicName] = useState(ds && ds.amharicName)
  const [money, setMoney] = useState(ds && ds.payment)
  const [paymentStyle, setPaymentStyle] = useState(ds && ds.paymentStyle)
  const [color, setColor] = useState(ds && ds.color)
  const [idInitial, setIdInitial] = useState(ds && ds.idInitial)

  const [hasPenality, setHasPenality] = useState(ds && ds.hasPenality)
  const [penalityAmount, setPenalityAmount] = useState(ds && ds.penalityAmount)
  const [increasesEvery, setIncreasesEvery] = useState(ds && ds.increasesEvery)
  const [multiplyAmount, setMultiplyAmount] = useState(ds && ds.multiplyAmount)



  const [innerImage, setInnerImage] = useState(ds && ds.innerImage)
  const [idImage, setIdImage] = useState(ds && ds.idImage)

  const photoInputHandler = (e) => {
    setInnerImage(e.target.files[0])

  }
  const photoInputHandler2 = (event) => {
    setIdImage(event.target.files[0])
  }


  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLodding(true)



    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }

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
    formData.set('id', ds.id)
    formData.set('IdInitial', idInitial)

    try {
      await axios
        .put(urlDegafiSetting, formData)
        .then((res) => {
          setIsLodding(false)
          setVisibleXL(false)
          setName('')
          setDescription('')
          setMoney('')
          setPaymentStyle('')
          setIdInitial('')

          customToast('Design Setting Successfully updated', 0)
          window.location.reload()
        })
        .catch((err) => {
          setIsLodding(false)
          //console.log(err)
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
  return (
    <div>
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
                            color={color}
                            level={name}
                            level2={amharicName}
                            idInitial={idInitial}
                            innerImage={innerImage}
                            tempback={template.backImage}
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
                              type="text"
                              label="Money"
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



                          <CCol md={4}>
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
    </div>
  )
}

export default UpdateDesignSetting
