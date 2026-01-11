import { StringHelper } from "../helpers/StringHelper";
import { EquatableWithTolerance } from "./EquatableWithTolerance";
import { GenericVector } from "./GenericVector";
import { ICloneable } from "./ICloneable";
import { ScreenRangeConverter2D } from "./ScreenRangeConverter2D";

export class RealNumberVector extends GenericVector<number> implements ICloneable<RealNumberVector>
{
    /**
     * constructor
     * @param array1D array of numbers or null
     * @param numberOfElement number or null
     */
    constructor(array1D?:Array<number>, numberOfElements?: number)
    {
        super();
        if (array1D == null)
        {
            if (numberOfElements != null)
            {
                this.elements = new Array<number>(numberOfElements);
            }
        }
        else 
        {
            this.elements = array1D;
        }
    }

    
    //2D Methods

    /**
     * transform this vector's elements[0] and elements[1] by screenRangeConverter2D
     * @param {ScreenRangeConverter2D} screenRangeConverter2D screen range converter object used by BMathCanvas2D
     */
    public transformWorld2DToCanvas2DCoordinates(screenRangeConverter2D: ScreenRangeConverter2D): void 
    {
        this.elements[0] = screenRangeConverter2D.world2DXtoCanvasX(this.elements[0]);
        this.elements[1] = screenRangeConverter2D.world2DYtoCanvasY(this.elements[1]);
    }
//make get version?
    

    /**
     * get perpendicular vector in clockwise direction
     * @returns RealNumberVector
     */
    public getPerpendicularClockwise(): RealNumberVector
    {
        return new RealNumberVector([this.elements[1], -this.elements[0]]);
    }

    /**
     * get perpendicular vector in counter-clockwise direction
     * @returns RealNumberVector
     */
    public getPerpendicularCounterClockwise(): RealNumberVector
    {
        return new RealNumberVector([ -this.elements[1], this.elements[0] ]);
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
    //  * @returns RealNumberVector
    //  */
    // public to2D(): RealNumberVector
    // {
    //     return new RealNumberVector(this.elements[0], this.elements[1]); 
    // }


    // 3D Methods

    /**
     * use the current vector as the eye/camera, and test if it can see a face for backface culling. Optimized for 3D. Temporary arrays save memory though reuse.
     * @param {Array<RealNumberVector>} faceVertexArray 
     * @param {Array<number>} temporaryDifferenceArray1 
     * @param {Array<number>} temporaryDifferenceArray2 
     * @param {Array<number>} temporaryCrossProductArray 
     * @returns {boolean}
     */
    public canSee(faceVertexArray: Array<RealNumberVector>, temporaryDifferenceArray1: Array<number>, temporaryDifferenceArray2: Array<number>, temporaryCrossProductArray: Array<number>): boolean
    {
        //unrolled loop subtraction
        //faceVertexArray[1] - faceVertexArray[0]
        temporaryDifferenceArray1[0] = faceVertexArray[1].elements[0] - faceVertexArray[0].elements[0];
        temporaryDifferenceArray1[1] = faceVertexArray[1].elements[1] - faceVertexArray[0].elements[1];
        temporaryDifferenceArray1[2] = faceVertexArray[1].elements[2] - faceVertexArray[0].elements[2];

        //faceVertexArray[2] - faceVertexArray[1]
        temporaryDifferenceArray2[0] = faceVertexArray[2].elements[0] - faceVertexArray[1].elements[0];
        temporaryDifferenceArray2[1] = faceVertexArray[2].elements[1] - faceVertexArray[1].elements[1];
        temporaryDifferenceArray2[2] = faceVertexArray[2].elements[2] - faceVertexArray[1].elements[2];

        RealNumberVector.crossProductArrays(temporaryDifferenceArray1, temporaryDifferenceArray2, temporaryCrossProductArray);

        //dot product unrolled
        return 0 <= this.elements[0] * temporaryCrossProductArray[0] + this.elements[1] * temporaryCrossProductArray[1]  + this.elements[2] * temporaryCrossProductArray[2]; 

    }

    /**
     * static method for cross product with number arrays.
     * @param {Array<number>} vectorArray1 
     * @param {Array<number>} vectorArray2 
     * @param {Array<number>} resultArray 
     */
    public static crossProductArrays(vectorArray1: Array<number>, vectorArray2: Array<number>, resultArray: Array<number>): void
    {
        resultArray[0] = vectorArray1[1] * vectorArray2[2] - vectorArray1[2] * vectorArray2[1] ;
        resultArray[1] = vectorArray1[2] * vectorArray2[0] - vectorArray1[0] * vectorArray2[2] ;
        resultArray[2] = vectorArray1[0] * vectorArray2[1] - vectorArray1[1] * vectorArray2[0] ;
    }

    /**
     * Get the right handed cross product of this vector and another vector
     * @param {GenericVector<number>} otherVector to get cross product with
     * @returns {RealNumberVector} right handed cross product vector
     */
    public crossProduct(otherVector: GenericVector<number>): RealNumberVector
    {
        const resultArray = new Array<number>(3);
        RealNumberVector.crossProductArrays(this.elements, otherVector.elements, resultArray);
        return new RealNumberVector(resultArray);
    //    // throw new Error('wrong for homogenous vectors because they need an extra 1???????????????????????????????????');

    //     return new RealNumberVector([this.elements[1] * otherVector.elements[2] - this.elements[2] * otherVector.elements[1] ,
    //                         this.elements[2] * otherVector.elements[0] - this.elements[0] * otherVector.elements[2] ,
    //                         this.elements[0] * otherVector.elements[1] - this.elements[1] * otherVector.elements[0]]);
    }

    //other methods

    /**
      * set the elements from a delimited string, ignoring non-numeric string elements
      * @param {string} line a delimited string
      * @param {string} delimeter string to split the line string. Any whitespace character will result in parsing on all possible whitespace characters.
     */
    public setFromDelimetedString(line: string, delimeter: string = ' '): void
    {
        let currentLineTokens: Array<string> = null;
      //  console.log(' line = ' + line);
        if (!StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(line))
        {
            
            if (StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(delimeter))
            {
                currentLineTokens = line.split(/\s+/);
                
                // console.log('currentLineTokens = ' );
                // let i = 0;
                // for( let s in currentLineTokens)
                // {
                //     console.log('element [' + i + '] = ' );
                //     console.log(s);
                //     i++;
                // }

            }
            else
            {
                currentLineTokens = line.split(delimeter);
            }

            //check we have data after split
            if ((currentLineTokens != null) && (currentLineTokens.length > 0))
            {
                //narrow down to only numeric elements after splitting string
                //currentLineTokens = currentLineTokens.filter(a => !StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(a) && StringHelper.isNumeric(a));

                //check again we have data again after filter
                // if ((currentLineTokens != null) && (currentLineTokens.length > 0))
                // {


              //  console.log(currentLineTokens);


                    //this.elements = null; //probably not necessary
                    this.elements = new Array<number>();


                    for(let index = 0; index < currentLineTokens.length; index++ )
                    {
                        if (!StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(currentLineTokens[index]) && StringHelper.isNumeric(currentLineTokens[index]))
                        {
                        this.elements.push(parseFloat(currentLineTokens[index]));
                            
                        }
                    }

                    // for(let token in currentLineTokens)
                    // {
                    //     console.log(' .......token = ' + token);

                    //     if (!StringHelper.isUndefinedOrNullOrEmptyOrWhitespace(token) && StringHelper.isNumeric(token))
                    //     {
                    //     this.elements.push(parseFloat(token));
                            
                    //     }


                    // }
              //  }
            }
        }
    }



    /**
     * get vector length
     * @returns {number} magnitude of the vector
     */
    public magnitude(): number
    {
        let m = 0;
        if ((this.elements != null) && (this.elements.length > 0))
        {
            for(let i = 0; i < this.elements.length; i++)
            {
                m += this.elements[i] * this.elements[i]; //TODO: compare Math.pow speed in various browsers
            }
        }
        return Math.sqrt(m);
    }

    /**
     * scale vector to length of 1
     */
    public normalize(): void
    {
        let mag = this.magnitude();
        if (mag !== 0)
        {
            for(let i = 0; i < this.elements.length; i++)
            {
                this.elements[i] /= mag; 
            }
        }    
    }

    /**
     * negate this vector
     */
    public negate(): void
    {
        for(let i = 0; i < this.elements.length; i++)
        {
            this.elements[i] = - this.elements[i] ;
        }
    }

    /**
     * get a new vector with value of this vector negated without modifying this vector
     * @returns {RealNumberVector} negated vector
     */
    public getNegated(): RealNumberVector
    {
        const result = this.clone();
        result.negate();
        return result;
    }

    /***
     * Dot Product of this and another vector.  For length mismatch, it treats shorter vectors as longer vectors with as many zero value elements as necessary.
     * @param {GenericVector<number>} otherVector - the vector to dot product multiply with this vector
     * @returns number
     */
    public dotProduct(otherVector: GenericVector<number>): number
    {
        //let length = Math.min(this.elements.length, otherVector.elements.length); //wrong if other vector is longer
        let sum = 0;
        for(let i = 0; i < otherVector.elements.length; i++) //error if otherVector.elements.length > this.elements.length
        {
            sum += this.elements[i] * otherVector.elements[i];
        }
        return sum;
    }

    /**
     * copy another vector times a coefficient to this instance of RealNumberVector, with arbitary limit. Modifies this object.
     * @param {number} coefficient to multiply other vector by.
     * @param {GenericVector<number>} otherVector - the vector to add to this vector
     * @param {number} limit of for loop
     */
    public copyFromVectorWithCoefficientAndLimit(coefficient: number, otherVector: GenericVector<number>, limit: number): void
    {
        for(let i = 0; i < limit ; i++)
        {
            this.elements[i] =  coefficient * otherVector.elements[i];
        }
    }

    /**
     * Add another vector times a coefficient to this instance of RealNumberVector, with arbitary limit. Modifies this object.
     * @param {number} coefficient to multiply other vector by.
     * @param {GenericVector<number>} otherVector - the vector to add to this vector
     * @param {number} limit of for loop
     */
    public addVectorWithCoefficientAndLimit(coefficient: number, otherVector: GenericVector<number>, limit: number): void
    {
        for(let i = 0; i < limit ; i++)
        {
            this.elements[i] = this.elements[i] + coefficient * otherVector.elements[i];
        }
    }

    /**
     * Add another vector to this instance of RealNumberVector, with arbitary limit. Modifies this object. 
     * @param {GenericVector<number>} otherVector - the vector to add to this vector
     * @param {number} limit of for loop
     */
    public addWithLimit(otherVector: GenericVector<number>, limit: number): void
    {
        for(let i = 0; i < limit ; i++)
        {
            this.elements[i] += otherVector.elements[i];
        }
    }

    /***
     * Add another vector to this instance of RealNumberVector. Modifies this object. Treats shorter vectors as longer vectors with as many zero value elements as necessary.
     * @param {GenericVector<number>} otherVector - the vector to add to this vector
     */
    public add(otherVector: GenericVector<number>): void
    {
        //let length = Math.min(this.elements.length, otherVector.elements.length);  //only safe if otherVector cannot be longer
        for(let i = 0; i < otherVector.elements.length; i++) //safe if otherVector is equal or less length
        {
            this.elements[i] += otherVector.elements[i];
        }
    }

    /**
     * Create new RealNumberVector equal to the sum of this RealNumberVector and otherVector without modifying this RealNumberVector or ther otherVector. Does not modifies this object. Treats shorter vectors as longer vectors with as many zero value elements as necessary.
     * @param {GenericVector<number>} otherVector - the vector to get sum with
     * @returns {RealNumberVector} new RealNumberVector with sum of this vector and other RealNumberVector
     */
    public getSumWith(otherVector: GenericVector<number>): RealNumberVector
    {
        const result = this.clone();
        result.add(otherVector);
        return result;
    }

    /***
     * Subtract another vector from this instance of RealNumberVector. Modifies this object. Treats shorter vectors as longer vectors with as many zero value elements as necessary.
     * @param {GenericVector<number>} otherVector - the vector to subtract from this vector
     */
    public subtract(otherVector: GenericVector<number>): void
    {
        //Math.min is only valid safety check if this vector cannot be shorter..........................
        //let length = Math.min(this.elements.length, otherVector.elements.length); 
        for(let i = 0; i < otherVector.elements.length; i++) //error if otherVector is longer, find if shorter
        {
            this.elements[i] -= otherVector.elements[i];
        }
    }

    /**
     * Create new RealNumberVector equal to the this RealNumberVector minus otherVector without modifying this RealNumberVector or ther otherVector. Does not modifies this object. Treats shorter vectors as longer vectors with as many zero value elements as necessary.
     * @param {GenericVector<number>} otherVector - the vector to get difference with
     * @returns {RealNumberVector} new RealNumberVector equal to this vector minus other RealNumberVector
     */
    public getDifferenceWith(otherVector: GenericVector<number>): RealNumberVector
    {
        const result = this.clone();
        result.subtract(otherVector);
        return result;
    }

    /***
     * multiply this instance of RealNumberVector by a scalar.  Changes this RealNumberVector.
     * @param {number} scalar - number to multiply the vector elements by 
     */
    public multiplyByScalar(scalar: number): void
    {
        for(let i = 0; i < this.elements.length; i++)
        {
            this.elements[i] *= scalar;
        }
    }
    //make version that does not change this vector & has a limit !

    /***
     * divide this instance of RealNumberVector by a scalar.  Changes this RealNumberVector.
     * @param {number} scalar - number to divide the vector elements by 
     */
    public divideByScalar(scalar: number): void
    {
        for(let i = 0; i < this.elements.length; i++)
        {
            this.elements[i] /= scalar;
        }
    }
    //make version that does not change this vector??

    /**
     * Get midpoint between this RealNumberVector and otherVector.  Does not modify this RealNumberVector.
     * @param otherVector {GenericVector<number>} other vector to get midpoint with.
     * @returns {RealNumberVector} midpoint
     */
    public getMidPointWith(otherVector: GenericVector<number>): RealNumberVector
    {
        let result = this.getSumWith(otherVector);
        result.divideByScalar(2);
        return result;
    }

    /**
     * find weighted average of this vector and another vector
     * @param fractionalWeight1 {number} percentage to multiply by this vector
     * @param vector2 {GenericVector<number>} other vector to do weighted average with
     * @param fractionalWeight2 {number} percentage to multiply by 2nd vector
     * @returns {RealNumberVector} weighted average of this vector and another vector
     */
    public getWeightedAverageWithAnotherVector(fractionalWeight1: number, vector2: GenericVector<number>, fractionalWeight2: number): RealNumberVector
    {
        const weightedAveragePoint = this.clone();
      //  weightedAveragePoint.multiplyByScalar(fractionalWeight1);
        //let length = Math.min(this.elements.length, vector2.elements.length);  //wrong if vector2 is longer
        for(let i = 0; i < vector2.elements.length; i++) //safe if vector2 is equal or shorter
        {
            weightedAveragePoint.elements[i] = weightedAveragePoint.elements[i] * fractionalWeight1 + vector2.elements[i] * fractionalWeight2;
        }

        // console.log('fractionalWeight1: ' + fractionalWeight1)
        // console.log('weightedAveragePoint:');
        // console.log(weightedAveragePoint.toString());
        return weightedAveragePoint;
    }

    /**
     * find the distance from this vector to another vector
     * @param otherVector {GenericVector<number>} the other vector to find the distance to
     * @returns {number} the distance
     */
    public getDistanceTo(otherVector: GenericVector<number>): number
    {
        let distance = 0;
        let difference = 0;
        let length = Math.min(this.elements.length, otherVector.elements.length);  //wrong
        for(let i = 0; i < otherVector.elements.length; i++) //error if otherVector.elements.length > this.elements.length
        {
            difference = this.elements[i] - otherVector.elements[i];
            distance +=  difference * difference;
        }

        if (this.elements.length > length)
        {
            for(let i = length; i < this.elements.length; i++)
            {
                distance += this.elements[i] * this.elements[i];
            }
        }

        if (otherVector.elements.length > length)
        {
            for(let i = length; i < otherVector.elements.length; i++)
            {
                distance += otherVector.elements[i] * otherVector.elements[i];
            }
        }

        distance = Math.sqrt(distance);
        return distance;
    }


    /**
     * implement ICloneable
     * @returns new RealNumberVector with the same values as this one.
     */
    public clone(): RealNumberVector
    {
        return this.cloneUpToLimit(this.elements.length);
    }

    /**
     * copy vector but with limit
     * @param limit {number} of elements to copy
     * @returns {RealNumberVector} with same elements are this vector up to limit
     */
    public cloneUpToLimit(limit: number): RealNumberVector
    {
        const myClone = new RealNumberVector(null, this.elements.length);
        limit = Math.min(limit, this.elements.length );
        if ((this.elements != null) && (limit > 0))
        {
            myClone.elements = new Array<number>(limit);
            for(let i = 0; i < limit; i++ )
            {
                myClone.elements[i] = this.elements[i];
            }
        }
        return myClone;
    }

    /**
     * Test if equal to another vector. (undefined, null, other types, and vectors with different values return false)
     * @param {any} obj - other vectorto compare.
     */
        public equals(obj: any): boolean
        {
            let result = false;
            if (typeof obj === 'undefined')
            {
                result = false;
            }
            else if (obj == null)
            {
                result =  false;
            }
            //TODO : parse json string to match
            else if (obj instanceof GenericVector)
            {
                if ((this.elements == null) && (obj.elements == null))
                {
                    //vacuously true case 1
                    result = true;
                }
                else if ((this.elements.length === 0) && (obj.elements.length === 0))
                {
                    //vacuously true case 2
                    result = true;
                }
                else if (this.elements.length ===  obj.elements.length )
                {
                    result = true;
                    for(let i = 0; i < this.elements.length; i++ )
                    {
                        if (Math.abs(this.elements[i] - obj.elements[i]) > EquatableWithTolerance.Tolerance)
                        {
                            result = false;
                            break;
                        }
                    }
                }
                else 
                {
                    result = false;
                }
            }
            else
            {
                result =  false;
            }
            return result;
        }


}