import './FractileGenerator.html';

import { FernDotFractile } from "./models/FernDotFractile";
import { FernLineFractile } from "./models/FernLineFractile";
import { Fractile } from "./models/Fractile";
import { MandelbrotFractile } from "./models/MandelbrotFractile";
import { MathCanvas2D } from "./models/MathCanvas2D";
import { SirpinskiTriangleFractile } from "./models/SirpinskiTriangleFractle";

var htmlCanvasElement: HTMLCanvasElement = null;
var canvasRenderingContext2D: CanvasRenderingContext2D;
var mathCanvas: MathCanvas2D = null;
var fractileMap: Map<string, Fractile> = null;
var selectedFractileToDisplay: string = null;




function draw(): void
{
    mathCanvas.Erase(); 
    

    if ((typeof fractileMap != 'undefined') && (fractileMap != null)  )
    {
        if (!fractileMap[selectedFractileToDisplay].calculated)
        {
          fractileMap[selectedFractileToDisplay].process();
        }
        mathCanvas.setRange(fractileMap[selectedFractileToDisplay].range);
        fractileMap[selectedFractileToDisplay].draw(mathCanvas);
    }



}




window.onresize = function(event: Event)
  {
    if ((typeof htmlCanvasElement == 'undefined') || (htmlCanvasElement == null)  )
    {
      htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;
    }
    htmlCanvasElement.width = window.innerWidth;
    htmlCanvasElement.height = window.innerHeight; 

    if ((typeof fractileMap != 'undefined') && (fractileMap != null)  )
    {
        fractileMap[selectedFractileToDisplay].onresize(htmlCanvasElement.width, htmlCanvasElement.height);
    }


    

    if ((typeof mathCanvas != 'undefined') && (mathCanvas != null))
    {
      mathCanvas.onresize();
    }
    
    draw();
  }

window.onload = function(event: Event)
{
    fractileMap = new Map<string, Fractile>();

    htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;
    fractileMap['SirpinskiTriangle'] = new SirpinskiTriangleFractile();
    fractileMap['FernDots'] = new FernDotFractile();
    fractileMap['FernLines'] = new FernLineFractile();
    fractileMap['Mandelbrot'] = new MandelbrotFractile();
    selectedFractileToDisplay = 
    'Mandelbrot' ;
   // fractileMap.entries().next().value;
//console.log( Array.from(fractileMap)[0]);


    htmlCanvasElement = document.getElementById('CanvasID') as HTMLCanvasElement;
    canvasRenderingContext2D = htmlCanvasElement.getContext('2d') ;
    mathCanvas = new MathCanvas2D(canvasRenderingContext2D);

    window.onresize(null);
}
// function onLoadFunction()
// {
//     console.log('window.addEventListener("load", onLoadFunction); fired');
// }
// window.addEventListener("load", onLoadFunction);









