import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItemContent from '@mui/joy/ListItemContent';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Notice() {
    return (
        <div style={{ width: '100%', height: '100vh' }}>
            <Box>
                <Box sx={{ height: '20px' }} />

                <Box sx={{ height: '20px' }} />
                <Container maxWidth="sm">
                    공 지 사 항
                    <Box sx={{ height: '20px' }} />
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 13 }}>서비스 의견 개선 수렴 및 변경사항 공지</Typography>
                            <ListItemContent>
                                <Typography level="body-sm" sx={{ fontSize: 12 }}>
                                    11-14일 18:00
                                </Typography>
                            </ListItemContent>
                        </AccordionSummary>
                        <AccordionDetails>
                            유저 여러분들께서 주신 서비스 의견 개선 관련 의견들을 다수 접수하여 조치하였습니다.
                            앞으로도 좋은 서비스를 운영할 수 있도록 노력하겠습니다.
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 13 }}>시스템 정기정검 안내 (11.03 00:00 ~ 02:00)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                11.03일 00:00 ~ 02:00에 서버 정기 점검으로 인한 시스템 중단이 있을 예정입니다.
                                참고하시어 이용 시 불편함이 없으시길 바랍니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 13 }}>경기장 제휴 문의 관련 안내</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                경기장 제휴 문의 : 010-xxxx-xxxx
                                해당 번호로 연락주시면 상담 가능합니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 13 }}>서비스 사칭 및 보이스피싱 사례 안내</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                최근 해당 상호를 이용하여 유사 서비스를 운영하는 사례가 늘고 있습니다.
                                또한 웹 도메인을 유사하게 만든 보이스피싱 사이트 또한 주의해 주시기 바랍니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 12 }}>시스템 UI 개편 관련 업데이트 사항 안내 (10.27)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                               10.27일부로 유저 인터페이스가 개편되었습니다.
                               Sporitfy와 함께 더욱 즐거운 서비스를 경험하세요.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 12 }}>시스템 기능 개편 관련 업데이트 사항 안내 (10.26)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                10. 26일부로 경기 매칭 기능이 추가되었습니다.
                                많은 이용과 관심 부탁드립니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 12 }}>개인정보처리방침 개정 내용 사전 안내 (10.25 ~)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                개인정보방침 개정으로 인하여 기존에 저장되어 있던 
                                사용자가 1년 이상 접속하지 않을 시 휴먼 계정으로 전환될 예정입니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 13 }}>신고글 접수 처리 현황</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                10.01 ~ 10.10
                                욕설 및 비방 신고(7건)
                                경기 미참여(3건)
                                기타(1건)
                                신고글 접수되어 처리 완료되었습니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 10 }}>시스템 기능 개편 관련 점검사항 안내 (10.20 00:00 ~ 02:00)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                시스템 기능 오류로 인하여 점검이 있을 예정입니다.
                                이용 간 확인하시어 불편 없으시길 바랍니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography sx={{ fontSize: 10 }}>시스템 UI 개편 관련 점검사항 안내 (10.19 02:00 ~ 04:00)</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                시스템 UI가 개편될 예정입니다.
                                서비스 이용 간 참고 바랍니다.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Box sx={{ height: '20px' }} />
                    <Stack spacing={5} sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Pagination count={2} size='small' />
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