import { MathCanvas2D } from "./MathCanvas2D";
import { Fractile } from "./Fractile";
import { Range2D } from "../math/Range2D";
import { ComplexNumber } from "../math/ComplexNumber";
import { Coordinate2D } from "./Coordinate2D";
import { ISize2D } from "./ISize2D";

export class MandelbrotFractile extends Fractile
{
    public calculated: boolean = true;
    public iterationLimit: number = 80;
    private worker: Worker;

    constructor()
    {
        super();
        this.range = new Range2D(-2.00, 0.47, -1.12, 1.12 );
     //   this.range.log();
        
    }

    public disposeOfWorker(): void
    {
      if (this.worker != undefined && this.worker != null)
      {
        this.worker.terminate();
        this.worker = undefined;
      }
    }


    draw(mathCanvas: MathCanvas2D): void 
    {

        if (typeof Worker == 'undefined') {
            alert("Sorry, your browser does not support Web Workers...");
        }
        else
        {
        // Create a new web worker
        this.worker = new Worker(new URL('./Mandelbrot.WebWorker', import.meta.url));
        console.log('worker created');


        //max time to let worker run
        setTimeout(function(){ 
            if (this.worker != undefined && this.worker != null) { this.disposeOfWorker(); }
            }, 60000);


        this.worker.onmessage = ({ data }) => {

            let parsedData = JSON.parse(data);



            if (parsedData.dot == null)
            {
                console.log('parsedData.dot == null')
            }
            else //if (parsedData.dot != undefined)
            {
            console.log('parsedData.dot = ' + parsedData.dot);
            mathCanvas.drawPixelWorld2D(parsedData.dot);
            }

            if (parsedData.finished != undefined)
            {
            console.log('dispsosing of worker');
            this.disposeOfWorker();
            }


        };
    //       worker.postMessage('message sent from FernDotFractile.ts to worker');
        }

        if (this.worker == null)
        {
            console.log('this.worker == null');
        }
        else
        {
            console.log('this.worker != null');

           // const limits0: ISize2D = new ISize2D(); //error
           // limits.width = mathCanvas.getWidth();
           // limits.height = mathCanvas.getHeight();
           const limits: ISize2D = { width: mathCanvas.getWidth(), height: mathCanvas.getHeight() };

            this.worker.postMessage( JSON.stringify( limits  ) );

            
/*
            const width = mathCanvas.getWidth();
            const height = mathCanvas.getHeight();
            let world2DCoordinates: Coordinate2D = null;
            for (let w = 0; w < width; w++)
            {
                for (let h = 0; h < height; h++) 
                {
                    world2DCoordinates = mathCanvas.canvasToWorld2DCoordinates(w, h);

    
                    this.worker.postMessage( JSON.stringify( world2DCoordinates  ) );
    
                   
    
    
    
                }
    
                
            }


        */

        }



    }

    process(): void {
        
    }

    
}