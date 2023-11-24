import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function Notice() {

    const [loading, setLoading] = useState(true);
    const [noticeAPI, setNoticeAPI] = useState([]);

    useEffect(() => {
        fetch(`http://110.165.17.35:8080/Notice`)
        .then((response) => response.json())
        .then((json) => {
            setNoticeAPI(json);
            setLoading(false);
        });
    }, []);

    function Notice({ notice }) {
        return (
            <div>
                <Accordion id={notice.id}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography sx={{ fontSize: 10 }}>{notice.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {notice.content}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        )
    }

    const Notices = [
        {
            "id": 11,
            "createdAt": "2023-10-01T00:00:00",
            "updatedAt": "2023-10-02T00:00:00",
            "title": "서비스 의견 개선 수렴 및 변경사항 공지",
            "content": "유저 여러분들께서 주신 서비스 의견 개선 관련 의견들을 다수 접수하여 조치하였습니다. 앞으로도 좋은 서비스를 운영할 수 있도록 노력하겠습니다."
        },
        {
            "id": 12,
            "createdAt": "2023-10-02T00:00:00",
            "updatedAt": "2023-10-03T00:00:00",
            "title": "시스템 정기정검 안내 (11.03 00:00 ~ 02:00)",
            "content": "11.03일 00:00 ~ 02:00에 서버 정기 점검으로 인한 시스템 중단이 있을 예정입니다. 참고하시어 이용 시 불편함이 없으시길 바랍니다."
        },
        {
            "id": 13,
            "createdAt": "2023-10-03T00:00:00",
            "updatedAt": "2023-10-04T00:00:00",
            "title": "경기장 제휴 문의 관련 안내",
            "content": "경기장 제휴 문의 : 010-xxxx-xxxx 해당 번호로 연락주시면 상담 가능합니다.."
        },
        {
            "id": 14,
            "createdAt": "2023-10-05T00:00:00",
            "updatedAt": "2023-10-05T00:00:00",
            "title": "서비스 사칭 및 보이스피싱 사례 안내",
            "content": "최근 해당 상호를 이용하여 유사 서비스를 운영하는 사례가 늘고 있습니다. 또한 웹 도메인을 유사하게 만든 보이스피싱 사이트 또한 주의해 주시기 바랍니다."
        },
        {
            "id": 15,
            "createdAt": "2023-10-06T00:00:00",
            "updatedAt": "2023-10-06T00:00:00",
            "title": "시스템 UI 개편 관련 업데이트 사항 안내 (10.27)",
            "content": "10.27일부로 유저 인터페이스가 개편되었습니다. Sporitfy와 함께 더욱 즐거운 서비스를 경험하세요."
        },
        {
            "id": 16,
            "createdAt": "2023-10-06T00:00:00",
            "updatedAt": "2023-10-06T00:00:00",
            "title": "시스템 기능 개편 관련 업데이트 사항 안내 (10.26)",
            "content": "10. 26일부로 경기 매칭 기능이 추가되었습니다. 많은 이용과 관심 부탁드립니다."
        },
        {
            "id": 17,
            "createdAt": "2023-10-01T00:00:00",
            "updatedAt": "2023-10-01T00:00:00",
            "title": "개인정보처리방침 개정 내용 사전 안내 (10.25 ~)",
            "content": "개인정보방침 개정으로 인하여 기존에 저장되어 있던  사용자가 1년 이상 접속하지 않을 시 휴먼 계정으로 전환될 예정입니다."
        },
        {
            "id": 18,
            "createdAt": "2023-11-01T00:00:00",
            "updatedAt": "2023-11-01T00:00:00",
            "title": "신고글 접수 처리 현황",
            "content": "10.01 ~ 10.10 욕설 및 비방 신고(7건), 경기 미참여(3건), 기타(1건) 신고글 접수되어 처리 완료되었습니다."
        },
        {
            "id": 19,
            "createdAt": "2023-09-30T00:00:00",
            "updatedAt": "2023-09-30T00:00:00",
            "title": "시스템 기능 개편 관련 점검사항 안내 (10.20 00:00 ~ 02:00)",
            "content": "시스템 기능 오류로 인하여 점검이 있을 예정입니다. 이용 간 확인하시어 불편 없으시길 바랍니다."
        },
        {
            "id": 20,
            "createdAt": "2023-10-30T00:00:00",
            "updatedAt": "2023-10-30T00:00:00",
            "title": "시스템 UI 개편 관련 점검사항 안내 (10.19 02:00 ~ 04:00)",
            "content": "시스템 UI가 개편될 예정입니다. 서비스 이용 간 참고 바랍니다."
        }

    ];

    const [page, setPage] = useState(1);

    const handleChange = (e, p) => {
        console.log(e, p);
        setPage(p);
    }


    return (

        <div style={{ width: '100%', height: '100vh' }}>
            <Box>
                <Box sx={{ height: '20px' }} />

                <Box sx={{ height: '20px' }} />
                <Container maxWidth="sm">
                    <Box sx={{textAlign : 'center'}}>공 지 사 항</Box>
                    <Box sx={{ height: '20px' }} />

                    <div>
                        {page == 1 ? Notices.map(notice => (<Notice notice={notice} />)) 
                        : 
                        noticeAPI.map((noticeAPI) => (
                            <Notice notice={noticeAPI}/>
                        ))}
                    </div>

                    <Box sx={{ height: '20px' }} />
                    <Stack spacing={5} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Pagination count={2} onChange={handleChange} size='small' />
                    </Stack>
                    <Box sx={{ height: '20px' }} />
                </Container>

                <Box sx={{ height: '20px' }} />

                <Container sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                </Container>
            </Box>
        </div>
    );
}