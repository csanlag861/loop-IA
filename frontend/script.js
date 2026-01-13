// URL de tu API (ajusta el puerto si es necesario)
const API_URL = 'http://localhost:8000/detector';

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
  const textInput = document.getElementById('textInput').value;
  
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

// Función para mostrar resultados en la UI
function displayResults(result) {
  const resultsDiv = document.getElementById('results');
  
  let html = `<h3>${result.offensive ? '⚠️ Contenido ofensivo detectado' : '✅ Contenido apropiado'}</h3>`;
  html += '<h4>Puntuaciones:</h4><ul>';
  
  for (const [category, score] of Object.entries(result.scores)) {
    html += `<li>${category}: ${score.toFixed(2)}%</li>`;
  }
  
  html += '</ul>';
  resultsDiv.innerHTML = html;
}