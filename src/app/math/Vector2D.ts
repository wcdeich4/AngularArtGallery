import { ICloneable } from './ICloneable';
import { RealNumberVector } from './RealNumberVector';
export class Vector2D extends RealNumberVector implements ICloneable<Vector2D>
{
    /**
     * 2D vector
     * @constructor
     * @param {number} x - x component of the vector.
     * @param {number} y - y component of the vector.
     * @param {number} z - z component of the vector.
     */
    constructor(x?: number, y?: number)
    {
        super(null, 2);
        this.elements[0] = x ?? 0;
        this.elements[1] = y ?? 0;
    }

    /**
     * get perpendicular vector in clockwise direction
     * @returns Vector2D
     */
    public getPerpendicularClockwise(): Vector2D
    {
        return new Vector2D(this.elements[1], -this.elements[0]);
    }

    /**
     * get perpendicular vector in counter-clockwise direction
     * @returns Vector2D
     */
    public getPerpendicularCounterClockwise(): Vector2D
    {
        return new Vector2D(-this.elements[1], this.elements[0]);
    }


    /**
     * implement ICloneable
     * @returns new Vector2D with the same values as this one.
     */
    public clone(): Vector2D
    {
        return new Vector2D( this.elements[0], this.elements[1] );
    }
}