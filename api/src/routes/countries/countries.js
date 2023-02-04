const { Router } = require('express');
const routerEndpoint = Router();
//const { Country } = require('../../models/Country')                // Importamos modelo xx
const { Country , Activities} = require('../../db');                // modelo real 
const GetCountries = require('../../controllers/GetCountries');
const GetName = require('../../controllers/GetName');
const GetFilteredCountries = require('../../controllers/GetFilteredCountries');


// Modularizamos el ruteo para exportarlo como routerEndpoint (ruta final) 
//y usarlo en el index.js de /routes como: router.use("/countries", routerEndpoint);

routerEndpoint.get('/', async (req, res)=> {   
            
        const {name} = req.query;
        if (name) {
            let nome_del_paese = GetName(name)
            const character = await Country.findAll({
                where:{Nombre : nome_del_paese}
                }
              );
            res.status(200).send(character)
            return
        }

        try { 
     
        const REQ = await GetCountries();                       // Array de objetos filtrados + Switch indica si ya hay algo
        
        if (REQ.Switch) {
            const NewTodo = await Country.findAll();              // Hecho: findAll() Funciona mejor ejecutado en countries.js ó mal retorno en GetCountries
            const NewTodo_filter = GetFilteredCountries(NewTodo);
            res.status(200).json(NewTodo_filter)       // Nota: Por el momento funciona solo 2 veces si mostrara findAll()  (EN EL CONTROLLER),
            return
        }else{
        const NewTodo = await Country.bulkCreate(REQ.Daten_gefiltert);     //la manera de crear es metiendo un array de objetos

        const NewTodo_filter = GetFilteredCountries(NewTodo);

        res.status(200).json(NewTodo_filter)
        }

        } catch (error) {
            res.status(404).send(error.message)
        }

    });

    routerEndpoint.get('/:code', async (req, res)=> {  
        try {
            const {code} = req.params;
            //const character = await Country.findByPk(code); //  No sales activities con findByPK--
            const character = await Country.findOne({         // En este tipo de busqueda se incluyen las actividades
                where: { ID: code },                          // Posiblemente porque las actividades no estan incluidas en la tabla 
                include: Activities                           // Countries como tal, incluimos activities por asociacion (Entidad-relacion)
              });
           
            res.status(200).send(character)
        } catch (error) {
            res.status(404).send(error.message) 
        } 
     });

     
    routerEndpoint.put('/', async (req, res)=> {  
        try {
            const {name} = req.query;
            const character = await Country.findAll({
                where:{[Nombre] : name}
                }
              );
            
            res.status(200).send(character)
        } catch (error) {
            res.status(404).send(error.message) 
        } 
     });

module.exports = routerEndpoint