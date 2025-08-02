import { Localidad } from "../../app/modelo/localidad";

export interface RegisterRequestDTO {
  dni: string;
  apellido: string;
  nombre: string;
  password: string;
  genero: string;
  domicilio: string;
  idLocalidad: number;
  telefono: string;
  email: string;
  fechaNacimiento: string; // Formato 'YYYY-MM-DD'
  estadoCivil: string;
}


export interface AuthResponseDTO {
  token: string;
  username: string;
}
