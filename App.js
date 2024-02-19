import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import IntroSlider from "./src/components/widget/IntroSlider";
import MyDrawer from "./src/navigation/Drawer";
import { Color } from "./src/utils/color";
const Stack = createNativeStackNavigator();

const App = () => {
  const [show, setShow] = useState(false)
  const [showApp, setShowApp] = useState(false)
  const [isIntro, setIsIntro] = useState(false)
  const userData = useSelector(state => state.user.data);

  useEffect(() => {
    AsyncStorage.getItem('intro')
      .then(value => {
        const parsedValue = JSON.parse(value); // Parse the value from AsyncStorage
        setIsIntro(parsedValue); // Set the parsed value
      })
      .catch(error => console.error(error));
  }, [])

  useEffect(() => {
    if (isIntro) {
      setShowApp(true)
    } else {
      setShowApp(false)
    }
  }, [isIntro])

  // useEffect(() => {
  //   if (userData?.email) {
  //     dispatch(globalData(userData?.id))
  //   }
  // }, [userData])

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      {/* {show ? <MyDrawer /> : <Main setShow={setShow} />} */}
      {isIntro ?
        // <Stack.Navigator
        //   initialRouteName='login'
        //   screenOptions={{
        //     headerShown: false
        //   }}
        // >
        //   {show ?
        //     <>
        //       <Stack.Screen name='login' component={LoginScreen} />
        //       <Stack.Screen name='forgetPassword' component={ResetPassword} />
        //       <Stack.Screen name='confirmPassword' component={ConfirmResetPassword} />
        //     </>
        // :
        // <Stack.Screen name='drawer' component={MyDrawer} />
        <MyDrawer />
        // }
        //  </Stack.Navigator> 

        : <IntroSlider setShowApp={setShowApp} />}
    </>
  )

};

export default App;

