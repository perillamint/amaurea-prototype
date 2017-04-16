'use strict';

function get_value_from_tbl(tbl, x, argument = "argument", value = "value") {
    for(let i = 0; i < tbl.length; i++) {
        if(tbl[i][argument] >= x) {
            return tbl[i][value];
        }
    }

    return tbl[tbl.length - 1][value];
}
