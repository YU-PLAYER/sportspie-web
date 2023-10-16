import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function SimpleContainer() {
  return (
    <React.Fragment>

      <Container maxWidth="sm">
        <Box sx={{ height: '20px' }} />
        테스트 페이지
      </Container>

      <Container maxWidth="sm">   
      <Box sx={{ height: '20px' }} />
      <Box sx={{ height: '70vh',borderRadius: 5, boxShadow: 3}} />
      <Box sx={{ height: '20px' }} />
      </Container>

      <Container>
      테스트 페이지 끝
      <Box sx={{ height: '20px' }} />
      </Container>
      

    </React.Fragment>
  );
}