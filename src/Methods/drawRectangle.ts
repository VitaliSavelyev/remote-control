import robot from "robotjs";

export default function drawRectangle (width: number, height: number, posX: number, posY: number): void {
    robot.mouseToggle('down')
    robot.moveMouseSmooth(posX + width, posY, 80);
    robot.moveMouseSmooth(posX + width, posY + height, 80);
    robot.moveMouseSmooth(posX, posY + height, 80);
    robot.moveMouseSmooth(posX, posY, 80);
    robot.mouseToggle('up')
}
