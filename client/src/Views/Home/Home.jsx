import React from "react";
import axios from 'axios';
import { useState , useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import { ChangePage, enviarCountries, FilterContinent, findCountry, OrderName, OrderPopulation } from "../../redux/actions";
import Country from "../../components/Country/Country";
import '../Home/Home.css';
import { NavBar } from "../../components/NavBar/NavBar";
import { MapPages } from "../../handlers/MapPages";


// Nota: Al pasar de global a local, se come tiempo que hace que las funciones no tengan los valores al momento de renderizar. (Check)

function Home() {

   let r1 = 0;
   let r2 = 10;
   let pg = 1;

   const [CountriesPage, setCountriesPage ] = useState([]);    // Estado Local


   const dispatch = useDispatch();
   const { Distribuzione ,Paesi_Ordine} = useSelector((state) => {   // Estado Global,  Arreglo de objetos countries [ {250 indice de paises}]
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

    // -------------  Cada cambio en Paesi_Ordine, se actualiza l numero de paginas---
    useEffect(()=>{
      const Pages = MapPages(Paesi_Ordine)
      setCountriesPage(Pages)
      
    },[Paesi_Ordine])


    
    function handleContinent(e) {
      dispatch(FilterContinent(e.target.value))
      const Nuovo_vetore = []

      for (let i = r1; i < r2; i++) {
        const element = Distribuzione[i];
        Nuovo_vetore.push(element)
      }
      setCurrentPage(0)
    }

    function handleAlfaOrder(e) {
      dispatch(OrderName(e.target.value))
    }

    
    function handlePopulationOrder(e) {
      dispatch(OrderPopulation(e.target.value))
    }

    
    function handleSearch(e) {
      const Value = document.querySelector('.inputSearch');
      const Nombre = Value.value
      axios.get(`http://localhost:3001/countries?name=${Nombre}`)                 
      .then((res)=>res.data)    //                                   [ {...} ]
       .then((data)=>{
        
         if (data[0]?.Nombre ) {
          //window.alert('Country Found');
          dispatch(findCountry(data[0]))
       } else {
          window.alert('Country not Found');
       }
         })             
        .catch(error=>console.log(error.message))
    }


  //--------------------------  Me muevo sobre Paesi_Ordine ------------------------
  const [currentPage, setCurrentPage] = useState(0)

  const nextHandler = () => {
    
    const countriesPerPage = 10 
    const allCountries = Paesi_Ordine.length; 
    const nextPage = currentPage + 1; 
    const firstIndex = nextPage * countriesPerPage; 

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

   const skipPage = (e) => {

     let val = e.target.value -1
     let countriesPerPage = 10 
     const firstIndex = val * 10         //  1-1 = index = 0
     
     dispatch(ChangePage(firstIndex, countriesPerPage))
     setCurrentPage(val)
    }


    // ----------------------------------------------------------------------

    return (
      <>
      <div id="Nav_title">
        <NavBar/>
        <h1>Henry Countries</h1>
       
      </div>

       <div className="Home">
         <div id="SearchBar">
            <input  placeholder='Search country by name' className="inputSearch"></input>
            <button type="submit" name="search" onClick={handleSearch}> Search </button>
        
              <div className="Länderliste">    
                  <select name="Continente" id="" onChange={handleContinent}>
                      <option value="" disabled>Select</option>
                      <option value="All">All</option>
                      <option value="Africa">Africa</option>
                      <option value="Americas">Americas</option>
                      <option value="Antarctic">Antarctic</option>
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
              </div>
          </div>

               <div>
                <button name="Prev" onClick={prevHandler}> ⬅️ </button>
                <span> Pagina: {currentPage+1} de {(Paesi_Ordine.length<10)? 1 : Math.ceil(Paesi_Ordine.length/10) }</span>
                <button name="Next" onClick={nextHandler} > ➡️ </button>
               </div>

               <div className="Pages">
                {CountriesPage?.map((value)=>(<button 
                 className={currentPage === value ? 'pageNumberActive' : 'pageNumber'} 
                 value={value} 
                 onClick={skipPage} >{ value }</button>))}
               </div>

              <div className="containerflag">
                { Distribuzione?.map((Paese) => <Country 
                                    key    = {Paese.ID}
                                    ID     = {Paese.ID}
                                    Nome   = {Paese.Nombre}
                                    Bandiera  ={Paese.ImagenDeLaBandera}  
                                    Continente={Paese.Continente} />  )}
              </div>
          
          
        </div>
    </>
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

//  {MapPages(Distribuzione)?.map(Page=>(<span>{Page}</span>))}