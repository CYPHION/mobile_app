import React, { useState } from 'react'
import IntroSlider from '../components/widget/IntroSlider'
import LoginScreen from './Login'

const Main = (prop) => {
  const [showApp, setShowApp] = useState(false)

  return (
    <>
      {showApp ? <LoginScreen setShow={prop.setShow} /> : <IntroSlider setShowApp={setShowApp} />}
    </>
  )
}

export default Main