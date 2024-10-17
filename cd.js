// Función para mostrar el enlace de BIOS si el usuario no sabe qué es la BIOS
function mostrarEnlaceBios() {
    var bios = document.getElementById("bios").value;
    var enlaceBios = document.getElementById("enlaceBios");
    if (bios === "no") {
        enlaceBios.style.display = "block";
    } else {
        enlaceBios.style.display = "none";
    }
}

// Función para mostrar el enlace de información del sistema si el usuario no sabe cómo encontrarla
function mostrarEnlaceInfo() {
    var info = document.getElementById("info").value;
    var enlaceInfo = document.getElementById("enlaceInfo");
    if (info === "no") {
        enlaceInfo.style.display = "block";
    } else {
        enlaceInfo.style.display = "none";
    }
}

// Función para mostrar el enlace de Turbo Boost si el usuario no sabe qué es
function mostrarEnlaceTurbo() {
    var turbo = document.getElementById("turbo").value;
    var enlaceTurbo = document.getElementById("enlaceTurbo");
    if (turbo === "no") {
        enlaceTurbo.style.display = "block";
    } else {
        enlaceTurbo.style.display = "none";
    }
}

// Función para generar las gráficas y mostrar recomendaciones
function generarGraficas() {
    var cpu = document.getElementById("cpu").value;
    var ram = document.getElementById("ram").value;
    var refrigeracion = document.getElementById("refrigeracion").value;

    // Eliminar la gráfica previa
    var chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = '<canvas id="myChart" width="300" height="150"></canvas>';

    // Crear la gráfica
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['CPU (GHz)', 'RAM (GB)', 'Refrigeración (1-10)'],
            datasets: [{
                label: 'Datos del Sistema',
                data: [cpu, ram, refrigeracion],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Mostrar recomendaciones según los valores ingresados
    var recomendaciones = document.getElementById('recomendacionesContainer');
    recomendaciones.style.display = "block";

    var textoRecomendaciones = "<h3>Recomendaciones</h3><ul>";
    if (ram < 16) {
        textoRecomendaciones += "<li>Actualizar la RAM a 16 GB para un mejor rendimiento.</li>";
    }
    if (cpu < 3.5) {
        textoRecomendaciones += "<li>Considerar un procesador con una frecuencia superior a 3.5 GHz para un rendimiento óptimo en tareas exigentes.</li>";
    }
    textoRecomendaciones += "</ul>";

    recomendaciones.innerHTML = textoRecomendaciones;
}
