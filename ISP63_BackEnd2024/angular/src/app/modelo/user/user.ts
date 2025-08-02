import { Carrera } from "../carreras/carrera";
import { Localidad } from "../localidad";

export interface User {
  dni: string;
  apellido: string;
  nombre: string;
  genero: string; // Enum
  domicilio: string;
  localidad: Localidad;
  telefono: string;
  email: string;
  fechaNacimiento: string; // Ajusta si es tipo `Date` o string en ISO
  estadoCivil: string; // Enum
  username: string;
  rol: string;
  carrera?: Carrera}

