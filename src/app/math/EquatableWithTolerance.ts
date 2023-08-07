export abstract class EquatableWithTolerance
{
    public Tolerance: number;

    constructor()
    {
        this.Tolerance = 0.00005; //0.00000001;
    }

    public abstract equals(obj: any): boolean;
}
