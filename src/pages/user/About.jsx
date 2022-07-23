import React from 'react'
import Header from './component/Header'
import Footer from './component/Footer'
import AboutUsBanner from './component/AboutUsBanner'
import SubscribeArea from './component/SubscribeArea'
import OurService from './component/OurService'
import OurTeam from './component/OurTeam'
import AboutUsSkills from './component/AboutUsSkills'

export default function About() {
  return (
    <>
      <Header />
      <AboutUsBanner />
      <AboutUsSkills />
      <OurTeam />
      <OurService />
      <SubscribeArea />
      <Footer />
    </>
  )
}