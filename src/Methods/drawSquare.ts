import robot from "robotjs";

export default function drawSquare (length: number, posX: number, posY: number): void {
    robot.mouseToggle('down')
    robot.moveMouseSmooth(posX + length, posY);
    robot.moveMouseSmooth(posX + length, posY + length);
    robot.moveMouseSmooth(posX, posY + length);
    robot.moveMouseSmooth(posX, posY);
    robot.mouseToggle('up')
}
