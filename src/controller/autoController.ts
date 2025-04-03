import express from 'express';
import Persona from '../model/Persona';

const autorouter = express.Router();

const personas: Persona[] = [];

autorouter.get('/autos', (req, res) => {
    const dni = req.query.dni as string | undefined;

    if (!dni) {
        const todosLosAutos = personas.map(p => p.autos).flat();
         res.status(200).json({ message: 'Todos los autos:', autos: todosLosAutos });
    }

    const persona = personas.find(p => p.dni === dni);

    if (!persona) {
        throw res.status(404).json({ message: 'El DNI no corresponde a ninguna persona' });
    }

        res.status(200).json({ message: 'Los autos son:', autos: persona.autos });
});

autorouter.post('/autos', (req, res) => {
    const { dni, auto } = req.body;

    const persona = personas.find(p => p.dni === dni);
    if (!persona) {
        throw res.status(404).json({ message: 'Persona no encontrada' });
    }

    const { marca, modelo, año, patente, color, numeroChasis, numeroMotor } = auto;

    const nuevoAuto = { marca, modelo, año, patente, color, numeroChasis, numeroMotor };

    persona.autos.push(nuevoAuto);

         res.status(201).json({ auto: nuevoAuto });
});

export default autorouter;