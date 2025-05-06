// Importamos nuestras dependencias
import dotenv from 'dotenv';
dotenv.config();
import express, { Request, response, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';
import Persona from './model/Persona';
import autorouter from './controller/autoController';
import personarouter from './controller/personaController';


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
app.use('/api', personarouter);
app.use('/api', autorouter);

// Mis endpoints van acá

app.get('/', (req,res) => {
    res.json('HELLO WORD');
});



// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
