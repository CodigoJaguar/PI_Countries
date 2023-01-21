


const GetName = (domanda)=>{


    let Nome = domanda.toLowerCase();               // string 
    let char = domanda.charAt(0).toUpperCase();    // caracter
    let Remaining = Nome.slice(1)                   // string
    let NomeFinale = char+Remaining
    
    return NomeFinale
}


module.exports = GetName;