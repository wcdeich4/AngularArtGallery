//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComplexNumber } from './ComplexNumber';
import { Probability } from './Probability';

describe('ComplexNumber', () => {

    it('Complex Number Clone', () => {
        const z = new ComplexNumber(5, -7);
        let w: ComplexNumber;
        w = z.clone() as ComplexNumber;
        expect(z.equals(w)).toEqual(true);
    });
  
    it('Complex Number e to i theta', () => {
        const theta = Math.PI / 3;
        const z = ComplexNumber.eToITheta(theta);
        expect(z.realPart === Math.cos(theta));
        expect(z.imaginaryPart === Math.sin(theta));
    });

    it('Complex Number Add', () => {
        const first = new ComplexNumber(-3, 99);
        const second= new ComplexNumber(88, -104);
        const third = first.getSumWith(second);
        expect(third.realPart === (first.realPart + second.realPart));
        expect(third.imaginaryPart === (first.imaginaryPart + second.imaginaryPart));
    });

    it('Complex Number Subtract', () => {
        const first = new ComplexNumber(-5, 999);
        const second= new ComplexNumber(88, -104);
        const third = first.getDifferenceWith(second);
        expect(third.realPart === (first.realPart - second.realPart));
        expect(third.imaginaryPart === (first.imaginaryPart - second.imaginaryPart));
    });

    it('Complex Number Multiply by Scalar', () => {
        const c = new ComplexNumber(-5, 999);
        const scalar = -1234567;
        const result = c.getMultipliedByScalar(scalar);
        expect(result.realPart === (c.realPart * scalar));
        expect(result.imaginaryPart === (c.imaginaryPart * scalar));
    });

    
    it('Complex Number Divide by Scalar', () => {
        const c = new ComplexNumber(-5, 999);
        const scalar = -1234567;
        const result = c.getDividedByScalar(scalar);
        expect(result.realPart === (c.realPart / scalar));
        expect(result.imaginaryPart === (c.imaginaryPart / scalar));
    });

    it('Complex Numbers multiply', () => {
        const r1 = -9876;
        const i1 = 12345;
        const r2 = 3654;
        const i2 = -654987;
        let c1 = new ComplexNumber(r1,i1);
        let c2 = new ComplexNumber(r2,i2);
        let c3 = c1.getMultipliedByComplexNumber(c2);
        expect(c3.realPart === r1*r2 - i1*i2);
        expect(c3.imaginaryPart === r1*i2 + r2*i1);        
    });

    it('Complex Numbers squared', () => {
        const r1 = -9876;
        const i1 = 12345;
        let c = new ComplexNumber(r1,i1);
        let c3 = c.getSquared();
        expect(c3.realPart === r1*r1 - i1*i1);
        expect(c3.imaginaryPart === r1*i1 + r1*i1);        
    });

    it('Complex Number magnitude', () => {
        let c = new ComplexNumber(3,7);
        let r = c.magnitude();
        expect(r == Math.sqrt(3*3 + 7*7));
    }); 

    it('Complex Number normalize', () => {
        const r1 = Probability.getRandomNumberInRange(-10000, 10000);
        const i1 = Probability.getRandomNumberInRange(-10000, 10000);
        const c = new ComplexNumber(r1, i1);
        let normalizedVector = c.getNormalized();
        expect(1 == normalizedVector.magnitude());
    }); 

    it('Complex Number GetAngle #0', () => {
        let c = new ComplexNumber(0,0);
        let angle = c.getAngle();
        expect(angle == 0)
    }); 

    it('Complex Number GetAngle #1', () => {
        let c = new ComplexNumber(0,1);
        let angle = c.getAngle();
        expect(angle == Math.PI / 2)
    }); 

    it('Complex Number GetAngle #2', () => {
        let c = new ComplexNumber(-1,0);
        let angle = c.getAngle();
        expect(angle == Math.PI)
    }); 

    it('Complex Number GetAngle #3', () => {
        let c = new ComplexNumber(0, -1);
        let angle = c.getAngle();
        expect(angle == -Math.PI / 2)
    }); 

    it('Complex Number GetAngle #4', () => {
        let c = new ComplexNumber(1,1);
        let angle = c.getAngle();
        expect(angle == Math.PI / 4)

    }); 

    it('Complex Number GetAngle #5', () => {
        let c = new ComplexNumber(-1,1);
        let angle = c.getAngle();
        expect(angle == 3 * Math.PI / 4)
    }); 

    it('Complex Number GetAngle #6', () => {
        let c = new ComplexNumber(-1,-1);
        let angle = c.getAngle();
        expect(angle == 5 * Math.PI / 4)
    }); 

    it('Complex Number GetAngle #7', () => {
        let c = new ComplexNumber(1,-1);
        let angle = c.getAngle();
        expect(angle == -Math.PI / 4)

    });  

    it('Complex Number Raise To Power #1', () => {
        const r1 = Probability.getRandomNumberInRange(-10000, 10000);
        const i1 = Probability.getRandomNumberInRange(-10000, 10000);
        const c1 = new ComplexNumber(r1, i1);
        const power = 11;
        let expectedResult = c1.clone();
        let i = 1;
        while (i < power)
        {
            expectedResult = expectedResult.getMultipliedByComplexNumber( expectedResult);
            i++;
        }
        const actualResult = c1.raiseToPower(power);
        expect(expectedResult.equals(actualResult));


    });





});