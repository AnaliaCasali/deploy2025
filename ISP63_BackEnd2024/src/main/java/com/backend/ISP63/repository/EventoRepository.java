package com.backend.ISP63.repository;

import com.backend.ISP63.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventoRepository extends JpaRepository< Evento, Long> {
}

