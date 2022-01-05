// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './components/Login';
import { useState } from 'react';
import Alert from './components/Alert';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  const [alert, setalert] = useState(null);
  const showalert=(message,type)=>{
     setalert({
       msg:message,
       type:type
     })
     setTimeout(() => {
       setalert(null);
     }, 1500);

  }
  return (
   <>
    <Alert alert={alert} />
    <Router>
    <Routes>
    <Route exact path="/" element={<Login showalert={showalert} />}/>
    <Route exact path="/profile" element={<Profile showalert={showalert} />}/>
    <Route exact path="/register" element={<Register showalert={showalert} />}/>

  
    </Routes>
    </Router>
   </>
  );
}

export default App;
