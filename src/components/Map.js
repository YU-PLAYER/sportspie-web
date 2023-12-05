import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState, useEffect } from "react";
import soccerBlue from '../images/markerBlue.png';
import soccerRed from '../images/markerRed.png'
import axios from 'axios';
var { kakao } = window;

function KakaoMap() {
    const [searchValues, setsearchValues] = useState([]);
    const [searchLength, setsearchLength] = useState(0);
    useEffect(() => {
        window.kakao.maps.load(() => {
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                mapOption = {
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 7 // 지도의 확대 레벨 
                };
            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
            if (navigator.geolocation) {

                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function (position) {

                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
                    console.log(position);
                    console.log("현재 위치는 : " + lat + ", " + lon);
                    var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

                    // 마커를 표시합니다
                    displayMarker(locPosition);
                });

            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                var lat = 35.83192037867368, // 위도
                    lon = 128.7585384530709; // 경도
                console.log("현재 위치는 : " + lat + ", " + lon);
                var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                displayMarker(locPosition);
            }
            
            
            // 지도에 마커를 표시하는 함수입니다
            function displayMarker(locPosition) {
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: locPosition
                });
                marker.setMap(map);

                map.setCenter(locPosition);  // 지도 중심좌표를 접속위치로 변경합니다
               
                axios({
                    method: 'get',
                    url: `http://110.165.17.35:8080/api/stadium/nearby?latitude=${locPosition.Ma}&longitude=${locPosition.La}`,
                })
                    .then((result) => {
                        console.log('요청 성공')
                        var center = map.getCenter();
                        var bounds = new kakao.maps.LatLngBounds();
                        bounds.extend(new kakao.maps.LatLng(center.getLat(), center.getLng()));
                        for (let i = 0; i < result.data.length; i++) {
                            setsearchValues((now)=>[...now, result.data[i]]);
                            displaySoccerMarker(result.data[i]);
                            bounds.extend(new kakao.maps.LatLng(result.data[i].latitude, result.data[i].longitude));
                            console.log(result.data[i]);
                        }
                        map.setBounds(bounds);
                        setsearchLength(result.data.length);
                    })
                    .catch((error) => {
                        console.log('요청 실패')
                        console.log(error)
                    })
            }

            var soccerImageSize = new kakao.maps.Size(30, 45),
                soccerImageOption = { offset: new kakao.maps.Point(27, 69) };
            var soccermarkerImage = new kakao.maps.MarkerImage(soccerBlue, soccerImageSize, soccerImageOption);

            function displaySoccerMarker(place) {
                // 마커를 생성하고 지도에 표시합니다
                var soccermarker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(place.latitude, place.longitude),
                    image: soccermarkerImage
                });
                soccermarker.setMap(map);
            }
        })
    }, [])

    function MapList({ item }) {
        return (
            <div style={{
                borderRadius: 10, boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.3)", width: "100%", height: "70px", boxSizing: "border-box",
                margin: "10px 0", padding: "10px 28px", fontSize: "12px",
                display: "flex", flexDirection: "column", justifyContent: "space-around"
            }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p style={{ fontSize: "15px", marginRight: "12px", color: "rgba(0,0,0,0.8)", fontWeight: "bold" }}>{item.name}</p>
                    <p style={{ color: "rgba(0,0,0,0.6)" }}>{item.distance.toFixed(2)}km</p>
                </div>
                <div style={{ color: "rgba(0,0,0,0.8)", fontSize:"11px"}}>{item.city} {item.district} {item.village}</div>
            </div>
        );
    }

    return (
        <React.Fragment>
            <Container maxWidth="sm">
                <Box sx={{ height: '20px' }} />
                <Box sx={{ height: '100vh' }}>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                        }}>
                        <h2 style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            boxSizing: "border-box",
                            margin: "0px 0  20px 12px",
                            padding: "10px 0",
                            width: "88%",
                            color: "#282828",
                        }}>내 주변 경기장</h2>
                        <div id="map"
                            style={{
                                borderRadius: "3%",
                                width: "88%", height: "320px", marginBottom: "15px"
                            }}>
                        </div>
                        <div style={{width:"90%", display:"flex", justifyContent:"space-between", borderBottom:"0.5px", borderStyle:'solid', borderColor:'rgba(0,0,0,0.1)',
                        boxSizing:"border-box", margin:"10px 0", padding:"5px 10px 10px 10px", fontSize:"12px", color:'rgba(0,0,0,0.5)', fontWeight:"bold"}}>
                            <span>10km 내</span>
                            <span>{searchLength}개의 검색 결과</span>
                        </div>
                        <section id="maplist" style={{ width: "90%", display: "flex", flexDirection: "column" }}>
                        {searchValues.map((item, index) =><MapList item={item} key={index}/>)}
                        <div style={{height:"80px"}}></div>
                        </section>
                    </div>
                </Box>
                <Box sx={{ height: '20px' }} />
            </Container>
        </React.Fragment>
    );
}

export default KakaoMap;     