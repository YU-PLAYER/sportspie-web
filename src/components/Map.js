import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useEffect } from "react";
var {kakao} = window;

function KakaoMap(){
    useEffect(()=>{
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
            level: 10 // 지도의 확대 레벨 
        }; 

        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {
            
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition, message);
                    
            });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
                
            displayMarker(locPosition, message);
            }

        // 지도에 마커와 인포윈도우를 표시하는 함수입니다
        function displayMarker(locPosition, message) {

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            
            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;

            // 인포윈도우를 생성합니다
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            
            // 인포윈도우를 마커위에 표시합니다 
            infowindow.open(map, marker);
            
            // 지도 중심좌표를 접속위치로 변경합니다
            map.setCenter(locPosition);      
        }
    },[])    
 return (
    <React.Fragment>
    <Container maxWidth="sm">   
    <Box sx={{ height: '20px' }} />
    <Box sx={{ height: '100vh'}}>
    <div 
    style={{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        width:"100%",
    }}>
        <h2 style={{
            fontSize:"20px",
            fontWeight:"bold",
            boxSizing:"border-box",
            margin:"0px 0  20px 12px",
            padding:"20px 0",
            width:"88%", 
            color:"#282828",}}>내 주변 경기장</h2>
        <div id="map" 
            style={{
            borderRadius:"3%",
            width:"88%", height:"320px",
        }}>
        </div>
        <div style={{borderRadius: 10, boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.3)", width:"90%", height:"70px", boxSizing:"border-box",
            margin:"20px 0",  padding:"10px 40px", fontSize:"12px",
            display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <p style={{fontSize:"15px", marginRight:"14px", color:"rgba(0,0,0,0.8)", fontWeight:"bold"}}>수성구민운동장</p>
                <p style={{color:"rgba(0,0,0,0.6)"}}> 공설, 시민운동장</p>
            </div>
            <div style={{color:"rgba(0,0,0,0.8)"}}>대구 수성구 범어동</div>
        </div>
        <div style={{borderRadius: 10, boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.3)", width:"90%", height:"70px", boxSizing:"border-box",
            margin:"-5px 0",  padding:"10px 40px", fontSize:"12px",
            display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <p style={{fontSize:"15px", marginRight:"14px", color:"rgba(0,0,0,0.8)", fontWeight:"bold"}}>S 축구클럽</p>
                <p style={{color:"rgba(0,0,0,0.6)"}}>스포츠 시설</p>
            </div>
            <div style={{color:"rgba(0,0,0,0.8)"}}>대구 수성구 지산동</div>
        </div>
    </div>
    </Box>

    <Box sx={{ height: '20px' }} />
    </Container>
  </React.Fragment>
 );
}

export default KakaoMap;     