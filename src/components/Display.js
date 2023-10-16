import * as React from 'react';
import Box from '@mui/material/Box';
import SimpleContainer from './Container.js';

export default function Display() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    display: 'grid',
                    bgcolor: 'grey.100',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}
            >
                <Box sx={{ height: '50px' }} />

                <SimpleContainer>
                </SimpleContainer>                  

                <Box sx={{ height: '50px' }} />
                
            </Box>
        </div>
    );
}