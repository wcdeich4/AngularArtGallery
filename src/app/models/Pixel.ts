import { ISingleColor } from "./ISingleColor";
import { Coordinate2D } from "./Coordinate2D";

export class Pixel extends Coordinate2D implements ISingleColor
{
    public color: string | CanvasGradient | CanvasPattern;
}