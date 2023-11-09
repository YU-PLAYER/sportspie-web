import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DescriptionAlerts from './AlertTitle';

export default function Dayalarm() {
    return (
        <div style={{ width: '100%', height: '70vh' }}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}
            >
                <Box sx={{ height: '20px' }} />
                <CssBaseline />

                <Container maxWidth="sm">
                    11.01 수요일
                    <DescriptionAlerts />
                </Container>

                <Box sx={{ height: '20px' }} />

                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Fab variant="extended" size="medium" color="white"
                    >
                        <AddIcon sx={{ mr: 1 }} />
                        더 보기
                    </Fab>
                </Container>
            </Box>
        </div>
    );
}