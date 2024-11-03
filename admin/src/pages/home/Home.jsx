import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

export default function Home() {
  const Months = useMemo(()=>
    [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],[]);

  const [userStats,setuserStats] = useState([]);
  
  useEffect(()=>{
    const getStats = async()=>{ 
    try{
        const res = await axios.get("http://localhost:8800/api/users/stats",{headers:{token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjZlOWVmNjBhN2NhYTA5Y2IzYTNiNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNzk2OTgyMCwiZXhwIjoxNzI4NDAxODIwfQ.8o3-8GaDu2JgcVAmeNMOFrFrrvVFi7XNaSey3YA24wY"}});
        const statList = res.data.sort((a,b)=>{
          return a._id - b._id;
        });
        statList.map((item)=> 
          setuserStats((prev) => [
        ...prev,
        {name : Months[item._id-1], "New User": item.total},
          ])
        );
      }
  
    catch(err){
      console.log(err);
    }
  }
    getStats();
  },[Months])

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
