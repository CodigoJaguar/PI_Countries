import { Link } from 'react-router-dom';
import style from './Country.module.css';

// a los archivos Css se les quita ; despues de llaves {}
 function Country(props) {
   
    const {Nome, Bandiera, ID, Continente } = props

    return (
       <div className={style.Div1}>
         <Link to={`/countries/${ID}`}>
              <img src={Bandiera} height='100px' width='161.8px'  alt="" />
              <h2 className={style.h2style}>{Nome}</h2>
         </Link>
         <h3 className={style.h3style}>- {Continente} -</h3>
         <h4>{ID}</h4>   
            
       </div>
    );
 }
 
 
 export default Country;



//  <h1>{Nome}</h1>
//  <h3>{Continente}</h3>
//  <h3>{ID}</h3>                      <Link to={`/countries/${ID}`}>