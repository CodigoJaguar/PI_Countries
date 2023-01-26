import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux"
import { validate } from '../../handlers/Validations'



 function FormActivities(){

  
  const countriesAll =  useSelector(state=>state.Paesi)
  let countriesNames = countriesAll.map(country=> {return {label: country.Nombre , value: country.ID}})
  const [SelectedCountries , SetSelectedCountries] = useState([])

  
  const [errors, setErrors] = useState({
    Nombre:"",
    Dificultad:"",
    Temporada:"",
    Duracion:"",
    ID_Nazione:[]
  })


  const [form, setForm] = useState({ // ID : 1 ,
    Nombre:"",
    Dificultad:"",
    Duracion:"",
    Temporada:"",                                   // Temporadas deben coincidir con ENUM
    ID_Nazione: []
  })



  const changeHandler = (event) => {
    const property = event.target.name              //saber cual esta cambiando
    const value = event.target.value

    setErrors(validate({
      ...form, 
      [property ]: value}))

    setForm({
      ...form, 
      [property]: value})
      //console.log(form)
  }

  const createHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/activities', form )
    .then(function (response) {
      console.log(response+'TODO GOOD');
      //console.log(form)
    })
    .catch(function (error) {
      console.log(error.message);
    });

  }
  
  const selectHandler = (e) => {
    
    if(SelectedCountries.includes(e.target.value)) return 'Ya existe el pais'
    let NewSet = []
    const local = [e.target.value]
    NewSet = [...local,...SelectedCountries]
    

    SetSelectedCountries(NewSet)
    setForm({
      ...form, 
      ID_Nazione: NewSet})
  }



  return (
    <div>
      <h1>Create an Activity</h1>
        
        <form onSubmit={createHandler}>
          <div>
          <label>Name:</label>
          <input type="text" value={form.Nombre} onChange={changeHandler} name="Nombre"/>
          {errors.Nombre && <p className='errorname'>{errors.Nombre}</p>}
          </div>

          <div>
          <label>Level</label>
          <select value={form.Dificultad} onChange={changeHandler} name="Dificultad">
            <option value="" disabled >Select</option>
            <option value={1} >1</option>
            <option value={2} >2</option>
            <option value={3} >3</option>
            <option value={4} >4</option>
            <option value={5} >5</option>
          </select>
          </div>

          <div>
          <label>Season</label>
          <select value={form.Temporada} onChange={changeHandler} name="Temporada">
            <option value="" disabled >Select</option>
            <option value={"Summer"} >Summer</option>
            <option value={"Spring"}>Spring</option>
            <option value={"Fall"}>Fall</option>
            <option value={"Winter"}>Winter</option>
          </select>
          </div>

          <div>
          <label>Duration</label>
          <input type="text" value={form.Duracion} onChange={changeHandler} name="Duracion"/>
          </div>

          <div>
          
              <select name="ID_Naziones" onChange={selectHandler}>
                  <option >Select</option>
                    { 
                      countriesNames.map(country=>{
                      return <option key={country.value} value={country.value}> {country.label} </option>
                      })
                    }
              </select>
              <span> {form.ID_Nazione}</span>
              <ul>{form.ID_Nazione}</ul>
          </div>
          <button type='submit' >Create activity</button>

          
        </form>
      
      <Link to="/home">
        <button>Return to Home</button>
      </Link>
    </div>
  )
}



export default FormActivities;

//           <label>Country ID:</label>
//           <input type="text" value={form.ID_Nazione} onChange={changeHandler} name="ID_Nazione1"/>

// return <option key={country.value} value={country.Nombre}>{country.label}</option>