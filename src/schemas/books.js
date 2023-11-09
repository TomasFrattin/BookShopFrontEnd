import z from 'zod'

export const bookSchema = z.object({
  title: z.string({    
    required_error: 'Debe ingresar un Título.',
    invalid_type_error: 'El Título debe ser una cadena de caracteres.'
    }),
  year: z.number({
    required_error: 'Debe ingresar un Año.',
    invalid_type_error: 'El Año debe ser un número entero entre 1900 y 2024.'
    }).refine(value => value >= 1900 && value <= 2024, {
      message: 'El Año debe estar entre 1900 y 2024.'
      }),
  author: z.string({    
    required_error: 'Debe ingresar un Autor.',
    invalid_type_error: 'El Autor debe ser una cadena de caracteres.'
    }),
  price: z.number({    
    required_error: 'Debe ingresar un Precio.',
    invalid_type_error: 'El Precio debe ser un número.'
    }).positive({
      invalid_type_error: 'El Precio debe ser positivo'
      }),
  rate: z.number({
    required_error: 'Debe ingresar una Calificación.',
    invalid_type_error: 'La Calificación debe ser un número.'
  }).refine(value => value >= 0 && value <= 5, {
    message: 'Por favor, ingrese un número entre 0 y 5 para la calificación.'
  }),
  image: z.string({
    required_error: 'Debe ingresar un URL perteneciente a una Imagen.',
    invalid_type_error: 'La Imagen debe ser una cadena de caracteres.'
    }).url({
      message: 'La imagen debe tener un URL válido.'
      }),
  genre: z.array(z.enum(['History', 'Horror', 'Mystery', 'Psychology', 'Religion', 'Romance', 'Sci-Fi', 'Self Help']))
})

