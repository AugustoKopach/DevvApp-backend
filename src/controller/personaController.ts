import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { crearPersona, editarPersona, eliminarPersona, obtenerPersonasResumen } from '../service/personaService';
import { Persona } from '../model/Persona';

const router = express.Router();

router.get('/personas', (req, res) => {
  res.json(obtenerPersonasResumen());
});

router.post('/persona', (req, res) => {
  const nueva: Persona = { ...req.body, id: uuidv4(), autos: req.body.autos || [] };
  const resultado = crearPersona(nueva);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.status(201).json(resultado);
  }
});

router.put('/persona/:id', (req, res) => {
  const resultado = editarPersona(req.params.id, req.body);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.status(200).json({ message: 'Actualizada correctamente' });
  }
});

router.delete('/persona/:id', (req, res) => {
  const resultado = eliminarPersona(req.params.id);

  if ('error' in resultado) {
    res.status(resultado.error).json({ message: resultado.message });
  } else {
    res.sendStatus(200);
  }
});

export default router;
