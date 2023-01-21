import GetCountries from "../../controllers/ErhaltenLand";
import React from "react";
import axios from 'axios';
import { useState , useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { ChangePage, enviarCountries, FilterContinent, OrderName, OrderPopulation } from "../../redux/actions";
import Country from "../Country";
import '../Home/Home.css';


// Nota: Al pasar de global a local, se come tiempo que hace que las funciones no tengan los valores al momento de renderizar. (Check)

function Home() {

   let r1 = 0;
   let r2 = 10;
   let Change = false;

   const [Countries, setCountries ] = useState([]);    // Estado Local


   const dispatch = useDispatch();
   const { Paesi , Distribuzione ,Paesi_Ordine} = useSelector((state) => {   // Estado Global,  Arreglo de objetos countries [ {250 indice de paises}]
    return state;
    });


  
    useEffect(() => {
      axios.get('http://localhost:3001/countries/')                 
      .then((res)=>res.data)
      .then((data)=>{
         dispatch(enviarCountries(data))//  Seteo los valores del estado global
         })             
        .catch(error=>console.log(error.message))
        
    },[]);


    
    function handleContinent(e) {
      dispatch(FilterContinent(e.target.value))
      const Nuovo_vetore = []

      for (let i = r1; i < r2; i++) {
        const element = Distribuzione[i];
        Nuovo_vetore.push(element)
      }
    }

    function handleAlfaOrder(e) {
      dispatch(OrderName(e.target.value))
    }

    
    function handlePopulationOrder(e) {
      dispatch(OrderPopulation(e.target.value))
    }


  //--------------------------  Me muevo sobre Paise_Ordine ------------------------
  const [currentPage, setCurrentPage] = useState(0)

  const nextHandler = () => {
    
    const countriesPerPage = 10 
    const allCountries = Paesi_Ordine.length; //100 paises
    const nextPage = currentPage + 1; //2
    const firstIndex = nextPage * countriesPerPage; // 210 // 10

    if (firstIndex >= allCountries) return;       // 240 + 10 = 250 = length
    dispatch(ChangePage(firstIndex, countriesPerPage))
    setCurrentPage(nextPage)
    
  }

   const prevHandler = () => {

   let countriesPerPage = 10 
   let prevPage = currentPage;

    if(prevPage<=0) return;
    --prevPage
    const firstIndex = prevPage * countriesPerPage         //  1-1 = index = 0
    
    dispatch(ChangePage(firstIndex, countriesPerPage))
    setCurrentPage(prevPage)
   }
    // ----------------------------------------------------------------------

    return (
      <div className="Home">
        <h1>Henry Countries</h1>
        <h2>/Estoy en Home/</h2>
        <input type='search' placeholder='Call me by your name'></input>
          <div className="Länderliste">
            <button name="Next" onClick={nextHandler}> Next </button>
            <button name="Prev" onClick={prevHandler}> Prev </button>
              <select name="Continente" id="" onChange={handleContinent}>
                  <option value="" disabled>Select</option>
                  <option value="All">All</option>
                  <option value="Africa">Africa</option>
                  <option value="Americas">Americas</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Polar">Polar</option>
               </select>
               <select name="Alfabetico" id="" onChange={handleAlfaOrder}>
                  <option value="" disabled>Select</option>
                  <option value="Descendente">De Z -A</option>
                  <option value="Ascendente">De A - Z</option>
               </select>
               <select name="Poblacion" id="" onChange={handlePopulationOrder}>
                  <option value="" disabled>Select</option>
                  <option value="Ascendente">Ascendente Poblacion</option>
                  <option value="Descendente">Descendente Poblacion</option>
               </select>
              <div className="container">
                { Distribuzione?.map((Paese) => <Country 
                                    ID   = {Paese.ID}
                                    Nome  = {Paese.Nombre}
                                    Bandiera={Paese.ImagenDeLaBandera}  
                                    Continente={Paese.Continente} />  )}
              </div>
          </div>
        
      </div>
    );

  }
  
  export default Home;
  






//                                         <button onClick={PruebaDataGlobal}>Prueba Countries Global</button>
// function PruebaDataGlobal(e) {

//   //   axios.get('http://localhost:3001/countries/')
//   // .then((res)=>res.data)
//   // .then((data)=>{
//   //   dispatch(enviarCountries(data))                        //  Seteo los valores del estado global
//   // })
//   // .catch(error=>console.log(error.message))
//   //this.setState({ state: this.state });
//   console.log(Distribuzione)

//   }

  
//   function PruebaDataLocal() {                 // Paesi[0]['0']:  Nombre,ImagenDeLaBandera,Continente
//     const Nuova_matrice = []
//     let conteo = 0;

//     for (const key1 of Paesi) {                // Nota: No veo por el momento porque el conteo sea 1 pero FUNCIONA,     otro for (const key2 of key1) y conteo es 251 ???
//         conteo++                               // funciona para iterar todos los paises , ó un rango
//       for (let i = r1; i < r2; i++) {
//         const element = key1[i];
//         Nuova_matrice.push(element)
//       }
        
//     }
      
//     setCountries(Nuova_matrice)               // Seteo de estado local
//     return Nuova_matrice
//   }