export class IndexBaseClass
{
    constructor(vertexIndex?: number)
    {
      if (vertexIndex != null)
      {
        this.vertexIndex = vertexIndex;
      }
    }
    public vertexIndex: number = -1;


}
