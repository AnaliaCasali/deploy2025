package com.backend.ISP63.repository;

import com.backend.ISP63.model.Localidad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface LocalidadRepository extends JpaRepository<Localidad,Integer> {

}
