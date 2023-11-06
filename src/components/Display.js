import * as React from 'react';
import Box from '@mui/material/Box';
import SimpleContainer from './Container.js';
import TopBar from '../topBar.js';

export default function Display() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}
            >

                <TopBar sx={{
                    height: '50px', position: 'fixed', width: "100%", top: "0",
                    '@media all and (min-width:769px)': { width: "80%" }
                }} />
                <Box sx={{ height: '50px' }} />
                <SimpleContainer>
                </SimpleContainer>

                <Box sx={{ height: '50px' }} />

            </Box>
        </div>
    );
}