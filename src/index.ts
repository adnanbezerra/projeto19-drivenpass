import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
import { CardsRouter } from './routes/CardsRouter.js';
import { CredentialsRouter } from './routes/CredentialsRouter.js';
import { SafeNotesRouter } from './routes/SafeNotesRouter.js';
import { UserRouter } from './routes/UserRouter.js';
import { WiFiRouter } from './routes/WifiRouter.js';
import errorHandler from './middlewares/ErrorHandler.js';
dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());

server.use(CardsRouter);
server.use(CredentialsRouter);
server.use(SafeNotesRouter);
server.use(UserRouter);
server.use(WiFiRouter);
server.use(errorHandler);

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`It's alive on port ${PORT}`);
})