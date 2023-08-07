import { Range2D } from "../math/Range2D";
import { IMathDrawable } from "./IMathDrawable";
import { IProcessable } from "./IProcessable";
import { MathCanvas2D } from "./MathCanvas2D";

export abstract class Fractile implements IProcessable, IMathDrawable
{
    abstract draw(mathCanvas: MathCanvas2D): void ;
    abstract process(): void ;
    abstract calculated: boolean;
    public range: Range2D;
}