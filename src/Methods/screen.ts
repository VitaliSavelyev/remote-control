import robot, {Bitmap} from "robotjs";
import Jimp from 'jimp';

export default async function screen (size: number, posX: number, posY: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            const screen: Bitmap = robot.screen.capture(posX - 100, posY - 100, size, size);
            for(let i=0; i < screen.image.length; i++){
                if(i%4 == 0){
                    [screen.image[i], screen.image[i+2]] = [screen.image[i+2], screen.image[i]];
                }
            }
            const screenBuffer: Buffer = screen.image;
            const img: Jimp = new Jimp({data: screenBuffer, width:screen.width, height:screen.height});
            const base64: string = await img.getBase64Async(Jimp.MIME_PNG);
            resolve(base64.split(',')[1])
        }
        catch (error) {
            reject(error)
        }
    })

}
