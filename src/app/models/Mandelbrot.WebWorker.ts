/// <reference lib="webworker" />
import { ComplexNumber } from "../math/ComplexNumber";
import { Pixel } from "./Pixel";


//var mandelbrotRange: Range2D = null;

const pixel: Pixel = new Pixel;


let complexCoordinate: ComplexNumber = null;

addEventListener('message', ({ data }) => {

    console.log('mandelbrot worker received message: ' + data);
    let parsedData = JSON.parse(data);
    if (parsedData.coordinate != undefined)
    {
    console.log('parsedData.coordinate = ' + parsedData.coordinate);
    // mathCanvas.drawPixelWorld2DCoordinatesFromVector2D(parsedData.dot, '#00FF00');
    complexCoordinate = parsedData.coordinate as ComplexNumber;

    pixel.x = complexCoordinate.realPart;
    pixel.y = complexCoordinate.imaginaryPart;
    pixel.color = 'green';

    postMessage(JSON.stringify({ dot: pixel}));


    }





    });