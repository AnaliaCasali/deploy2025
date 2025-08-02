import { Imagen } from "../imagen";

export interface Carrera {
  id: number;
  carrera: string;
  plan: string;
  duracion: number;
  campoOcupacional: string;
  sede: string;
  logo: Imagen;
  link: string;
}

