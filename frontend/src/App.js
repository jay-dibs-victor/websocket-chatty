import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import ChatLayout from './components/ChatLayout';

function App() {
  return (
    <Router>
      <ChatLayout />
    </Router>
  );
}

export default App;
