import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function DescriptionAlerts() {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {/* <Alert severity="success" onClose={() => {}}>
                <AlertTitle>인원 모집 완료(방장)</AlertTitle>
                개설하신 <strong>2023-11-01 19:00 영남대학교 축구장</strong>의 인원이 모두 모집되었습니다.
            </Alert> */}
            <Alert severity="success" onClose={() => {}}>
                <AlertTitle>경기 확정 (참가자 전원)</AlertTitle>
                참여 신청하신 <strong>2023-11-01 19:00 영남대학교 축구장</strong>의 경기가 확정되었습니다.
            </Alert>
            <Alert severity="info" onClose={() => {}}>
                <AlertTitle>경기 하루 전 알림</AlertTitle>
                참여 신청하신 <strong>2023-11-01 19:00 영남대학교 축구장</strong> 경기 하루 전입니다.
            </Alert>
            <Alert severity="warning" onClose={() => {}}>
                <AlertTitle>신고 접수 완료</AlertTitle>
                <strong>2023-11-01 19:00 영남대학교 축구장</strong> 경기에 대한 <u>비방 및 욕설 신고</u>가 접수되었습니다.
            </Alert>
            {/* <Alert severity="error" onClose={() => {}}>
                <AlertTitle>경기 취소 알림</AlertTitle>
                참여 신청하신 <strong>2023-11-01 19:00 영남대학교 축구장</strong>의 경기가 취소되었습니다.
            </Alert> */}
        </Stack>
    );
}