package com.backend.ISP63.repository;

import com.backend.ISP63.model.Asignatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface AsignaturaRepository extends JpaRepository<Asignatura, Integer> {
  List<Asignatura> findAll();
  List<Asignatura> findByCarreraId(Integer carreraId); // Consultas personalizadas

  List<Asignatura> findByCarreraIdAndAnio(Integer carrera, int anio);
 }
