import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/joy/Stack';

export default function SelectOtherProps() {

/*   const [stadium,setStadium] = useState([
    '23-11-01 19:00 영남대학교 축구장',
    '23-11-02 18:00 두류 풋살장',
    '23-11-03 19:00 강변축구장',
    '23-11-04 15:00 수성구민운동장',
    '23-11-05 15:00 월배축구장',
    '23-11-06 21:00 성서이곡운동장 축구장',
    '23-11-07 18:00 다사축구장',
    '23-11-07 20:00 시민운동장 다목적 유소년 축구장',
    '23-11-07 22:00 성남종합운동장 보조경기장 인조잔디구장'
  ]); */

  function repeatStadium(stadium){
    let arr=[];
    for(let i=0; i< stadium.length; i++){
      arr.push(
        <MenuItem value={i}>{stadium[i]}</MenuItem>
      )
    }
    return arr;
  }

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <Stack spacing={2}>
        <d1>
          <FormControl required sx={{ m: 1, minWidth: 120, bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-required-label">광역시</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={age}
              label="Age *"
              onChange={handleChange}
            >
              <MenuItem value={10}>서울특별시</MenuItem>
              <MenuItem value={20}>대구광역시</MenuItem>
              <MenuItem value={30}>경산시 </MenuItem>
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 120, bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-required-label">구·군</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={age}
              label="Age *"
              onChange={handleChange}
            >
              <MenuItem value={10}>북구</MenuItem>
              <MenuItem value={20}>중구</MenuItem>
              <MenuItem value={30}>동구</MenuItem>
              <MenuItem value={40}>서구</MenuItem>
              <MenuItem value={50}>수성구</MenuItem>
              <MenuItem value={60}>남구</MenuItem>
              <MenuItem value={60}>달성군</MenuItem>

            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </d1>
        <d2>
          <FormControl required sx={{ m: 1, minWidth: 255, bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-required-label">경기장</InputLabel>
            <Select
              labelId="demo-simple-select-required-label"
              id="demo-simple-select-required"
              value={age}
              label="Age *"
              onChange={handleChange}
            >
              <MenuItem value={10}>경기장1</MenuItem>
              <MenuItem value={20}>경기장2</MenuItem>
              <MenuItem value={30}>경기장3fasdfasdfasdfasdfasdfd</MenuItem>
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </d2>
      </Stack>
    </div>
  );
}