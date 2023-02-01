


export function MapPages(Elements) {  

    
    
    if (Elements.length<=10) {
      //console.log('Cantidad: '+Elements.length);  //  Se puede quedar pegado al navegador el codigo o.O??  useEffect()
      return [1];
    }

    const Length = Math.ceil(Elements.length/10)
    const NewMap = [];
    let sum    = 0;   

      for (let i = 1; i <= Length; i++) {
            NewMap.push(++sum)
          }
    

    return NewMap
}