const API_URL = "http://localhost:5000/api/maths";
let currentHttpError = "";

function API_getcurrentHttpError() {
    return currentHttpError;
}
function API_GetMaths() {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL,
            success: maths => { currentHttpError = ""; resolve(maths); },
            error: (xhr) => { console.log(xhr); resolve(null); }
        });
    });
}
function API_GetValueXY(op, x, y) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "?op=" + op + "&x=" + x + "&y=" + y,
            success: math => { currentHttpError = ""; resolve(math); },
            error: (xhr) => { currentHttpError = xhr.responseJSON.error_description; resolve(null); }
        });
    });
}
function API_GetValueN(op, n) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "?op=" + op + "&n=" + n,
            success: math => { currentHttpError = ""; resolve(math); },
            error: (xhr) => { currentHttpError = xhr.responseJSON.error_description; resolve(null); }
        });
    });
}