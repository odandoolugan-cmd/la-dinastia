
// ============================================
// ia.js - IA Local para todas tus páginas
// Repositorio: El que ya tienes
// ============================================

const IA_CONFIG = {
    ip: '192.168.100.34',
    puerto: '8005',
    modelo: 'deepseek-r1-distill-qwen-1.5b'
};

// Función principal para preguntar a la IA
async function preguntarIA(pregunta) {
    try {
        const response = await fetch(`http://${IA_CONFIG.ip}:${IA_CONFIG.puerto}/ai/text`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                prompt: pregunta,
                model: IA_CONFIG.modelo,
                maxTokens: 500,
                temperature: 0.7
            })
        });
        const data = await response.json();
        return data.text || data.response || "Sin respuesta";
    } catch (error) {
        return "❌ Error: ¿App AI Phone Server abierta?";
    }
}

// ========== FUNCIONES PARA CADA PÁGINA ==========

// 1. La Dinastía - Chat táctico/fútbol
async function chatDinastia(mensaje) {
    const prompt = `Eres un experto en fútbol y táctica deportiva. Responde de manera concisa y apasionada sobre: ${mensaje}`;
    return await preguntarIA(prompt);
}

// 2. Moon - Predicción de criptomonedas
async function predecirCripto(moneda, precio, volumen) {
    const prompt = `Analiza ${moneda} a ${precio} USD con volumen ${volumen}. Da predicción corta (compra/venta/esperar) y score del 0-100. Solo responde con datos concretos.`;
    return await preguntarIA(prompt);
}

// 3. Humanazatie Deep - Reformular texto (quitar plagio)
async function reformularTexto(texto) {
    const prompt = `Reescribe este texto con palabras diferentes, mismo significado, tono natural y profesional. No agregues ni quites información importante. Texto original: "${texto}"`;
    return await preguntarIA(prompt);
}

// Función para verificar estado del servidor
async function verificarIA() {
    try {
        const response = await fetch(`http://${IA_CONFIG.ip}:${IA_CONFIG.puerto}/status`);
        const data = await response.json();
        return data.status === 'running' && data.ai?.isEnabled === true;
    } catch {
        return false;
    }
}
