import React, { useState } from "react";
import MyDrawer from "./src/navigation/Drawer";
import Main from "./src/screens/Main";


const App = () => {
  const [show, setShow] = useState(true)

  return (
    <>
      {show ? <MyDrawer /> : <Main setShow={setShow} />}
    </>
  )

};

export default App;

