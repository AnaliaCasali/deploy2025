import { Imagen } from "./imagen";

export interface Evento {
detalles: any;
showDetails: any;
    id: number;
    fecha: string;
    titulo: string;
    subitulo: string;
    descripcion: string;
    imagen:Imagen;
  }
  
  