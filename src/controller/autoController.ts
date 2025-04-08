import express from 'express';
import { AutoService } from '../service/autoService';

const autorouter = express.Router();

autorouter.get('/autos', (req, res) => {
    const id = req.query.id as string | undefined;
    const autos = AutoService.listarAutos(id);
    res.status(200).json({ message: 'Autos encontrados', autos });
});

autorouter.post('/autos', (req, res) => {
    const { id, auto } = req.body;
    const resultado = AutoService.agregarAuto(id, auto);

    if (!resultado.success) {
        const status = resultado.error === 'Persona no encontrada' ? 404 : 400;
         res.send(status).json({ message: resultado.error });
    }

    res.send(201)
});

export default autorouter;