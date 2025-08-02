package com.backend.ISP63.enums;

public enum Pais {
    ARGENTINA("Argentina", "Argentino"),
    BAHAMAS("Bahamas", "Bahamés"),
    BARBADOS("Barbados", "Barbadense"),
    BELICE("Belice", "Beliceño"),
    BOLIVIA("Bolivia", "Boliviano"),
    BRASIL("Brasil", "Brasileño"),
    CANADA("Canadá", "Canadiense"),
    CHILE("Chile", "Chileno"),
    COLOMBIA("Colombia", "Colombiano"),
    COSTA_RICA("Costa Rica", "Costarricense"),
    CUBA("Cuba", "Cubano"),
    DOMINICA("Dominica", "Dominiqués"),
    ECUADOR("Ecuador", "Ecuatoriano"),
    EL_SALVADOR("El Salvador", "Salvadoreño"),
    ESTADOS_UNIDOS("Estados Unidos", "Estadounidense"),
    GRANADA("Granada", "Granadino"),
    GUATEMALA("Guatemala", "Guatemalteco"),
    GUYANA("Guyana", "Guyanés"),
    HAITI("Haití", "Haitiano"),
    HONDURAS("Honduras", "Hondureño"),
    JAMAICA("Jamaica", "Jamaiquino"),
    MEXICO("México", "Mexicano"),
    NICARAGUA("Nicaragua", "Nicaragüense"),
    PANAMA("Panamá", "Panameño"),
    PARAGUAY("Paraguay", "Paraguayo"),
    PERU("Perú", "Peruano"),
    REPUBLICA_DOMINICANA("República Dominicana", "Dominicano"),
    SAN_CRISTOBAL_Y_NIEVES("San Cristóbal y Nieves", "Sancristobaleño"),
    SAN_VICENTE_Y_LAS_GRANADINAS("San Vicente y las Granadinas", "Sanvicentino"),
    SANTA_LUCIA("Santa Lucía", "Santalucense"),
    SURINAM("Surinam", "Surinamés"),
    TRINIDAD_Y_TOBAGO("Trinidad y Tobago", "Trinitense"),
    URUGUAY("Uruguay", "Uruguayo"),
    VENEZUELA("Venezuela", "Venezolano");

    private String nombre;
    private String nacionalidad;

    Pais(String nombre, String nacionalidad) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }

    public String getNombre() {
        return nombre;
    }

    public String getNacionalidad() {
        return nacionalidad;
    }

    @Override
    public String toString() {
        return this.nombre;
    }

    // Método para obtener el enum a partir del nombre del país
    public static Pais fromNombre(String nombre) {
        for (Pais pais : Pais.values()) {
            if (pais.nombre.equalsIgnoreCase(nombre)) {
                return pais;
            }
        }
        throw new IllegalArgumentException("No se encontró el país con nombre: " + nombre);
    }

    // Método para obtener el enum a partir de la nacionalidad
    public static Pais fromNacionalidad(String nacionalidad) {
        for (Pais pais : Pais.values()) {
            if (pais.nacionalidad.equalsIgnoreCase(nacionalidad)) {
                return pais;
            }
        }
        throw new IllegalArgumentException("No se encontró el país con nacionalidad: " + nacionalidad);
    }
}
