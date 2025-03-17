import React, { useEffect } from "react";
import NewSP from "./components/NewSP";
import RemoteTab from "./components/RemoteTab";
// import {} from ""

import "./_App.scss";

import "./utils/configs";

function App() {
  // useEffect(() => {
  //   console.log(store);
  // });
  return (
    <div className="App">
      <RemoteTab arr={[]} />
    </div>
  );
}

export default App;
