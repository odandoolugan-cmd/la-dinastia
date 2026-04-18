// ============================================
// IA Local - API para conectar páginas web con IA del teléfono
// ============================================

const IA_CONFIG = {
    ip: '192.168.100.34',   // ← TU IP actual
    puerto: '8005',
    modelo: 'deepseek-r1-distill-qwen-1.5b'
};

// Función principal para preguntar a la IA
async function preguntarIA(pregunta) {
    try {
        console.log('Enviando pregunta a IA local:', pregunta);
        
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
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Respuesta IA local:', data);
        
        return data.text || data.response || "No se recibió respuesta";
        
    } catch (error) {
        console.error('Error en preguntarIA:', error);
        return null;  // Retorna null si falla
    }
}

// Función para verificar estado del servidor
async function verificarIA() {
    try {
        const response = await fetch(`http://${IA_CONFIG.ip}:${IA_CONFIG.puerto}/status`);
        const data = await response.json();
        const disponible = data.status === 'running' && data.ai?.isEnabled === true;
        console.log('IA Local disponible:', disponible);
        return disponible;
    } catch (error) {
        console.error('Error verificando IA:', error);
        return false;
    }
}

// Función específica para La Dinastía (chat táctico)
async function chatDinastia(mensaje) {
    const prompt = `Eres un experto entrenador de fútbol. Responde de manera CONCISA, APASIONADA y ÚTIL. Máximo 3 oraciones. Pregunta: ${mensaje}`;
    return await preguntarIA(prompt);
}

// Función específica para Moon (predicción cripto)
async function predecirCripto(moneda, precio, volumen) {
    const prompt = `Analiza ${moneda} a ${precio} USD. Da predicción corta (COMPRA/VENTA/ESPERAR) y un score del 0-100. Solo datos concretos.`;
    return await preguntarIA(prompt);
}

// Función específica para Humanazatie Deep (reformular)
async function reformularTexto(texto) {
    const prompt = `Reescribe este texto con palabras diferentes, mismo significado, tono profesional. No agregues ni quites información. Texto: "${texto}"`;
    return await preguntarIA(prompt);
}
