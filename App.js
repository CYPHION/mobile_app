import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IntroSlider from "./src/components/widget/IntroSlider";
import MyDrawer from "./src/navigation/Drawer";
import ConfirmResetPassword from "./src/screens/ConfirmResetPassword";
import LoginScreen from "./src/screens/Login";
import ResetPassword from "./src/screens/ResetPassword";
import SpashScreen from "./src/screens/SplashScreen";
import { globalData } from "./src/store/thunk";
import { Color } from "./src/utils/color";
const Stack = createNativeStackNavigator();


function AuthSTack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='login' component={LoginScreen} />
      <Stack.Screen name='forgetPassword' component={ResetPassword} />
      <Stack.Screen name='confirmPassword' component={ConfirmResetPassword} />
    </Stack.Navigator>
  )
}

const App = () => {
  const [show, setShow] = useState(true)
  // const [showApp, setShowApp] = useState(false)
  const [isIntro, setIsIntro] = useState(true)
  const [splash, setSplash] = useState(true)
  const userData = useSelector(state => state.user.data);
  const dispatch = useDispatch()

  useEffect(() => {
    AsyncStorage.getItem('intro')
      .then(value => {
        const parsedValue = JSON.parse(value); // Parse the value from AsyncStorage
        setIsIntro(parsedValue); // Set the parsed value
      })
      .catch(error => console.error(error));
  }, [])

  useEffect(() => {
    if (userData?.email) {
      dispatch(globalData(userData?.id))
    }
  }, [userData])


  useEffect(() => {
    if (userData.email) {
      setSplash(false)
    }

  }, [userData]);

  setTimeout(() => {
    if (splash) {
      setSplash(false);
    }
  }, 4000);


  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />

      {splash ?
        <SpashScreen />
        : <>
          {isIntro ?
            <>
              {!!userData.email ? <MyDrawer /> : <AuthSTack />}
            </>
            : <IntroSlider setIsIntro={setIsIntro} />}
        </>}
    </>
  )

};

export default App;

