package com.safe.service;

import com.safe.dto.RankingResponseDTO;
import com.safe.model.EvaluacionAsignadaModel;
import com.safe.model.EvaluacionModel;
import com.safe.model.PostulacionModel;
import com.safe.model.PostulanteModel;
import com.safe.model.PuestoModel;
import com.safe.repository.EvaluacionAsignadaRepository;
import com.safe.repository.PostulacionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class RankingServiceTest {

    private final PostulacionRepository postulaciones = mock(PostulacionRepository.class);
    private final EvaluacionAsignadaRepository asignaciones = mock(EvaluacionAsignadaRepository.class);
    private final RankingService service = new RankingService(
            postulaciones, asignaciones, new BigDecimal("0.4"), new BigDecimal("0.6"));

    @Test
    void calculaCuarentaPorCientoCvYSesentaPorCientoEvaluaciones() {
        PostulacionModel postulacion = postulacion(10L, 1L, "82.5");
        when(postulaciones.findAll()).thenReturn(List.of(postulacion));
        when(asignaciones.findByPostulanteOrderByFechaDescHoraInicioDesc(any()))
                .thenReturn(List.of(asignacion(1L, 1L, 1, "FINALIZADA", "40", "50")));

        List<RankingResponseDTO> resultado = service.calcularRanking();

        assertEquals(1, resultado.size());
        assertEquals(new BigDecimal("81.00"), resultado.get(0).getPromedioFinal());
    }

    @Test
    void noIncluyePostulacionesSinEvaluacionesCorregidas() {
        PostulacionModel postulacion = postulacion(10L, 1L, "90");
        when(postulaciones.findAll()).thenReturn(List.of(postulacion));
        when(asignaciones.findByPostulanteOrderByFechaDescHoraInicioDesc(any())).thenReturn(List.of());

        assertEquals(List.of(), service.calcularRanking());
    }

    @Test
    void elIntentoMasRecientePendienteBloqueaElPuntajeAnterior() {
        PostulacionModel postulacion = postulacion(10L, 1L, "90");
        when(postulaciones.findAll()).thenReturn(List.of(postulacion));
        when(asignaciones.findByPostulanteOrderByFechaDescHoraInicioDesc(any())).thenReturn(List.of(
                asignacion(1L, 1L, 1, "FINALIZADA", "40", "50"),
                asignacion(2L, 1L, 1, "PENDIENTE", null, null)
        ));

        assertEquals(List.of(), service.calcularRanking());
    }

    @Test
    void ordenaPorPuestoPuntajeYPostulante() {
        PostulacionModel segundo = postulacion(20L, 2L, "70");
        PostulacionModel primeroB = postulacion(20L, 1L, "80");
        PostulacionModel primeroA = postulacion(10L, 1L, "80");
        when(postulaciones.findAll()).thenReturn(List.of(segundo, primeroB, primeroA));
        when(asignaciones.findByPostulanteOrderByFechaDescHoraInicioDesc(any())).thenAnswer(invocation -> {
            PostulanteModel postulante = invocation.getArgument(0);
            return postulante.getId().equals(20L)
                    ? List.of(
                            asignacion(1L, 1L, 1, "FINALIZADA", "80", "100"),
                            asignacion(2L, 2L, 2, "FINALIZADA", "70", "100"))
                    : List.of(asignacion(3L, 1L, 1, "FINALIZADA", "80", "100"));
        });

        List<RankingResponseDTO> resultado = service.calcularRanking();

        assertEquals(List.of(1L, 1L, 2L), resultado.stream().map(RankingResponseDTO::getIdPuesto).toList());
        assertEquals(List.of(10L, 20L, 20L), resultado.stream().map(RankingResponseDTO::getIdPostulante).toList());
    }

    @Test
    void rechazaPesosQueNoSumanUno() {
        assertThrows(IllegalArgumentException.class, () -> new RankingService(
                postulaciones, asignaciones, new BigDecimal("0.5"), new BigDecimal("0.6")));
    }

    private PostulacionModel postulacion(long idPostulante, long idPuesto, String scoreCv) {
        PostulanteModel postulante = new PostulanteModel();
        postulante.setId(idPostulante);
        PuestoModel puesto = new PuestoModel();
        ReflectionTestUtils.setField(puesto, "id", idPuesto);

        PostulacionModel postulacion = new PostulacionModel();
        postulacion.setPostulante(postulante);
        postulacion.setPuesto(puesto);
        postulacion.setEstado("CUMPLE_CV");
        postulacion.setScoreIa(new BigDecimal(scoreCv));
        return postulacion;
    }

    private EvaluacionAsignadaModel asignacion(
            long id,
            long idPuesto,
            int idEvaluacion,
            String estado,
            String puntaje,
            String maximo) {
        EvaluacionModel evaluacion = new EvaluacionModel();
        evaluacion.setId(idEvaluacion);
        EvaluacionAsignadaModel asignacion = new EvaluacionAsignadaModel();
        ReflectionTestUtils.setField(asignacion, "id", id);
        asignacion.setIdPuesto(idPuesto);
        asignacion.setEvaluacion(evaluacion);
        asignacion.setEstado(estado);
        asignacion.setPuntajeTotal(puntaje == null ? null : new BigDecimal(puntaje));
        asignacion.setPuntajeMaxResultado(maximo == null ? null : new BigDecimal(maximo));
        return asignacion;
    }
}
