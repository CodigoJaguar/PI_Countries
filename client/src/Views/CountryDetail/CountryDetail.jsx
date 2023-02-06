import { useEffect , useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { NavBar } from '../../components/NavBar/NavBar'
import style from './CountryDetail.module.css'
import axios from 'axios'



const Detail = (props) => {
	 
  
const [country, setCountry] = useState({});
const {id} = useParams(); 
const [State , setState] = useState(false)


useEffect(() => {
    fetch(`http://localhost:3001/countries/${id}`)
       .then((response) => response.json())
       .then((char) => {
          if (char.Nombre) {
             setCountry(char);
          } else {
             window.alert('No hay países con ese ID');
          }
       })
       .catch((err) => {
          window.alert('No hay países con ese ID');
       });
    //return setCountry({});
 }, [id,State]);


 const deleteHandler = (e)=>{
   e.preventDefault();

   axios.delete('http://localhost:3001/activities', {data:country} )   //  Observe the data keyword this time. Very important
   .then(function (response) {
     
     window.alert('Activity deleted, back to home to refresh ');
   })
   .catch(function (error) {
     console.log(error.message);
   });

   setState(!State)


 }



 
	 return (
      <>
      <NavBar/>
      <div>
         <div className={style.card}>
            <img src={country?.ImagenDeLaBandera} className={style.img} alt={`${country.Nombre} flag`} />
               <div className={style.container}>
                  <h2>{country?.Nombre}</h2>
                  <p>Continent: {country?.Continente}</p>
                  <p>Subregin: {country?.Subregion}</p>
                  <p>Capital: {country?.Capital}</p>
                  <p>Area: {country?.Area} km2</p>
                  <p>Population: {country?.Poblacion} km2</p>
               </div>
               
         </div>
      <h2 id='Activities'>Activities</h2>

            <div className={style.activitiesCointainer}>
               {
                  country.Activities && country.Activities.length === 0 ?  
                  <p>There is no activities for this country YET, if you want you could add one  
                  <Link to="/activities">
                  <span>HERE</span>
                  </Link>
                  </p>
                  : country.Activities && country.Activities?.map(activity=>
                     <div key={activity.ID} className={style.activitiesBox}>
                        <p>Activity: {activity.Nombre}</p>
                        <p>Level: {activity.Dificultad}</p>
                        <p>Duration: {activity.Duracion}</p>
                        <p>Season: {activity.Temporada}</p>
                        <button onClick={deleteHandler} value={id}>Delete</button>
                     </div>
                  )    
               }
         </div>

     </div>
    </>
  )
}




export default Detail






 //---------------------------
 
