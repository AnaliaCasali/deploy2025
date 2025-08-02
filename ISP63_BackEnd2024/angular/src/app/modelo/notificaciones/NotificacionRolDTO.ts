export interface NotificacionRolDTO {
    id: number;
    mensaje: string;
    leida: boolean;
    fechaCreacion: string; // Al ser una fecha, puede ser manejada como string o Date en Angular
    rol: string[]; // Lista de roles como strings
}