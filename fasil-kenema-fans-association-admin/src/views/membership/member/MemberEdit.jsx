import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'
import { customToast } from 'src/components/customToast'
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
  CFormSelect
} from '@coreui/react'
import { assetUrl,urlMahber, urlDegafi,urlDegafiSetting, urlMember, urlDesignSetting, urlBranch } from 'src/endpoints'


function MemberEdit({ user ,setIsLodding}) {
  const location = useLocation()

  const Degafi = location.state.Mahber

  //Degafi)

  const [img, setImg] = useState('')
  const [description, setDescription] = useState(Degafi.description)
  const [fullName, setFullName] = useState(Degafi.name)
  const [amharicName,setAmharicName]=useState(Degafi.amharicName)
  const [gender,setGender]=useState(Degafi.gender)
  const [degafiSettingId, setDegafiSettingId] = useState(Degafi.designSettingId)
  const [birthDate, setBirthDate] = useState(Degafi.birthDate)
  const [phoneNumber,setPhoneNumber]=useState(Degafi.phoneNumber)
  const [isActive,setIsActive]=useState(Degafi.isActive);
  const [address, setAddress]= useState(Degafi.address)
  const [addressAmharic, setAddressAmharic] = useState(Degafi.addressAmharic)

  const [mahber, setMahber] = useState([])
  const [degafiSettings, setDegafiSettings] = useState()

  const [branchs, setBranchs] =useState ()

  const [branchId, setBranchId] = useState(Degafi.branchId)
 

  //console.log("degafisettingId",Degafi.designSettingId)

useEffect(()=>{

  axios
  .get(urlDesignSetting)
  .then((res) => {
    setDegafiSettings(res.data)
   
  })

},[])
  
useEffect(()=>{
  axios.get(`${urlBranch}`).then((res) => {
    setBranchs(res.data)
  })
},[])


  const navigate = useNavigate()

  const photoInputHandler = (event) => {
    setImg(event.target.files[0])
  }

  const handleSubmit = async (event) => {
    
    event.preventDefault()

    const formData = new FormData()

    //user)
    formData.append('Photo', img)
    formData.set('name', fullName)
    formData.set('amharicName',amharicName)
    formData.set('Gender',gender)
    formData.set('birthDate', birthDate)
    formData.set('DesignSettingId', degafiSettingId)
    formData.set('Description', description)
    formData.set('branchId',branchId)
    formData.set("ID",Degafi.id)
    formData.set("IsActive",isActive)
    formData.set("PhoneNumber",phoneNumber)
    formData.set('address',address)
    formData.set('addressAmharic',addressAmharic)

    const form = event.currentTarget
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    try {
      setIsLodding(true)
      axios.defaults.withCredentials = true
      axios
        .put(urlMember, formData)
        .then((res) => {
          setIsLodding(false)
          navigate('/Members')
          customToast('Member Successfully updated', 0)
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
    
    <CRow>
      <CCol xs={12}>
        <CCallout className="bg-white"></CCallout>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }} className="">
            <CRow>
              <CCol sm={10}>
                <strong>Degafi</strong> <small>Update Profile</small>
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
                        src={img ? URL.createObjectURL(img) : getImage(Degafi.userPhoto)}
                        alt="avatar"
                        style={{ width: '280px', borderRadius: '20px', border: 'solid #fff' }}
                        fluid
                      />

                      <div className="d-flex justify-content-center mb-10">
                        <CCol md={4}>
                          <CFormLabel htmlFor="formFileLg">Photo</CFormLabel>
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
                          <MDBCardText>Amharic Name</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder="Amharic name ..."
                            required
                            value={amharicName}
                            onChange={(e) => setAmharicName(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Phone Number</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder='Phone number ...'
                            required
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder='address ...'
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Address Amharic</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormInput
                            type="text"
                            placeholder='amharic address ...'
                            required
                            value={addressAmharic}
                            onChange={(e) => setAddressAmharic(e.target.value)}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr/>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Membership</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            type="text"
                            placeholder="position..."
                            required
                            value={degafiSettingId}
                            onChange={(e) => setDegafiSettingId(e.target.value)}
                          >
                            <option>--- Select Type ---</option>
                            {degafiSettings &&
                              degafiSettings.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name} ( {item.payment} ETB )
                             
                                </option>
                              ))}
                          </CFormSelect>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Branch</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            type="text"
                            placeholder="Branch..."
                            required
                            value={branchId}
                            onChange={(e) => setBranchId(e.target.value)}
                          >
                            <option>--- Select Type ---</option>
                            {branchs &&
                              branchs.map((item, index) => (
                                <option key={index} value={item.id}>
                                  {item.name} ( {item.localName}  )
                             
                                </option>
                              ))}
                          </CFormSelect>
                        </MDBCol>
                      </MDBRow>
                      <hr/>
                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Gender</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <CFormSelect
                            type="text"
                          
                            required
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                          >
                            <option>--- Select Gender ---</option>
                            <option value={0}>Male</option>
                            <option value={1}>Female</option>
                          </CFormSelect>
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
                      <CFormSwitch  checked={isActive} onChange={()=>setIsActive(!isActive)}  label="Is User Active" />
                      </MDBCol>
                      </MDBRow>
                   
                    <hr />

                      <MDBRow>
                        <MDBCol sm="3">
                          <MDBCardText>Description</MDBCardText>
                        </MDBCol>

                        <MDBCol sm="9">
                          <ReactQuill
                            formats={formats}
                            modules={modules}
                            theme="snow"
                            required
                            value={description}
                            onChange={setDescription}
                          />
                        </MDBCol>
                      </MDBRow>
                      <hr />
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

export default MemberEdit
