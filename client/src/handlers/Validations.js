const regexName = /\d/i;

export const validate = (form) => {
  const errors = {};

    if( form.Nombre.length < 3 || regexName.test(form.Nombre))
      errors.Nombre = "Please, type a name with at least 3 characters and only letters";

    if(form.Duracion && form.Duracion.length < 2)
    errors.Duracion = "Add the duration of the activity please"


    return errors
}

