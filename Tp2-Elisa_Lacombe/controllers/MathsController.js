import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get(id) {
        let data = this.HttpContext.path.params;
        let op = data.op;
        let x = parseFloat(data.x);
        let y = parseFloat(data.y);
        let n = parseFloat(data.n);

        if (isNaN(x) && isNaN(y) && isNaN(n) && op == undefined) {
            this.HttpContext.response.HTML('<p><h1>GET : Maths endpoint</h1></p>' +
                '<p><h1>List of possible query strings:</h1></p><hr>' +
                '<p><h3>? op = + & x = number & y = number</p><p>return {"op":"+", "x":number, "y":numvber, "value": x + y}</h3></p>' +
                '<p><h3>? op = - & x = number & y = number</p><p>return {"op":"-", "x":number, "y":numvber, "value": x - y}</h3></p>' +
                '<p><h3>? op = * & x = number & y = number</p><p>return {"op":"*", "x":number, "y":numvber, "value": x * y}</h3></p>' +
                '<p><h3>? op = / & x = number & y = number</p><p>return {"op":"/", "x":number, "y":numvber, "value": x / y}</h3></p>' +
                '<p><h3>? op = % & x = number & y = number</p><p>return {"op":"%", "x":number, "y":numvber, "value": x % y}</h3></p>' +
                '<p><h3>? op = ! & n = integer</p><p>return {"op":"%", "n":integer, "value": n!}</h3></p>' +
                '<p><h3>? op = p & n = integer</p><p>return {"op":"p", "n":integer, "value": true if n is a prime number}</h3></p>' +
                '<p><h3>? op = np & n = integer</p><p>return {"op":"np", "n":integer, "value": nth prime number}</h3></p>'
            );
        }

        if (op != null && x != null && y != null || n != null) {
            if (op == '+' || op == ' ') {
                let value = x + y;
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            if (op == '-') {
                let value = x - y;
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            if (op == '*') {
                let value = x * y;
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            if (op == '/') {
                let value = x / y;
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            if (op == '%') {
                let value = x % y;
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            if (op == '!') {
                let value = n * -1;
                let message = "{'op':" + op + ",'n':" + n + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }

            if (op == 'p') {
                let value = isPrime(n);
                let message = "{'op':" + op + ",'n':" + n + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            if (op == 'np') {
                let value = getPrimeNumberAtPos(n);
                let message = "{'op':" + op + ",'n':" + n + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
            }
            /*else {
                if (!isNaN(y) && !isNaN(x)) {
                    let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error': this operation does not exist}";
                    this.HttpContext.response.JSON(message);
                }
                if (!isNaN(n)) {
                    let message = "{'op':" + op + ",'n':" + n + ", 'error': this operation does not exist}";
                    this.HttpContext.response.JSON(message);
                }
            }
            if (isNaN(y)) {
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error': 'y' is not a parameter}";
                this.HttpContext.response.JSON(message);
            }
            if (isNaN(x)) {
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error': 'x' is not a parameter}";
                this.HttpContext.response.JSON(message);
            }
            if (!isNaN(n) && !isNaN(y) && !isNaN(x)) {
                let message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ", 'n':" + n + ",'error': there are too many parameters}";
                this.HttpContext.response.JSON(message);
            }*/
        }
    }
}

function isPrime(n) {
    if (n <= 1)
        return false
    for (var i = 2; i <= n - 1; i++)
        if (n % i == 1)
            return true;
}

function getPrimeNumberAtPos(n) {
    var primeArray = [];
    var count = 0;

    for (var j = 1; j <= n; j++) {
        for (var i = 1; i <= j; i++) {
            if (j % i == 0) {
                count++;
            }
        }
        if (j == 1) {
            primeArray.push(j);
        }
        if (count == 2) {
            primeArray.push(j);
        }
        count = 0;
    }
    return primeArray[n];
}