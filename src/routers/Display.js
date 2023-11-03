import * as React from 'react';
import Box from '@mui/material/Box';
import SimpleContainer from '../components/Container.js';
import TopBar from '../components/topBar.js';
import NavBar from '../components/NavBar.js';

export default function Display() {
    return (
        <div style={{ width: '100%', height: '100vh'}}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem', placeItems:"center"
                }}
            >
                <Box sx={{ height: '50px', position: 'fixed', width:"100%", top:"0",
                '@media all and (min-width:769px)':{width:"80%"}}}>
                    <TopBar />
                    </Box>
                <Box sx={{ height: '50px' }}></Box>
                <SimpleContainer>
                </SimpleContainer>                  
                <Box sx={{ height: '50px' }}></Box>             
                <Box sx={{ height: '50px', position: 'fixed', width:"100%", bottom:"0",
                '@media all and (min-width:769px)':{width:"80%"}}}><NavBar /></Box>
                
            </Box>
        </div>
    );
}