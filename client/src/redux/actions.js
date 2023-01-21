import { GET_DATA , FILTER_KONTINENT, ORDER_NAME, CHANGE_PAGE, ORDER_POPULATION, GET_COUNTRY} from "./reducer"
import axios from "axios"



export function enviarCountries(DataCountries){                    // homework
    return { type : GET_DATA , payload : DataCountries}
}



export function FilterContinent(Kontinent){
    return {type : FILTER_KONTINENT , payload : Kontinent}
}


export function OrderName(Name){
    return {type : ORDER_NAME , payload : Name}
}


export function OrderPopulation(Population){
    return {type : ORDER_POPULATION , payload : Population}
}



export function ChangePage(firstIndex,countriesPerPage){
    return {type : CHANGE_PAGE , payload : [firstIndex,countriesPerPage]}
}


export const getCountry = (id) => {
    return async (dispatch) => {
      const DBdata = await axios.get(
        `http://localhost:3001/countries/${id}`
      )
      const country = DBdata.data;
      dispatch({type: GET_COUNTRY, payload: country})
    }
  }