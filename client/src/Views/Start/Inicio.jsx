import { Link } from "react-router-dom";
//import style from './Inicio.modules.css'
import './Inicio.modules.css'




function Start() {

    return (
      <div className="Very begining">
        <h1 id="Title_start">Henry Countries</h1>
        <hr />
        <Link to={'/home'} > <button id='Start'>Start</button> </Link> 
      </div>
    );
  }
  
  export default Start;
  