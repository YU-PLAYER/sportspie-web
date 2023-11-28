import { memo } from "react";
import styled from "styled-components";
import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

/*
[
  {
    "content": "string",
    "date": "2023-11-26",
    "time": {
      "hour": 0,
      "minute": 0,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "string",
    "type": "GAME_CONFIRMED"
  }
]
*/

const Notifications = [ // API 연습용 데이터
  {
    "content": "참여 신청하신 2023-11-30 17:00 팔공K스타디움 경기 하루 전입니다.",
    "date": "2023-11-29",
    "time": {
      "hour": 17,
      "minute": 0,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "팔공K스타디움",
    "type": "DATE_IMMINENT"
  },
  {
    "content": "참여 신청하신 2023-11-30 17:00 팔공K스타디움 경기가 확정되었습니다.",
    "date": "2023-11-27",
    "time": {
      "hour": 19,
      "minute": 30,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "팔공K스타디움",
    "type": "GAME_CONFIRMED"
  },
  {
    "content": "2023-11-25 17:00 첼시풋살 경기에 대한 비방 및 욕설 신고가 접수되었습니다.",
    "date": "2023-11-25",
    "time": {
      "hour": 17,
      "minute": 1,
      "second": 0,
      "nano": 0
    },
    "stadiumName": "첼시풋살",
    "type": "REPORTED"
  }
]


function Notification({ notification }) {
  switch (notification.type) {
    case 'GAME_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
    case 'RESULTS_CONFIRMED':
      return (
        <div>
          {
            <Alert severity="success" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
    case 'DATE_IMMINENT':
      return (
        <div>
          {
            <Alert severity="info" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
    case 'REPORTED':
      return (
        <div>
          {
            <Alert severity="warning" onClose={() => { }}>
              <AlertTitle>{notification.date}</AlertTitle>
              {notification.content}
            </Alert>
          }
        </div>
      )
  }
}


const Item = ({ number }) => {
  //number 날짜에 해당 사용자의 알람 목록을 수신
  //해당 날짜에 해당 사용자의 알람이 없다면, return null
  //해당 날짜에 해당 사용자의 알람이 있다면, 해당 값을 반환
  const test = number.substring(4, 5);
  console.log(test[0]);
  if (test % 2 == 0) return null;
  else {
    return (
      <ItemWrap>
        <div className="ItemWrap">
          <div className="ItemWrap-Top ">{number}</div>
          <div className="ItemWrap-Body">
            <Stack sx={{ width: '100%' }} spacing={2}>
              {Notifications.map(notification => <Notification notification={notification} />)}
            </Stack>
          </div>
        </div>
      </ItemWrap>
    );
  }
};


const ItemWrap = styled.div`
  .ItemWrap {
    width: 350px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    margin: 1rem;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    border-radius: 6px;
  }

  .ItemWrap-Top {
    display: flex;
    width: 350px;
    height: 100px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    background-color: #ffffff;
    color: #566270;
    font-size: 2.00rem;
    justify-content: center;
    text-align: center;
    align-items: center;
  }

  .ItemWrap-Body {
    height: auto;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 10px;
  }

  .ItemWrap-Body-Title {
    width: 300px;
    height: auto;
    margin: 16px;
    border-radius: 4px;
    background-color: #e2e5e7;
  }
`;


export default memo(Item);