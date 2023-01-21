const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const {axios} = require('axios');
const routerEndpoint = require("./countries/countries");
const routerEndActivities = require('./activities/activities');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/", (req,res)=>{
    res.status(200).json({message : "Hola mundo"});
})

router.use("/countries", routerEndpoint);           // router              // RouterEndActivities
router.use("/activities", routerEndActivities)  // /activities      /


module.exports = router ;
