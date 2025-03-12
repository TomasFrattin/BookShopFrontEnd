import { object, string } from "zod";

// Define el esquema de validación para el registro de usuario con Zod
export const userSchema = object({
  username: string()
    .min(1, { message: "El campo nombre de usuario no puede estar vacío." }),
  firstName: string().min(1, { message: "El campo nombre no puede estar vacío." }).max(50),
  lastName: string().min(1, { message: "El campo apellido no puede estar vacío." }).max(50),
  password: string().min(1, { message: "El campo de la contraseña no puede estar vacío." }),
  city: string().min(1, { message: "El campo de la ciudad no puede estar vacío." }).max(50),
  province: string().min(1, { message: "El campo de la provincia no puede estar vacío." }).max(50),
  address: string().min(1, { message: "El campo de la dirección no puede estar vacío." }).max(100),
});