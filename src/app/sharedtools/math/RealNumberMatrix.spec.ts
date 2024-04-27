import { error } from 'console';
import { Point2D } from './Point2D';
import { Probability } from './Probability';
import { RealNumberMatrix } from './RealNumberMatrix';
import { RealNumberVector } from './RealNumberVector';

describe('RealNumberMatrix tests', () => {


  it('RealNumberMatrix.setLookAtMatrix first octant camera', () => {
    const cameraPosition = new RealNumberVector([10, 10, 10]);
    const origin = new RealNumberVector([0, 0, 0]);
    const focalPoint = <RealNumberVector>origin;
    const upVector = new RealNumberVector([0, 0, 1]);
    const lookAtMatrix = new RealNumberMatrix();
    lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
    const point1 = new RealNumberVector([5, 5, 5]);
    const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);
  
  //expect(projectedPoint.equals(origin) ).toEqual(true);
  expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
  expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
  
  //make other projection matrix to compare??
  });

  it('RealNumberMatrix.setLookAtMatrix 2nd octant camera', () => {
    const cameraPosition = new RealNumberVector([-10, 10, 10]);
    const origin = new RealNumberVector([0, 0, 0]);
    const focalPoint = <RealNumberVector>origin;
    const upVector = new RealNumberVector([0, 0, 1]);
    
    const lookAtMatrix = new RealNumberMatrix();
    lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
    const point1 = new RealNumberVector([-5, 5, 5]);
    const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);
  
  //expect(projectedPoint.equals(origin) ).toEqual(true);
  expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
  expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
  
  //make other projection matrix to compare??
  });


  it('RealNumberMatrix.setLookAtMatrix look at origin from every angle', () => {
    let r1: number = 1, r2: number = 2, x: number, y: number, z: number;
    const cameraPosition = new RealNumberVector();
    const origin = new RealNumberVector([0, 0, 0]);
    const focalPoint = <RealNumberVector>origin;
    const upVector = new RealNumberVector([0, 0, 1]);
    const point1 = new RealNumberVector();
    let projectedPoint: RealNumberVector;
    let isMatch = false;
    const lookAtMatrix = new RealNumberMatrix();
    for (let longitude = 0; longitude < 2*Math.PI; longitude += Math.PI / 24) 
    {
      for (let latitude = 0; latitude < Math.PI; latitude  += Math.PI / 24) 
      {
        x = r2*Math.sin(latitude)*Math.cos(longitude);
        y = r2*Math.sin(latitude)*Math.sin(longitude);
        z = r2*Math.cos(latitude);
        cameraPosition.set(x, y, z);

        lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);

        x = r1*Math.sin(latitude)*Math.cos(longitude);
        y = r1*Math.sin(latitude)*Math.sin(longitude);
        z = r1*Math.cos(latitude);
        point1.set(x, y, z);
        projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);
      
        isMatch = Math.abs(projectedPoint.elements[0] - origin.elements[0]) < 0.0001 && 
        Math.abs(projectedPoint.elements[1] - origin.elements[1]) < 0.0001;


      if (!isMatch){

        projectedPoint.log();
        throw new Error("mismatch ");
      }

      }
      
    }



    

  
  //make other projection matrix to compare??
  });



  it('RealNumberMatrix.setLookAtMatrix x-axis camera', () => {
    const cameraPosition = new RealNumberVector([10, 0, 0]);
    const origin = new RealNumberVector([0, 0, 0]);
    const focalPoint = <RealNumberVector>origin;
    const upVector = new RealNumberVector([0, 0, 1]);
    
    const lookAtMatrix = new RealNumberMatrix();
    lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
    const point1 = new RealNumberVector([5, 0, 0]);
    const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);

//expect(projectedPoint.equals(origin) ).toEqual(true);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);

//make other projection matrix to compare??
 });

 it('RealNumberMatrix.setLookAtMatrix negative x-axis camera', () => {
  const cameraPosition = new RealNumberVector([-10, 0, 0]);
  const origin = new RealNumberVector([0, 0, 0]);
  const focalPoint = <RealNumberVector>origin;
  const upVector = new RealNumberVector([0, 0, 1]);
  
  const lookAtMatrix = new RealNumberMatrix();
  lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
  const point1 = new RealNumberVector([-5, 0, 0]);
  const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);

//expect(projectedPoint.equals(origin) ).toEqual(true);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
});

 it('RealNumberMatrix.setLookAtMatrix y-axis camera', () => {
  const cameraPosition = new RealNumberVector([0, 10, 0]);
  const origin = new RealNumberVector([0, 0, 0]);
  const focalPoint = <RealNumberVector>origin;
  const upVector = new RealNumberVector([0, 0, 1]);
  
  const lookAtMatrix = new RealNumberMatrix();
  lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
  const point1 = new RealNumberVector([0, 5, 0]);
  const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);

//expect(projectedPoint.equals(origin) ).toEqual(true);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
});

it('RealNumberMatrix.setLookAtMatrix negative y-axis camera', () => {
  const cameraPosition = new RealNumberVector([0, -10, 0]);
  const origin = new RealNumberVector([0, 0, 0]);
  const focalPoint = <RealNumberVector>origin;
  const upVector = new RealNumberVector([0, 0, 1]);
  
  const lookAtMatrix = new RealNumberMatrix();
  lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
  const point1 = new RealNumberVector([0, -5, 0]);
  const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);

//expect(projectedPoint.equals(origin) ).toEqual(true);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
});


it('RealNumberMatrix.setLookAtMatrix z-axis camera', () => {
  const cameraPosition = new RealNumberVector([0, 0, 10]);
  const origin = new RealNumberVector([0, 0, 0]);
  const focalPoint = <RealNumberVector>origin;
  const upVector = new RealNumberVector([0, 0, 1]);
  
  const lookAtMatrix = new RealNumberMatrix();
  lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
  const point1 = new RealNumberVector([0, 0, 5]);
  const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);

//expect(projectedPoint.equals(origin) ).toEqual(true);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
});

it('RealNumberMatrix.setLookAtMatrix negative z-axis camera', () => {
  const cameraPosition = new RealNumberVector([0, 0, -10]);
  const origin = new RealNumberVector([0, 0, 0]);
  const focalPoint = <RealNumberVector>origin;
  const upVector = new RealNumberVector([0, 0, 1]);
  
  const lookAtMatrix = new RealNumberMatrix();
  lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);
  const point1 = new RealNumberVector([0, 0, -5]);
  const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(point1);

//expect(projectedPoint.equals(origin) ).toEqual(true);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);
});


 it('RealNumberMatrix.setLookAtMatrix test 2 singularity', () => {
  const cameraPosition = new RealNumberVector([0, 0, 0]);
  const origin = new RealNumberVector([0, 0, 0]);
  const focalPoint = <RealNumberVector>origin;
  const upVector = new RealNumberVector([0, 0, 1]);
  
  const lookAtMatrix = new RealNumberMatrix()
  lookAtMatrix.setLookAtMatrix(cameraPosition, focalPoint, upVector);

  const vectorArray = new Array<RealNumberVector>();
  vectorArray.push(origin);
  const numberOfRandomPoints = 100;
  for (let index = 0; index < numberOfRandomPoints; index++)
  {
    vectorArray.push(new RealNumberVector([
      Probability.getRandomNumberInRange(-10000, 10000), 
      Probability.getRandomNumberInRange(-10000, 10000), 
      Probability.getRandomNumberInRange(-10000, 10000)
    ]));
  }

  vectorArray.forEach(p => {
    const projectedPoint = lookAtMatrix.multiplyByVectorOnRight(p);
expect(projectedPoint.elements[0] ).toEqual(origin.elements[0]);
expect(projectedPoint.elements[1] ).toEqual(origin.elements[1]);

  });

//make other projection matrix to compare??
});





  it('GenericMatrix.SetColumn', () => {
    const m2 = new RealNumberMatrix(null, 4, 4);
    m2.elements[0][0] = 1;
    m2.elements[0][1] = 2;
    m2.elements[1][0] = 3;
    m2.elements[1][1] = 4;
    const v = new RealNumberVector([9, 8, 7 ]);
    m2.setColumn(6, v);


    expect(m2.elements[0][0] ).toEqual(1);
    expect(m2.elements[0][1] ).toEqual(2);
    expect(m2.elements[1][0] ).toEqual(3);
    expect(m2.elements[1][1] ).toEqual(4);


    expect(m2.elements[0][4] ).toEqual(undefined);
    expect(m2.elements[0][5] ).toEqual(undefined);


    expect(m2.elements[0][6] ).toEqual(v.elements[0]);
    expect(m2.elements[1][6] ).toEqual(v.elements[1]);
    expect(m2.elements[2][6] ).toEqual(v.elements[2]);
    expect(m2.elements[3][6] ).toEqual(undefined);
  });


  it('GenericMatrix.transpose', () => {
    const numberOfRows = 4;
    const numberOfColumns = 4;  
    const m = new RealNumberMatrix(null, numberOfRows, numberOfColumns);
    m.elements[0][0] = 1;
    m.elements[0][1] = 2;
    m.elements[1][0] = 3;
    m.elements[1][1] = 4;
    const n = m.clone();
    n.transpose();

    for(let row=0; row < numberOfRows; row++)
    {
        for(let col=0; col < numberOfColumns; col++)
        {
          expect(m.elements[row][col]).toEqual(n.elements[col][row]) ;
        }
    }
  });

  it('Point2D.multiplyLeftOfMatrix', () => {

    const p = new Point2D(-5, 9);
    const m2 = new RealNumberMatrix(null, 4, 4);
    m2.elements[0][0] = 1;
    m2.elements[0][1] = 2;
    m2.elements[1][0] = 3;
    m2.elements[1][1] = 4;
    const q = p.multiplyLeftOfMatrix(m2);
    expect(q.x).toEqual(22);
    expect(q.y).toEqual(26);
  });


  it('RealNumberMatrix.getNumberOfRowsColumns', () => {
    const expectedNumberOfRows = 4;
    const expectedNumberOfColumns = 5;  
    const m = new RealNumberMatrix(null, expectedNumberOfRows, expectedNumberOfColumns);
    const actualNumberOfRows =    m.getNumberOfRows();
    expect(expectedNumberOfRows).toEqual(actualNumberOfRows);
    const actualNumberOfColumns = m.getNumberOfColumns();
    expect(expectedNumberOfColumns).toEqual(actualNumberOfColumns);
  });

  it('RealNumberMatrix.multiply', () => {
    const A = new RealNumberMatrix(null, 4, 4);
    A.elements[0][0] = 1;  A.elements[0][1] = 2;  A.elements[0][2] = 3;  A.elements[0][3] = 4;
    A.elements[1][0] = 5;  A.elements[1][1] = 6;  A.elements[1][2] = 7;  A.elements[1][3] = 8;
    A.elements[2][0] = 9;  A.elements[2][1] = 10; A.elements[2][2] = 11; A.elements[2][3] = 12;
    A.elements[3][0] = 13; A.elements[3][1] = 14; A.elements[3][2] = 15; A.elements[3][3] = 16;

    const B = new RealNumberMatrix(null, 4, 4);
    B.elements[0][0] = 16; B.elements[0][1] = 15; B.elements[0][2] = 14; B.elements[0][3] = 13;
    B.elements[1][0] = 12; B.elements[1][1] = 11; B.elements[1][2] = 10; B.elements[1][3] = 9;
    B.elements[2][0] = 8;  B.elements[2][1] = 7;  B.elements[2][2] = 6; B.elements[2][3]  = 5;
    B.elements[3][0] = 4;  B.elements[3][1] = 3;  B.elements[3][2] = 2; B.elements[3][3]  = 1;

    const C = new RealNumberMatrix(null, 4, 4);
    C.elements[0][0] = 80; C.elements[0][1] = 70; C.elements[0][2] = 60; C.elements[0][3] = 50;
    C.elements[1][0] = 240; C.elements[1][1] = 214; C.elements[1][2] = 188;  C.elements[1][3] = 162;
    C.elements[2][0] = 400;  C.elements[2][1] = 358;  C.elements[2][2] = 316; C.elements[2][3]  = 274;
    C.elements[3][0] = 560;  C.elements[3][1] = 502;  C.elements[3][2] = 444; C.elements[3][3]  = 386;

    //A times B equals expected
    let D;
    var startTime = new Date().getTime();
    for(let i = 0; i < 10000; i++){
    D = A.multiplyBy(B);
    }
    var elapsed = new Date().getTime() - startTime;
    console.log("Generic matrix 4x4 elapsed = " + elapsed);

    if (typeof D === 'undefined')
    {
      throw new Error('D matrix is unefined in RealNumberMatrix.spec.ts???????!!!!!!!!!!!!');
    }

    let CMatchesD = C.equals(D);
    if (!CMatchesD){
      console.log(C);
      console.log(D);
    }


    expect(CMatchesD).toEqual(true);

    const E = new RealNumberMatrix(null, 4,4);
    E.elements[0][0] = 386;  E.elements[0][1] = 444;  E.elements[0][2] = 502;  E.elements[0][3] = 560;
    E.elements[1][0] = 274;  E.elements[1][1] = 316;  E.elements[1][2] = 358;  E.elements[1][3] = 400;
    E.elements[2][0] = 162;  E.elements[2][1] = 188;  E.elements[2][2] = 214;  E.elements[2][3] = 240;
    E.elements[3][0] = 50;   E.elements[3][1] = 60;   E.elements[3][2] = 70;   E.elements[3][3] = 80;

    //B times A equals expected
    const F = B.multiplyBy(A);
    expect(F.equals(E)).toEqual(true);

    //A times B does not equal B times A
    expect(F.equals(D)).toEqual(false);

    });













});
