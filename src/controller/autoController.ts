import express from "express";
import {
  crearAuto,
  editarAuto,
  eliminarAuto,
  obtenerTodosLosAutos,
  obtenerAutosDePersona,
} from "../service/autoService";

const autoRouter = express.Router();

autoRouter.get("/autos/:idPersona?", async (req, res) => {
  try {
    const { idPersona } = req.params;

    const autos = idPersona
      ? await obtenerAutosDePersona(idPersona)
      : await obtenerTodosLosAutos();

    if (!autos || autos.length === 0) {
      const mensaje = idPersona
        ? "No se encontraron autos para esta persona"
        : "No se encontraron autos en el sistema";

      res.status(404).json({ message: mensaje });
      return;
    }

    res.json(autos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

autoRouter.post("/autos", async (req, res) => {
  try {
    const { id, auto } = req.body;
    const nuevoAuto = await crearAuto(id, auto);

    if (!nuevoAuto) {
      res.status(400).json({ message: "Los valores del auto no son válidos" });
    } else {
      res.status(201).json({ auto: nuevoAuto });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

autoRouter.put("/autos/:idPersona/:idAuto", async (req, res) => {
  try {
    const { idPersona, idAuto } = req.params;
    const nuevosDatos = req.body;

    const autoActualizado = await editarAuto(idPersona, idAuto, nuevosDatos);

    if (!autoActualizado) {
      res.status(404).json({ message: "El auto no se pudo actualizar, verifica los datos" });
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

autoRouter.delete("/autos/:idPersona/:idAuto", async (req, res) => {
  try {
    const { idPersona, idAuto } = req.params;

    const eliminado = await eliminarAuto(idPersona, idAuto);

    if (!eliminado) {
      res.status(404).json({ message: "No se pudo eliminar el auto, verifica los datos" });
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default autoRouter;