const { Country , Activities} = require('../db');    



const GetActivities = async (Corpo)=>{
    const {Nombre,ID,Dificultad,Duracion,Temporada,ID_Nazione} = Corpo
    
    return {Nombre,ID,Dificultad,Duracion,Temporada,ID_Nazione}
   // return {Nombre: 'Paracaidismo', ID : 21, Dificultad: '5', Duracion: '3.5 minutos', Temporada: 'Verano'}  -- usar como Ejemplo.----
}




module.exports = GetActivities;