function modifyAllMenus() {
    const days = ["lunes", "martes", "miercoles", "jueves", "viernes"];

    days.forEach(day => {

        const dayElement = document.getElementById(day);
        if (dayElement) {
            const mealPlan = getMealPlanFromSession(day);
            dayElement.textContent = mealPlan || 'No hay plan de comidas disponible';
        } else {
            console.log(`No se encontró un elemento para el día ${day}`);
        }
    });
}
function getMealPlanFromSession(day) {
    const mealPlan = sessionStorage.getItem(day);
    console.log(mealPlan)
    return mealPlan;
}

document.addEventListener('DOMContentLoaded', (event) => {
    modifyAllMenus();
});
