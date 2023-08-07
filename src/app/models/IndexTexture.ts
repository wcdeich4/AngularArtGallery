import { IndexBaseClass } from "./IndexBaseClass";

export class IndexTexture extends IndexBaseClass
{
    constructor(vertexIndex?: number, textureCoordinateIndex?: number)
    {
        super(vertexIndex);
        if (textureCoordinateIndex != null)
        {
            this.textureCoordinateIndex = textureCoordinateIndex;
        }
    }

    public textureCoordinateIndex: number = -1;


}
