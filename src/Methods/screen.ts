import robot from "robotjs";
import Jimp from 'jimp';

export default async function screen (size: number, posX: number, posY: number): Promise<string> {
    const bitMap = robot.screen.capture(posX - size, posY - size, size*2, size*2);
    const img = new Jimp(size*2, size*2);
    img.bitmap.data = bitMap.image;
    const base64 = await img.getBase64Async(Jimp.MIME_PNG);
    return base64;
}
