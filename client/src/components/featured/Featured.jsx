import React, { useEffect, useState } from 'react';
import './Featured.scss';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import axios from "axios"; 

const Featured = () => {
  const [content,setContent] = useState({});
  useEffect(()=>{
    const getRandomContent = async ()=>{
      try{
         const res = await axios.get('http://localhost:8800/movies/random', {
          headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjZlOWVmNjBhN2NhYTA5Y2IzYTNiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjczMTgwNywiZXhwIjoxNzI3MTYzODA3fQ.l8VAOoctWN5iHa18Cs6HoOU5VuRlbFxl6lB9TOEPxH0"
          },
      });
         setContent(res.data);
      }
      catch(err){
         console.log(err);
      }
    }
    getRandomContent();
  },[])
  return (
    <div className='featured'>
      <img src={content.img} alt="" />
      <div className="info">
        <h1>{content.imgTitle}</h1>
        <span>{content.desc}</span>
        <div className="buttons">
        <button className="play">
          <PlayCircleIcon/>
          <span>Play</span>
        </button>
        <button className="more">
          <InfoOutlinedIcon/>
          <span>Info</span>
        </button>
      </div>
      </div>
    </div>
  )
}

export default Featured