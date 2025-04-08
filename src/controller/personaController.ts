import express from 'express';
import { obtenerPersonas, crearPersona } from '../service/personaService';

const personarouter = express.Router();

personarouter.get('/personas', (req, res) => {
  try {
    const personas = obtenerPersonas();
    res.json(personas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener personas' });
  }
});

personarouter.post('/persona', (req, res) => {
  try {
    const persona = crearPersona(req.body);
    res.status(201).json({ persona });
  } catch (error: any) {
    if (error.message === 'Datos inválidos') {
      res.status(400).json({ message: error.message });
    } else if (error.message === 'DNI en uso') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
});

export default personarouter;