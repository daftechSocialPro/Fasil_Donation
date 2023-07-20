import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

const HomeHero = React.lazy(() => import('./views/layout/homeHero/HomeHero'))
const HomeHeroCreate = React.lazy(() => import('./views/layout/homeHero/HomeHeroCreate'))
const HomeHeroUpdate = React.lazy(() => import('./views/layout/homeHero/HomeHeroEdit'))

const NextMatch = React.lazy(() => import('./views/layout/nextMatch/NextMatch'))
const NextMatchCreate = React.lazy(() => import('./views/layout/nextMatch/NextMatchCreate'))
const NextMatchUpdate = React.lazy(() => import('./views/layout/nextMatch/NextMatchEdit'))

const Partner = React.lazy(() => import('./views/layout/partner/Partner'))
const PartnerCreate = React.lazy(() => import('./views/layout/partner/PartnerCreate'))
const PartnerUpdate = React.lazy(() => import('./views/layout/partner/PartnerEdit'))

const AboutSection = React.lazy(() => import('./views/layout/aboutSection/AboutSection'))
const AboutSectionCreate = React.lazy(() => import('./views/layout/aboutSection/AboutSectionCreate'))
const AboutSectionUpdate = React.lazy(() => import('./views/layout/aboutSection/AboutSectionEdit'))


const branch = React.lazy(() => import('./views/membership/branch/Branch'))
const branchCreate = React.lazy(() => import('./views/membership/branch/BranchCreate'))
const branchUPdate = React.lazy(() => import('./views/membership/branch/BranchEdit'))



const donation = React.lazy(() => import('./views/donation/Donation'))
const donationCreate = React.lazy(() => import('./views/donation/DonationCreate'))
const donationUpdate = React.lazy(() => import('./views/donation/DonationEdit'))

const DegafiSettting = React.lazy(() => import('./views/membership/membershipSetting/DesignSetting'))


const members = React.lazy(() => import('./views/membership/member/Member'))
const membersCreate = React.lazy(() => import('./views/membership/member/MemberCreate'))
const membersUpdate = React.lazy(() => import('./views/membership/member/MemberEdit'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  //homeHero
  { path: '/homehero', name: 'Home Hero', exact: true, element: HomeHero },
  { path: '/homehero/create', name: 'Add Home Hero', element: HomeHeroCreate },
  { path: '/homehero/edit', name: 'Edit Home Hero', element: HomeHeroUpdate },

  //nextMatch
  { path: '/nextmatch', name: 'Next Match', exact: true, element: NextMatch },
  { path: '/nextmatch/create', name: 'Add Next Match', element: NextMatchCreate },
  { path: '/nextmatch/edit', name: 'Edit Next Match', element: NextMatchUpdate },

  //partner 
  { path: '/partner', name: 'partner ', exact: true, element: Partner },
  { path: '/partner/create', name: 'Add Partner', element: PartnerCreate },
  { path: '/partner/edit', name: 'Edit Partner', element: PartnerUpdate },

  //About Section
  { path: '/aboutsection', name: 'About Section', exact: true, element: AboutSection },
  { path: '/aboutsection/create', name: 'Add About Section', element: AboutSectionCreate },
  { path: '/aboutsection/edit', name: 'Edit About Section', element: AboutSectionUpdate },

  //Design setting 

  { path: '/membership/design', name: 'Design Setting', element: DegafiSettting },

//branch
{ path: '/branch', name: 'Branch ', exact: true, element: branch },
{ path: '/branch/create', name: 'Add Branch', element: branchCreate },
{ path: '/branch/edit', name: 'Edit Branch', element: branchUPdate },

  //donation 
  { path: '/donation', name: 'Donation ', exact: true, element: donation },
  { path: '/donation/create', name: 'Add Donation', element: donationCreate },
  { path: '/donation/edit', name: 'Edit Donation', element: donationUpdate },

  //members 
  { path: '/members', name: 'Members ', exact: true, element: members },
  { path: '/members/create', name: 'Add Member', exact: true, element: membersCreate },
  { path: '/members/edit', name: 'Edit Member', exact: true, element: membersUpdate },


]

export default routes
