import { Imagen } from "./imagen";


export interface Noticia {
  id: number;
  descripcion: string;
  fecha: string;
  subtitulo: string;
  texto: string;
  titulo: string;
  vigente: boolean;
  imagen:Imagen;
}
