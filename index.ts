import Jimp from 'jimp';
import * as dotenv from 'dotenv';
import path from 'path';
import { httpServer } from './src/http_server/index.ts';
import robot from 'robotjs';
import { WebSocketServer } from 'ws';

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const { HTTP_PORT } = process.env

console.log(`Start static http server on the ${HTTP_PORT || 3000} port!`);
httpServer.listen(HTTP_PORT || 3000);
