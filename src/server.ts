// Importamos nuestras dependencias
import express, { Request, response, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import Persona from './model/Persona';
import autorouter from './Repository/autoRepository.js';


const personas: Persona[] = [];

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(autorouter);
app.use('/api', autorouter);

// Mis endpoints van acá

app.get('/', (req,res) => {
    res.json('HELLO WORD');
});

app.get('/personas', (req, res) => {
    const datosamostrar = personas.map(persona => ({
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido,
    }));

    res.json(datosamostrar);
});


app.post('/persona', (req, res) => {
    const nuevaPersona: Persona = req.body;

    personas.push({ ...nuevaPersona, autos: nuevaPersona.autos || [] });
    res.status(201).json({ persona: nuevaPersona });
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
