import * as React from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Textarea from '@mui/joy/Textarea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';

export default function Report() {

    const [stadium, setStadium] = useState([ // 예제로 임시로 넣었음. 실제 DB 데이터 x
        '23-11-01 19:00 영남대학교 축구장',
        '23-11-02 18:00 두류 풋살장',
        '23-11-03 19:00 강변축구장',
        '23-11-04 15:00 수성구민운동장',
        '23-11-05 15:00 월배축구장',
        '23-11-06 21:00 성서이곡운동장 축구장',
        '23-11-07 18:00 다사축구장',
        '23-11-07 20:00 시민운동장 다목적 유소년 축구장',
        '23-11-07 22:00 성남종합운동장 보조경기장 인조잔디구장'
    ]);

    function repeatStadium(stadium) {
        let arr = [];
        for (let i = 0; i < stadium.length; i++) {
            arr.push(
                <MenuItem value={i}>{stadium[i]}</MenuItem>
            )
        }
        return arr;
    }

    const [index, setIndex] = React.useState(0);

    const handleChange = (event) => {
        setIndex(event.target.value);
    };

    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Box
                sx={{
                    display: 'grid',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                }}
            >

                <Box sx={{ height: '20px' }} />
                <Box sx={{
                    height: '850px', borderRadius: 5, boxShadow: 3
                }}>
                    <Box sx={{ height: '20px' }} />
                    <Box sx={{textAlign : 'center'}}>신고하기</Box>
                    <Box sx={{ height: '20px' }} />
                    <Container maxWidth="la">
                        <FormControl>
                            <RadioGroup
                                row
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <FormControlLabel value="noshow" control={<Radio />} label="경기 미참여" />
                                <FormControlLabel value="badword" control={<Radio />} label="비방 및 욕설" />
                                <FormControlLabel value="extremePlay" control={<Radio />} label="과격한 플레이" />
                                <FormControlLabel value="abuse" control={<Radio />} label="승패 조작" />
                                <FormControlLabel value="others" control={<Radio />} label="기타" />
                            </RadioGroup>
                        </FormControl>
                    </Container>

                    <Box sx={{ height: '20px' }} />
                    <Box sx={{textAlign : 'center'}}>신고 경기 선택</Box>
                    <Box sx={{ height: '20px' }} />
                    <Container sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} >
                        <Box sx={{
                            minwidth: 30, maxWidth: 500, bgcolor: 'white'
                        }}>
                            <FormControl fullWidth>
                                <InputLabel>경기</InputLabel>
                                <Select
                                    value={index}
                                    label="StadiumNumber"
                                    onChange={handleChange}
                                    sx={
                                        (stadium[index].length) > 25 ? (stadium[index].length) > 30 ? (stadium[index].length) >= 35 ?
                                            { fontSize: 9 } : { fontSize: 10 } : { fontSize: 12 } : { fontSize: 15 }

                                    }
                                >
                                    {repeatStadium(stadium)}
                                </Select>
                            </FormControl>
                        </Box>
                    </Container>

                    <Box sx={{ height: '20px' }} />
                    <Box sx={{textAlign : 'center'}}>신고글 작성</Box>
                    <Box sx={{ height: '20px' }} />
                    <Container maxWidth="la">
                        <Textarea fullWidth label="fullWidth" id="fullWidth"
                            minRows={20} maxRows={20} placeholder="경기글 상세내역" />
                        <Box sx={{ height: '20px' }} />
                        <Stack direction="row" spacing={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'right',
                                alignItems: 'right',
                            }}>
                            <Button variant="contained" onClick={null} endIcon={<SendIcon />}>
                                작성하기
                            </Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />}>
                                취소하기
                            </Button>
                        </Stack>
                    </Container>
                </Box>
                <Box sx={{ height: '70px' }} />
            </Box>
        </div>
    );
}