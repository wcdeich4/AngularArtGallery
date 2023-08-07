import { EquatableWithTolerance } from "./EquatableWithTolerance";

export abstract class GenericVector<T> extends EquatableWithTolerance
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
