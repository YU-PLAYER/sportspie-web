import * as React from 'react';
import Box from '@mui/material/Box';
import SimpleContainer from './Container.js';

export default function Display() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    display: 'grid',
                    bgcolor: '#f5f5f5',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}            >
                <SimpleContainer>
                </SimpleContainer>                                 
            </Box>
        </div>
    );
}