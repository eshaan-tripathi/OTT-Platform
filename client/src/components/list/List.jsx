// List.jsx
import React from "react";
import Slider from "react-slick";
import ListItem from "../listItem/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./list.scss";

export default function List({list}) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true, 
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2.7,
        },
      },
      {
        breakpoint: 655,
        settings: {
          slidesToShow: 2.1,
        },
      },
      {
        breakpoint: 490,
        settings: {
          slidesToShow: 1.7,
        },
      },
      {
        breakpoint: 395,
        settings: {
          slidesToShow: 0.89,
        },
      },
      
    ],
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <Slider {...settings}>
        {list.content.map((item,i)=>{
          <ListItem index = {i} item = {item}/>
        })}
      </Slider>
    </div>
  );
}
