import { Pixel } from "./Pixel";

export class GlobalSingleton
{
    private static instance: GlobalSingleton = new GlobalSingleton();
    public currentPixel: Pixel = new Pixel();
    public okToComputeFractileInWorker = true;
    private constructor() {}

    public static getInstance(): GlobalSingleton
    {
        return this.instance;
    }
}