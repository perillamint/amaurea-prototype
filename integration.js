'use strict';

// Use composite simpson rule here
function integration(from, to, step, tbl) {
    let ret = 0;
    for(let i = from; i < from + (to - from) / 2; i += step) {
        let x1 = from + step * (2 * i - 2);
        let x2 = from + step * (2 * i - 1);
        let x3 = from + step * (2 * i);

        ret += get_value_from_tbl(tbl, x1);
        ret += 4 * get_value_from_tbl(tbl, x2);
        ret += get_value_from_tbl(tbl, x3);
    }

    ret = ret * step / 3;

    return ret;
}
