import React from 'react'
import {
  BrowserRouter as Router,
  Routes,//이전에 Switch가 Routes로 바뀜
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './auth';

function App() {
  return (
    <Router>
      <div>

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route exact path="/" element={Auth(LandingPage, null) } />
          {/* 뒤에 true 파라미터 하나 더 주면 admin 유저만 들어가는 페이지 */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* <Route path="/login" element={LoginPage} /> */}
          <Route path="/login" element={Auth(LoginPage, false)} />
          <Route path="/register" element={Auth(RegisterPage, false)} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
