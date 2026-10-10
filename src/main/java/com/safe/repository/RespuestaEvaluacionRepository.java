package com.safe.repository;

import com.safe.model.RespuestaEvaluacionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RespuestaEvaluacionRepository extends JpaRepository<RespuestaEvaluacionModel, Long> {

    List<RespuestaEvaluacionModel> findByAsignacionId(Long idAsignacion);

    Optional<RespuestaEvaluacionModel> findByAsignacionIdAndPreguntaId(Long idAsignacion, Long idPregunta);
}
