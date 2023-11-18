import { getDayPlan } from "./async_logic.js";

document.addEventListener('DOMContentLoaded', function () {
    let botonAceptar = document.querySelector('.form-accept-button');

    if (botonAceptar) {
        botonAceptar.addEventListener('click', async function () {
            // Extraer los valores
            if (!document.getElementById('presupuesto').value ||
                !document.getElementById('edad').value ||
                !document.getElementById('estatura').value ||
                !document.getElementById('peso').value ||
                (!document.getElementById('definicion').checked &&
                    !document.getElementById('volumen').checked &&
                    !document.getElementById('mantenimiento').checked)) {
                alert('Por favor, completa todos los campos y selecciona una meta.');
                return; // Detener la ejecución de la función aquí
            }

            let presupuesto = document.getElementById('presupuesto').value;
            let edad = document.getElementById('edad').value;
            let estatura = document.getElementById('estatura').value;
            let peso = document.getElementById('peso').value;

            let metas;
            if (document.getElementById('definicion').checked) {
                metas = 'definicion';
            } else if (document.getElementById('volumen').checked) {
                metas = 'volumen';
            } else if (document.getElementById('mantenimiento').checked) {
                metas = 'mantenimiento';
            }

            let alergiasLimitaciones = [];
            if (document.getElementById('frutos_secos').checked) {
                alergiasLimitaciones.push('frutos_secos');
            }
            if (document.getElementById('mariscos').checked) {
                alergiasLimitaciones.push('mariscos');
            }
            if (document.getElementById('huevo').checked) {
                alergiasLimitaciones.push('huevo');
            }
            if (document.getElementById('lactosa').checked) {
                alergiasLimitaciones.push('lactosa');
            }

            console.log(presupuesto, edad, estatura, peso, metas, alergiasLimitaciones);

            // Limpiar los valores de los inputs
            document.getElementById('presupuesto').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('estatura').value = '';
            document.getElementById('peso').value = '';
            document.getElementById('definicion').checked = false;
            document.getElementById('volumen').checked = false;
            document.getElementById('mantenimiento').checked = false;
            document.getElementById('frutos_secos').checked = false;
            document.getElementById('mariscos').checked = false;
            document.getElementById('huevo').checked = false;
            document.getElementById('lactosa').checked = false;

            const userData = {
                presupuesto: presupuesto,
                edad: edad,
                altura: estatura,
                peso: peso,
                meta: metas,
                restricciones: alergiasLimitaciones
            };



            const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];
            console.log("init async")
            Promise.all(days.map(day => getDayPlan(day, userData)))
                .then(() => {
                    console.log("Todas las operaciones asíncronas completadas");
                    window.location.href = 'food_chart_page.html';
                })
                .catch(error => {
                    console.error("Error en las operaciones asíncronas: ", error);
                });
        });
    } else {
        console.log('El botón aceptar no fue encontrado');
    }
});
