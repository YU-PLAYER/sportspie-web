import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import MatchListBox from './MatchListBox';

function MatchList_All(){
  const [all, setAll]=useState([{}]);
  useEffect(()=>{
    const userid = JSON.parse(localStorage.getItem('access_token'));
    axios.get('http://110.165.17.35:8080/api/user/me',
      { headers: { Authorization: `Bearer ${userid}`}, },)
      .then((response)=>{
        console.log(response.data["id"]);
          axios.get(`http://110.165.17.35:8080/api/gameUser/list?userId=${response.data["id"]}`,
          { headers: { Authorization: `Bearer ${userid}`}, },)
          .then((result)=>{
              console.log('요청 성공');
              console.log(result);
              setAll(result.data);
          })
          .catch((error)=>{console.log('요청 실패');
          console.log(error);})
        })
        .catch((error)=>{
            console.log(error);
        })
  }, []);
 return(
    <div>
      {all.map((item, index)=><MatchListBox item={item} key={index}/>)}
          </div>
 );

}
export default MatchList_All;