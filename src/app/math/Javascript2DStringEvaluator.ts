import { IMathDrawable } from "../models/IMathDrawable";
import { MathCanvas2D } from "../models/MathCanvas2D";
import { I2DEquation } from "./I2DEquation";
import { MathDrawableBaseClass } from "./MathDrawableBaseClass";

export class Javascript2DStringEvaluator extends MathDrawableBaseClass implements I2DEquation, IMathDrawable
{
    public functionOfx: string;

    constructor(equationText?: string, colorToDraw?: string | CanvasGradient | CanvasPattern, incrementForDrawing?: number)
    {
        super(colorToDraw, incrementForDrawing);
        if (equationText != null)
        {
            this.functionOfx = equationText;
        }

    }


    evaluateAt( x: number): number 
    {
        let expression = this.functionOfx.replace(/X/g, x.toString());
       // console.log(expression);
        return eval(expression);
    }



}