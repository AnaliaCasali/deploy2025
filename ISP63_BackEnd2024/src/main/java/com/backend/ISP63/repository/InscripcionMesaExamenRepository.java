package com.backend.ISP63.repository;

import com.backend.ISP63.model.Carrera;
import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.model.MesaExamen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InscripcionMesaExamenRepository extends JpaRepository<InscripcionMesaExamen, Long>{

    // Filtrar inscripciones por alumno (usuario)
    List<InscripcionMesaExamen> findByEstudianteDni(String dni);

    //consulta dni alumno y id turno
    @Query("SELECT i FROM InscripcionMesaExamen i JOIN i.items items WHERE i.estudiante.dni = :dni AND items.mesaExamen.turno.id = :turnoId")
    Optional<InscripcionMesaExamen> findByEstudianteDniAndTurno(@Param("dni") String dni, @Param("turnoId") Long turnoId);
}



