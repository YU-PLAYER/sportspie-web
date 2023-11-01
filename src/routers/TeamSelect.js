import * as React from 'react';
import Box from '@mui/material/Box';
import TeamSelectList from '../components/TeamSelectList.js';
import TopBar from '../topBar.js';
import Nav from "../Nav.js";

export default function Teamselect() {
    return (
        <div style={{ width: '100%', height: '100vh'}}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                }}
            >
                <Box sx={{ height: '50px' }}><TopBar /></Box>
                <TeamSelectList>
                </TeamSelectList>                  
                <Box sx={{ height: '50px' }}><Nav /></Box>
                
            </Box>
        </div>
    );
}