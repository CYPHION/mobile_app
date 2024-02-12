import React, { useState } from "react";
import MyDrawer from "./src/myNavigations/drawer/Mydrawer";
import Main from "./src/screens/Main";


const App = () => {
  const [show, setShow] = useState(false)

  return (
    <>
      {show ? <MyDrawer /> : <Main setShow={setShow} />}
    </>
  )

};

export default App;

