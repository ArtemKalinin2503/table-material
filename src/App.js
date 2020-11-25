import React from 'react';
import UseTable from "./componets/UseTable";
import InterfaceUI from "./componets/InterfaceUI";
import "./app.scss";

const App = () => {
  return (
    <div className="App">
        <InterfaceUI />
        <UseTable />
    </div>
  );
}

export default App;
