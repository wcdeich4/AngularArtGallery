import { EquatableWithTolerance } from './EquatableWithTolerance';
import { GenericMatrix } from './GenericMatrix';
import { GenericVector } from './GenericVector';
import { ICloneable } from './ICloneable';
import { RealNumberVector } from './RealNumberVector';
export class RealNumberMatrix extends GenericMatrix<number> implements ICloneable<RealNumberMatrix>
{
    /**
     * constructor
     * @param array2D array of array of number or null
     * @param numberOfRows number or null
     * @param numberOfColumns number or null
     */
    constructor(array2D?: Array<Array<number>>, numberOfRows?: number, numberOfColumns?: number)
    {
        super();
        if (array2D == null)
        {
            if ((numberOfRows != null) )
            {
                this.elements = new Array<Array<number>>(numberOfRows);

                if (numberOfColumns != null)
                {
                    for(let i = 0; i < numberOfRows; i++)
                    {
                        this.elements[i] = new Array<number>(numberOfColumns);
                    }
                }
            }
        }
        else 
        {
            this.elements = array2D;
        }

    }

    /**
     * create look at matrix like in OpenGL, except row-major math is the default.
     * https://www.geertarien.com/blog/2017/07/30/breakdown-of-the-lookAt-function-in-OpenGL
     * https://medium.com/@carmencincotti/lets-look-at-magic-lookat-matrices-c77e53ebdf78
     * @param cameraPosition {RealNumberVector} camera poisition in 3D cartesian coordinates
     * @param focalPoint {RealNumberVector} point to look at in 3D cartesian coordinates
     * @param upVector {RealNumberVector} up vector in 3D cartesian coordinates (approximate is ok)
     * @param columnMajor {boolean}
     */
    public setLookAtMatrix(cameraPosition: RealNumberVector, focalPoint: RealNumberVector, upVector: RealNumberVector, columnMajor: boolean = false ): void
    {
        const cameraZAxis: RealNumberVector = <RealNumberVector>focalPoint.getDifferenceWith(cameraPosition) as RealNumberVector; //aka forward vector
        cameraZAxis.normalize();
        const cameraXAxis: RealNumberVector = cameraZAxis.crossProduct(upVector); //aka right vector
        cameraXAxis.normalize();
        const cameraYAxis: RealNumberVector = cameraXAxis.crossProduct(cameraZAxis); //aka camera up ?
        cameraZAxis.negate();

        if (this.elements == null)
        {
            this.elements = new Array<Array<number>>(3);
        }


       // const result = new RealNumberMatrix(null, 3, null);
        this.setRow(0, cameraXAxis);
        this.setRow(1, cameraYAxis);
        this.setRow(2, cameraZAxis);

        const translationX = - cameraXAxis.dotProduct(cameraPosition);
        const translationY = - cameraYAxis.dotProduct(cameraPosition);
        const translationZ = - cameraZAxis.dotProduct(cameraPosition);
        this.setElement(0, 3, translationX);
        this.setElement(1, 3, translationY);
        this.setElement(2, 3, translationZ);


// console.log('cameraPosition, cameraZAxis, cameraXAxis, cameraYxis = ');
// cameraPosition.log();
// cameraZAxis.log();
// cameraXAxis.log();
// cameraYAxis.log();
//console.log('translation= ' + translationX + ' ' + translationX + ' ' + translationZ);

        this.setElement(3, 0, 0);
        this.setElement(3, 1, 0);
        this.setElement(3, 2, 0);
        this.setElement(3, 3, 1);

        if (columnMajor)
        {
            this.transpose();
        }

     //   return result;
    }

    /**
     * zero out matrix
     */
    public setZeros(): void
    {
        for(let row = 0; row < this.getNumberOfRows(); row++ )
        {
            for(let column = 0; column < this.getNumberOfColumns(); column++)
            {
                this.elements[row][column] = 0;
            }
        }
    }

    /**
     * identity matrix
     */
    public setIdentity(): void
    {
        for(let row = 0; row < this.getNumberOfRows(); row++ )
        {
            for(let column = 0; column < this.getNumberOfColumns(); column++)
            {
                if (row === column)
                {
                    this.elements[row][column] = 1;
                }
                else
                {
                    this.elements[row][column] = 0;
                }
            }
        }
    }

    // /**
    //  * Copy an array to set the data in this matrix
    //  * @param array2d two dimensional array of numbers
    //  * @throws exception if this matrix is has more rows or columns than array2d or array2d is null or undefined
    //  */
    // public copyArray(array2d: number[][]): void
    // {
    //     if (typeof array2d === 'undefined')
    //     {
    //         throw new Error('Exception in GeneralMatrix.Set: array2d is undefined');
    //     }
    //     else if (array2d == null)
    //     {
    //         throw new Error('Exception in GeneralMatrix.Set: array2d is null');
    //     }
    //     if (this.getNumberOfRows() > array2d.length)
    //     {
    //         throw new Error('Exception in GeneralMatrix.Set: this matrix has more rows than the array');
    //     }
    //     if (this.getNumberOfColumns() > array2d[0].length)
    //     {
    //         throw new Error('Exception in GeneralMatrix.Set: this matrix has more rows than the array');
    //     }

    //     for(let row = 0; row < this.getNumberOfRows(); row++ )
    //     {
    //         for(let column = 0; column < this.getNumberOfColumns(); column++)
    //         {
    //             this.elements[row][column] = array2d[row][column];
    //         }
    //     }
    // }

    /**
     * Multiply this matrix by another matrix on the right hand side
     * @param {RealNumberMatrix} rightSideMatrix - the other matrix to multiply by
     * @returns RealNumberMatrix
     * @throws error if the number of rows of this mtrix does not equal the number of columns of the other matrix
     */
    public multiplyBy(rightSideMatrix: RealNumberMatrix): RealNumberMatrix
    {
        if (this.getNumberOfColumns() !== rightSideMatrix.getNumberOfRows())
        {
            throw new Error('Matrix Row Column mismatch.  Cannot multiply');
        }
        else
        {
            const result = new RealNumberMatrix(null, this.getNumberOfRows(), rightSideMatrix.getNumberOfColumns());
            let currentElement: number;
            
            
            let limit = Math.min(this.getNumberOfRows(), rightSideMatrix.getNumberOfColumns()); //treat small matricies as having an infinite number of zeros.

            for(let rightSideMatrixColumnIndex = 0;  rightSideMatrixColumnIndex < limit; rightSideMatrixColumnIndex++)
            {
                for(let leftSideMatrixRow = 0; leftSideMatrixRow < limit; leftSideMatrixRow ++)
                {
                    currentElement = 0;
                    for( let i:number = 0; i < limit; i++)
                    {
                        currentElement += this.elements[leftSideMatrixRow][i] * rightSideMatrix.elements[i][rightSideMatrixColumnIndex];
                    }
                    result.elements[leftSideMatrixRow][rightSideMatrixColumnIndex] = currentElement;
                }
            }




            // for(let row = 0; row < this.getNumberOfRows(); row++ )
            // {
            //     for (let column = 0; column < rightSideMatrix.getNumberOfColumns(); column++)
            //     {
            //         sum = 0;
            //         for (let i = 0; i < rightSideMatrix.getNumberOfRows(); i++) 
            //         {
            //             sum += this.elements[row][i]*rightSideMatrix.elements[i][column];
            //         }
            //         result.elements[row][column] = sum;
            //     }
            // }
            return result;
        }
    }

    // /**
    //  * Transform an array as a vector by multiplying it on the right hand side of this matrix. Does not modify the original array Uses Homogenius Efficency Hack: browsers run out of memory fast, so we may not ant to store the homogenous 1 at the end of vectors. But we need the math to work out the same.
    //  * @param {GenericVector<number>} originalElements - array vector to multiply by
    //  * @returns {Array<number>} vector array transformed by mulitplying to the right hand side of this matrix.
    //  */
    // public MultiplyByArrayOnRight(originalElements: Array<number>): Array<number>
    // {
    //     //const limit = Math.min(this.getNumberOfColumns(), originalElements.length );
    //     const limit = originalElements.length ; //speed hack, error if array length > matrix number of rows
    //     let newElements = new Array<number>(limit);
    //     this.MultiplyByArrayOnRightAndStoreToResultArray(originalElements, newElements);
    //     return newElements;

    // //     const limit = Math.min(this.getNumberOfColumns(), originalElements.length );
    // //     let newElements = new Array<number>(limit);
    // //     const numberOfRows = this.getNumberOfRows();

    // //    // const vectorLength = rightSideVector.elements.length;
    // //     // if (this.getNumberOfColumns() !== vectorLength)
    // //     // {
    // //     //     throw new Error('Matrix Vector column mismatch.  Cannot multiply/transform vector.');
    // //     // }
    // //     // else
    // //     // {
    // //       //  const result = new RealNumberVector(null, rightSideVector.elements.length);
    // //         let sum: number, i: number;
    // //         for(let row = 0; row < numberOfRows; row++ )
    // //         {
    // //             // for (let column = 0; column < rightSideMatrix.getNumberOfColumns(); column++)
    // //             // {
    // //                 sum = 0;
    // //                 i = 0;
    // //                 while(i < limit) 
    // //                 {
    // //                     sum += this.elements[row][i]*originalElements[i];
    // //                     i++;
    // //                 }
    // //                 //Homogenius Efficency Hack. Remember this.elements[row].length = number of columns in current row
    // //                 //number of columns in this row = this.elements[row].length 
    // //                 if ( this.elements[row].length > originalElements.length )
    // //                 {
    // //                     sum += this.elements[row][limit] ;
    // //                 }
    // //                 newElements[row] = sum;
    // //            // }
    // //         }

    // //         //return result;
    // //         return newElements;
    // //   //  }
    // }





























    /**
     * Transform an array as a vector by multiplying it on the right hand side of this matrix. Does not modify the original array Uses Homogenius Efficency Hack: browsers run out of memory fast, so we may not ant to store the homogenous 1 at the end of vectors. But we need the math to work out the same.
     * @param {GenericVector<number>} originalElements - array vector to multiply by
     * @param {GenericVector<number>} resultElements - array vector result
     */
    public MultiplyByArrayOnRightAndStoreToResultArray(originalElements: Array<number>, resultElements: Array<number>): void
    {
        const limit = Math.min(this.getNumberOfColumns(), originalElements.length );
      //  const limit = originalElements.length ; //speed hack, wrong if size mismatch
        const numberOfRows = this.getNumberOfRows();


            let sum: number, i: number;
            for(let row = 0; row < numberOfRows; row++ )
            {
                // for (let column = 0; column < rightSideMatrix.getNumberOfColumns(); column++)
                // {
                    sum = 0;
                    i = 0;
                    while(i < limit) 
                    {
                        sum += this.elements[row][i]*originalElements[i];
                        i++;
                    }
                    //Homogenius Efficency Hack. Remember this.elements[row].length = number of columns in current row
                    //number of columns in this row = this.elements[row].length 
                    if ( this.elements[row].length > originalElements.length )
                    {
                        sum += this.elements[row][limit] ;
                    }
                    resultElements[row] = sum;
               // }
            }


    }







































    /**
     * Transform any GenericVector<number> on the right hand side. Modifies original vector. Uses Homogenius Efficency Hack: browsers run out of memory fast, so we may not ant to store the homogenous 1 at the end of vectors. But we need the math to work out the same.
     * @param {GenericVector<number>} rightSideVector any generic vector to be transformed
     */
    public transformVectorOnRight(rightSideVector: GenericVector<number>): void
    {
        let transformedArray = new Array<number>(rightSideVector.elements.length);
        this.MultiplyByArrayOnRightAndStoreToResultArray(rightSideVector.elements, transformedArray);
        rightSideVector.set(...transformedArray);
    }

    /**
     * Multiply by a GenericVector<number> on the right hand side using Homogenius Efficency Hack: browsers run out of memory fast, so we may not ant to store the homogenous 1 at the end of vectors. But we need the math to work out the same.
     * @param {GenericVector<number>} rightSideVector - vector to multiply by
     */
    public multiplyByVectorOnRight(rightSideVector: GenericVector<number>): RealNumberVector
    {
        let transformedArray = new Array<number>(rightSideVector.elements.length);
        this.MultiplyByArrayOnRightAndStoreToResultArray(rightSideVector.elements, transformedArray);
        let result = new RealNumberVector(transformedArray);
        return result;
    //     const limit = Math.min(this.getNumberOfColumns(), rightSideVector.elements.length );
    //    // const vectorLength = rightSideVector.elements.length;
    //     // if (this.getNumberOfColumns() !== vectorLength)
    //     // {
    //     //     throw new Error('Matrix Vector column mismatch.  Cannot multiply/transform vector.');
    //     // }
    //     // else
    //     // {
    //         const result = new RealNumberVector(null, rightSideVector.elements.length);
    //         let sum: number, i: number;
    //         for(let row = 0; row < this.getNumberOfRows(); row++ )
    //         {
    //             // for (let column = 0; column < rightSideMatrix.getNumberOfColumns(); column++)
    //             // {
    //                 sum = 0;
    //                 i = 0;
    //                 while(i < limit) 
    //                 {
    //                     sum += this.elements[row][i]*rightSideVector.elements[i];
    //                     i++;
    //                 }
    //                 //Homogenius Efficency Hack. Remember this.elements[row].length = number of columns in current row
    //                 if ( this.elements[row].length > rightSideVector.elements.length )
    //                 {
    //                     sum += this.elements[row][limit] ;
    //                 }
    //                 result.elements[row] = sum;
    //            // }
    //         }
    //         return result;
    //   //  }
    }

    /**
     * clone
     * @returns RealNumberMatrix
     */
    public clone(): RealNumberMatrix
    {
        const myClone = new RealNumberMatrix(null, this.getNumberOfRows(), this.getNumberOfColumns());
        for(let row = 0; row < this.getNumberOfRows(); row++ )
        {
            for(let column = 0; column < this.getNumberOfColumns(); column++)
            {
                myClone.elements[row][column] = this.elements[row][column];
            }
        }
        return myClone;
    }

    /**
     * Test if matrix is equal to another Matrix. (undefined, null, other types, and vectors with different values return false)
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
        //TODO : parse json?
        else if (obj instanceof RealNumberMatrix)
        {
            const otherMatrix = obj as RealNumberMatrix;
            if (((typeof this.elements === 'undefined')  && (typeof otherMatrix.elements !== 'undefined'))
            || ((typeof this.elements !== 'undefined')  && (typeof otherMatrix.elements === 'undefined')))
            {
                return false;
            }
            else if ((typeof this.elements === 'undefined')  && (typeof otherMatrix.elements === 'undefined'))
            {
                return true; //vaciously true
            }
            else
            {
                if (((this.elements === null) && (otherMatrix.elements !== null)) || ((this.elements !== null) && (otherMatrix.elements === null)))
                {
                    return false;
                }
                else if ((this.elements === null) && (otherMatrix.elements === null))
                {
                    return true; //vaciously true
                }
                else
                {
                    //they both have data, but do they match?
                    if (this.elements.length !== otherMatrix.elements.length)
                    {
                        return false; //different number of rows
                    }
                    else
                    {
                        for(let row = 0; row < this.elements.length; row++)
                        {
                            if (this.elements[row].length !== otherMatrix.elements[row].length)
                            {
                                return false; //column number miss matc
                            }
                            else
                            {
                                let absoluteDifference: number;
    
                                for(let col = 0; col < this.elements[row].length ; col++)
                                {
                                    absoluteDifference = Math.abs(this.elements[row][col] - otherMatrix.elements[row][col]);
                                    if (absoluteDifference > EquatableWithTolerance.Tolerance)
                                    {
                                        return false;
                                    }
                                }
                            }
                        }
                        //if we get here everything matchedd
                        return true;
                    }
                }
            }


        }
        else
        {
            //some other kind of object
            return false;
        }
    }




}
