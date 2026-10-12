package com.safe.repository;

import com.safe.model.EntrevistaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntrevistaRepository extends JpaRepository<EntrevistaModel, Long> {
    List<EntrevistaModel> findByPostulanteIdOrderByFechaDescHoraDesc(Long idPostulante);
    List<EntrevistaModel> findAllByOrderByFechaAscHoraAsc();
}
