import { Persona, Genero } from '../model/Persona';

export const personas: Persona[] = [
    {
        id: '12',
        dni: '12345678',
        nombre: 'pedro ',
        apellido: 'picapiedras',
        fechaNacimiento: '1990-05-15',
        genero: Genero.Masculino,
        donanteOrganos: true,
        autos: [
            {
                id: "21",
                marca: 'Toyota',
                modelo: 'Hilux',
                anio: 2020,
                patente: 'ABC123',
                color: 'Rojo',
                numeroChasis: 'CHASIS123',
                numeroMotor: 'MOTOR123',
                duenioId: '12'
            }
        ]
    },
    {
        id: '1',
        dni: '214514241',
        nombre: 'pichichi',
        apellido: 'sarasi',
        fechaNacimiento: '1985-08-22',
        genero: Genero.Femenino,
        donanteOrganos: false,
        autos: []
    }
];
