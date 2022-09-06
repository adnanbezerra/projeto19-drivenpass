import express from 'express';
import 'express-async-errors';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config()

const server = express();
server.use(cors());
server.use(express.json());

const PORT = process.env.PORT;
server.listen(PORT, () => {
    console.log(`It's alive on port ${PORT}`);
})