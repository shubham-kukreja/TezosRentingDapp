import React from "react";
import "./App.css";
import ButtonAppBar from "./components/AppBar.jsx";
import Router from "./Router";

function App() {
  return (
    <div className="App">
      <ButtonAppBar />
      <Router />
    </div>
  );
}

export default App;
