package com.backend.ISP63.repository;


import com.backend.ISP63.model.MesaExamen;
import jakarta.persistence.metamodel.SingularAttribute;
import org.springframework.data.jpa.domain.AbstractPersistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.io.Serializable;
import java.util.List;

public interface MesaExamenRepository extends JpaRepository<MesaExamen, Long> {
    List<MesaExamen> findAll();
    List<MesaExamen> findByid(Long id);

    @Query("SELECT m.id FROM MesaExamen m WHERE m.asignatura.carrera.id = :carreraId")
    List<Long> findMesasExamenDisponibles(@Param("carreraId") int carreraId);

}
