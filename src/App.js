import * as React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Box from '@mui/material/Box';
import TopBar from './components/topBar.js';
import NavBar from './components/NavBar.js';
import Display from './routers/Display.js';
import Teamselect from "./routers/TeamSelect.js";
import MapDisplay from './routers/MapDisplay.js';
import MyMatchList from "./routers/MyMatchList.js";
import WriteDisplay from "./routers/WriteDisplay.js";
import Login from './components/Login.js';

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
        <Box sx={{ height: '50px' }}></Box>
            <Routes>
                <Route path="/" element={<Display />} />
                <Route path="/TeamSelect" element={<Teamselect />} />
                <Route path="/Map" element={<MapDisplay />} /> 
                <Route path="/MatchList" element={<MyMatchList />} /> 
                <Route path="/Write" element={<WriteDisplay />} /> 
                <Route path='/Login' element={<Login />}/>
            </Routes>
        <Box sx={{ height: '50px' }}></Box>             
        <Box sx={{ height: '50px', position: 'fixed', width:"100%", bottom:"0",
        '@media all and (min-width:910px)':{width:"60%"}}}><NavBar /></Box>
    </Box>
    </div>
    </Router>
  );
}

export default App;
