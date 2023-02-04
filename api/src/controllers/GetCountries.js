const axios = require('axios');
const { Country } = require('../db'); 

const GetCountries = async () =>{
                                                        // existe el /v3 mas completo
   const Dati = await axios.get('https://restcountries.com/v2/all');  // Dentro de Dati se encuentra un Objeto con 
                                                                      // [ 'status', 'statusText', 'headers', 'config', 'request', 'data' ]
   //console.log(Object.keys(Dati.data));           ------->          // Dati.data contiene los indices de cada pais y su info: { {0} , {1} , {2} ... {n} }
   //let Daten = Dati.data;                       // type: Object                      
                     
   let Switch  = false;
                   
         Daten_gefiltert2 = await Country.findAll();          // Busca en DB, falla segunda vez
        if (Daten_gefiltert2.length > 0) {
            Switch = true
            return { Switch }
        }
   
        const Daten_gefiltert = Dati.data.map(country=>{
        //console.log('Soy elemento de Daten: ' + element) //----(obj)-------- Consologea lo de abajo ----
        // name,topLevelDomain,alpha2Code,alpha3Code,callingCodes,capital,altSpellings,subregion,region,
        // population,latlng,demonym,area,timezones,nativeName,numericCode,flags,currencies,languages,
        // translations,flag,independent
        // ----------------------------------------------------------------------------------------------------
        
        return {
            ID                : country.alpha3Code,    //  alpha3Code
            Nombre            : country.name,
            ImagenDeLaBandera : country.flags.svg,
            Continente        : country.region,
            Capital           : country.capital? country.capital[0] : "Not found",
            Subregion         : country.subregion,
            Area              : country.area,
            Poblacion         : country.population
        }
    })

   
   return {Daten_gefiltert , Switch}
}




module.exports = GetCountries;