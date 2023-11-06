import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function IconLabelButtons() {
  return (
    <Stack direction="row" spacing={2}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'right',
  }}>
      <Button variant="contained" endIcon={<SendIcon />}>
        작성하기
      </Button>
      <Button variant="outlined" startIcon={<DeleteIcon />}>
        취소하기
      </Button>
    </Stack>
  );
}
