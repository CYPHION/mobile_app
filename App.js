import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, SafeAreaView, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import IntroSlider from "./src/components/widget/IntroSlider";
import MyDrawer from "./src/navigation/Drawer";
import { API } from "./src/network/API";
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

  const requestPostNotificationsPermission = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

      console.log("Post notifications permission allowed");
    } else {
      console.log("Post notifications permission denied");
    }
  }

  const setToken = async () => {
    try {
      const token = await messaging().getToken();
      let FCMtoken = await AsyncStorage.getItem('fcmToken');
      if (!FCMtoken) {
        await AsyncStorage.setItem('fcmToken', token);
        let getTokens;
        if (!userData?.fcmToken) {
          getTokens = [token ? token : '']
        } else {
          getTokens = JSON.parse(userData?.fcmToken)
          getTokens.push(token)
        }
        const uptObj = {
          ...userData,
          fcmToken: JSON.stringify(getTokens)
        }

        const res = await API.updateUser(uptObj);
        console.log(res);
      } else {
        console.log('andr gaya hi nhi ..')
      }
    } catch (error) {
      console.log(error)
    }
  }

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


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    // AsyncStorage.removeItem('fcmToken')
    requestPostNotificationsPermission();
    setToken()
  }, []);



  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <SafeAreaView style={{ flex: 1 }}>

        {splash ?
          <SpashScreen />
          : <>
            {isIntro ?
              <>
                {!!userData.email ? <MyDrawer /> : <AuthSTack />}
              </>
              : <IntroSlider setIsIntro={setIsIntro} />}
          </>}
      </SafeAreaView>
    </>
  )

};

export default App;

