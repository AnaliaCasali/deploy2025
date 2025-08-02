package com.backend.ISP63.enums;

public enum Genero {
    F("Femenino"),
    M("Masculino"),
    NB("No Binario"),
    NE("No Especificado");

    private final String displayName;

    Genero(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return this.displayName;
    }
}
