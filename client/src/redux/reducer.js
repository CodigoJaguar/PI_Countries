import {FilterInitial ,  SortToInitialASC, SortToInitialDESC, SortToInitialMax, SortToInitialMin } from "../handlers/FilerInitial";

export const GET_DATA         = 'GET_DATA'        ;
export const FILTER_KONTINENT = 'FILTER_KONTINENT';
export const ORDER_NAME       = 'ORDER_NAME'      ;
export const CHANGE_PAGE      = 'CHANGE_PAGE'     ;
export const ORDER_POPULATION = 'ORDER_POPULATION'; 
export const GET_COUNTRY      = 'GET_COUNTRY'     ;
export const SEARCH_COUNTRY   = 'SEARCH_COUNTRY'  ;


const initialState = {
    Paesi : [],                        // Todos los Paises
    Attivita :[],
    Paesi_Filtrato :[],                // Todos los países filtrados por continente
    Paesi_Ordine :[],                  // Todos los Paises Ordenados por Alfabeto/Poblacion
    Distribuzione : [],                 // Paises para desplegar en view
    Detaglio      : {}
}


function rootReducer(state = initialState,actions){    // actions.payload = Array
    let Visualizzazioni = [];

    let TuttiFiltrato = [];
    let TuttiOrdinato = [];

   switch (actions.type) {

       case GET_DATA:
        const Tutti = [];
        
        actions.payload.forEach(elem => {
            Tutti.push(elem)                           // (Object.keys(elem))     //   {Nombre,ID,Continente,Imagen}
        });

        Visualizzazioni = FilterInitial(Tutti)
        return { Paesi : Tutti, Attivita:[], Distribuzione : [...Visualizzazioni], Paesi_Filtrato : [...Tutti] , Paesi_Ordine:[...Tutti]}

       case FILTER_KONTINENT:
        const TuttiFiltro = []             
        let  FiltroFinale = []          
        if (actions.payload === 'All') {
            for (let i = 0; i < state.Paesi.length; i++) {
                const element = state.Paesi[i];                 // {Nombre,ID,Continente,Imagen}
                TuttiFiltro.push(element)
            }
        }else{
            for (let i = 0; i < state.Paesi.length; i++) {
                const element = state.Paesi[i];
                if(element.Continente === actions.payload) TuttiFiltro.push(element)
            }
        }
        (TuttiFiltro.length === 1 ) ? FiltroFinale = TuttiFiltro :  FiltroFinale = FilterInitial(TuttiFiltro)
        return  {...state , Paesi_Filtrato:[...TuttiFiltro] , Distribuzione:[...FiltroFinale], Paesi_Ordine:[...TuttiFiltro]}
  
       case ORDER_NAME:
            TuttiFiltrato   = state.Paesi_Filtrato;
            TuttiOrdinato   = [] ;
            (actions.payload === 'Ascendente')? TuttiOrdinato = SortToInitialASC([...TuttiFiltrato]) 
            : TuttiOrdinato = SortToInitialDESC([...TuttiFiltrato])
            Visualizzazioni = FilterInitial(TuttiOrdinato)
                
                return {...state, Paesi_Ordine: TuttiOrdinato , Distribuzione:[...Visualizzazioni]}

        case CHANGE_PAGE:
                        const Vetore = [...state.Paesi_Ordine];
                        const Pagina = Vetore.splice(actions.payload[0], actions.payload[1])
            return   { ...state,  Distribuzione : [...Pagina]}

        case ORDER_POPULATION:
            TuttiFiltrato   = state.Paesi_Filtrato;
            TuttiOrdinato     = [] ;
            (actions.payload === 'Ascendente')? TuttiOrdinato = SortToInitialMax([...TuttiFiltrato]) 
            : TuttiOrdinato = SortToInitialMin([...TuttiFiltrato])
            Visualizzazioni = FilterInitial(TuttiOrdinato)
                
                return {...state, Paesi_Ordine: TuttiOrdinato , Distribuzione:[...Visualizzazioni]}

        case GET_COUNTRY:
                    return{
                      ...state,
                      Detaglio: actions.payload
                    }
        case SEARCH_COUNTRY:
            const Trovato = [];
            Trovato.push(actions.payload)
            

        return { ...state,  Distribuzione : [...Trovato]}


       default:
           return state
   }

}


export default rootReducer



//  if (actions.payload === 'Descendente') sortedCharacters.reverse((a, b) => a.Nombre > b.Nombre)  // 
//             else sortedCharacters.sort((a, b) => b.Nombre < a.Nombre) 
             
