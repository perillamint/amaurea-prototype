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

function setBGColor(r, g, b) {
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

function get_sun_rgb() {
    let peak_wavelength = get_peak_wavelength(T_sun);
    let peak = do_sun_blackbody(peak_wavelength);
    let r_intense = do_sun_blackbody(r_wavelength);
    let g_intense = do_sun_blackbody(g_wavelength);
    let b_intense = do_sun_blackbody(b_wavelength);

    return {
        r: Math.floor(r_intense / peak * 255),
        g: Math.floor(g_intense / peak * 255),
        b: Math.floor(b_intense / peak * 255)
    };
}

function get_rgb_from_rayleigh(N, R, theta) {
    //
}

function onload () {
    //
}
