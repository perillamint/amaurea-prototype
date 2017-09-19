'use strict';

//SI suffix
const Giga = Math.pow(10, 9);
const Mega = Math.pow(10, 6);
const Kilo = Math.pow(10, 3);
const milli = Math.pow(10, -3);
const micro = Math.pow(10, -6);
const nano = Math.pow(10, -9);

//Mathmatical constants
const pi = 3.14159265358979323846264338327;
const e = 2.718281828459045235360287471352;

//Physical constants
const h = 6.626070040 * Math.pow(10, -34); // J s
const c = 299792458;                       // m / s
const k = 1.38064852 * Math.pow(10, -23);  // J / K
const b = 0.0028977729;                    // K m

//Misc constants
const alpha = 1.5 * Math.pow(10, -24);     // F m^2, Nitrogen athmosphere
//const T_sun = 157 * Mega;                  // K, Sun core temperature
const T_sun = 5000;                        // K, Sun surface temperature

//Wavelengths
const r_wavelength = 650 * nano;           // m
const g_wavelength = 510 * nano;           // m
const b_wavelength = 475 * nano;           // m

const xyz_rgb_mat = [
    [2.3706743, -0.9000405, -0.4706338],
    [-0.5138850, 1.4253036, 0.0885814],
    [0.0052982, -0.0146949, 1.0093968]
];

function setBGColor(r, g, b) {
    console.log(r);
    console.log(g);
    console.log(b);
   document.body.style.background = 'rgb(' + r + ',' + g + ',' + b + ')';
}

function do_rayleigh(I, N, R, lambda, theta) {
    return I * (8 * Math.pow(pi, 4) * N * Math.pow(alpha, 2)) /
        (Math.pow(lambda, 4) * Math.pow(R, 2)) *
        ( 1 + Math.pow(Math.cos(theta), 2));
}

function do_sun_blackbody(lambda) {
    let intensity = 2 * h * Math.pow(c, 2) /
        (Math.pow(lambda, 5) * (Math.pow(e, (h * c) / (lambda * k * T_sun)) - 1));

    return intensity;
}

function get_peak_wavelength(T) {
    return b / T;
}

function xyz_to_rgb(x, y, z) {
    let r = x * xyz_rgb_mat[0][0] +
        y * xyz_rgb_mat[0][1] +
        z * xyz_rgb_mat[0][2];

    let g = x * xyz_rgb_mat[1][0] +
        y * xyz_rgb_mat[1][1] +
        z * xyz_rgb_mat[1][2];

    let b = x * xyz_rgb_mat[2][0] +
        y * xyz_rgb_mat[2][1] +
        z * xyz_rgb_mat[2][2];

    return {
        r: r,
        g: g,
        b: b
    };
}

function get_sun_spectra(start, stop, step) {
    let spectra = [];

    for(let i = start; i < stop; i += step) {
        spectra.push({
            lambda: i,
            radiance: do_sun_blackbody(i) // W * sr^-1 * m^-3
        });
    }

    return spectra;
}

function get_sun_relative_spectra(start, stop, step) {
    let peak = get_peak_wavelength(T_sun);
    let peak_r = do_sun_blackbody(peak);
    let spectra = get_sun_spectra(start, stop, step);

    for(let i = 0; i < spectra.length; i++) {
        spectra[i].radiance_rel = spectra[i].radiance / peak_r;
    }

    return spectra;
}

function get_sun_xyz() {
    const from = 380 * nano;
    const to = 780 * nano;
    const step = 5 * nano;

    let spectra = get_sun_relative_spectra(from, to, step);
    let xfunctbl = [];
    let yfunctbl = [];
    let zfunctbl = [];

    for(let i = from; i < to; i += step) {
        let cie_intensity = get_xyz_intensity(i);
        let radiance = get_value_from_tbl(spectra, i, "lambda", "radiance_rel");
        let x = cie_intensity.x * radiance;
        let y = cie_intensity.y * radiance;
        let z = cie_intensity.z * radiance;

        xfunctbl.push({
            argument: i,
            value: x
        });

        yfunctbl.push({
            argument: i,
            value: y
        });

        zfunctbl.push({
            argument: i,
            value: z
        });
    }

    console.log(from);
    console.log(to);
    console.log(step);

    return {
        x: integration(from, to, step, xfunctbl),
        y: integration(from, to, step, yfunctbl),
        z: integration(from, to, step, zfunctbl)
    };
}

function get_sun_rgb() {
    let xyz = get_sun_xyz();
    console.log(xyz);
    let rgb = xyz_to_rgb(xyz.x, xyz.y, xyz.z);
    let sum = rgb.r + rgb.g + rgb.b;

    return {
        r: Math.round(rgb.r / sum * 255),
        g: Math.round(rgb.g / sum * 255),
        b: Math.round(rgb.b / sum * 255)
    };
}

function get_rgb_from_rayleigh(N, R, theta) {
    //
}

function runsim () {
    console.log(get_sun_rgb());
}
