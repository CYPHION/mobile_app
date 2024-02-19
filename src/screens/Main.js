import React, { useState } from 'react'

const Main = (prop) => {
  const [showApp, setShowApp] = useState(false)
  // const [isIntro, setIsIntro] = useState(false)



  // useEffect(() => {
  //   AsyncStorage.getItem('intro')
  //     .then(value => {
  //       const parsedValue = JSON.parse(value); // Parse the value from AsyncStorage
  //       setIsIntro(parsedValue); // Set the parsed value
  //     })
  //     .catch(error => console.error(error));
  // }, [])



  // useEffect(() => {
  //   if (isIntro) {
  //     setShowApp(true)
  //   } else {
  //     setShowApp(false)
  //   }
  // }, [isIntro])


  return (
    <>
      {/* <IntroSlider setShowApp={setShowApp} /> */}
    </>
  )
}

export default Main