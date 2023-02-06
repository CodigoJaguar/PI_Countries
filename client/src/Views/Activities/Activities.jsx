import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useDispatch, useSelector} from "react-redux"
import { validate } from '../../handlers/Validations'
import { NavBar } from '../../components/NavBar/NavBar'
import style from './Activities.module.css'
import { MultipleSelectionBox } from '../../components/MultipleSelectionBox/MultipleSelectionBox'



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

  const [updateErrors, setupdateErrors] = useState({
    Nombre:"",
    Dificultad:"choose",
    Temporada:"choose",
    Duracion:""
  })


  const [form, setForm] = useState({ // ID : 1 ,
    Nombre:"",
    Dificultad:"",
    Duracion:"",
    Temporada:"",                                   // Temporadas deben coincidir con ENUM
    ID_Nazione: []
  })

  const [updateform, setupdateForm] = useState({ 
    Nombre:"",
    Dificultad:"",
    Duracion:"",
    Temporada:"",                                 
  })



// -------------------------------------------- Evaluar cambios en formulario CREATE---------------
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
  //-----------------------------------------Evaluar cambios en formulario UPDATE ---------------

  const changeUpdateHandler = (event) => {
    const property = event.target.name              //saber cual esta cambiando
    const value = event.target.value

    setupdateErrors(validate({
      ...updateform, 
      [property ]: value}))

    setupdateForm({
      ...updateform, 
      [property]: value})
  }

  // ------------------------------------- Crear Actividad-----------------------------------
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
 //----------------------------------------Actualizar Actividad-------------------------------

  const updateHandler = (e)=>{
    e.preventDefault();
    console.log(updateform)
    const { Temporada,Duracion,Dificultad,Nombre} = updateform
                    //localhost:3001/activities/Santa mz?Duracion=10minutosALV&Dificultad=2&Temporada=Winter  ---->  Nota:  los : no se aplican si hago el request
    axios.put(`http://localhost:3001/activities/${Nombre}?Duracion=${Duracion}&Dificultad=${Dificultad}&Temporada=${Temporada}`)
      .then(function (response) {
        console.log(response)
      window.alert('Activity updated');
    })
    .catch(function (error) {
      console.log(error.message);
    });

  }
 //------------------------Seleccion de paises el options -----------------------------------------------------

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
// ------------------- Deseleccion de paises en Div ----------------------------------------------------------
  const deselectHandler = (e) => {  
    
    let NewSet = [];
    const Text = e.target.innerText;

    for (const ID of SelectedCountries) { // for in (indice)
      if (ID !== Text) {
        NewSet.push(ID)
        
      }
    }
  
  // -------------------    Paises añadidos al form ----------------------------------------------------------
    SetSelectedCountries(NewSet)
    setForm({
      ...form, 
      ID_Nazione: NewSet})

  }



  return (
    <>
    <NavBar/>
    <div className={style.container}>
      <div className={style.formContainer}>
          <h2 className={style.CreateActivity}>Create Activity</h2>
            
            <form onSubmit={createHandler} className={style.form}>

              <div className={style.inputName}>
              <label>Name:</label>
              <input type="text" value={form.Nombre} onChange={changeHandler} name="Nombre"/>
              {errors.Nombre && <p className={style.errorText}>{errors.Nombre}</p>}
              </div>

              
            <div className={style.inputLevel}>
              <label htmlFor='level'>Level: </label>

              <input type="radio" id='1' name='Dificultad' value='1' onChange={changeHandler} />
              <label htmlFor='1'>1</label>

              <input type="radio" id='2' name='Dificultad' value='2' onChange={changeHandler}/>
              <label htmlFor='2'>2</label>

              <input type="radio" id='3' name='Dificultad' value='3' onChange={changeHandler}/>
              <label htmlFor='3'>3</label>

              <input type="radio" id='4' name='Dificultad' value='4' onChange={changeHandler}/>
              <label htmlFor='4'>4</label>

              <input type="radio" id='5' name='Dificultad' value='5' onChange={changeHandler}/>
              <label htmlFor='5'>5</label>

              {errors.Dificultad && <p className={style.warning}>{errors.Dificultad}</p>}
            </div>


              <div className={style.inputSeason}>
              <label>Season:</label>
              <select value={form.Temporada} onChange={changeHandler} name="Temporada">
                <option value="" disabled >Select</option>
                <option value={"Summer"} >Summer</option>
                <option value={"Spring"}>Spring</option>
                <option value={"Fall"}>Fall</option>
                <option value={"Winter"}>Winter</option>
              </select>
              {errors.Temporada && <p className={style.warning}>{errors.Temporada}</p>}
              </div>



              <div className={style.inputDuration}>
              <label>Duration:</label>
              <input type="text" value={form.Duracion} onChange={changeHandler} name="Duracion"/>
              {errors.Duracion && <p className={style.errorText}>{errors.Duracion}</p>}
              </div>

              <div className={style.inputCountry}>
                  <label htmlFor='countryid'>Countries: </label>
                  <select name="ID_Naziones" onChange={selectHandler}>
                      <option >Select</option>
                        { 
                          countriesNames.map(country=>{
                          return <option key={country.value} value={country.value}> {country.label} </option>
                          })
                        }
                  </select>
              </div>

              <div className={style.selectedContainer}>
                    {form.ID_Nazione.map(id=> 
                      <MultipleSelectionBox 
                      key = {id}
                      country ={id}
                      onDeletee = {deselectHandler} /> 
                    )}  
              </div>
              
              {(// Habilita o deshabilita boton
                errors.Nombre || errors.Duracion ||
                errors.Temporada || errors.Dificultad
                || SelectedCountries.length===0) 
                ? 
                <button className={style.submitButton} type='submit' disabled>Create</button>
                :
                <button className={style.submitButton} type='submit' >Create</button>
              }
              
            </form>    

        </div>

        

        <div className={style.confirmForm}>
        <h2>Update Activity</h2>
            <form onSubmit={updateHandler}>
            <span>Activity: </span>
            <input type="text" value={updateform.Nombre} onChange={changeUpdateHandler} name="Nombre"/>
            <hr />
                <h3>Check the information before you submit 👀</h3>
                <span>Duration:  </span>
                <input type="text" value={updateform.Duracion} onChange={changeUpdateHandler} name="Duracion"/>
                <p></p>
                <span>Level:  </span>
                  
                <input type="radio" id='1' name='Dificultad' value='1' onChange={changeUpdateHandler} />
                <label htmlFor='1'>1</label>

                <input type="radio" id='2' name='Dificultad' value='2' onChange={changeUpdateHandler}/>
                <label htmlFor='2'>2</label>

                <input type="radio" id='3' name='Dificultad' value='3' onChange={changeUpdateHandler}/>
                <label htmlFor='3'>3</label>

                <input type="radio" id='4' name='Dificultad' value='4' onChange={changeUpdateHandler}/>
                <label htmlFor='4'>4</label>

                <input type="radio" id='5' name='Dificultad' value='5' onChange={changeUpdateHandler}/>
                <label htmlFor='5'>5</label>

                <p>Season:
                  <span>
                  <select value={updateform.Temporada} onChange={changeUpdateHandler} name="Temporada">
                    <option value="" disabled >Select</option>
                    <option value={"Summer"} >Summer</option>
                    <option value={"Spring"}>Spring</option>
                    <option value={"Fall"}>Fall</option>
                    <option value={"Winter"}>Winter</option>
                  </select>
                  </span></p>

                  {(// Habilita o deshabilita boton
                  updateErrors.Nombre || updateErrors.Duracion ||
                  updateErrors.Temporada || updateErrors.Dificultad) 
                  ? 
                  <button className={style.updateButton} type='submit' disabled>Check</button>
                  :
                  <button className={style.updateButton} type='submit' >Update</button>
                  }
            </form>
        </div>
      


    </div>
    </>
  )
}



export default FormActivities;




// <div className={style.inputLevel}>
// <label>Level:</label>
// <select value={form.Dificultad} onChange={changeHandler} name="Dificultad">
//   <option value="" disabled >Select</option>
//   <option value={1} >1</option>
//   <option value={2} >2</option>
//   <option value={3} >3</option>
//   <option value={4} >4</option>
//   <option value={5} >5</option>
// </select>
// {errors.Dificultad && <p className={style.warning}>{errors.Dificultad}</p>}
// </div>