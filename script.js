// Función para generar recomendaciones personalizadas
document.getElementById("dataForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Evita que el formulario se envíe de forma tradicional
    
    // Obtener los valores de los campos del formulario
    const conocimientoBios = document.getElementById("conocimientoBios").value;
    const tipoDispositivo = document.getElementById("tipoDispositivo").value;
    const tipoUso = document.getElementById("tipoUso").value;
    const conocimientoSistema = document.getElementById("conocimientoSistema").value;
    const frecuencia = document.getElementById("frecuencia").value;
    const nucleos = document.getElementById("nucleos").value;
    const ram = document.getElementById("ram").value;
    const turboBoost = document.getElementById("turboBoost").value;
    const disco = document.getElementById("disco").value;
    const gpu = document.getElementById("gpu").value;
    const refrigeracion = document.getElementById("refrigeracion").value;
    
    // Generar recomendaciones basadas en los datos
    let recomendacion = `Tu dispositivo es un ${tipoDispositivo} para ${tipoUso}.`;

    if (conocimientoBios === "no") {
        recomendacion += " Te sugerimos que investigues sobre la BIOS para optimizar el rendimiento.";
    }

    if (frecuencia && nucleos && ram) {
        if (frecuencia >= 3 && nucleos >= 4 && ram >= 8) {
            recomendacion += " Tu sistema tiene un buen rendimiento para tareas intensivas.";
        } else {
            recomendacion += " Podrías mejorar el rendimiento aumentando la frecuencia del procesador o la memoria RAM.";
        }
    }

    if (turboBoost === "activado") {
        recomendacion += " El Turbo Boost está activado, lo que mejora el rendimiento en tareas de alta demanda.";
    } else {
        recomendacion += " Considera activar el Turbo Boost para mejorar el rendimiento en tareas exigentes.";
    }

    if (disco === "ssd") {
        recomendacion += " Estás utilizando un disco SSD, lo que mejora notablemente la velocidad de carga.";
    }

    if (gpu === "dedicada") {
        recomendacion += " Tu GPU dedicada es ideal para juegos y tareas gráficas intensivas.";
    } else {
        recomendacion += " Una GPU dedicada podría mejorar el rendimiento en juegos y aplicaciones gráficas.";
    }

    if (refrigeracion === "malo") {
        recomendacion += " Es importante que mejores la refrigeración de tu sistema para evitar sobrecalentamientos.";
    }

    // Mostrar las recomendaciones
    document.getElementById("recomText").innerText = recomendacion;

    // Generar gráficos de cada componente
    generarGrafico("graficoFrecuencia", "Frecuencia del Procesador", frecuencia, 4, 5, 6, 7);
    generarGrafico("graficoRAM", "Memoria RAM (GB)", ram, 8, 16, 32);
    generarGrafico("graficoDisco", "Tipo de Disco", disco === "ssd" ? 100 : 50, 100, 0);
    generarGrafico("graficoGPU", "GPU", gpu === "dedicada" ? 100 : 50, 100, 0);
    generarGrafico("graficoRefrigeracion", "Refrigeración", refrigeracion === "bueno" ? 100 : refrigeracion === "regular" ? 50 : 0, 100, 0);

    // Recomendaciones adicionales por tipo de uso
    mostrarRecomendaciones(tipoUso, frecuencia, ram, gpu, refrigeracion);
});

// Función para generar el gráfico de cada característica
function generarGrafico(id, label, valor, recomendadoAlto, recomendadoBajo) {
    const ctx = document.getElementById(id).getContext("2d");
    const data = {
        labels: ['Tu valor', 'Valor recomendado'],
        datasets: [{
            label: label,
            data: [valor, valor < recomendadoBajo ? recomendadoBajo : recomendadoAlto],
            backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
        }]
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
function redirigirTutorial(valor) {
    if (valor === "si") {
        window.location.href = "tutoriales.html#bios";
    } else if (valor === "no") {
        window.location.href = "tutoriales.html#infoSistema";
    }
}


// Función para mostrar recomendaciones adicionales
function mostrarRecomendaciones(tipoUso, frecuencia, ram, gpu, refrigeracion) {
    // Recomendaciones basadas en el tipo de uso
    let recomendacionFrecuencia = "";
    let recomendacionRAM = "";
    let recomendacionGPU = "";
    let recomendacionRefrigeracion = "";

    if (tipoUso === "juegos") {
        recomendacionFrecuencia = frecuencia < 3 ? "Considera un procesador con una mayor frecuencia para jugar juegos modernos sin caídas de rendimiento." : "Buen procesador para juegos, puedes disfrutar de la mayoría de los títulos actuales.";
        recomendacionRAM = ram < 16 ? "Se recomienda al menos 16 GB de RAM para un rendimiento fluido en juegos exigentes." : "Tu RAM está adecuada para la mayoría de los juegos actuales.";
        recomendacionGPU = gpu === "dedicada" ? "Tu GPU dedicada es ideal para juegos intensivos." : "Se recomienda una GPU dedicada para mejorar la experiencia de juegos y gráficos intensivos.";
        recomendacionRefrigeracion = refrigeracion === "malo" ? "Mejora la refrigeración para evitar el sobrecalentamiento durante sesiones largas de juegos." : "Tu refrigeración es adecuada para mantener el sistema estable durante juegos intensos.";
    }

    if (tipoUso === "trabajo") {
        recomendacionFrecuencia = frecuencia < 3 ? "Un procesador con mayor frecuencia será más eficiente para tareas multitarea o de procesamiento intensivo." : "Tu procesador es adecuado para trabajos de oficina y multitarea.";
        recomendacionRAM = ram < 8 ? "Considera aumentar la RAM a 8 GB o más para un rendimiento fluido al trabajar con múltiples aplicaciones." : "Tu memoria RAM es suficiente para trabajos de oficina y tareas moderadas.";
        recomendacionGPU = gpu === "dedicada" ? "La GPU dedicada no es esencial para tareas de oficina, pero puede ser útil si trabajas con diseño gráfico o edición." : "Una GPU integrada está bien para tareas de oficina; si trabajas con gráficos, considera una dedicada.";
        recomendacionRefrigeracion = refrigeracion === "malo" ? "Mejora la refrigeración si realizas tareas que requieren un uso prolongado del sistema." : "Tu refrigeración está bien para tareas de oficina y uso general.";
    }

    if (tipoUso === "estudio") {
        recomendacionFrecuencia = frecuencia < 2.5 ? "Un procesador más rápido puede ayudar a optimizar el tiempo de trabajo en proyectos y análisis complejos." : "Tu procesador está bien para la mayoría de tareas académicas y de investigación.";
        recomendacionRAM = ram < 8 ? "Se recomienda 8 GB de RAM como mínimo para manejar múltiples aplicaciones de estudio y navegación sin problemas." : "Tu RAM es adecuada para tareas de estudio, pero más RAM te permitirá tener más aplicaciones abiertas sin problemas.";
        recomendacionGPU = gpu === "dedicada" ? "La GPU dedicada no es esencial para estudio, pero puede ser útil si trabajas con gráficos o animación." : "Una GPU integrada es suficiente para tareas académicas generales.";
        recomendacionRefrigeracion = refrigeracion === "malo" ? "Si vas a usar el sistema por largos períodos, considera mejorar la refrigeración." : "Tu sistema de refrigeración es adecuado para el estudio a largo plazo.";
    }

    // Actualizar recomendaciones en la página
    document.getElementById("recomendacionFrecuencia").innerText = recomendacionFrecuencia;
    document.getElementById("recomendacionRAM").innerText = recomendacionRAM;
    document.getElementById("recomendacionGPU").innerText = recomendacionGPU;
    document.getElementById("recomendacionRefrigeracion").innerText = recomendacionRefrigeracion;
}
