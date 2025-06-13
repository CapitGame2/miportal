// api/get-presentation.js

export default function handler(request, response) {
  // --- CÓDIGO IMPORTANTE PARA QUE TU WEB PUEDA HABLAR CON VERCEL ---
  // ¡¡RECUERDA CAMBIAR ESTO POR TU DOMINIO REAL!!
  response.setHeader('Access-Control-Allow-Origin', 'https://www.sergioroman.es'); 
  response.setHeader('Access-Control-Allow-Methods', 'GET');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // --- FIN DE CÓDIGO IMPORTANTE ---

  // Si es una petición de sistema, la aceptamos y terminamos.
  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const { key } = request.query;

  try {
    // Leemos nuestra "base de datos" secreta que configuraremos en Vercel
    const presentationMap = JSON.parse(process.env.PRESENTATION_DB_JSON);

    // Buscamos la clave que nos han enviado
    const normalizedKey = key ? key.toUpperCase() : '';
    const definitionUrl = presentationMap[normalizedKey];

    // Si la encontramos, la devolvemos
    if (definitionUrl) {
      response.status(200).json({ definitionUrl });
    } else {
    // Si no la encontramos, devolvemos un error
      response.status(404).json({ error: 'Clave no válida.' });
    }
  } catch (error) {
    console.error('Error del servidor:', error);
    response.status(500).json({ error: 'Error interno del servidor.' });
  }
}
