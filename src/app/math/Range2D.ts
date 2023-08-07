export class Range2D
{
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;

    public constructor(xMin?: number, xMax?: number, yMin?: number, yMax?: number)
    {
        this.setValues(xMin, xMax, yMin, yMax);
    }

    public static Standard(): Range2D
    {
        const standard = new Range2D(-10, 10, -10, 10);
        return standard;
    }

    public setValues(xMin?: number, xMax?: number, yMin?: number, yMax?: number): void
    {
        this.xMin = xMin ?? 0;
        this.xMax = xMax ?? 0;
        this.yMin = yMin ?? 0;
        this.yMax = yMax ?? 0;
    }

    public xRange(): number
    {
        return this.xMax - this.xMin;
    }

    public yRange(): number
    {
        return this.yMax - this.yMin;
    }

    /**
     * check for data
     * @returns {boolean} true if data is present
     */
    
    public hasData(): boolean
    {
        return ((this.xMax != 0) || (this.xMin != 0) || (this.yMax != 0) || (this.yMin != 0))
    }

    public log(): void
    {
        console.log('set range:  this.xMin = ' + this.xMin  )
        console.log('set range:  this.xMax = ' + this.xMax  )
        console.log('set range:  this.yMin = ' + this.yMin  )
        console.log('set range:  this.yMax = ' + this.yMax  )
    }
}