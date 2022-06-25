import Jimp from 'jimp';
import * as dotenv from 'dotenv';
import path from 'path';
import { httpServer } from './src/http_server';
import robot from 'robotjs';
import {createWebSocketStream, WebSocketServer,} from 'ws';
import drawCircle from "./src/Methods/drawCircle";
import drawSquare from "./src/Methods/drawSquare";
import drawRectangle from "./src/Methods/drawRectangle";

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const { HTTP_PORT, WSS_PORT } = process.env

const wsServer = new WebSocketServer({
    port: Number(WSS_PORT) || 8080,
})

const duplex = createWebSocketStream(wsServer, { decodeStrings: false, encoding: 'utf8' });

duplex.on('connection', function connection(ws) {

    duplex.on('message', function message(data) {
        const changedData: string[] = data.toString().split(' ');
        const action = changedData[0] ? changedData[0].split('_') : [];
        console.log(changedData)
        const { x, y } = robot.getMousePos();
        switch (action[0]) {
            case 'mouse':
                const shift = Number(changedData[1]);
                switch (action[1]) {
                    case 'position':
                        duplex.write(`mouse_position ${x},${y}`)
                        break;
                    case 'up':
                        robot.moveMouse(x, y - shift);
                        duplex.write(`${changedData[0]}`)
                        break;
                    case 'down':
                        robot.moveMouse(x, y + shift);
                        duplex.write(`${changedData[0]}`)
                        break;
                    case 'left':
                        robot.moveMouse(x - shift, y);
                        duplex.write(`${changedData[0]}`)
                        break;
                    case 'right':
                        robot.moveMouse(x + shift, y);
                        duplex.write(`${changedData[0]}`)
                        break;
                }
                break;
            case 'draw':
                switch (action[1]) {
                    case 'circle':
                        drawCircle(Number(changedData[1]), x, y)
                        break;
                    case 'square':
                        drawSquare(Number(changedData[1]), x, y)
                        break;
                    case 'rectangle':
                        drawRectangle(Number(changedData[1]), Number(changedData[2]), x, y)
                        break;
                }
                duplex.write(`${changedData[0]}`)
                break;
            case 'prnt_scrn':
                break;
        }
    });

    ws.send('something');
});

console.log(`Start static http server on the ${HTTP_PORT || 3000} port!`);
httpServer.listen(HTTP_PORT || 3000);
