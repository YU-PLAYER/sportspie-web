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
    switch(notification.type){
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
            break;
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
            break;
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
            break;
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
            break;
    }

}

export default function DescriptionAlerts() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {Notifications.map(notification => <Notification notification={notification} />)}
        </Stack>
    );
}