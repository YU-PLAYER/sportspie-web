import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
// import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/joy/Stack';
import { useState } from 'react';

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

  const cities = [
    {
      name: "대구광역시",
      villages: [
        {
          name: "수성구",
          stages: ["대구풋살"]
        },
        {
          name: "북구",
          stages: ["팔공K스타디움", "DS풋볼아카데미 실내풋살장"]
        },
        {
          name: "서구",
          stages: ["비산실내풋살파크"]
        },
        {
          name: "남구",
          stages: ["첼시풋살"]
        },
        {
          name: "달서구",
          stages: ["상인풋살장", "월배S풋살파크", "LFC 엘에프씨 풋살파크 두류점","라온풋살파크 월배점"]
        },
        {
          name: "달성군",
          stages: ["유천풋살"]
        }
      ]
    },
    {
      name: "경산시",
      villages: [
        {
          name: "대동",
          stages: ["영남대 1", "영남대 2", "영남대 3"]
        }
      ]
    }
  ]

  const [city, setCity] = useState("");
  const [village, setVillage] = useState("");
  const [villages, setVillages] = useState([]);
  const [stage, setStage] = useState("");
  const [stages, setStages] = useState([]);
  

  const handleCity = (event) => {
    setCity(event.target.value);
    setVillages(cities.find(ctr => ctr.name === event.target.value).villages);
    console.log(cities.find(ctr => ctr.name === event.target.value).villages);
  }

  const handleVillage = (event) => {
    setVillage(event.target.value);
    setStages(villages.find(village => village.name === event.target.value).stages);
    console.log(villages.find(village => village.name === event.target.value).stages);
  }

  const handleStage = (event) => {
    setStage(event.target.value);
  };

  return (
    <div>
      <Stack spacing={2}>
        <d1>
          <FormControl required sx={{ m: 1, minWidth: 120, bgcolor: 'white' }}>
            <InputLabel>광역시</InputLabel>
            <Select
              value={city}
              label="광역시 *"
              onChange={handleCity}
            >
              {cities.map(ctr => (
                <MenuItem value={ctr.name}>{ctr.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 120, bgcolor: 'white' }}>
            <InputLabel>구·군</InputLabel>
            <Select
              value={village}
              label="구·군 *"
            onChange={handleVillage}
            >
              {villages.map(village => (
                <MenuItem value={village.name}>{village.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </d1>
        <d2>
          <FormControl required sx={{ m: 1, minWidth: 255, bgcolor: 'white' }}>
            <InputLabel>경기장</InputLabel>
            <Select
              value={stage}
              label="경기장 *"
              onChange={handleStage}
            >
              {stages.map(stage => (
                <MenuItem value={stage}>{stage}</MenuItem>
              ))}
              {/* <MenuItem value={10}>경기장1</MenuItem>
              <MenuItem value={20}>경기장2</MenuItem>
              <MenuItem value={30}>경기장3fasdfasdfasdfasdfasdfd</MenuItem> */}
            </Select>
            {/* <FormHelperText>Required</FormHelperText> */}
          </FormControl>
        </d2>
      </Stack>
    </div>
  );
}