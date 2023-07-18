import React, { Component, Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import './scss/style.scss'
import axios from 'axios'
import { urlusers } from './endpoints'
import Loading from './components/Loading'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState([])
  const [isLoading, setIsLodding] = useState(false)

  useEffect(() => {
    axios.defaults.withCredentials = true
    axios.get(`${urlusers}/user`).then((res) => {
      setUser(res.data)
      setIsLoggedIn(true)
    })
  }, [isLoggedIn])

  return (
    <HashRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <ToastContainer />

      {isLoading && <Loading />}
      <Suspense fallback={loading}>
        {isLoggedIn ? (
          <Routes>
            <Route
              exact
              path="/login"
              name="Login Page"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route
              path="*"
              name="Home"
              element={
                <DefaultLayout
                  setIsLoggedIn={setIsLoggedIn}
                  user={user}
                  setIsLodding={setIsLodding}
                />
              }
            />
          </Routes>
        ) : (
          <Routes>
            <Route
              path="*"
              name="Login Page"
              element={<Login setIsLoggedIn={setIsLoggedIn} setIsLodding={setIsLodding} />}
            />
          </Routes>
        )}
      </Suspense>
    </HashRouter>
  )
}

export default App
