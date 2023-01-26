const { Router } = require('express');
const routerEndActivities = Router();
//const { Country } = require('../../models/Country')                // Importamos modelo
const { Country , Activities} = require('../../db');
const GetActivities = require('../../controllers/GetActivities');




routerEndActivities.post('/', async (req, res)=> {   
            
        try {  
        const REQ = await GetActivities(req.body)                      // Objeto Json
        
        const Risposta = await Activities.create(REQ[0]);                                // maybe bulkcreate a un solo pais
        const {Nombre,ID,Dificultad,Duracion,Temporada}= Risposta       // Attivitá
        // Falta el atributo de la tabla country                         
        // const attributo_Land = await Country.findByPk(REQ.ID_Nazione);    // Nazione
        // Crea la Relacion Pais_Actividad / con un solo pais
        //await attributo_Land.addActivities(Risposta)       //   Se asocia Las llaves de Paises con lass actividades
        Risposta.addCountry(REQ[1])
        
        
            res.status(200).send('Activity added') 
        } catch (error) {
            res.status(404).send(error.message)
        }

    });



    module.exports = routerEndActivities


    // ----- codigo para buscar 1 -----------
    // const result = await Country.findOne({
    //     where: { ID: REQ.ID_Nazione },
    //     include: Activities
    //   });