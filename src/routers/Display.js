import * as React from 'react';
import Box from '@mui/material/Box';
import SimpleContainer from '../components/Container.js';
import TopBar from '../components/topBar.js';
import Nav from "../components/Nav.js";

export default function Display() {
    return (
        <div style={{ width: '100%', height: '100vh'}}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                }}
            >
                <Box sx={{ height: '50px' }}><TopBar /></Box>
                <SimpleContainer>
                </SimpleContainer>                  
                <Box sx={{ height: '50px' }}><Nav /></Box>
                
            </Box>
        </div>
    );
}