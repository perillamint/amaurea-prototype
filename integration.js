'use strict';

// Use composite simpson rule here
function integration(from, to, step, tbl) {
    let ret = 0;
    let i = 0;
    for(i = 2; i < (to-from) / step / 2; i++) {
        let x1 = from + (2 * i - 2) * step;
        let x2 = from + (2 * i - 1) * step;
        let x3 = from + (2 * i) * step;

        ret += get_value_from_tbl(tbl, x1);
        ret += 4 * get_value_from_tbl(tbl, x2);
        ret += get_value_from_tbl(tbl, x3);
    }

    ret = ret * step / 3;

    return ret;
}
