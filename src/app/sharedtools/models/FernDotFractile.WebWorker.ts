import { RealNumberVector } from '../math/RealNumberVector';
import { ScreenRangeConverter2D } from "../math/ScreenRangeConverter2D";
import { RealNumberMatrix } from "../math/RealNumberMatrix";
/// <reference lib="webworker" />


addEventListener('message', ({ data }) => {
console.log('worker received message: ' + data);
});

//const rng = new ScreenRangeConverter2D(-2.1818 , 3.76, 0, 10 );
//postMessage( JSON.stringify( { range: rng} ));

//let response = null;
//response = `worker response to ${data}`;

//let v: RealNumberVector = new RealNumberVector(1, 2);
//postMessage(v);
//response = v; 
//let array: Array<RealNumberVector> = new Array();
//array.push(new  RealNumberVector());
//array.push(v);


//postMessage('blah blah' );

const stemMatrix = new RealNumberMatrix([[0, 0],[0, 0.16]]);
const smallLeafletMatrix = new RealNumberMatrix([[0.85, 0.04],[-0.04, 0.85]]);
const smallLeafletOffsetVector = new RealNumberVector([0, 1.6]);
const largeLeftLeafletMatrix = new RealNumberMatrix([[0.2, -0.26],[0.23, 0.22]]);
const largeLeftLeafletOffsetVector = new RealNumberVector([0, 1.6]);
const largeRightLeafletMatrix = new RealNumberMatrix([[-0.15, 0.28],[0.26, 0.24]]);
const largeRightLeafletOffsetVector = new RealNumberVector([0, 0.44]);



let randomValue: number = 0;
let currentPoint = new RealNumberVector([0, 0]);
let i:number = 0;
while (i < 30000 )
{
    if (randomValue < 0.01) 
    {
        currentPoint = stemMatrix.multiplyByVectorOnRight(currentPoint);
        
       // mathCanvas.drawPixelWorld2DCoordinates(currentPoint.x, currentPoint.y, 'brown');
    }
    else if (randomValue < 0.86)
    {
        currentPoint = smallLeafletMatrix.multiplyByVectorOnRight(currentPoint);
        currentPoint.add(smallLeafletOffsetVector);
       // mathCanvas.drawPixelWorld2DCoordinates(currentPoint.x, currentPoint.y, '#00FF20');
    }
    else if (randomValue < 0.93)
    {
        currentPoint = largeLeftLeafletMatrix.multiplyByVectorOnRight(currentPoint);
        currentPoint.add(largeLeftLeafletOffsetVector);
       // mathCanvas.drawPixelWorld2DCoordinates(currentPoint.x, currentPoint.y, '#00FF00');
    }
    else 
    {
        currentPoint = largeRightLeafletMatrix.multiplyByVectorOnRight(currentPoint);
        currentPoint.add(largeRightLeafletOffsetVector);
      //  mathCanvas.drawPixelWorld2DCoordinates(currentPoint.x, currentPoint.y, '#00FF00');
    }
    i++;
    randomValue = Math.random();
    
    postMessage(JSON.stringify(currentPoint));
}

//postMessage(JSON.stringify({ finished: true}));

//self.terminate(); //error - put in component after fractile models are replaced with direct web workers
