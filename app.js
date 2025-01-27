let currentDataset = "BSL"; // Conjunto de datos actual
let data = JSON.parse(localStorage.getItem("indicators")) || []; // Recuperar datos almacenados

// Referencias al DOM
const btnBSL = document.getElementById("btn-bsl");
const btnFONASA = document.getElementById("btn-fonasa");
const form = document.getElementById("add-indicator-form");
const list = document.getElementById("indicator-list");

// Función para renderizar los indicadores
function renderIndicators() {
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

// Cambiar el conjunto de datos
btnBSL.addEventListener("click", () => {
  currentDataset = "BSL";
  renderIndicators();
});

btnFONASA.addEventListener("click", () => {
  currentDataset = "FONASA";
  renderIndicators();
});

// Agregar un nuevo indicador
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const newItem = {
    dataset: currentDataset,
    name: document.getElementById("indicator-name").value,
    trazadora: document.getElementById("trazadora").value,
    month: document.getElementById("month").value,
    value: document.getElementById("value").value,
    percentage: document.getElementById("percentage").value,
    goal: document.getElementById("goal").value,
  };
  data.push(newItem);
  localStorage.setItem("indicators", JSON.stringify(data)); // Guardar en almacenamiento local
  renderIndicators();
  form.reset();
});

// Inicializar renderizado
renderIndicators();
