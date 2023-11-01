import * as React from 'react';
import Box from '@mui/material/Box';
import TopBar from '../components/topBar.js';
import Nav from "../components/Nav.js";
import Map from '../components/Map.js';

export default function MapDisplay() {
    return (
        <div style={{ width: '100%', height: '100vh'}}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                }}
            >
                <Box sx={{ height: '50px' }}><TopBar /></Box>
                <Map />              
                <Box sx={{ height: '50px' }}><Nav /></Box>
                
            </Box>
        </div>
    );
}