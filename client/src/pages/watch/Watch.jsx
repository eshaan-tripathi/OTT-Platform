
import { convertLength } from "@mui/material/styles/cssUtils";
import "./watch.scss";
import { useLocation } from "react-router-dom";
import { Link } from "@mui/material";

export default function Watch() {
  const location  = useLocation();
  const movie = location.movie;

  return (
    <div className="watch">
      <Link to='/'>
      <div className="back">
        
        Home
      </div>
      </Link>
      <video
        className="video"
        autoPlay
        progress
        controls
        src={movie.video}
      />

    </div>
  );
}