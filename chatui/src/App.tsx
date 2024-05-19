/**
 * The main React component for the application. It sets up the routing and handles the login state.
 *
 * The `App` component is responsible for:
 * - Rendering the main application routes using `react-router-dom`
 * - Tracking the login state using the `isLoggedIn` state variable
 * - Rendering the appropriate components based on the login state and the current route
 * - Connecting to the server socket using the `connectToServer` function
 * - Passing the socket connection and login state to the child components as props
 */

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import ChatContainer from '../src/component/ChatContainer.tsx'
import LandingPage from '../src/component/LandingPage.tsx';
import HomePage from '../src/component/HomePage.tsx';

import io from "socket.io-client"





const socket = io.connect('http://localhost:3500')
const App = () => {
    const [userName, setUserName] = useState('');

    const handleLogin = (enteredUsername, callback) => {
      setUserName(enteredUsername);
      callback();
    };


  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<LandingPage socket={socket} onLogin={handleLogin} />}
        />
        {userName && (
          <Route path="/chat" element={<ChatContainer socket={socket} />} />
        )}
      </Routes>
    </Router>
  );
}
export default App;
