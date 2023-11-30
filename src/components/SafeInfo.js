import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import safeRule from '../images/safeRule.png';
import safeRule2 from '../images/safeRule2.png';
import safeRule3 from '../images/safeRule3.png';
import safeRule4 from '../images/safeRule4.png';

export default function SafeInfo() {
    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ height: '20px' }} />
                <Box sx={{
                    height: '650px', borderRadius: 5, boxShadow: 3
                }}>
                    <Box sx={{ height: '25px' }} />
                    <img src={safeRule}
                        style={{ width: '100%', height: '600px' }}></img>
                </Box>
                <Box sx={{ height: '20px' }} />
                <Box sx={{ textAlign: 'center' }}>출처 : 늘푸른전당 풋살구장</Box>
                <Box sx={{ height: '30px' }} />
                <Box sx={{
                    height: '650px', borderRadius: 5, boxShadow: 3
                }}>
                    <Box sx={{ height: '25px' }} />
                    <img src={safeRule2}
                        style={{ width: '100%', height: '600px' }}></img>
                </Box>
                <Box sx={{ height: '50px' }} />
                <Box sx={{
                    height: '650px', borderRadius: 5, boxShadow: 3
                }}>
                    <Box sx={{ height: '25px' }} />
                    <img src={safeRule3}
                        style={{ width: '100%', height: '600px' }}></img>
                </Box>
                <Box sx={{ height: '50px' }} />
                <Box sx={{
                    height: '650px', borderRadius: 5, boxShadow: 3
                }}>
                    <Box sx={{ height: '25px' }} />
                    <img src={safeRule4}
                        style={{ width: '100%', height: '600px' }}></img>
                </Box>
                <Box sx={{ height: '20px' }} />
                <Box sx={{ textAlign: 'center' }}>출처 : 국민체육공단</Box>
                <Box sx={{ height: '50px' }} />
            </Container>
        </div>
    );
}