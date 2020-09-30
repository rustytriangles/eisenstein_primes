An interactive toy for exploring the patterns in the Eisenstein primes that are similar to the ones I
talked about [here](https://rustytriangles.github.io/jekyll/update/2020/09/29/gaussian-primes.html).

A little background. An [Eisenstein integer](https://en.wikipedia.org/wiki/Eisenstein_integer) is basically a complex number
with two integer components. The first of these, which I called a is purely real. The second one is multiplied by the
complex number -1/2 + sqrt(3)/2 *i*. If you plot these, you'll see that they form a grid of equilateral triangles.

An [Einstein prime](https://en.wikipedia.org/wiki/Eisenstein_prime) is a member of the Eisenstein integers which is only
divisble by itself and the six units of that grid.

The rule for tracing these paths is analogous to the one for the Gaussian primes.
* Pick a Eisenstain integer
* Start moving in the +X direction
* When you hit a Eisenstein prime, turn left 60 degrees
* Continue until you reach the starting point

![screenshot](images/screenshot.png')
