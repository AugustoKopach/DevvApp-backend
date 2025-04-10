import express from 'express';
import { crearAuto, editarAuto, eliminarAuto,  obtenerTodosLosAutos, obtenerAutosDePersona} from '../service/autoService';

const autoRouter = express.Router();

autoRouter.get('/autos/:idPersona?', (req, res) => {
    const { idPersona } = req.params;

    const autos = idPersona
      ? obtenerAutosDePersona(idPersona)
      : obtenerTodosLosAutos();

    if (!autos) {
      res.status(404).json({ message: 'Persona no encontrada o sin autos' });
      return;
    }

    res.json(autos);
  });

autoRouter.post('/autos', (req, res) => {
  const { id, auto } = req.body;
  const nuevoAuto = crearAuto(id, auto);

  if (!nuevoAuto) {
    res.status(400).json({ message: 'no son validos los valores' });
  } else {
    res.status(201).json({ auto: nuevoAuto });
  }
});

autoRouter.put('/autos/:idPersona/:idAuto', (req, res) => {
  const { idPersona, idAuto } = req.params;
  const nuevosDatos = req.body;

  const autoActualizado = editarAuto(idPersona, idAuto, nuevosDatos);

  if (!autoActualizado) {
    res.status(404).json({ message: 'no son valores los validos booeee' });
  } else {
    res.sendStatus(200);
  }
});

autoRouter.delete('/autos/:idPersona/:idAuto', (req, res) => {
  const { idPersona, idAuto } = req.params;

  const eliminado = eliminarAuto(idPersona, idAuto);

  if (!eliminado) {
    res.status(404).json({ message: 'valores no validos wey' });
  } else {
    res.sendStatus(200);
  }
});

export default autoRouter;
