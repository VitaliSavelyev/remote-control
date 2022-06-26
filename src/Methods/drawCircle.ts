import robot from "robotjs";

export default function drawCircle (radius: number, posX: number, posY: number): void {
    robot.mouseToggle('down')
    for (let i = 0; i <= Math.PI * 2; i += 0.01) {
        const x = posX - (radius * Math.cos(i)) + radius;
        const y = posY - (radius * Math.sin(i));
        robot.dragMouse(x, y);
    }
    robot.mouseToggle('up')
}
