const { Router } = require('express');
const routerEndActivities = Router();
//const { Country } = require('../../models/Country')                // Importamos modelo
const { Country , Activities ,CountryActivities} = require('../../db');
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

    routerEndActivities.delete('/' ,async (req,res)=>{

        const {ID} = req.body

        try {

            await CountryActivities.destroy({      // Se crea nueva tabla CountryActivities Siendo Entidad-Relacion de con atributos [ 'CountryID', 'ActivityID' ]
                where: {
                    CountryID: ID
                },
                force: true
              });
            
              res.status(200).send('Activity deleted') 
        } catch (error) {
            res.status(404).send(error.message)
        }

    });

    routerEndActivities.put('/:attribute',async(req,res)=>{
        const {attribute} = req.params;     // Nombre de Actividad
        console.log(req)
        const {Duracion,Temporada,Dificultad}  = req.query;

        try {
            const Activity = await Activities.update(
                {
                    Duracion  : Duracion,
                    Temporada : Temporada,
                    Dificultad: Dificultad
                },
                {
                    where:{Nombre : attribute}
                }
            );


            res.status(200).send('Actividad actualizada')
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