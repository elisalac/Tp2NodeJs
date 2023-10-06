import Controller from './Controller.js';
import fs from 'fs';
import path from 'path';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get(id) {
        /*let message;
        let value;
        let error;
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
        }*/

        let data = this.HttpContext.path.params;
        if (!this.HttpContext.path.queryString.includes("n")) {
            data.x = parseFloat(data.x);
            data.y = parseFloat(data.y);
        } else if (!this.HttpContext.path.queryString.includes("x") && !this.HttpContext.path.queryString.includes("y")) {
            data.n = parseFloat(data.n);
        }


        if (data.op == " ")
            data.op = "+";

        if (this.HttpContext.path.queryString == "?") {
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

        if (this.HttpContext.path.queryString.includes("x") && this.HttpContext.path.queryString.includes("y")) {
            switch (data.op) {
                case "+":
                case " ":
                    data.value = data.x + data.y;
                    this.HttpContext.response.JSON(data);
                    break;
                case "-":
                    data.value = data.x - data.y;
                    this.HttpContext.response.JSON(data);
                    break;
                case "*":
                    data.value = data.x * data.y;
                    this.HttpContext.response.JSON(data);
                    break;
                case "/":
                    if (data.y != 0)
                        data.value = data.x / data.y;
                    else
                        data.error = Infinity.toString();
                    this.HttpContext.response.JSON(data);
                    break;
                case "%":
                    if (data.x != 0 && data.y != 0)
                        data.value = data.x % data.y;
                    else
                        data.error = "NaN"
                    this.HttpContext.response.JSON(data);
                    break;
            }
        } else if (this.HttpContext.path.queryString.includes("n")) {
            if (data.n == 0) {
                data.error = "'n' parameter must be an integer > 0";
                this.HttpContext.response.JSON(data);
            } else {
                switch (data.op) {
                    case "!":
                        data.value = factorializeNumber(data.n);
                        this.HttpContext.response.JSON(data);
                        break;
                    case "p":
                        if (!Number.isInteger(data.n))
                            data.error = "'n' parameter is not an integer";
                        else
                            data.value = isPrime(data.n);
                        this.HttpContext.response.JSON(data);
                        break;
                    case "np":
                        data.value = getPrimeNumberAtPos(data.n);
                        this.HttpContext.response.JSON(data);
                        break;
                }
            }
        } else {
            if (!this.HttpContext.path.queryString.includes("x")) {
                data.error = "'x' parameter is missing";
                return this.HttpContext.response.JSON(data);
            } else if (!this.HttpContext.path.queryString.includes("y")) {
                data.error = "'y' parameter is missing";
                return this.HttpContext.response.JSON(data);
            } /*else if (!this.HttpContext.path.queryString.includes("x") && !this.HttpContext.path.queryString.includes("y") && !this.HttpContext.path.queryString.includes("n")) {
                data.error = "this parameter does not exists";
                return this.HttpContext.path.response.JSON(data);
            }*/

        }
        /*switch (data.op) {
            default:
                error = this.HttpContext.response.unprocessable("this operator does not exist");
                if (!isNaN(y) && !isNaN(x) && isNaN(n)) {
                    message = "{'op':" + op + ",'x':" + x + ", 'y':" + y + ",'error':" + error + "}";
                } else if (!isNaN(n) && isNaN(x) && isNaN(y)) {
                    message = "{'op':" + op + ",'n':" + n + ", 'error':" + error + "}";
                }
                this.HttpContext.response.JSON(message);
                break;
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
    return n * factorializeNumber(n - 1);
}