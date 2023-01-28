import React from 'react'
import { Link , useLocation} from 'react-router-dom'
import style from '../NavBar/NavBar.css'


export const NavBar = (props) => {
  const location = useLocation();

  return (
    <div className='container'>
      <Link to="/">
        <button>Landing</button>
      </Link>
      
      {location.pathname === '/activities' ? 
       null
      : 
      <Link to="/activities">
        <button>Create Activity</button>
      </Link> }
  
      {location.pathname === '/home' ? 
       null
      : 
      <Link to="/home">
        <button>Home</button>
      </Link> }

    
      
    </div>
  )
}


// var(--green) bg color   {location.pathname === '/activities' ? 
    //   <Link to="/home">
    //   <button>Home</button>
    // </Link> 
    // :  null }