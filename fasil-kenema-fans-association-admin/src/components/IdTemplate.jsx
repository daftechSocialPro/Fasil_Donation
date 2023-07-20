import React, { useRef, useState } from 'react'
import { CCol, CRow, CImage, CCardBody, CButton } from '@coreui/react'

import user from '../assets/user.png'
import { assetUrl } from 'src/endpoints'
import ReactToPrint from 'react-to-print'

function IdTemplate({
  headerAm,
  headerEn,
  subtitle,
  subtitle2,
  addressAm,
  address,
  lo,
  logo,
  backGroundImage,
  background,
  tempback,
  bg,
  color,
  level,
  level2,
  name,
  amharicName,
  sex,
  phoneNumber,
  userPhoto,
  idInitial,
  idno,
  backImage,
  setVisibleXLId,
  giveId,
  money,
  id,
  innerImage,
  branch,
  localBranch
}) {

  const [viewBack, setViewBack] = useState(false)

  let componentRef = useRef()
  const getImage = (item) => {
    return `${assetUrl}/${item}`
  }
  const Print = (e) => {
    e.preventDefault()
    var content = document.getElementById('printablediv')
    var pri = document.getElementById('ifmcontentstoprint').contentWindow
    pri.document.open()
    pri.document.write(content.innerHTML)

    var bootstrap = document.createElement('link')
    bootstrap.href = '@coreui/react'
    bootstrap.rel = 'stylesheet'
    pri.document.head.appendChild(bootstrap)

    pri.document.close()
    pri.focus()
    pri.print()
  }

  return (
    <>
      <iframe
        id="ifmcontentstoprint"
        style={{ height: '0px', width: '0px', position: 'absolute' }}
      ></iframe>
      <CCardBody
        ref={(el) => (componentRef = el)}
        id="printablediv"
        style={{
          backgroundColor: '#fff',
          border: ' 1px solid silver',
          padding: '20px',
          borderRadius: '20px',
          margin: '20px',

        }}
      >
        <CRow style={{ padding: '10px' }}>
          {!viewBack && <CCol
            sm={8}
            ref={(ref) => (background = ref)}
            style={
              bg && !backGroundImage
                ? {

                  border: '2px solid #fff',
                  borderRadius: '17px',
                  padding: '18px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundColor: `${color ? color : '#fff'}`,
                  backgroundImage: `url(${getImage(bg)}) `,
                  backgroundBlendMode: 'multiply',
                  height: '380px!important',

                }
                : backGroundImage
                  ? {

                    border: '2px solid #fff',
                    borderRadius: '17px',
                    padding: '18px',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: `${color ? color : '#fff'}`,
                    backgroundImage: `url(${backGroundImage}) `,
                    backgroundBlendMode: 'multiply',
                    height: '380px!important',

                  }
                  : {
                    backgroundColor: '#b2322a',
                    color: '#fff',
                    borderRadius: '17px',
                    padding: '18px',
                    height: '380px!important',
                    backgroundColor: `${color ? color : '#fff'}`,
                    backgroundBlendMode: 'multiply',

                  }
            }
          >
            <CRow>
              <CCol sm={2} style={{ marginTop: "-18px" }}>
                <CImage
                  src={lo && !logo ? getImage(lo) : logo && URL.createObjectURL(logo)}
                  style={{ marginTop: "0px" }}
                  height={100}
                />
              </CCol>
              <CCol sm={8} style={{ textAlign: 'center' }} >
                <span style={{ fontSize: '22px', fontWeight: 'bolder' }}>{headerAm} {localBranch} ደጋፊዎች ማህበር</span>
                <br />
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: "rgb(178, 50, 42)" }}>
                  {headerEn && headerEn.toUpperCase()} {branch && branch.toUpperCase()}
                </span>
                <br />
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{subtitle} </span>
                <br />
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: 'white' }}>{subtitle2} </span>
                <br />
              </CCol>
              <CCol sm={2} style={{ marginTop: "-18px", }}>
                <CImage
                  src={lo && !logo ? getImage(lo) : logo && URL.createObjectURL(logo)}

                  height={100}
                />
              </CCol>
            </CRow>
            <hr />
            <div style={{     
              backgroundImage: `url(${getImage(innerImage)}) `,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize:'cover',
                  backgroundPosition:'center',
                  paddingLeft:'10px',
                  paddingRight:'10px'
                  }}>


              <CRow >

                <CCol sm={6} style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '19px', fontWeight: 'bolder' }}>
                    ስም &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>{amharicName}</span>
                  </span>
                  <br />
                  <span style={{ fontSize: '17px', fontWeight: 'bolder' }}>
                    Name &nbsp;<span>{name}</span>
                  </span>


                  <CRow>
                    <CCol sm={4} style={{ textAlign: 'left' }}>
                      <span style={{ fontSize: '17px', fontWeight: 'bolder' }}>
                        ጾታ &nbsp;&nbsp;<span>{sex === 0 ? 'ወ' : sex === 1 ? 'ሴ' : ''}</span>
                      </span>
                      <br />
                      <span style={{ fontSize: '19px', fontWeight: 'bolder' }}>
                        Sex &nbsp;<span>{sex === 0 ? 'M' : sex === 1 ? 'F' : ''}</span>
                      </span>
                    </CCol>
                    {/* <CCol sm={8} style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '18px', fontWeight: 'bolder' }}>
                      ደረጃ &nbsp;<span>{level2}</span>
                    </span>
                    <br />
                    <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                      Level <span>{level && level.toUpperCase()}</span>
                    </span>
                  </CCol> */}

                  </CRow>


                  <span style={{ fontSize: '17px', fontWeight: 'bolder' }}>
                    አድራሻ &nbsp;&nbsp;&nbsp;&nbsp;<span>{addressAm}</span>
                  </span>
                  <br />
                  <span style={{ fontSize: '19px', fontWeight: 'bolder' }}>
                    Address &nbsp;<span>{address && address.toUpperCase()}</span>
                  </span>



                </CCol>
                <CCol sm={6} style={{
                  textAlign: 'right',
             

                }}>
                  <span style={{ fontSize: '17px', fontWeight: 'bolder' }}>የመ.ቁ </span>{' '}
                  <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                    {idInitial} {idno}
                  </span>
                  <br />
                  <span style={{ fontSize: '15px', fontWeight: 'bolder' }}>
                    ID.NO.{idno}
                    {idInitial}
                  </span>
                  <br />
                  <CImage
                    src={userPhoto ? getImage(userPhoto) : user}
                    height={125}
                    style={{ border: '2px solid #daa659', borderRadius: '10px' }}
                  />
                  <br />
                  <span style={{ fontSize: '17px', fontWeight: 'bolder' }}>ስልክ {phoneNumber}</span>
                </CCol>
                <CCol sm={12} style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bolder', color: 'white' }}>
                    <span>{level2} {money} ብር</span>
                  </span>
                </CCol>
              </CRow>
            </div>
          </CCol>
          }

          {viewBack && <CCol sm={8}>
            <CImage
              style={{
                width: '100%',
                height: '355px',
                border: '2px solid #fff',
                borderRadius: '17px',
              }}
              src={backImage ? URL.createObjectURL(backImage) : getImage(tempback)}
            />
          </CCol>}

          <CCol sm={4}>

            <CButton
              className="mt-3"
              onClick={(e) => setViewBack(!viewBack)}
              style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
            >
              {viewBack ? "View Front" : "View Back"}
            </CButton>
          </CCol>


        </CRow>
      </CCardBody>
      {name && (
        <>
          <ReactToPrint
            trigger={() => (
              <CButton
                className="mt-3"
                style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
              >
                Print
              </CButton>




            )}
            content={() => componentRef}
          />
          &nbsp;

          <CButton
            className="mt-3"
            onClick={(e) => giveId(e, id)}
            style={{ backgroundColor: '#b2322a', color: '#fff', borderColor: '#fff' }}
          >
            ID GIVEN
          </CButton>
        </>
      )}
    </>
  )
}

export default IdTemplate
