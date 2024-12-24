import AsyncStorage from "@react-native-async-storage/async-storage";
import messaging from '@react-native-firebase/messaging';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Alert, Linking, PermissionsAndroid, Platform, SafeAreaView, StatusBar } from "react-native";
import { checkVersion } from "react-native-check-version";
import { useSelector } from "react-redux";
import IntroSlider from "./src/components/widget/IntroSlider";
import { useNotification } from "./src/context/NotificationContext";
import MyDrawer from "./src/navigation/Drawer";
import SpashScreen from "./src/screens/SplashScreen";
import { Color } from "./src/utils/color";
const Stack = createNativeStackNavigator();


const App = () => {
  const [show, setShow] = useState(true)

  const [isIntro, setIsIntro] = useState(true)
  const [splash, setSplash] = useState(true)
  const userData = useSelector(state => state.user.data);
  const globaldata = useSelector(state => state.global.data);

  const { incrementNotificationCount } = useNotification();
  const navigation = useNavigation();


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
    const checkAppVersion = async () => {
      try {
        const versionInfo = await checkVersion({
          bundleId: Platform.OS === 'ios' ? 'com.PrimeTutuitionMobileApp' : 'com.primetutuitionmobileapp',
        });

        if (versionInfo.needsUpdate) {
          Alert.alert(
            'Update Available',
            `A ${versionInfo.updateType} update is available. Please update to the latest version.`,
            [
              // { text: 'Later', style: 'cancel' },
              {
                text: 'Update',
                onPress: () => {
                  Linking.openURL(versionInfo.url);
                }
              }
            ]
          );
        }
      } catch (error) {
        console.error('Failed to check app version:', error);
      }
    };

    checkAppVersion();
  }, []);



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
    // AsyncStorage.removeItem('fcmToken')
    requestPostNotificationsPermission();
  }, []);



  useEffect(() => {


    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      incrementNotificationCount();
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {

    });

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      navigation.dispatch(
        // Set the index to 0 and navigate to the specified route
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'root', params: { screen: 'notifications' } }],
        }),
      );
    });


    messaging().getInitialNotification(async remoteMessage => {
      if (remoteMessage) {
        incrementNotificationCount();
      }
    });

    // Cleanup listeners on unmount
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, [incrementNotificationCount]);


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
                {/* {!!userData.email ? <MyDrawer /> : <HomeDrawar />} */}
                <MyDrawer />
              </>
              : <IntroSlider setIsIntro={setIsIntro} />}
          </>}
      </SafeAreaView>
    </>
  )

};

export default App;

