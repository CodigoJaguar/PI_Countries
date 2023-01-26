const { Country , Activities} = require('../db');    



const GetActivities = async (Corpo)=>{
    const {Nombre,ID,Dificultad,Duracion,Temporada,ID_Nazione} = Corpo
    
    return [{Nombre,ID,Dificultad,Duracion,Temporada},ID_Nazione]
   // return {Nombre: 'Paracaidismo', ID : 21, Dificultad: '5', Duracion: '3.5 minutos', Temporada: 'Verano'}  -- usar como Ejemplo.----
}

const createActivity = async (Corpo) => {
    const {Nombre,ID,Dificultad,Duracion,Temporada,ID_Nazione} = Corpo
    const newActivity = await Activities.create(Nombre,Dificultad,Temporada,Duracion)
    await newActivity.addCountry(ID_Nazione);
    return newActivity
}




module.exports = GetActivities;