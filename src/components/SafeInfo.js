import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import safeRule from '../images/safeRule.png';

export default function SafeInfo() {
    return(
        <div>
            <Container maxWidth="sm">
                <Box sx={{ height: '20px' }} />
                <Box sx={{
                    height: '650px', borderRadius: 5, boxShadow: 3
                }}>
                    <img src={safeRule} 
                    style={{ width: '100%', height: '650px' }}></img>
                </Box>
            </Container>
        </div>
    );
}