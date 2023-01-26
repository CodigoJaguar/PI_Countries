import { Link } from "react-router-dom";


function Start() {

    return (
      <div className="Very begining">
        <h1>Henry Countries</h1>
        <h2>/learn react/</h2>
        <Link to={'/home'} > <button>INICIO</button> </Link> 
      </div>
    );
  }
  
  export default Start;
  