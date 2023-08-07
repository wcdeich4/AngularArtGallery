//import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Range2D } from './Range2D';
import { Vector2D } from './Vector2D';

describe('Range2', () => {

    it('x and y Range x', () => {
        const range = new Range2D();
        range.xMin = -30;
        range.xMax = 20;
        range.yMin = -15;
        range.yMax = 10;
        expect(range.xRange()).toEqual(range.xMax - range.xMin);
        expect(range.yRange()).toEqual(range.yMax - range.yMin);
      });


});
