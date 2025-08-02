import { Provincia } from "./enums/Provincia";

export interface Localidad {
  id: number;
  localidad: string;
  provincia: String ; // Enum Provincia
  pais: string ;
  CP: string;         // Código Postal

}


export interface LocalidadDto {
  id: number;
  localidad: string;
  provincia: String ; // Enum Provincia
  CP: string;         // Código Postal
}
