import React, { useState } from 'react'
import axios from 'axios'
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
import { useNavigate } from 'react-router-dom'

Quill.register('modules/imageResize', ImageResize);
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CRow,
  CFormLabel,
  CCallout
} from '@coreui/react'



import { urlVideos } from 'src/endpoints'
import { customToast } from 'src/components/customToast';


function VideosCreate() {


  const navigate = useNavigate();


  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [subTitle, setSUbTitle] = useState('');
  const [video, setvideo] = useState('');



  const photoInputHandler = (event) => {
    setvideo(event.target.files[0]);
  };



  const handleSubmit = async (event) => {
    customToast("please wait", 2);

    event.preventDefault()

    const formData = new FormData();

    formData.append("Photo", video);
    formData.set("title", title);
    formData.set("subTitle", subTitle);
    formData.set("description", description);

    //formData.get("Photo"))
    //formData.get('title'))
    //formData.get('subTitle'))
    //formData.get('description'))

    const form = event.currentTarget
    if (form.checkValidity() === false) {

      event.stopPropagation()
    }
    try {

      await axios.post(urlVideos, formData).then((res) => {
        setTitle('')
        setDescription('')
        setvideo('');
        setSUbTitle('');

        customToast("Videos Successfully created", 0)
        navigate("/Videos")

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


  return (


    <CRow>
      <CCol xs={12}>
        <CCallout className='bg-white'>
         
        </CCallout>

      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ backgroundColor: '#b2322a', color: '#fff' }}>
            <strong>Add </strong> <small>Videos</small>
          </CCardHeader>
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"

              validated
              onSubmit={handleSubmit}
            >
              <CCol md={3}></CCol>
              <CCol md={6}>
                {video && <video style={{ maxHeight: '400px', width: "100%", border: "solid #fff", borderRadius: "20px" }} 
                controls
                >
                  <source src={URL.createObjectURL(video)} />

                </video>
               }
              </CCol>
              <CCol md={3}></CCol>

              <CCol md={4}>

                <CFormLabel htmlFor="formFileLg">Video</CFormLabel>
                <CFormInput type="file" size="md" accept='.mp4' onChange={photoInputHandler} required id="formFileLg" />
              </CCol>

              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="title..."

                  label="Title"
                  required
                  value={title}

                  onChange={(e) => setTitle(e.target.value)}

                />

              </CCol>
              <CCol md={4}>
                <CFormInput
                  type="text"
                  placeholder="subtitle .... "


                  label="Subtitle"

                  required
                  value={subTitle}
                  onChange={(e) => setSUbTitle(e.target.value)}
                />
              </CCol>



              <CCol xs={12}>
                <CFormLabel htmlFor="formFileLg">Description</CFormLabel>
                <ReactQuill formats={formats} modules={modules} theme="snow" required value={description} onChange={setDescription} />
              </CCol>

              <CCol xs={12} className="d-flex justify-content-end">

                <CButton style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }} size="lg" type="submit">
                  Submit
                </CButton>
              </CCol>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default VideosCreate

