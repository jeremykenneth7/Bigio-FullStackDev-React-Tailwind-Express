import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import Management from './pages/management';
import Story from './pages/story';
import Edit from './pages/edit';
import Chapter from './pages/chapter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/addchapter" element={<Chapter />} />
        <Route path="/editstory/:storyId" element={<Edit />} />
        <Route path="/management" element={<Management />} />
        <Route path="/story" element={<Story />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
