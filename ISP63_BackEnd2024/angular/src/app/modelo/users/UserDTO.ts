import { Carrera } from "../carreras/carrera";
import { EstadoCivil } from "../enums/EstadoCivil";
import { Genero } from "../enums/Genero";
import { Localidad } from "../localidad";

export interface UserDTO {
    dni: string;  // Usamos DNI como clave primaria
    apellido: string;
    nombre: string;
    genero: Genero;  // Asegúrate de tener una definición o tipo para Genero
    domicilio: string;
    localidad: Localidad;  // Asegúrate de tener una definición o tipo para Localidad
    telefono: string;
    email: string;
    fechaNacimiento: string;  // Puedes utilizar el tipo string para LocalDate
    estadoCivil: EstadoCivil;  // Asegúrate de tener una definición o tipo para EstadoCivil
    username: string;
    rol: string;
    carrera?: Carrera;  // solo tendrá carrera si es estudiante, por lo que lo hacemos opcional
}
