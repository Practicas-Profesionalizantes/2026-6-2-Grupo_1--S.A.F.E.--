package com.safe.service;

import com.safe.dto.EvaluacionRequestDTO;
import com.safe.model.Evaluacion;
import com.safe.repository.EvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class EvaluacionService {

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    public Optional<Evaluacion> editarEvaluacion(Integer id, EvaluacionRequestDTO dto) {
        return evaluacionRepository.findById(id).map(evaluacion -> {
            if (dto.getTipo() != null) evaluacion.setTipo(dto.getTipo());
            if (dto.getDuracion() != null) evaluacion.setDuracion(dto.getDuracion());
            if (dto.getPuntajeMin() != null) evaluacion.setPuntajeMin(dto.getPuntajeMin());
            if (dto.getPuntajeMax() != null) evaluacion.setPuntajeMax(dto.getPuntajeMax());
            if (dto.getOnline() != null) evaluacion.setOnline(dto.getOnline());
            if (dto.getIdPuesto() != null) evaluacion.setIdPuesto(dto.getIdPuesto());
            
            return evaluacionRepository.save(evaluacion);
        });
    }
}