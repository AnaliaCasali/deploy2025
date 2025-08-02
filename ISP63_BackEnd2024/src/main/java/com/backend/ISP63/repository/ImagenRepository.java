package com.backend.ISP63.repository;

import com.backend.ISP63.model.Imagen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImagenRepository extends JpaRepository<Imagen, Integer > {


}

