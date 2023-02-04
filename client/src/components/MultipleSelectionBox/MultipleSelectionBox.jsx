import React from 'react'
import style from './MultipleSelectionBox.module.css'

export const MultipleSelectionBox = (props) => {
  return (
    <div className={style.countryContainer}>
      <p onClick={props.onDeletee}>{props.country}</p>
     
    </div>
  )
}


// <h4 onClick={()=>props.onDeletee(props.country)}>X</h4> <<---- no

//
//  Se borra por tomar el valor del innerText