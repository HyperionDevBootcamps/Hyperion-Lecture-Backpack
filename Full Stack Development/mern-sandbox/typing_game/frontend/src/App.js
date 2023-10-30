import logo from "./logo.svg";
import "./App.css";
import { Route, Link, Routes } from "react-router-dom";

// import Home from "./Home";
import About from "./About";

function App({ appTitle }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {appTitle} | <Link to="/">About</Link>
      </header>
      <Routes>
        <Route path="/" Component={About} />
      </Routes>
    </div>
  );
}

export default App;
