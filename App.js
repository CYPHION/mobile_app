import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, PermissionsAndroid, Platform, SafeAreaView, StatusBar } from "react-native";
import { useSelector } from "react-redux";
import IntroSlider from "./src/components/widget/IntroSlider";
import MyDrawer from "./src/navigation/Drawer";
import HomeDrawar from "./src/navigation/HomeDrawer";
import SpashScreen from "./src/screens/SplashScreen";
import { Color } from "./src/utils/color";
const Stack = createNativeStackNavigator();


const App = () => {
  const [show, setShow] = useState(true)
  // const [showApp, setShowApp] = useState(false)
  const [isIntro, setIsIntro] = useState(true)
  const [splash, setSplash] = useState(true)
  const userData = useSelector(state => state.user.data);
  const globaldata = useSelector(state => state.global.data);


  const requestPostNotificationsPermission = async () => {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }

    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log("Post notifications permission allowed");
      } else {
        console.log("Post notifications permission denied");
      }
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
      setSplash(false)
    }
  }, [userData])



  setTimeout(() => {
    if (splash) {
      setSplash(false);
    }
  }, 4000);


  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage?.notification?.title, remoteMessage?.notification?.body)
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    // AsyncStorage.removeItem('fcmToken')
    requestPostNotificationsPermission();
  }, [globaldata?.currentUser]);



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
                {!!userData.email ? <MyDrawer /> : <HomeDrawar />}
              </>
              : <IntroSlider setIsIntro={setIsIntro} />}
          </>}
      </SafeAreaView>
    </>
  )

};

export default App;

