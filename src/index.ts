import * as dotenv from 'dotenv';
import path from 'path';
import { httpServer } from './http_server';
import robot from 'robotjs';
import {createWebSocketStream, WebSocket, WebSocketServer,} from 'ws';
import drawCircle from "./Methods/drawCircle";
import drawSquare from "./Methods/drawSquare";
import drawRectangle from "./Methods/drawRectangle";
import screen from './Methods/screen'

dotenv.config({
    path: path.join(__dirname, '../.env')
});

const { HTTP_PORT, WSS_PORT } = process.env

const wsServer = new WebSocketServer({
    port: Number(WSS_PORT) || 8080,
})

wsServer.on('connection', function connection(ws: WebSocket) {
    const duplex = createWebSocketStream(ws, { decodeStrings: false, encoding: 'utf8' });
    duplex.on('data', async (data: string) => {
        const changedData: string[] = data.split(' ');
        const action = changedData[0] ? changedData[0].split('_') : [];
        const { x, y } = robot.getMousePos();
        if (changedData[0] === 'mouse_position') {
            console.log(`Recieved: mouse_position ${x},${y}`);
        } else {
            console.log(`Recieved: ${changedData[0]} ${changedData[1] || ''} ${changedData[2] || ''}`);
        }
        switch (action[0]) {
            case 'mouse':
                const shift = Number(changedData[1]);
                switch (action[1]) {
                    case 'position':
                        duplex.write(`mouse_position ${x},${y} \0`)
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
                const size_1 = Number(changedData[1]);
                const size_2 = Number(changedData[2]);
                switch (action[1]) {
                    case 'circle':
                        drawCircle(size_1, x, y)
                        break;
                    case 'square':
                        drawSquare(size_1, x, y)
                        break;
                    case 'rectangle':
                        drawRectangle(size_1, size_2, x, y)
                        break;
                }
                duplex.write(`${changedData[0]}`)
                break;
            case 'prnt':
                const side: number = 200;
                await screen(side, x, y)
                    .then((image: string) => {
                        duplex.write(`prnt_scrn ${image} \0`);
                    })
                    .catch((error) => {
                        console.log(`Error: ${error}`);
                    });
                break;
        }
    });
    duplex.on("error", (err: Error) => {
        console.log(err)
    })
    duplex.write('something');
});

console.log(`Start static http server on the ${HTTP_PORT || 3000} port!`);
httpServer.listen(HTTP_PORT || 3000);
