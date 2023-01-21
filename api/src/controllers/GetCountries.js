const axios = require('axios');
const { Country } = require('../db'); 

const GetCountries = async () =>{
   
   const Dati = await axios.get('https://restcountries.com/v2/all');  // Dentro de Dati se encuentra un Objeto con 
                                                                      // [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
   //console.log(Object.keys(Dati.data));           ------->          // Dati.data contiene los indices de cada pais y su info: { {0} , {1} , {2} ... {n} }
   let Daten = Dati.data;                       // type: Object                      
   let Daten_gefiltert = [];                    // No const por reasignacion
   let Switch  = false;
                   
        Daten_gefiltert = await Country.findAll();          // Busca en DB, falla segunda vez
        if (Daten_gefiltert.length > 0) {
            Switch = true
            console.log(Switch)
            return { Switch }
        }
   
         Daten_gefiltert = Daten.map(obj=>{
        //console.log('Soy elemento de Daten: ' + element) //----(obj)-------- Consologea lo de abajo ----
        // name,topLevelDomain,alpha2Code,alpha3Code,callingCodes,capital,altSpellings,subregion,region,
        // population,latlng,demonym,area,timezones,nativeName,numericCode,flags,currencies,languages,
        // translations,flag,independent
        // ----------------------------------------------------------------------------------------------------
        return {
            Nombre            : obj.name,
            ID                : obj.alpha3Code,
            ImagenDeLaBandera : obj.flags.svg,
            Continente        : obj.region,
            Capital           : obj.capital,
            Subregion         : obj.subregion,
            Area              : obj.area,
            Poblacion         : obj.population
        }
  })

   //console.log(Array.isArray(Daten_gefiltert));
   return {Daten_gefiltert , Switch}
}




module.exports = GetCountries;