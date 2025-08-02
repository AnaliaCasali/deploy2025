package com.backend.ISP63.enums;

public enum Provincia {
    BUENOS_AIRES("Buenos Aires", Pais.ARGENTINA),
    CABA("Ciudad Autónoma de Buenos Aires", Pais.ARGENTINA),
    CATAMARCA("Catamarca", Pais.ARGENTINA),
    CHACO("Chaco", Pais.ARGENTINA),
    CHUBUT("Chubut", Pais.ARGENTINA),
    CORDOBA("Córdoba", Pais.ARGENTINA),
    CORRIENTES("Corrientes", Pais.ARGENTINA),
    ENTRE_RIOS("Entre Ríos", Pais.ARGENTINA),
    FORMOSA("Formosa", Pais.ARGENTINA),
    JUJUY("Jujuy", Pais.ARGENTINA),
    LA_PAMPA("La Pampa", Pais.ARGENTINA),
    LA_RIOJA("La Rioja", Pais.ARGENTINA),
    MENDOZA("Mendoza", Pais.ARGENTINA),
    MISIONES("Misiones", Pais.ARGENTINA),
    NEUQUEN("Neuquén", Pais.ARGENTINA),
    RIO_NEGRO("Río Negro", Pais.ARGENTINA),
    SALTA("Salta", Pais.ARGENTINA),
    SAN_JUAN("San Juan", Pais.ARGENTINA),
    SAN_LUIS("San Luis", Pais.ARGENTINA),
    SANTA_CRUZ("Santa Cruz", Pais.ARGENTINA),
    SANTA_FE("Santa Fe", Pais.ARGENTINA),
    SANTIAGO_DEL_ESTERO("Santiago del Estero", Pais.ARGENTINA),
    TIERRA_DEL_FUEGO("Tierra del Fuego", Pais.ARGENTINA),
    TUCUMAN("Tucumán", Pais.ARGENTINA);

    private String nombre;
    private Pais pais;

    Provincia(String nombre, Pais pais) {
        this.nombre = nombre;
        this.pais = pais;
    }

    public String getNombre() {
        return nombre;
    }

    public Pais getPais() {
        return pais;
    }

    @Override
    public String toString() {
        return this.nombre + " - " + this.pais;
    }

    public static Provincia fromNombre(String nombre) {
        for (Provincia provincia : Provincia.values()) {
            if (provincia.getNombre().equalsIgnoreCase(nombre)) {
                return provincia;
            }
        }
        throw new IllegalArgumentException("No se encontró la provincia con nombre: " + nombre);
    }
}
