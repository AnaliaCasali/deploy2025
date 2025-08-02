package com.backend.ISP63.repository;
import java.io.File;
import java.util.List;
import java.util.Optional;

import com.backend.ISP63.model.Carrera;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CarreraRepository  extends JpaRepository<Carrera,Integer > {
    List<Carrera> findByCarreraStartsWith(String comienceCon);


}
