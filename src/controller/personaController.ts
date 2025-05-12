import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  crearPersona,
  editarPersona,
  eliminarPersona,
  obtenerPersonaPorId,
  obtenerPersonasResumen,
} from "../service/personaService";

const router = express.Router();

router.get("/persona/:id?", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const persona = await obtenerPersonaPorId(id);
      if (!persona) {
        res.status(404).json({ message: "Persona no encontrada" });
      } else {
        res.json(persona);
      }
    } else {
      const resumen = await obtenerPersonasResumen();
      res.json(resumen);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.post("/persona", async (req, res) => {
  try {
    const id = uuidv4();
    const datos = { ...req.body, id };

    const resultado = await crearPersona(datos);
    if ("error" in resultado) {
      res.status(resultado.error).json({ message: resultado.message });
    } else {
      res.status(201).json(resultado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.put("/persona/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const datos = { ...req.body, id };

    const resultado = await editarPersona(id, datos);
    if ("error" in resultado) {
      res.status(resultado.error).json({ message: resultado.message });
    } else {
      res.json(resultado);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

router.delete("/persona/:id", async (req, res) => {
  try {
    const resultado = await eliminarPersona(req.params.id);
    if ("error" in resultado) {
      res.status(resultado.error).json({ message: resultado.message });
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

export default router;
