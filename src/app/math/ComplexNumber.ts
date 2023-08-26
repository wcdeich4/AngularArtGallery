import { Coordinate2D } from '../models/Coordinate2D';
import { EquatableWithTolerance } from './EquatableWithTolerance';
import { ICloneable } from './ICloneable';
export class ComplexNumber extends EquatableWithTolerance implements ICloneable<ComplexNumber>
{
    /**real component */
    public realPart: number;
    /**imaginary component */
    public imaginaryPart: number;

    /**
     * ComplexNumber constructor. Note: If you do not know the initial values desired, you can create use new ComplexNumber(0,0)
     * @constructor
     * @param {number} a - real component
     * @param {number} b - imaginary component
     */
    constructor(a: number, b: number)
    {
        super();
        this.set(a, b);
    }

    /**
     * Set real part and imaginary part
     * @param {number} a - real component
     * @param {number} b - imaginary component
     */
    public set(a: number, b: number): void
    {
        this.realPart = a;
        this.imaginaryPart = b;
    }

    /**
     * set by Coordinate2D object
     * @param {Coordinate2D} coordinate 
     */
    public setFromCoordinate(coordinate: Coordinate2D): void
    {
        this.set(coordinate.x, coordinate.y);
    }

    /**
     * e raised to i theta is a fundamental formula for how to specify a complex number; 
     * so much so we should have an alternate constructor for this formula, but TypeScript 
     * does not allow overload constructors, so this static factory method was created. 
     * Factory methods are usually in a separate file, but it is not work a separate file 
     * for a single static factory method.
     * @param theta the angle in radians
     * @returns ComplexNumber
     */
    public static eToITheta(theta: number): ComplexNumber
    {
        return new ComplexNumber(Math.cos(theta), Math.sin(theta));
    }

    /**
     * implement ICloneable
     * @returns new ComplexNumber with the same values as this one.
     */
    public clone(): ComplexNumber
    {
        return new ComplexNumber(this.realPart, this.imaginaryPart);
    }

    /**
     * Ttest if equal to another complex number. (undefined, null, other types, and complex numbers different values return false)
     * @param {any} obj - other vectorto compare.
     */
    public equals(obj: any): boolean
    {
        if (typeof obj === 'undefined')
        {
            return false;
        }
        else if (obj == null)
        {
            return false;
        }
        //TODO : parse json
        else if (obj instanceof ComplexNumber)
        {
            return (Math.abs(this.realPart - obj.realPart) <= EquatableWithTolerance.Tolerance) && (Math.abs(this.imaginaryPart - obj.imaginaryPart) <= EquatableWithTolerance.Tolerance);
        }
        else
        {
            return false;
        }
    }

    /**
     * Add complex number to this one
     * @param {ComplexNumber} other - the other complex number you want to add to this one
     */
    public add(other: ComplexNumber): void
    {
        this.realPart += other.realPart;
        this.imaginaryPart += other.imaginaryPart;
    }

    /**
     * Get a new ComplexNumber object equal to the sum of this complex number and other complex number without modifying this complex number.
     * @param other {ComplexNumber} other complex number to add to this complex number
     * @returns {ComplexNumber} new coplex number equal to the sum of this complex number and other complex number
     */
    public getSumWith(other: ComplexNumber): ComplexNumber
    {
        let result = this.clone();
        result.add(other);
        return result;
    }

    /**
     * Subtract complex number from this one
     * @param {ComplexNumber} other - the other complex number you want to subtract from this one
     */
    public subtract(other: ComplexNumber): void
    {
        this.realPart -= other.realPart;
        this.imaginaryPart -= other.imaginaryPart;
    }

    /**
     * Get a new complex number object equal to the difference of this complex number and other complex number without modifying this complex number.
     * @param other {ComplexNumber} complex number to subtract from this complex number
     * @returns {ComplexNumber} new coplex number equal to the difference of this complex number and other complex number
     */
    public getDifferenceWith(other: ComplexNumber): ComplexNumber
    {
        let result = this.clone();
        result.subtract(other);
        return result;
    }

    /**
     * Multiply this complex number by a scalar
     * @param {number} scalar scalar number to multilpy this complex number by
     */
    public multiplyByScalar(scalar: number): void
    {
        this.realPart *= scalar;
        this.imaginaryPart *= scalar;
    }

    /**
     * Get a new complex number object equal to this complex number multiplied by scalar without modifying this complex number.
     * @param scalar {number} to mulitpy by
     * @returns {ComplexNumber} equal to this complex number multiplied by scalar
     */
    public getMultipliedByScalar(scalar: number): ComplexNumber
    {
        let result = this.clone();
        result.multiplyByScalar(scalar);
        return result;
    }

    /**
     * Divide this complex number by a scalar
     * @param {number} scalar scalar number to divide this complex number by
     */
    public divideByScalar(scalar: number): void
    {
        this.realPart /= scalar;
        this.imaginaryPart /= scalar;
    }

    /**
     * Get a new complex number object equal to this complex number divided by scalar without modifying this complex number.
     * @param scalar {number} to divide by
     * @returns {ComplexNumber} equal to this complex number divided by scalar
     */
    public getDividedByScalar(scalar: number): ComplexNumber
    {
        let result = this.clone();
        result.divideByScalar(scalar);
        return result;
    }

    /***
     * Mulitply this complex number by another complex number, and store the result in this complex number object. Warning, changes the values of this complex number object.
     * @param other {ComplexNumber} the other complex number to mulitply this complex number by
     */
    public multiplyByComplexNumber(other: ComplexNumber): void
    {
        //can't update this.realPart yet because the original this.realPart is also in the formula for this.imaginaryPart
        const newRealPart = this.realPart * other.realPart - this.imaginaryPart * other.imaginaryPart;
        this.imaginaryPart = this.realPart * other.imaginaryPart + other.realPart * this.imaginaryPart;
        this.realPart =  newRealPart;
    }

    /**
     * Get a new complex number equal to this complex number multiplied by other complex number without this complex number object, nor other complex number oblect.
     * @param other {ComplexNumber} the other complex number to mulitply this complex number by
     * @returns {ComplexNumber} equal to this complex number multiplied by other complex number
     */
    public getMultipliedByComplexNumber(other: ComplexNumber): ComplexNumber
    {
        let result = this.clone();
        result.multiplyByComplexNumber(other);
        return result;
    }

    /***
     * Square this complex number. Becasue there are so many formulas that specifically involve squaring, a function that raises to the 2nd power specifically is very useful. 
     */
    public square(): void
    {
        //can't update this.realPart yet because the original this.realPart is also in the formula for this.imaginaryPart
        const newRealPart = this.realPart * this.realPart - this.imaginaryPart * this.imaginaryPart;
        this.imaginaryPart = this.realPart * this.imaginaryPart + this.realPart * this.imaginaryPart;
        this.realPart = newRealPart;
    }

    /**
     * Get a new ComplexNumber object equal to this ComplexNumber object without changing this ComplexNumber object.
     * @returns {ComplexNumber} equal to this complex number squared.
     */
    public getSquared(): ComplexNumber
    {
        let result = this.clone();
        result.square();
        return result;
    }

    /**
     * Get magnitude / radius length of this complex number on the complex plane squared.  A bit of a hack, but more efficient
     * @returns {number} magnitude
     */
    public magnitudeSquared(): number
    {
        return this.realPart * this.realPart + this.imaginaryPart * this.imaginaryPart;
    }

    /**
     * Get magnitude / radius length of this complex number on the complex plane
     * @returns {number} magnitude
     */
    public magnitude(): number
    {
        return Math.sqrt(this.magnitudeSquared());
    }

    /**
     * make the radius of this complex number 1
     */
    public normalize(): void
    {
        const mag = this.magnitude();
        this.realPart /= mag;
        this.imaginaryPart /= mag;
    }

    /**
     * Get a new complex number which is equal to this complex number normalized, without modifying this ComplexNumber object.
     * @returns {ComplexNumber} with radius 1
     */
    public getNormalized(): ComplexNumber
    {
        let result = this.clone();
        result.normalize();
        return result;
    }

    /**
     * Get angle with positive real axis for this complex number on the complex plane
     * @returns {number} angle in radians
     */
    public getAngle(): number
    {
        let theta = 0;
        if (this.realPart == 0 || this.imaginaryPart == 0)
        {
            if (this.realPart == 0)
            {
                if (this.imaginaryPart > 0)
                {
                    theta = Math.PI / 2;
                }
                else
                {
                    theta = 3 * Math.PI / 2;
                }
    
            }
            else
            {
                theta = Math.atan(this.imaginaryPart / this.realPart);
                if (this.realPart < 0 && this.imaginaryPart > 0)
                {
                    theta += Math.PI / 2;
                }
                else if (this.realPart < 0 && this.imaginaryPart < 0)
                {
                    theta += Math.PI ;
                }
            }
        }
        return theta;
    }

     /**
     * raise this complex number to a power (modifies this complex number object)
     * @param power {number} exponent to raise this complex nuber to
     */
     public raiseToPower(power: number): void
     {
         let theta = power * this.getAngle() ;
         let radius = power * this.magnitude();
         this.realPart = radius * Math.cos(theta);
         this.imaginaryPart = radius * Math.sin(theta);
     }
 
     /**
      * Get a new ComplexNumber object equal to this ComplexNumber raised to a power, without modifying this ComplexNumber object.
      * @param power {number} exponent to raise this complex number to
      * @returns {ComplexNumber} new complex number equal to this ComplexNumber raised to a power
      */
     public getRaisedToPower(power: number): ComplexNumber
     {
         let result = this.clone();
         result.raiseToPower(power);
         return result;
     }

}
