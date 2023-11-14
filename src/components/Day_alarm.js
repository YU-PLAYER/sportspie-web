import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import DescriptionAlerts from './AlertTitle';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';

export default function Dayalarm() {
    return (
        <div style={{ width: '100%', height: '70vh', overflow: "auto" }}>
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
                    <Box sx={{ height: '10px' }} />
                    <DescriptionAlerts />

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
                        <Box sx={{ height: '70px' }} />
                    </Container>
                </Container>
            </Box>
        </div>
    );
}