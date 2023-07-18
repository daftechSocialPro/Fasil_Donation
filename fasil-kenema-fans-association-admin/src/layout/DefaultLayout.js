import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = ({setIsLoggedIn,user,setIsLodding}) => {
  return (
    <div>
      <AppSidebar user = {user} />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader  setIsLoggedIn={setIsLoggedIn} user={user} />
        <div className="body flex-grow-1 px-3">
          <AppContent user={user}   setIsLodding={setIsLodding}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
