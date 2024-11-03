import "./productList.css";
import { useContext } from "react";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MovieContext } from "../../context/movieContext/movieContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { DataGrid } from '@mui/x-data-grid';


export default function ProductList() {
  const [movies,dispatch] = useContext(MovieContext);
 
  useEffect(()=>{
    getMovies(dispatch);
  },[dispatch]);

  const handleDelete = (id) => {
   // setData(data.filter((item)=>item.id !== id));
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
      rows={movies}
      disableSelectionOnClick
      columns = {columns}
      pageSize = {8}
      checkboxSelection
      getRowId={r=>r._id}
      />
    </div>
  );
}
