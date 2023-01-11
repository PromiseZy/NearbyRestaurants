import { BrowserRouter, Routes, Route, Switch, Navigate } from "react-router-dom";
import Home from "./components/Home.js";
import './App.css';

function App() {
  return (
    <div className="app">

    <div id="routes">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />



        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;
