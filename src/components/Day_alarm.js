import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import DescriptionAlerts from './AlertTitle';
import ReactLoading from "react-loading";
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
                            <ReactLoading type="spin" color="#A593E0" />
                        </Fab>
                        <Box sx={{ height: '70px' }} />
                    </Container>
                </Container>
            </Box>
        </div>
    );
}