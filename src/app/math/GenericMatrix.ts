import { EquatableWithTolerance } from "./EquatableWithTolerance";

export abstract class GenericMatrix<T> extends EquatableWithTolerance
{
    public elements: T[][];
    public constructor()
    {
        super();
    }

    /** get the number of rows of the matrix */
    public getNumberOfRows(): number
    {
        return this.elements.length;
    }

    /** get the number of columns of the matrix */
    public getNumberOfColumns(): number
    {
        return this.elements[0].length;
    }
}