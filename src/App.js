import * as React from 'react';
import Box from '@mui/material/Box';
import TopBar from './components/topBar.js';
import NavBar from './components/NavBar.js';
import MyProfile from './components/MyProfile.js';
import ModifyProfile from './components/ModifyProfile.js';
import ExamineProfileInfo from './components/ExamineProfileInfo.js';
import DetailPage from './components/DetailPage.js';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <div style={{ width: '100%', height: '100vh'}}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem', placeItems:"center"
                }}>
                <BrowserRouter>  
                  <Box sx={{ height: '50px', zIndex: 3, position: 'fixed', width:"100%", top:"0", // 상단바 박스
                  '@media all and (min-width:910px)':{width:"60%"}}}>
                    <TopBar />
                  </Box>

                  <Box sx={{ height: '50px', width: '100%', // 여백 박스
                  '@media all and (min-width:910px)':{width:"60%"}}}>
                  </Box> 

                  <Box sx={{width: '100%', height: 'auto', // 중앙 메인화면 박스
                  '@media all and (min-width:910px)':{width:"60%"}}}>
                    <Routes>
                      <Route path="/MyProfile" element={<MyProfile/>}/>
                      <Route path="/ModifyProfile" element={<ModifyProfile/>}/>
                      <Route path="/ExamineProfileInfo" element={<ExamineProfileInfo/>}/>
                      <Route path="/DetailPage" element={<DetailPage/>}/>
                    </Routes>
                  </Box>    

                  <Box sx={{ height: '50px', width: '100%', // 여백 박스
                    '@media all and (min-width:910px)':{width:"60%"}}}>
                  </Box>

                  <Box sx={{position: 'fixed', zIndex: 3, width:"100%", bottom:"0", // 하단바 박스
                  '@media all and (min-width:910px)':{width:"60%"}}}>
                    <NavBar />
                  </Box>     

                </BrowserRouter>         
            </Box>
        </div>
    </div>
  );
}

export default App;