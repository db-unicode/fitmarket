const API_KEY = "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"

export async function getDayPlan(dayNameString, userData) {
    const prompt = `Plan de comidas para el ${dayNameString}, para una persona con estas caracteristicas: ${userData.altura}cm, ${userData.peso}kg, ${userData.presupuesto}COP, ${userData.meta}, sin ${userData.restricciones}. Incluye desayuno, almuerzo y cena con plato principal, acompañamientos, postre y bebida, distingue las diferentes partes.
`   
    const response = await getCompletion(prompt);
    console.log(response);
    sessionStorage.setItem(dayNameString, response);
}



async function getCompletion(prompt) {
    console.log(API_KEY);
    const response = await fetch(`https://api.openai.com/v1/completions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 4000,
        }),
    });
    
    const data = await response.json();
    console.log(data.choices[0].text);
    return data.choices[0].text;
}



// // Datos de ejemplo para el usuario
// const userDataExample = {
//     altura: 170, // Altura en centímetros
//     peso: 65, // Peso en kilogramos
//     presupuesto: 50000, // Presupuesto en pesos colombianos
//     meta: "mantener peso", // Objetivo de la dieta
//     restricciones: "sin gluten, sin lactosa" // Restricciones dietéticas
// };

// // Nombre del día para el plan de comidas
// const dayName = "Miércoles";

// // Llamada a la función con los datos de ejemplo
// getDayPlan(dayName, userDataExample);

// console.log(getCompletion(`Plan de comidas para Lunes: 170 cm, 65 kg, 30000 COP, mantener peso, sin gluten/lactosa. Incluye desayuno, almuerzo y cena con plato principal, acompañamientos, postre y bebida.`
// ))
