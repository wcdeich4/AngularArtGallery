import { DerivativeBaseClass } from "./DerivativeBaseClass";
import { I2DEquation } from "./I2DEquation";

export class Derivative2 extends DerivativeBaseClass implements I2DEquation
{
    constructor(functionToDifferentiate?: I2DEquation, colorToDraw?: string | CanvasGradient | CanvasPattern, deltaX?: number)
    {
        super(functionToDifferentiate, colorToDraw, deltaX);
    }

    /**
     * numerical second derivative based on https://www.dam.brown.edu/people/alcyew/handouts/numdiff.pdf
     * @param fx 
     * @param x {number} value of x we want to find the numerical derivative at
     */
     public evaluateAt( x: number): number
     {
         
         //will O(delta^4) approx be too slow?
         const fxPlus2Delta = this.fx.evaluateAt(x + 2*this.delta);
         const fxPlusDelta = this.fx.evaluateAt(x + this.delta);
         const fxAtX = this.fx.evaluateAt(x);
         const fxMinusDelta = this.fx.evaluateAt(x - this.delta);
         const fxMinus2Delta = this.fx.evaluateAt(x - 2*this.delta);
         return (16*fxPlusDelta - fxPlus2Delta - 30*fxAtX + 16*fxMinusDelta - fxMinus2Delta )/(12*this.delta*this.delta);
     }
}