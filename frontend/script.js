const input = document.getElementById("messageInput")
const sendBtn = document.getElementById("sendBtn")
// URL de tu API (ajusta el puerto si es necesario)
const API_URL = 'http://localhost:8000/detector';

function updateButtonState() {
  sendBtn.disabled = input.value.trim() === ""
}

async function sendMessage() {
  const message = input.value.trim()
  if (message) {
    handleSubmit()
    input.value = ""
    updateButtonState()
  }
}

input.addEventListener("input", updateButtonState)

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
})

sendBtn.addEventListener("click", sendMessage)

// Initialize button state
updateButtonState()

// Función para analizar texto
async function analyzeText(text) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: text
      })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al analizar el texto:', error);
    throw error;
  }
}

// Ejemplo de uso
async function handleSubmit() {
  const textInput = document.getElementById('messageInput').value;
  
  try {
    const result = await analyzeText(textInput);
    
    // Mostrar resultados
    console.log('Ofensivo:', result.offensive);
    console.log('Puntuaciones:', result.scores);
    
    // Actualizar la UI con los resultados
    displayResults(result);
  } catch (error) {
    alert('Error al procesar el texto');
  }
}

// Función para mostrar resultados en la UI con estilo Vercel
function displayResults(result) {
  const resultsDiv = document.getElementById('results');

  const statusClass = result.offensive ? 'status-offensive' : 'status-safe';
  const statusText = result.offensive
    ? '⚠️ Contenido ofensivo detectado'
    : '✅ Contenido apropiado';

  let html = `
    <div class="card results-card">
      <h3 class="results-title ${statusClass}">
        ${statusText}
      </h3>

      <h4 class="results-subtitle">Puntuaciones</h4>
      <ul class="results-list">
  `;

  for (const [category, score] of Object.entries(result.scores)) {
    html += `
      <li class="results-item">
        <span class="category">${category}</span>
        <span class="score">${score.toFixed(2)}%</span>
      </li>
    `;
  }

  html += `
      </ul>
    </div>
  `;

  resultsDiv.innerHTML = html;
}