



export function FilterInitial(Tutti) {                   //  Solo despliega 9 
    const Filter = []; 
      for (let i = 0; i < 9; i++) {
            const element = Tutti[i];
            Filter.push(element)
          }
    return Filter
}

export function SortToInitialASC(TuttiFiltrato) {
    const NuovoVetore =
    TuttiFiltrato.sort(function (a, b) {
        if (a.Nombre > b.Nombre) {
          return 1;
        }
        if (a.Nombre < b.Nombre) {
          return -1;
        }
        return 0;
      }); 

      return NuovoVetore
}

export function SortToInitialDESC(TuttiFiltrato) {
    const NuovoVetore =
    TuttiFiltrato.sort(function (a, b) {
        if (a.Nombre < b.Nombre) {
          return 1;
        }
        if (a.Nombre > b.Nombre) {
          return -1;
        }
        return 0;
      }); 

      return NuovoVetore
}

 
export function SortToInitialMax(TuttiFiltrato) {
    const NuovoVetore =
    TuttiFiltrato.sort(function(a, b) {
        return a.Poblacion - b.Poblacion;
      });

      return NuovoVetore
}


export function SortToInitialMin(TuttiFiltrato) {
    const NuovoVetore =
    TuttiFiltrato.sort(function(a, b) {  
        return b.Poblacion - a.Poblacion;
      });

      return NuovoVetore
}