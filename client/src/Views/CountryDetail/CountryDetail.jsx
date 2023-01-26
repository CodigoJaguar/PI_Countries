import { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCountry } from '../../redux/actions'



 const Detail = (props) => {
	 
  
const [country, setCountry] = useState({});
const {id} = useParams(); 


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
    return setCountry({});
 }, [id]);

 
	 return (
		 <div>
  
      <h1>{country?.Nombre}</h1>
      <img src={country?.ImagenDeLaBandera} alt={`${country.Nombre} flag`} />
      <p>Continent: {country?.Continente}</p>
      <p>Subregin: {country?.Subregion}</p>
      <p>Capital: {country?.Capital}</p>
      <p>Area: {country?.Area} km2</p>
      <p>Population: {country?.Poblacion} km2</p>

      <h2>Activities</h2>
        {
          // Necesito entrar a las actividades bye
        }

      <Link to="/home">
        <button>Return to Home</button>
      </Link>
    </div>
  )
}




export default Detail






 //---------------------------
 
//  const dispatch = useDispatch();
//  const country = useSelector(state=>state.Detaglio)
//  let {id}= useParams()


  
//   useEffect(() => {
//     try {
//       dispatch(getCountry(id))   // Para este tipo de dispatch que retorna una CB/Promise, se necesita usar redux-thunk
//     } catch (error) {
//       console.log(error.message)
//     }
      
      
//   }, [id])
//   console.log(country)