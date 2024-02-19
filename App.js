import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { useSelector } from "react-redux";
import MyDrawer from "./src/navigation/Drawer";
import Main from "./src/screens/Main";
import { Color } from "./src/utils/color";


const App = () => {
  const [show, setShow] = useState(false)
  const userData = useSelector(state => state.user.data);


  useEffect(() => {
    if (userData?.email) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [userData])


  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      {show ? <MyDrawer /> : <Main setShow={setShow} />}
    </>
  )

};

export default App;

