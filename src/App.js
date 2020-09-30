import React from 'react';
import './App.css';
import {Eisenstein} from './eisenstein.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            s_real: 3,
            s_imag: 1,
            scale: 12,
        };

        this.primeProps = {
            radius: 5,
            fillStyle: "magenta",
            strokeColor: "none"
        };

        this.pathProps = {
            fillStyle: "none",
            strokeColor: "grey",
            strokeWidth: "3"
        };
    }

    keydown(e) {
        switch (e.keyCode) {
        case 187:
            this.setState((prevState) => {
                const newScale = Math.min(22, prevState.scale+1);
                return {
                    s_real: prevState.s_real,
                    s_imag: prevState.s_imag,
                    scale: newScale
                }
            });
            break;
        case 189:
            this.setState((prevState) => {
                const newScale = Math.max(4, prevState.scale-1);
                return {
                    s_real: prevState.s_real,
                    s_imag: prevState.s_imag,
                    scale: newScale
                }
            });
            break;
        }
    }

    onclick(e) {
        const bbox = e.target.getBBox();
        const mat = e.target.getScreenCTM().inverse();
        const r = (e.clientX * mat.a + mat.e) / this.state.scale;
        const i = -(e.clientY * mat.d + mat.f) / this.state.scale;
        const b = Math.round(i / (Math.sqrt(3)/2));
        const a = Math.round(r + b/2);
        this.setState((prevState) => {
            return {s_real: a,
                    s_imag: b,
                    scale: prevState.scale
                   }
        });
    }

    getPrimePoints(rmin, imin, rmax, imax, cx, cy, scale) {
        const s3 = Math.sqrt(3)/2;
        const bmin = Math.floor(imin/s3);
        const bmax = Math.ceil(imax/s3);
        const amin = Math.floor(rmin + bmin/2);
        const amax = Math.ceil(rmax + bmax/2);
        let points = [];
        for (let a=amin; a<=amax; a++) {
            for (let b=bmin; b<=bmax; b++) {
                const v = new Eisenstein(a,b);
                const r = v.real();
                if (r < rmin || r > rmax) {
                    continue;
                }
                const i = v.imag();
                if (i < imin || i > imax) {
                    continue;
                }
                if (v.isPrime()) {
                    const x = cx + scale*r;
                    const y = cy - scale*i;
                    points.push([x, y]);
                }
            }
        }
        return points;
    }

    getPath(cx, cy, scale) {
        const start_pt = new Eisenstein(this.state.s_real, this.state.s_imag);

        let curr_pt = new Eisenstein(start_pt);
        let curr_dir = new Eisenstein(1,0);
        let points = [[cx + scale*curr_pt.real(), cy - scale*curr_pt.imag()]];
        do {
            curr_pt = curr_pt.add(curr_dir);
            const x = cx + scale*curr_pt.real();
            const y = cy - scale*curr_pt.imag();
            points.push([x, y]);
            if (curr_pt.isPrime()) {
                curr_dir = curr_dir.multiply(new Eisenstein(0,-1));
            }
        } while(!curr_pt.equalTo(start_pt));

        let path_data = '';
        for (let i=0; i<points.length; i++) {
            path_data += (i===0?' M':' L');
            path_data += ' ' + points[i][0] + ' ' + points[i][1];
        }

        return <path fill={this.pathProps.fillStyle}
                     stroke={this.pathProps.strokeColor}
                     stroke-width={this.pathProps.strokeWidth}
                     d={path_data} />
    }

    render() {
        // convert a list of points into a collection of SVG circles
        const dotfun = (items) => items.map((item) => {
            const x = item[0];
            const y = item[1];
            const rad = 5;
            return <circle cx={x} cy={y} r={this.primeProps.radius}
                           fill={this.primeProps.fillStyle}
                           stroke={this.primeProps.strokeStyle}
                   />
        })

        const w = 1000;
        const h = 960;
        const xcount = Math.ceil((w/2) / this.state.scale);
        const ycount = Math.ceil((h/2) / this.state.scale);
        const rmin = -xcount;
        const rmax = xcount;
        const imin = -ycount;
        const imax = ycount;
        const prime_points = this.getPrimePoints(rmin, imin, rmax, imax, 0, 0, this.state.scale);
        const path = this.getPath(0, 0, this.state.scale);
        const box = [-w/2, -h/2, w, h];
        return (
            <div class="wrapper">
                <h2>Eisenstein Primes</h2>
                <svg xmlns="http://www.w3.org/2000/svg"
                     width={w/2}
                     height={h/2}
                     viewBox={box}
                     onKeyDown={this.keydown.bind(this)}
                     onClick={ this.onclick.bind(this)}
                     tabIndex="1"
                >
                <g fill="#FF00FF">
                    {path}
                    <> {dotfun(prime_points)} </>
                </g>
            </svg>
                <h3>Starting Point: {this.state.s_real} + {this.state.s_imag} <em>&#969;</em></h3>
            </div>
        );
    }
}

export default App;
