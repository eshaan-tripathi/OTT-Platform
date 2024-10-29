import "./listItem.scss";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";

export default function ListItem({item,index}) {
  const [movie,setMovie] = useState({});
  useEffect(()=>{
    const getMovie = async ()=>{
      try{
        const res = axios.get("/movies/find/"+item, {
          headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjZlOWVmNjBhN2NhYTA5Y2IzYTNiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjcyNDc2NCwiZXhwIjoxNzI3MTU2NzY0fQ.Z2-6CXzEDMsXz15c-BTt0C50WN5EP6MAgyRivqxpx1E"
          },
      });
      setMovie(res.data);
      console.log(res.data);
    }
      catch(err){
        console.log(err);
      }
    }
  },[])
  return (
    <Link to={{pathname:"/watch",movie:movie}}>
    <div className="listItem">
      <img
        src={movie.img}
        alt=""
      />
      
        
    </div>
    </Link>
  );
}