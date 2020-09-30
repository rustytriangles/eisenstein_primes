import {Eisenstein} from './eisenstein.js';

test('default ctor', () => {
    const a = new Eisenstein();
    expect(a.equalTo(new Eisenstein(0,0)));
});

test('single arg ctor', () => {
    const a = new Eisenstein(3);
    expect(a.equalTo(new Eisenstein(3,0)));
});

test('array ctor', () => {
    const a = new Eisenstein([1, 2]);
    expect(a.equalTo(new Eisenstein(1,2)));
});

test('object ctor', () => {
    const a = new Eisenstein({a: 1, b: 2});
    expect(a.equalTo(new Eisenstein(1,2)));
});

test('real', () => {

    expect(new Eisenstein(1,0).real()).toBe(1);
    expect(new Eisenstein(-1,0).real()).toBe(-1);
    expect(new Eisenstein(2,0).real()).toBe(2);

    expect(new Eisenstein(0,1).real()).toBeCloseTo(-0.5);
    expect(new Eisenstein(1,1).real()).toBeCloseTo(0.5);
    expect(new Eisenstein(0,-1).real()).toBeCloseTo(0.5);
});

test('imag', () => {

    expect(new Eisenstein(1,0).imag()).toBe(0);

    const s3 = Math.sqrt(3.)/2.;
    expect(new Eisenstein(0,1).imag()).toBeCloseTo(s3);
    expect(new Eisenstein(0,-1).imag()).toBeCloseTo(-s3);
});

test('norm', () => {
    expect(new Eisenstein( 2, 1).norm()).toBe(3);
    expect(new Eisenstein( 1, 2).norm()).toBe(3);
    expect(new Eisenstein(-1, 1).norm()).toBe(3);
    expect(new Eisenstein(-2,-1).norm()).toBe(3);
    expect(new Eisenstein(-1,-2).norm()).toBe(3);
    expect(new Eisenstein( 1,-1).norm()).toBe(3);

    // I
    expect(new Eisenstein( 2, 0).norm()).toBe(4);
    expect(new Eisenstein( 2, 2).norm()).toBe(4);
    expect(new Eisenstein( 0, 2).norm()).toBe(4);
    expect(new Eisenstein(-2, 0).norm()).toBe(4);
    expect(new Eisenstein(-2,-2).norm()).toBe(4);
    expect(new Eisenstein( 0,-2).norm()).toBe(4);

    // R
    expect(new Eisenstein( 2, 1).norm()).toBe(3);
    expect(new Eisenstein( 1, 2).norm()).toBe(3);
    expect(new Eisenstein(-1, 1).norm()).toBe(3);
    expect(new Eisenstein(-2,-1).norm()).toBe(3);
    expect(new Eisenstein(-1,-2).norm()).toBe(3);
    expect(new Eisenstein( 1,-1).norm()).toBe(3);

    // S1
    expect(new Eisenstein( 3, 2).norm()).toBe(7);
    expect(new Eisenstein( 1, 3).norm()).toBe(7);
    expect(new Eisenstein(-2, 1).norm()).toBe(7);
    expect(new Eisenstein(-3,-2).norm()).toBe(7);
    expect(new Eisenstein(-1,-3).norm()).toBe(7);
    expect(new Eisenstein( 2,-1).norm()).toBe(7);

    // S2
    expect(new Eisenstein( 2,-1).norm()).toBe(7);
    expect(new Eisenstein(-1,-3).norm()).toBe(7);
    expect(new Eisenstein(-3,-2).norm()).toBe(7);
    expect(new Eisenstein(-2, 1).norm()).toBe(7);
    expect(new Eisenstein( 1, 3).norm()).toBe(7);
    expect(new Eisenstein( 3, 2).norm()).toBe(7);
});

test('isPrime', () => {

    // ring of 2,0
    expect(new Eisenstein( 2, 0).isPrime()).toBeTruthy();
    expect(new Eisenstein( 2, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 0, 2).isPrime()).toBeTruthy();
    expect(new Eisenstein(-2, 0).isPrime()).toBeTruthy();
    expect(new Eisenstein(-2,-1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 0,-2).isPrime()).toBeTruthy();

    // rinbg of 2,1
    expect(new Eisenstein( 2, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 1, 2).isPrime()).toBeTruthy();
    expect(new Eisenstein(-1, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein(-2,-1).isPrime()).toBeTruthy();
    expect(new Eisenstein(-1,-2).isPrime()).toBeTruthy();
    expect(new Eisenstein( 1,-1).isPrime()).toBeTruthy();

    // ring of 3,2
    expect(new Eisenstein( 3, 2).isPrime()).toBeTruthy();
    expect(new Eisenstein( 1, 3).isPrime()).toBeTruthy();
    expect(new Eisenstein(-2, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein(-3,-2).isPrime()).toBeTruthy();
    expect(new Eisenstein(-1,-3).isPrime()).toBeTruthy();
    expect(new Eisenstein( 2,-1).isPrime()).toBeTruthy();

    // ring of 2,-1
    expect(new Eisenstein( 2,-1).isPrime()).toBeTruthy();
    expect(new Eisenstein(-1,-3).isPrime()).toBeTruthy();
    expect(new Eisenstein(-3,-2).isPrime()).toBeTruthy();
    expect(new Eisenstein(-2, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 1, 3).isPrime()).toBeTruthy();
    expect(new Eisenstein( 3, 2).isPrime()).toBeTruthy();

    // ring of 1,-1
    expect(new Eisenstein( 2, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 1, 2).isPrime()).toBeTruthy();
    expect(new Eisenstein(-1, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein(-2,-1).isPrime()).toBeTruthy();
    expect(new Eisenstein(-1,-2).isPrime()).toBeTruthy();
    expect(new Eisenstein( 1,-1).isPrime()).toBeTruthy();

    // natural primes
    expect(new Eisenstein(2).isPrime()).toBeTruthy();
    expect(new Eisenstein(3).isPrime()).toBeFalsy();
    expect(new Eisenstein(5).isPrime()).toBeTruthy();
    expect(new Eisenstein(7).isPrime()).toBeFalsy();
    expect(new Eisenstein(11).isPrime()).toBeTruthy();
    expect(new Eisenstein(13).isPrime()).toBeFalsy();
    expect(new Eisenstein(17).isPrime()).toBeTruthy();
    expect(new Eisenstein(19).isPrime()).toBeFalsy();
    expect(new Eisenstein(23).isPrime()).toBeTruthy();
    expect(new Eisenstein(29).isPrime()).toBeTruthy();
    expect(new Eisenstein(31).isPrime()).toBeFalsy();
    expect(new Eisenstein(37).isPrime()).toBeFalsy();
    expect(new Eisenstein(41).isPrime()).toBeTruthy();

    // others
    expect(new Eisenstein( 3, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 4, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 5, 2).isPrime()).toBeTruthy();
    expect(new Eisenstein( 6, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 7, 1).isPrime()).toBeTruthy();
    expect(new Eisenstein( 7, 3).isPrime()).toBeTruthy();
});
