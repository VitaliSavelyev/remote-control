import robot from "robotjs";

export default function drawRectangle (width: number, height: number, posX: number, posY: number): void {
    robot.mouseToggle('down')
    robot.moveMouseSmooth(posX + width, posY);
    robot.moveMouseSmooth(posX + width, posY + height);
    robot.moveMouseSmooth(posX, posY + height);
    robot.moveMouseSmooth(posX, posY);
    robot.mouseToggle('up')
}
