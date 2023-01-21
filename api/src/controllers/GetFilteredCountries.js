


const GetFilteredCountries = (Naziones) => {
    
    const Gefiltert = Naziones.map((obj)=>{
        return {
            ID : obj.ID,
            Nombre: obj.Nombre,
            ImagenDeLaBandera : obj.ImagenDeLaBandera,
            Continente : obj.Continente,
            Poblacion  : obj.Poblacion
        }
    })

    return Gefiltert
}

module.exports = GetFilteredCountries;