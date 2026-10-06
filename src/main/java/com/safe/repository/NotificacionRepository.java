package com.safe.repository;

import com.safe.model.NotificacionModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacionRepository extends JpaRepository<NotificacionModel, Long> {
    List<NotificacionModel> findByIdPostulanteOrderByFechaDesc(Long idPostulante);
}
