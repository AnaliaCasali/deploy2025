package com.backend.ISP63.enums;

public enum Periodo {

    ANUAL("Anual"),
    CUATRIMESTRE_1("1er Cuatrimestre"),
    CUATRIMESTRE_2("2do Cuatrimestre");

    private final String displayName;

    Periodo(String displayName) {
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
