export interface TurnoDTO {
    id: number;  // Usamos `number` para Long en TypeScript
    turno: string;
    periodoInscripcionDesde: string;  // LocalDate se puede manejar como string (formato ISO 8601)
    periodoInscripcionHasta: string;
    periodoExamenDesde: string;
    periodoExamenHasta: string;
    vigente: boolean;
}