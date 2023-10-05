import Controller from './Controller.js';
import fs from 'fs';
import path from 'path';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get(id) {
        let message;
        let value;
        let error;
        let data = this.HttpContext.path.params;
        let op = data.op;
        let x = parseFloat(data.x);
        let y = parseFloat(data.y);
        let n = parseFloat(data.n);

        /*if (isNaN(x) && !isNaN(y)) {
            error = this.HttpContext.response.unprocessable("'x' parameter is not a number");
            message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error':" + error + "}";
            this.HttpContext.response.JSON(message);
        } else if (!isNaN(x) && isNaN(y)) {
            error = this.HttpContext.response.unprocessable("'y' parameter is not a number");
            message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error':" + error + "}";
            this.HttpContext.response.JSON(message);
        } else if (isNaN(n)) {
            error = this.HttpContext.response.unprocessable("'n' parameter is not a number");
            message = "{'op':" + op + ",'n':" + n + ", 'error':" + error + "}";
            this.HttpContext.response.JSON(message);
        }*/

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

        switch (op) {
            case "+":
            case " ":
                value = x + y;
                message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "-":
                value = x - y;
                message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "*":
                value = x * y;
                message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "/":
                value = x / y;
                message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "%":
                value = x % y;
                message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "!":
                value = factorializeNumber(n);
                message = "{'op':" + op + ",'n':" + n + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "p":
                value = isPrime(n);
                message = "{'op':" + op + ",'n':" + n + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            case "np":
                value = getPrimeNumberAtPos(n);
                message = "{'op':" + op + ",'n':" + n + ", 'value':" + value + "}";
                this.HttpContext.response.JSON(message);
                break;
            /*default:
                error = this.HttpContext.response.unprocessable("this operator does not exist");
                if (!isNaN(y) && !isNaN(x) && isNaN(n)) {
                    message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error':" + error + "}";
                } else if (!isNaN(n) && isNaN(x) && isNaN(y)) {
                    message = "{'op':" + op + ",'n':" + n + ", 'error':" + error + "}";
                }
                this.HttpContext.response.JSON(message);
                break;*/
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

    /*help() {
        let helpPagePath = path.join(process.cwd(), wwwroot, "API-Help-Pages/API-Maths-Help.html");
        this.HttpContext.response.HTML(fs.readFileSync(helpPagePath));
    }

    get() {
        if (this.HttpContext.path.queryString == '?')
            this.help();
        else
            this.doOperation();
    }*/
}

function isPrime(n) {
    if (n <= 1)
        return false
    for (var i = 2; i <= n - 1; i++)
        if (n % i == 1)
            return true;
}

function getPrimeNumberAtPos(n) {
    let primeNumer = 0;
    for (let i = 0; i < n; i++) {
        primeNumer++;
        while (!isPrime(primeNumer)) {
            primeNumer++;
        }
    }
    return primeNumer;
}

function factorializeNumber(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}