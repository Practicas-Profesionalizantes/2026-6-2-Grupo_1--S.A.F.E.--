package com.safe.service;

import com.safe.dto.EvaluacionRequestDTO;
import com.safe.model.EvaluacionModel;
import com.safe.repository.EvaluacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EvaluacionService {

    @Autowired
    private EvaluacionRepository evaluacionRepository;

    public EvaluacionModel crearEvaluacion(EvaluacionRequestDTO dto) {
        EvaluacionModel evaluacion = new EvaluacionModel();
        evaluacion.setTipo(dto.getTipo());
        evaluacion.setDuracion(dto.getDuracion());
        evaluacion.setPuntajeMin(dto.getPuntajeMin());
        evaluacion.setPuntajeMax(dto.getPuntajeMax());
        
        // Si viene nulo en el JSON, por defecto asignamos true como en la DB
        evaluacion.setOnline(dto.getOnline() != null ? dto.getOnline() : true);
        evaluacion.setIdPuesto(dto.getIdPuesto());

        return evaluacionRepository.save(evaluacion);
    }
}