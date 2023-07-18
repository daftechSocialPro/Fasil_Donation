import React, { useState,useRef } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCallout,
} from '@coreui/react'

import { urlDegafiSetting, urlNews } from 'src/endpoints'
import { customToast } from 'src/components/customToast'
import IdTemplate from 'src/components/IdTemplate'


function AddDegafiId({ setIsLodding,template }) {
 
 
  const [headerAm, setHeaderAm] = useState(template&&template.headerAmharic) 
  const [headerEn, setHeaderEn] = useState(template&&template.headerEnglish)
  const [backgroundImage, setBackgroundImage] = useState('')
  const [backgroundImage2, setBackgroundImage2] = useState('')
  const [Logo, setLogo] = useState('')
  const [backImage,setBackImage ]=useState('')
  const [subtitle, setSubtitle] = useState(template&&template.subtitle1)
  const [subtitle2, setSubtitle2] = useState(template&& template.subtitle2)

  const [address, setAddress] = useState(template&&template.address)
  const [addressAm, setAddressAm] = useState(template&&template.addressAmharic)

  
  let background = useRef()


  const photoInputHandler = (e) => {
    setBackgroundImage2(e.target.files[0])
    const { files } = e.target
    if (files.length === 0) {
      return
    }

    const file = files[0]
    const fileReader = new FileReader()

    fileReader.onload = () => {
      setBackgroundImage(fileReader.result)
      
      background.style.backgroundImage = `url(${fileReader.result})`
    }
    fileReader.readAsDataURL(file)

    
  }
  const photoInputHandler2 = (event) => {
    setLogo(event.target.files[0])
  }
  const photoInputHandler3 = (event) => {
    setBackImage(event.target.files[0])
  }


  const handleSubmit = async (event) => {
    setIsLodding(true)

    event.preventDefault()

    const formData = new FormData()

    formData.append('Photo', backgroundImage2)
    formData.append('Photo2', Logo)
    formData.append('Photo3',backImage)
    formData.set('HeaderAmharic', headerAm)
    formData.set('HeaderEnglish', headerEn)
    formData.set('Subtitle1', subtitle)
    formData.set('Subtitle2', subtitle2)
    formData.set('Address', address)
    formData.set('AddressAmharic', addressAm)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      await axios
        .post(`${urlDegafiSetting}/IdTemplate`, formData)
        .then((res) => {
          setIsLodding(false)
         
          setHeaderAm('')
          setHeaderEn('')
          setBackgroundImage('')
          setBackImage('')
          setLogo('')
          setSubtitle('') 
          setSubtitle2('') 
          setAddress('') 
          setAddressAm('')
          window.location.reload()
          customToast('Degafi ID Template Successfully created', 0)
 
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

  const handleUpdate = async (event) => {
    setIsLodding(true)

    event.preventDefault()

    const formData = new FormData()

    formData.append('Photo', backgroundImage2)
    formData.append('Photo2', Logo)
    formData.append('Photo3',backImage)
    formData.set('HeaderAmharic', headerAm)
    formData.set('HeaderEnglish', headerEn)
    formData.set('Subtitle1', subtitle)
    formData.set('Subtitle2', subtitle2)
    formData.set('Address', address)
    formData.set('AddressAmharic', addressAm)
    formData.set('id',template.id)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      await axios
        .put(`${urlDegafiSetting}/IdTemplate`, formData)
        .then((res) => {
          setIsLodding(false)
         
          setHeaderAm('')
          setHeaderEn('')
          setBackgroundImage('')
          setBackImage('')
          setLogo('')
          setSubtitle('') 
          setSubtitle2('') 
          setAddress('') 
          setAddressAm('')
window.location.reload()
          customToast('Degafi ID Template Successfully updated', 0)
          
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
  return (
    <CRow>
      <CCol xs={12}>
        <CCallout className="bg-white"></CCallout>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm className="row g-3 needs-validation" validated >
           
           

            <IdTemplate backImage={backImage} tempback={template&&template.backImage}  headerAm={headerAm}   headerEn={headerEn} subtitle={subtitle}  subtitle2={subtitle2} addressAm={addressAm} address={address} logo={Logo} backGroundImage={backgroundImage}  background={background} lo={template.logo} bg={template.backgroundImage} />

            
             
              
              
              <hr />

              <CCol md={4}>
                <CFormLabel htmlFor="formFileLg">BackGround Image</CFormLabel>
                <CFormInput
                  type="file"
                  size="md"
                  accept="image/*"
                  onChange={photoInputHandler}
                  
                  id="formFileLg"
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="formFileLg">Logo</CFormLabel>
                <CFormInput
                  type="file"
                  size="md"
                  accept="image/*"
                  onChange={photoInputHandler2}
                  
                  id="formFileLg"
                />
              </CCol>
              <CCol md={4}>
                <CFormLabel htmlFor="formFileLg">Back Image</CFormLabel>
                <CFormInput
                  type="file"
                  size="md"
                  accept="image/*"
                  onChange={photoInputHandler3}
                  
                  id="formFileLg"
                />
              </CCol>
              
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="header amharic..."
                  label="Header Amharic"
                  required
                  value={headerAm}
                  onChange={(e) => setHeaderAm(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="header english .... "
                  label="Header English"
                  required
                  value={headerEn}
                  onChange={(e) => setHeaderEn(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="subtitle .... "
                  label="Subtitle"
                  required
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="subtitle 2 .... "
                  label="Subtitle 2"
                  required
                  value={subtitle2}
                  onChange={(e) => setSubtitle2(e.target.value)}
                />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="Address .... "
                  label="Address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="Address Amharic .... "
                  label="Address Amharic"
                  required
                  value={addressAm}
                  onChange={(e) => setAddressAm(e.target.value)}
                />
              </CCol>

              <hr />
              <CCol xs={12} className="d-flex justify-content-end">
              {template ?  <CButton
              onClick={handleUpdate}
                  size="lg"
                  style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
                  type="submit"
                >
                Update
                </CButton>:
                <CButton
                onClick={handleSubmit}
                size="lg"
                style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
                type="submit"
              >
              Submit
              </CButton>
                
                
                }
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AddDegafiId
