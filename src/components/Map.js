import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { useState, useEffect } from "react";
import soccerBlue from '../images/markerBlue.png';
import soccerRed from '../images/markerRed.png'
import axios from 'axios';
import { CollectionsBookmarkOutlined } from '@mui/icons-material';
var {kakao} = window;

function KakaoMap(){
    //const marksArray = [];
    //const [localStorageValues, setLocalStorageValues] = useState([]);
    var num = 0;
    const [localStorageValues, setLocalStorageValues] = useState(
        [{name:"축구장", distance:1.3325, latitude:2.344, longitude:5.234}, 
        {name:"풋살", distance:4.3325, latitude:3.344, longitude:3.5211}]);
    useEffect(()=>{
        window.kakao.maps.load(()=>{
        var mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = { 
                center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                level: 7 // 지도의 확대 레벨 
            };
        var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
              
        // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
        if (navigator.geolocation) {
            
            // GeoLocation을 이용해서 접속 위치를 얻어옵니다
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                console.log(position);
                console.log("현재 위치는 : "+lat+", "+lon);
                var locPosition = new kakao.maps.LatLng(lat, lon); // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다

                // 마커를 표시합니다
                displayMarker(locPosition);
            });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
                
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
                url:'http://115.85.182.229:8080/api/stadium/nearby',
                data:{
                    latitude: locPosition.y,
                    longitude: locPosition.x,
                },
            })
            .then((result)=>{
                console.log('요청 성공')
                var center = map.getCenter();
                var bounds = new kakao.maps.LatLngBounds();
                bounds.extend(new kakao.maps.LatLng(center.getLat(), center.getLng()));
                for(let i=0;i<result.data.length;i++){
                    localStorage.setItem(i,JSON.stringify(result.data[i]));
                    displaySoccerMarker(result.data[i]); 
                    bounds.extend(new kakao.maps.LatLng(result.data[i].latitude, result.data[i].longitude));
                    console.log(result.data[i]);
                }
                console.log(localStorage.length);
                map.setBounds(bounds); 
            })
            .catch((error)=>{console.log('요청 실패')
            console.log(error)
            })
        }

        var soccerImageSize = new kakao.maps.Size(30, 45),
            soccerImageOption = {offset: new kakao.maps.Point(27, 69)};
        var soccermarkerImage = new kakao.maps.MarkerImage(soccerBlue, soccerImageSize, soccerImageOption);

        function displaySoccerMarker(place) {
            // 마커를 생성하고 지도에 표시합니다
            var soccermarker = new kakao.maps.Marker({
                position: new kakao.maps.LatLng(place.latitude, place.longitude) ,
                image: soccermarkerImage
            });
            soccermarker.setMap(map);
        } 

    })
    },[]) 

    {/*useEffect(() => {
        // localStorage에서 값을 불러오는 함수
        const getLocalStorageValues = () => {
          const storedValues = JSON.parse(localStorage.getItem({num})) || [];
          setLocalStorageValues(storedValues);
          num++;
        };
    
        // 컴포넌트가 마운트될 때와 localStorage에 변화가 있을 때마다 실행
        getLocalStorageValues();
    
        // localStorage 변화 감지를 위한 이벤트 리스너 등록
        window.addEventListener('storage', getLocalStorageValues);
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
          window.removeEventListener('storage', getLocalStorageValues);
        };
      }, []);*/}

    {/*function setList(){
        for(var i = 0; i<localStorage.length; i++){
            var storedvalue = localStorage.getItem(i);
            var storedObject = JSON.parse(storedvalue);
            console.log(storedObject);
            marksArray.push(storedObject);
        }  
        console.log(marksArray);
        return marksArray.map((item)=>(
            <MapList item={item} />
        ));
    }*/}

    function MapList({item}){
        return(
            <div style={{borderRadius: 10, boxShadow: "0px 0px 2px 0px rgba(0, 0, 0, 0.3)", width:"100%", height:"70px", boxSizing:"border-box",
            margin:"10px 0",  padding:"10px 40px", fontSize:"12px",
            display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <p style={{fontSize:"15px", marginRight:"14px", color:"rgba(0,0,0,0.8)", fontWeight:"bold"}}>{item.name}</p>
                <p style={{color:"rgba(0,0,0,0.6)"}}>{item.distance.toFixed(1)}km</p>
            </div>
            <div style={{color:"rgba(0,0,0,0.8)"}}>({item.latitude}, {item.longitude})</div>
            </div>
        );
    }

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
            padding:"10px 0",
            width:"88%", 
            color:"#282828",}}>내 주변 경기장</h2>
        <div id="map" 
            style={{
            borderRadius:"3%",
            width:"88%", height:"320px", marginBottom:"15px"
        }}>
        </div>
        <section id="maplist" style={{width:"90%", display:"flex", flexDirection:"column"}}>
        {localStorageValues.map((item) =>
          <MapList item={item} />)}
        </section>
    </div>
    </Box>
    <Box sx={{ height: '20px' }} />
    </Container>
  </React.Fragment>
 );
}

export default KakaoMap;     