import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import IntroSlider from '../views/introSlider'
import LoginScreen from './loginScreen/Login'

const Main = (prop) => {
  const [showApp, setShowApp] = useState(false)

  return (
    <>
      {showApp ? <LoginScreen setShow={prop.setShow} /> : <IntroSlider setShowApp={setShowApp} />}
    </>
  )
}

export default Main

const styles = StyleSheet.create({})