const API_URL = "http://localhost:3000/api/indicators";

// Renderizar indicadores desde la API
async function renderIndicators() {
    const response = await fetch(API_URL);
    const data = await response.json();
    list.innerHTML = "";
    data
        .filter((item) => item.dataset === currentDataset)
        .forEach((item, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.trazadora}</td>
                <td>${item.month}</td>
                <td>${item.value}</td>
                <td>${item.percentage}</td>
                <td>${item.goal}</td>
            `;
            list.appendChild(row);
        });
}

// Agregar un nuevo indicador a través de la API
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newItem = {
        dataset: currentDataset,
        name: document.getElementById("indicator-name").value,
        trazadora: document.getElementById("trazadora").value,
        month: document.getElementById("month").value,
        value: parseInt(document.getElementById("value").value),
        percentage: parseFloat(document.getElementById("percentage").value),
        goal: parseInt(document.getElementById("goal").value),
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
    });
    renderIndicators();
    form.reset();
});

// Inicializar
renderIndicators();
