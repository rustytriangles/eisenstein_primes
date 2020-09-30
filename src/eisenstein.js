const {isPrime} = require('mathjs');

export class Eisenstein {
    constructor(...args) {
        this.a = 0;
        this.b = 0;
        if (args.length === 0) {
            return;
        }

        if (args.length === 1 && args[0] instanceof Array && args[0].length === 2) {
            let arr = args[0];
            if (typeof (arr[0]) == "number" && typeof (arr[1]) == "number") {
                this.a = arr[0];
                this.b = arr[1];
                return;
            }
        }

        if (args.length === 1 && args[0] instanceof Object && 'a' in args[0]) {
            this.a = args[0].a;
            if ('b' in args[0]) {
                this.b = args[0].b;
            }
            return;
        }

        if (args.length === 1 && typeof(args[0]) == "number") {
            this.a = args[0];
            this.b = 0;
            return;
        }

        if (args.length === 2) {
            if (typeof (args[0]) == "number" && typeof (args[1]) == "number") {
                this.a = args[0];
                this.b = args[1];
                return;
            }
        }

        //        throw Errors.ILLEGAL_PARAMETERS;
        console.log('throw');
        throw 666;
    }

    real() {
        return this.a - this.b/2;
    }

    imag() {
        return this.b*Math.sqrt(3)/2;
    }

    equalTo(g) {
        return (this.a == g.a) && (this.b == g.b);
    }

    add(g) {
        return new Eisenstein(this.a + g.a, this.b + g.b);
    }

    subtract(g) {
        return new Eisenstein(this.a - g.a, this.b - g.b);
    }

    multiply(g) {
        return new Eisenstein(this.a*g.a - this.b*g.b,
                              this.b*g.a + this.a*g.b - this.b*g.b);
    }

    conjugate() {
        return new Eisenstein(this.a, -this.b);
    }

    norm() {
        return this.a*this.a - this.a*this.b + this.b*this.b;
    }

    isPrime() {
        if (this.a === 0 || this.b === 0 || this.a === this.b) {
            const c = Math.max(Math.abs(this.a), Math.abs(this.b));
            return isPrime(c) && (c%3) == 2;
        } else {
            return isPrime(this.norm());
        }
    }
}
