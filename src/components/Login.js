import * as React from 'react';
import Box from '@mui/material/Box';
import LoginContainer from './LoginContainer.js';
import './Login.css';

export default function Login() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}
            >
                <Box sx={{ height: '20px' }} />
                <LoginContainer>
                </LoginContainer>                  

                <Box sx={{ height: '50px' }} />
                
            </Box>
        </div>
    );
}