import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import './shared/services/TranslationsYup';
import { EmpresasRouter, DocumentosRouter, TransacoesRouter } from './routes';


const server = express();


// server.use(cors({
//     origin: process.env.ENABLED_CORS?.split(';') || '*'
// }));

server.use(cors());

server.use(express.json());

server.use(process.env.API_BASE_ENDPOINT || '', EmpresasRouter);
server.use(process.env.API_BASE_ENDPOINT || '', DocumentosRouter);
server.use(process.env.API_BASE_ENDPOINT || '', TransacoesRouter);

export { server };