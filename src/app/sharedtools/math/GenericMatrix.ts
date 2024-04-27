import { EquatableWithTolerance } from "./EquatableWithTolerance";
import { GenericVector } from "./GenericVector";

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
    /***
     * expand matrix rows if needed
     */
    protected ensureEnoughRows(requiredNumberOfRows: number): void
    {
        if (this.elements == null)
        {
            this.elements = new Array<Array<T>>();
        }
        if (requiredNumberOfRows > this.elements.length)
        {
            this.elements.length = requiredNumberOfRows;
        }
    }

    /**
     * JavaScript 2D arrays are inherently jagged, so we have to check column length per row
     * @param rowIndex {number} current row to check
     * @param requiredNumberOfColumns {number} of column poistions needed
     */
    protected ensureEnoughColumnsInRow(rowIndex: number, requiredNumberOfColumns: number): void
    {
        if (this.elements[rowIndex] == null)
        {
            this.elements[rowIndex] = new Array<T>();
        }
        if (requiredNumberOfColumns > this.elements[rowIndex].length )
        {
            this.elements[rowIndex].length = requiredNumberOfColumns ;
        }
    }



    /**
     * set row in matrix
     * @param rowIndex {number} index of row to set
     * @param row {GenericVector<T>} new row that will be set
     */
    public setRow(rowIndex: number, row: GenericVector<T>): void
    {
        this.ensureEnoughRows(rowIndex +1 );
        this.elements[rowIndex] = row.elements;
    }

    /**
     * copy one row to another.  Warnings:  overwrites any data in destination row. Watch out for tangled objects if T is not a primitive type!!!
     * @param {number} sourceRowIndex row to copy
     * @param {number} destinationRowIndex row to store to
     */
    public copyRow(sourceRowIndex: number, destinationRowIndex: number): void
    {
        for(let column = 0; column < this.elements[destinationRowIndex].length; column++)
        {
            this.elements[destinationRowIndex][column] = this.elements[sourceRowIndex][column];
        }
    }

    /**
     * set column
     * @param columnIndex {number} coulmn to set
     * @param column {GenericVector<T>} new column
     */
    public setColumn(columnIndex: number, column: GenericVector<T>): void
    {
        this.ensureEnoughRows(column.elements.length  );
        for (let rowIndex = 0; rowIndex < column.elements.length; rowIndex++) 
        {
            this.ensureEnoughColumnsInRow(rowIndex, columnIndex + 1);
            this.elements[rowIndex][columnIndex] = column.elements[rowIndex];
        }
    }

    /**
     * set element in matrix with safety checks
     * @param rowIndex {number} row index to set newElement at
     * @param columnIndex {number} column index to set newElement at
     * @param newElement {T} new element to set
     */
    public setElement(rowIndex: number, columnIndex: number, newElement: T): void
    {
        this.ensureEnoughRows(rowIndex +1 );
        this.ensureEnoughColumnsInRow(rowIndex, columnIndex + 1);
        this.elements[rowIndex][columnIndex] = newElement;
    }
    
    /**
     * transpose this matrix
     */
    public transpose(): void
    {
        //taking the minimum of rows and columns is a dirty hack.  It prevents an error for non-square matricies, but could result in bad behavior down the road.
        const limit = Math.min(this.getNumberOfRows(), this.getNumberOfColumns());
        let temp: T;
        for(let row=0; row < limit; row++)
        {
            for(let col=0; col < limit; col++)
            {
                if (col < row)
                {
                    temp = this.elements[row][col];
                    this.elements[row][col] = this.elements[col][row] ;
                    this.elements[col][row] = temp; 
                }
            }
        }
		
    }

    /**
     * get dispaly string for matrix
     * @returns {string} matrix string representation
     */
    public toString(): string
    {
        let result = '';
        for (let row = 0; row < this.elements.length; row++)
        {
            result += '[';
            for (let col = 0; col < this.elements[row].length; col++)
            {
                result = result + this.elements[row][col] + ' ';
            }
            result += '[';
        }
        return result;
    }

    public log(): void
    {
        console.log(this.toString());
    }




}