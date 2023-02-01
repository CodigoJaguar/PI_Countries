const regexName = /\d/i;

export const validate = (form) => {
  const errors = {};

    if(  form.Nombre.length > 22 || form.Nombre.length < 3 || regexName.test(form.Nombre))
      errors.Nombre = "Type a name with at least 3 characters, less than 22 and only letters";

    if(form.Duracion && form.Duracion.length < 2)
    errors.Duracion = "Add the duration of the activity please"

    if(!form.Dificultad)
    errors.Dificultad = "Add the level of the activity please"

    
    if(!form.Temporada)
    errors.Temporada = "Add the Season of the activity please"


    return errors
}

