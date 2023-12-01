import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Container from '@mui/material/Container';
import safeRule from '../images/safeRule.png';
import safeRule2 from '../images/safeRule2.png';
import safeRule3 from '../images/safeRule3.png';
import safeRule4 from '../images/safeRule4.png';
import { useNavigate } from 'react-router-dom';

export default function SafeInfo() {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/MyProfile');
    }

    return (
        <div>
            <Container maxWidth="sm">
                <Box sx={{ height: '20px' }} />
                <IconButton onClick={handleBack}>
                    <ArrowBackIcon />
                </IconButton>

                <Box sx={{ height: '25px' }} />
                <img src={safeRule}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}></img>

                <Box sx={{ height: '20px' }} />
                <Box sx={{ textAlign: 'center' }}>출처 : 늘푸른전당 풋살구장</Box>
                <Box sx={{ height: '30px' }} />
                <Box sx={{ height: '25px' }} />
                <img src={safeRule2}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}></img>

                <Box sx={{ height: '50px' }} />

                <Box sx={{ height: '25px' }} />
                <img src={safeRule3}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}></img>

                <Box sx={{ height: '50px' }} />

                <Box sx={{ height: '25px' }} />
                <img src={safeRule4}
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}></img>

                <Box sx={{ height: '20px' }} />
                <Box sx={{ textAlign: 'center' }}>출처 : 국민체육공단</Box>
                <Box sx={{ height: '50px' }} />
            </Container>
        </div>
    );
}