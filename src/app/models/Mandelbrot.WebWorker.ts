/// <reference lib="webworker" />
import { ColorHelper } from "../helpers/ColorHelper";
import { ComplexNumber } from "../math/ComplexNumber";
import { Coordinate2D } from "./Coordinate2D";
import { Pixel } from "./Pixel";
import { ISize2D } from "./ISize2D";


//var mandelbrotRange: Range2D = null;

const pixel: Pixel = new Pixel;  //ok out of loop ?

let rectangularLimits: ISize2D = null;
let currentCoordinate2D: Coordinate2D = null;
const complexCoordinate: ComplexNumber = new ComplexNumber(0, 0);
let Zn: ComplexNumber = null;
let n: number = 0;
const iterationLimit = 80; //TODO: put in .ini or .json file

addEventListener('message', ({ data }) => {


    rectangularLimits = JSON.parse(data) as ISize2D;

    if (rectangularLimits == null)
    {
        console.log('rectangularLimits = JSON.parse(data) as Size2D returned null in Mandelbrot.WebWorker '  );
    }
    else
    {
        console.log('width ' + rectangularLimits.width + ' height ' + rectangularLimits.height);

        /*
        let world2DCoordinates: Coordinate2D = null;
        for (let w = 0; w < rectangularLimits.width ; w++)
        {
            for (let h = 0; h < rectangularLimits.height; h++) 
            {
               // world2DCoordinates = mathCanvas.canvasToWorld2DCoordinates(w, h);

             ////   this.worker.postMessage( JSON.stringify( world2DCoordinates  ) );

            }
        }
        */

    }


/*

    try
    {
        currentCoordinate2D = JSON.parse(data) as Coordinate2D;
        if (currentCoordinate2D == null)
        {
            console.log('currentCoordinate2D == null');
        }
        else
        {
            complexCoordinate.setFromCoordinate(currentCoordinate2D);



        Zn = complexCoordinate.clone() as ComplexNumber;
        for (n = 1; n < iterationLimit; n++)
        {
            Zn.square();
            Zn.add(complexCoordinate);
            if (Zn.magnitudeSquared() > 4)
            {
                break;
            }
        }
    
        pixel.x = currentCoordinate2D.x;  //create set method?  Or cast as child object?
        pixel.y = currentCoordinate2D.y;
    
        if (n >= iterationLimit)
        {
            pixel.color = 'black';
        }
        else
        {
            pixel.color = ColorHelper.HSLToHex(n / iterationLimit);
        }
        
    console.log('color: ' + pixel.color);
        postMessage(JSON.stringify({ dot: pixel}));





        }
    }
    catch (e)
    {
        
    }
    

/*


   // console.log('mandelbrot worker received message: ' + data);
    let parsedData = JSON.parse(data);
    if (parsedData.coordinate == null)
    {
        console.log('parsedData.coordinate == null');
    }
    else
    {
 //   console.log('parsedData.coordinate = ' + parsedData.coordinate);
    // mathCanvas.drawPixelWorld2DCoordinatesFromVector2D(parsedData.dot, '#00FF00');

    //https://stackoverflow.com/questions/34031448/typescript-typeerror-myclass-myfunction-is-not-a-function
    complexCoordinate = parsedData.coordinate as ComplexNumber;
    // if (complexCoordinate == null )
    // {
    //     console.log('complexCoordinate == null ');
    // }
    // else
    if (complexCoordinate instanceof ComplexNumber) 
    {

        Zn = complexCoordinate.clone() as ComplexNumber;
        for (n = 1; n < iterationLimit; n++)
        {
            Zn.square();
            Zn.add(complexCoordinate);
            if (Zn.magnitudeSquared() > 4)
            {
                break;
            }
        }
    
        pixel.x = complexCoordinate.realPart;
        pixel.y = complexCoordinate.imaginaryPart;
    
        if (n >= iterationLimit)
        {
            pixel.color = 'black';
        }
        else
        {
            pixel.color = ColorHelper.HSLToHex(n / iterationLimit);
        }
        
    console.log('color: ' + pixel.color);
        postMessage(JSON.stringify({ dot: pixel}));
    }
    else
    {
        console.log('! complexCoordinate instanceof ComplexNumber');
    }



    }

    */





    });