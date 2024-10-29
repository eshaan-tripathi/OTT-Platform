import './navbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import '../images/user.png';
import { useState } from 'react';
const Navbar = () => {
  const [isScrolled,setisScrolled] = useState(false);
  window.onscroll = ()=>{
    setisScrolled(window.pageYOffset===0?false:true);
    return ()=> window.onscroll==null;
  }
  return (
    <div className={isScrolled ? 'navbar scrolled' : 'navbar'}>
        <div className="container">
            <div className="left">
                <img src='https://th.bing.com/th/id/OIP.hzhpVmSyk5bvPi9xtDlzZgAAAA?w=217&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7' alt="Can't load" />
                <span>Homepage</span>
                <span>Popular</span>
                <span>Category</span>
                <span>My List</span>
            </div>
            <div className="right">
            <SearchIcon className ='icon'/>
            <span>kid</span>

            <NotificationsIcon className='icon'/>
            <img src="https://th.bing.com/th/id/OIP.hzhpVmSyk5bvPi9xtDlzZgAAAA?w=217&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7" alt="../images/user.png" />
            <div className='profile'>
            <ArrowDropDownIcon className='icon'/>
            <div className="options">
              <span>Settings</span>
              <span>Logout</span>
            </div>
            </div>




            </div>
        </div>
    </div>
  )
}

export default Navbar;