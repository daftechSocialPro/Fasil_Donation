import React from 'react'
import CIcon from '@coreui/icons-react'
import {cilPeople, cilNewspaper, cilSpeedometer ,cilSoccer,cilBank,cilImage, cilHome, cilMoney, cilDollar, cilDescription} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [

  {
    component: CNavItem,
    name: 'Dashboard ',
    to:'/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Membership ',
  },
  
  {
    component: CNavItem,
    name: 'Members',
    to: '/members',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  
  {
    component: CNavItem,
    name: 'Membership Design',
    to: '/membership/design',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Donation ',
  },
  
  {
    component: CNavItem,
    name: 'Donation',
    to: '/donation',
    icon: <CIcon icon={cilImage} customClassName="nav-icon" />,
  },
  

  {
    component: CNavTitle,
    name: 'Layout',
    to: '/dashboard',
  
  },

  {
    
    component:CNavItem,
    name:'Home Hero',
    to:"/homehero",
    icon:<CIcon icon={cilHome} customClassName="nav-icon" />
  },
  {
    component:CNavItem,
    name:'Next Match',
    to:"/nextmatch",
    icon:<CIcon icon={cilSoccer} customClassName="nav-icon" />
  },
  {
    component: CNavItem,
    name: 'About Section',
    to: '/aboutsection',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Partenrs',
    to: '/partner',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
  }
 
]

export default _nav
