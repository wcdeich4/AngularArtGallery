import { StringHelper } from '../helpers/StringHelper';
import { ICloneable } from './ICloneable';
// import { RealNumberMatrix } from './RealNumberMatrix';
import { RealNumberVector } from './RealNumberVector';
export class Vector3D extends RealNumberVector implements ICloneable<Vector3D>
{
    /**
     * 3D vector
     * @constructor
     * @param {number} x - x component of the vector.
     * @param {number} y - y component of the vector.
     * @param {number} z - z component of the vector.
     */
    constructor(x?: number, y?: number, z?: number)
    {
        super(null, 3);
        this.elements[0] = x ?? 0;
        this.elements[1] = y ?? 0;
        this.elements[2] = z ?? 0;
    }

    /**
     * Get the right handed cross product of this vector and another vector
     * @param {Vector3D} otherVector to get cross product with
     */
    public crossProduct(otherVector: Vector3D): Vector3D
    {
        return new Vector3D(this.elements[1] * otherVector.elements[2] - this.elements[2] * otherVector.elements[1] ,
                            this.elements[2] * otherVector.elements[0] - this.elements[0] * otherVector.elements[2] ,
                            this.elements[0] * otherVector.elements[1] - this.elements[1] * otherVector.elements[0]);
    }

    /**
     * implement ICloneable
     * @returns new Vector3D with the same values as this one.
     */
    public clone(): Vector3D
    {
        return new Vector3D( this.elements[0], this.elements[1], this.elements[2]);
    }

    /**
     * true if z component is zero
     * @returns boolean
     */
    public is2D(): boolean
    {
        return this.elements[2]=== 0;
    }

    // /**
    //  * get just x and y
    //  * @returns Vector2D
    //  */
    // public to2D(): Vector2D
    // {
    //     return new Vector2D(this.elements[0], this.elements[1]); 
    // }

    //?????????????????????????????????????????????????????????
    // /**
    //  * set the indices from a line of an OBJ file
    //  * @param {string} line a line of an OBJ file
    //  * @returns rest of the line after eating off part with data needed
    //  * @throws Error if line is undefined / null / empty string / whitespace / does not contain necessary data
    //  */
    //  public setFromDelimetedString(line: string): string
    //  {
    //      return this.setFromDelimetedStringWithNumericTolerance(line, this.DefaultStringInputDelimeter, AbstractVector.DefaultNumericTolerance);
    //  }
 
     /**
      * set the indices from a line of an OBJ file
      * @param {string} line a line of an OBJ file
      * @param {string} delimeter string to split the line string. Any whitespace character will result in parsing on all possible whitespace characters.
      * @param {number} numericTolerance numbers smaller than this will be rounded off to zero
      * @returns rest of the line after eating off part with data needed
      * @throws Error if line is undefined / null / empty string / whitespace / does not contain necessary data
      */
     public setFromDelimetedStringWithNumericTolerance(line: string, delimeter: string, numericTolerance: number): string
     {
         let returnValue: string = '';
         if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(line))
         {
             let errorMessage: string = 'line undefined / null / empty string / whitespace in TextureCoordinate.SetFromFileLine(line: string, delimeter: string): string'; 
             console.error(errorMessage);
             throw new Error(errorMessage);
         }
         else
         {
             let currentLineTokens: Array<string> = null;
             if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(delimeter))
             {
                 currentLineTokens = line.split(/(\s+)/);
             }
             else
             {
                 currentLineTokens = line.split(delimeter);
             }
             //narrow down to only numeric elements after splitting string
             currentLineTokens = currentLineTokens.filter(a => !StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(a) && StringHelper.isNumeric(a));
 
             if (currentLineTokens.length < 3)
             {
                 let errorMessage: string = 'error in TextureCoordinates.SetFromFileLine(line: string, delimeter: string): string - could not parse face indicies into texture u,v coordinates';
                 console.error(errorMessage);
                 throw new Error(errorMessage);
             }
             else
             {
                 this.elements[0] = parseFloat(currentLineTokens[0]);
                 if (Math.abs(this.elements[0] ) < numericTolerance)
                 {
                    this.elements[0]  = 0;
                 }
 
                 this.elements[1] = parseFloat(currentLineTokens[1]);
                 if (Math.abs(this.elements[1] ) < numericTolerance)
                 {
                    this.elements[1]  = 0;
                 }

                 this.elements[2]= parseFloat(currentLineTokens[2]);
                 if (Math.abs(this.elements[2]) < numericTolerance)
                 {
                    this.elements[2] = 0;
                 }
 
                 if (currentLineTokens.length > 3)
                 {
                     for (let i = 3; i < currentLineTokens.length; i++)
                     {
                     returnValue = returnValue + currentLineTokens[i] + delimeter;
                     }
                 }
             }
 
         }
         return returnValue;
     }

}
