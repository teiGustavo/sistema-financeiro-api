import express from 'express';
import cors from 'cors';

import 'dotenv/config';

import './shared/services/TranslationsYup';
import { ExampleRouter } from './routes';


const server = express();


server.use(cors({
    origin: process.env.ENABLED_CORS?.split(';') || '*'
}));

server.use(express.json());

server.use(process.env.API_BASE_ENDPOINT || '', ExampleRouter);

export { server };