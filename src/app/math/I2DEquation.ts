export interface I2DEquation
{
    color: string | CanvasGradient | CanvasPattern;
    evaluateAt(x: number): number;
}