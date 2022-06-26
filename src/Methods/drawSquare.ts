import robot from "robotjs";

export default function drawSquare (length: number, posX: number, posY: number): void {
    robot.mouseToggle('down')
    robot.moveMouseSmooth(posX + length, posY, 80)
    robot.moveMouseSmooth(posX + length, posY + length, 80);
    robot.moveMouseSmooth(posX, posY + length, 80);
    robot.moveMouseSmooth(posX, posY, 80);
    robot.mouseToggle('up')
}
