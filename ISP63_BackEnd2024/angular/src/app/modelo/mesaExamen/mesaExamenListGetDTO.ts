export interface MesaExamenListGetDTO {
    id: number;             // id mesa
    llamado: string;
    fechayHora: Date;        // LocalDateTime en Java se convierte a Date en TypeScript
    anio: number;
    asignatura: string;
    carrera: string;
    tribunal: string;
}













