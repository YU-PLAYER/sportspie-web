import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TopBar from './topBar';
import NavBar from './NavBar';
import MyProfile from './MyProfile';
import ModifyProfile from './ModifyProfile';
import ExamineProfileInfo from './ExamineProfileInfo';
import DetailPage from './DetailPage';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Container maxWidth="sm">
          <TopBar />
        </Container>
        <Container maxWidth="sm">   
          <Box sx={{boxShadow: 3, backgroundColor: 'white', overflow: "auto"}}>
            <Routes>
              <Route path="/MyProfile" element={<MyProfile/>}/>
              <Route path="/ModifyProfile" element={<ModifyProfile/>}/>
              <Route path="/ExamineProfileInfo" element={<ExamineProfileInfo/>}/>
              <Route path="/DetailPage" element={<DetailPage/>}/>
            </Routes>
          </Box>
        </Container>
        <Container maxWidth="sm">
          <NavBar/>
        </Container>  
      </BrowserRouter>
    </React.Fragment>
  );
}