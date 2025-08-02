package com.backend.ISP63.enums;

public enum Sede {
    LAS_TOSCAS("Las Toscas"),
    AVELLANEDA("Avellaneda"),
    FLORENCIA("Florencia");

    private final String displayName;

    Sede(String displayName) {
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
