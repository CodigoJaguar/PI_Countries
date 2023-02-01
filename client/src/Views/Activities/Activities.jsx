import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux"
import { validate } from '../../handlers/Validations'
import { NavBar } from '../../components/NavBar/NavBar'
import style from './Activities.module.css'



 function FormActivities(){

  
  const countriesAll =  useSelector(state=>state.Paesi)
  let countriesNames = countriesAll.map(country=> {return {label: country.Nombre , value: country.ID}})
  const [SelectedCountries , SetSelectedCountries] = useState([])

  
  const [errors, setErrors] = useState({
    Nombre:"",
    Dificultad:"choose",
    Temporada:"choose",
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
  }

  const createHandler = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3001/activities', form )
    .then(function (response) {
      //console.log(response+'TODO GOOD');
      window.alert('Activity added');
    })
    .catch(function (error) {
      console.log(error.message);
    });

    setForm({
      Nombre:"",
      Dificultad:"",
      Temporada:"",
      Duracion:"",
      ID_Nazione:[]
    })
  }
  
  const selectHandler = (e) => {
    
    if(SelectedCountries.includes(e.target.value)) return window.alert('Pais ya seleccionado');
    let NewSet = [];
    const local = [e.target.value];
    NewSet = [...local,...SelectedCountries];
    

    SetSelectedCountries(NewSet)
    setForm({
      ...form, 
      ID_Nazione: NewSet})
  }

  const deselectHandler = (e) => {
    
    let NewSet = [];
    const Text = e.target.innerText;

    for (const ID of SelectedCountries) { // for in (indice)
      if (ID !== Text) {
        NewSet.push(ID)
        
      }
    }
    
    SetSelectedCountries(NewSet)
    setForm({
      ...form, 
      ID_Nazione: NewSet})

  }



  return (
    <>
    <NavBar/>
    <div className={style.container}>
      <h2>Create Activity</h2>
        
        <form onSubmit={createHandler} className={style.form}>
          <div>
          <label>Name:</label>
          <input type="text" value={form.Nombre} onChange={changeHandler} name="Nombre"/>
          {errors.Nombre && <p className={style.errorText}>{errors.Nombre}</p>}
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
          {errors.Dificultad && <p className={style.warning}>{errors.Dificultad}</p>}
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
          {errors.Temporada && <p className={style.warning}>{errors.Temporada}</p>}
          </div>

          <div>
          <label>Duration</label>
          <input type="text" value={form.Duracion} onChange={changeHandler} name="Duracion"/>
          {errors.Duracion && <p className={style.errorText}>{errors.Duracion}</p>}
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
              
              <div className='IdOptions'>
                {form.ID_Nazione.map(id=>(<ul onClick={deselectHandler}>{id}</ul>))}  
              </div>
              
              
          </div>
          
          {(// Habilita o deshabilita boton
            errors.Nombre || errors.Duracion ||
            errors.Temporada || errors.Dificultad
            || SelectedCountries.length===0) 
            ? 
            <button type='submit' disabled>Create</button>
            :
            <button type='submit' >Create</button>
          }
          
        </form>
      
      
    </div>
    </>
  )
}



export default FormActivities;
