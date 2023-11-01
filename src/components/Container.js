import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <Container maxWidth="sm">   
      <Box sx={{ height: '20px' }} />
      <Box sx={{ height: '100vh',borderRadius: 5, boxShadow: 2}} />
      <Box sx={{ height: '20px' }} />
      </Container>
    </React.Fragment>
  );
}