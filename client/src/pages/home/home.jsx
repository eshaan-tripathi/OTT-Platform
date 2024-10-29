import Navbar from "../../components/navbar/navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [lists,setLists] = useState([]);
  const [genre,setGenre] = useState(null);
  useEffect(()=>{
    const getRandomLists = async()=>{
      try{
        const res = await axios.get(`http://localhost:8800/api/lists${genre ? `?genre=${genre}` : ""}`, {
          headers: {
              token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjZlOWVmNjBhN2NhYTA5Y2IzYTNiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNjcyNDc2NCwiZXhwIjoxNzI3MTU2NzY0fQ.Z2-6CXzEDMsXz15c-BTt0C50WN5EP6MAgyRivqxpx1E"
          },
      });
        setLists(res.data);
      }catch(err){
        console.log(err);
      }
    };
    getRandomLists();
  },[genre])
  return (
    <div className="home">
      <Navbar/>
      <Featured/>
      {lists.map((list)=>{
         return <List list={list}/>
      })}
      
    </div>
  );
};

export default Home;