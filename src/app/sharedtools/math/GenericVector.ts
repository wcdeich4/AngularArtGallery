import { EquatableWithTolerance } from "./EquatableWithTolerance";
//import { ICloneable } from "./ICloneable";

export abstract class GenericVector<T> extends EquatableWithTolerance // implements ICloneable< GenericVector<T>>
{
    public static DefaultStringInputDelimeter: string = ' ';
    public elements: T[];

    abstract magnitude(): number;
    abstract normalize(): void;
    abstract dotProduct(otherVector: GenericVector<T>): number;
    abstract add(otherVector: GenericVector<T>): void;
    abstract subtract(otherVector: GenericVector<T>): void;
    abstract multiplyByScalar(scalar: number): void;
    abstract divideByScalar(scalar: number): void;
    //abstract setFromDelimetedString(line: string): string

    public log(): void
    {
        console.log(this.elements);
    }

    /**
     * set elements
     * @param elementArgs {var args array of T} new array elements to set
     */
    public set(...elementArgs: T[]): void
    {
        this.elements = elementArgs;
    }

    /**
     * copy from vector up to limit
     * @param {otherVector: GenericVector<T>} otherVector to copy from
     * @param {number} limit to copy
     */
    public copyFromVectorWithLimit(otherVector: GenericVector<T>, limit: number): void
    {
        for (let i = 0; i < limit; i++) 
        {
            this.elements[i] = otherVector.elements[i];            
        }
    }

    // public clone():  GenericVector<T> 
    // {
    //     let result = new GenericVector<T> ();
    //     throw new Error("Method not implemented.");
    // }

    public toString(): string
    {
        let result = '<';
        let i = 0;
        for(let e of this.elements)
        {
            if (i > 0)
            {
                result += ', ';
            }
            result += e;
            i++;
        }
        result += '>';
        return result;
    }

}
