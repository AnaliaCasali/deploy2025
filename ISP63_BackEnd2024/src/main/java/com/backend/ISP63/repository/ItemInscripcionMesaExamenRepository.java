package com.backend.ISP63.repository;


import com.backend.ISP63.model.InscripcionMesaExamen;
import com.backend.ISP63.model.ItemInscripcionMesaExamen;
import com.backend.ISP63.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemInscripcionMesaExamenRepository extends JpaRepository<ItemInscripcionMesaExamen, Long> {

    // Filtrar inscripciones por asignatura de la mesa de examen
     List<ItemInscripcionMesaExamen> findByMesaExamenAsignaturaId(Long idAsignatura);

    // Filtrar inscripciones por turno de examen
    List<ItemInscripcionMesaExamen> findByMesaExamenTurnoId(Long idTurno);

    // Filtrar ítems de inscripción por idAsignatura e idTurno
    List<ItemInscripcionMesaExamen> findByMesaExamenAsignaturaIdAndMesaExamenTurnoId(Long idAsignatura, Long idTurno);


    // Filtrar ítems de inscripción por ID de estudiante (String) y ID de turno
    List<ItemInscripcionMesaExamen> findByInscripcionEstudianteDniAndMesaExamenTurnoId(String dniEstudiante, Long idTurno);

    List<ItemInscripcionMesaExamen> findByInscripcion_Estudiante_Dni(String dniEstudiante);

}
