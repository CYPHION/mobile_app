import React, { useState } from "react";
import { StatusBar } from "react-native";
import MyDrawer from "./src/navigation/Drawer";
import Main from "./src/screens/Main";
import { Color } from "./src/utils/color";


const App = () => {
  const [show, setShow] = useState(true)

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

