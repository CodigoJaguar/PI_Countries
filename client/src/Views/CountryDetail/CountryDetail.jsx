import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCountry } from '../../redux/actions'




 const Detail = (props) => {
	 
	 const dispatch = useDispatch();
	 
	 const country = useSelector(state=>state.Detaglio)
	 let {id}= useParams()


    useEffect(() => {
        dispatch(getCountry(id))
    }, [dispatch,id])
        

	 return (
		 <div>
  
      <h1>{country.Nombre}</h1>
      <img src={country.ImagenDeLaBandera} alt={`${country.Nombre} flag`} />
      <p>Continent: {country.Continente}</p>
      <p>Subregin: {country.Subregion}</p>
      <p>Capital: {country.Capital}</p>
      <p>Area: {country.Area} km2</p>
      <p>Population: {country.Poblacion} km2</p>

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