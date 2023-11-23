import * as React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import TopBar from './components/topBar.js';
import NavBar from './components/NavBar.js';
import Home from './components/Home.js';
import Teamselect from "./routers/TeamSelect.js";
import MapDisplay from './routers/MapDisplay.js';
import MyMatchList from "./routers/MyMatchList.js";
import WriteDisplay from "./routers/WriteDisplay.js";
import MyProfile from './components/MyProfile.js';
import ModifyProfile from './components/ModifyProfile.js';
import ExamineProfile from './components/ExamineProfile.js';
import LoginContainer from './components/LoginContainer.js';
import DetailPage from './components/DetailPage.js';
import Notice from './components/Notice.js';
import Report from './components/Report.js';

function App() {
  return (
    <Router>
    <div style={{ width: '100%', height: '100vh'}}>
    <Box
        sx={{
            display: 'grid',
            fontSize: '0.875rem', placeItems:"center"
        }}
    >
        <Box sx={{ height: '50px', zIndex: 3,  position: 'fixed', width:"100%", top:"0",
        '@media all and (min-width:910px)':{width:"60%"}}}>
            <TopBar />
        </Box>

        <Box sx={{ height: '80px' }}></Box>

        <Box sx={{ width:"80%", '@media all and (min-width:910px)':{width:"60%"}}}>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" />} />         
                <Route path="/Home" element={<Home />} />
                <Route path="/TeamSelect" element={<Teamselect />} />
                <Route path="/Map" element={<MapDisplay />} /> 
                <Route path="/MatchList" element={<MyMatchList />} /> 
                <Route path="/Write" element={<WriteDisplay />} /> 
                <Route path='/Login' element={<LoginContainer />}/>
                <Route path="/MyProfile" element={<MyProfile />} />
                <Route path="/ModifyProfile" element={<ModifyProfile />} />
                <Route path="/ExamineProfile" element={<ExamineProfile />} />
                <Route path="/DetailPage/:id" element={<DetailPage />} />
                <Route path="/Notice" element={<Notice />} />
                <Route path="/Report" element={<Report />} />
            </Routes>
        </Box>

        <Box sx={{ height: '50px' }}></Box>  

        <Box sx={{ height: '50px', position: 'fixed', width:"100%", bottom:"0",
        '@media all and (min-width:910px)':{width:"60%"}}}><NavBar />
        </Box>
    </Box>
    </div>
    </Router>
  );
}

export default App;
