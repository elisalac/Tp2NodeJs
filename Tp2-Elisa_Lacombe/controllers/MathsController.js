import Controller from './Controller.js';
import fs from 'fs';
import path from 'path';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext);
    }

    get(id) {
        let data = this.HttpContext.path.params;
        if (!this.HttpContext.path.queryString.includes("n")) {
            if (this.HttpContext.path.queryString.includes("x"))
                data.x = parseFloat(data.x);
            if (this.HttpContext.path.queryString.includes("y"))
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
            if (Object.keys(data).length > 3) {
                data.error = "too many parameters";
                return this.HttpContext.response.JSON(data);
            }
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
                    if (data.x == 0 && data.y == 0)
                        data.error = "NaN";
                    else if (data.y == 0)
                        data.error = Infinity.toString();
                    else
                        data.value = data.x / data.y;
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
            if (data.n <= 0) {
                data.error = "'n' parameter must be an integer > 0";
                this.HttpContext.response.JSON(data);
            } else if (Object.keys(data).length > 2) {
                data.error = "too many parameters";
                return this.HttpContext.response.JSON(data);
            } else {
                switch (data.op) {
                    case "!":
                        data.n = parseInt(data.n);
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
                        data.n = parseInt(data.n);
                        data.value = getPrimeNumberAtPos(data.n);
                        this.HttpContext.response.JSON(data);
                        break;
                }
            }
        } else {
            if (this.HttpContext.path.queryString.includes("X")) {
                data.error = "'x' parameter is missing";
                return this.HttpContext.response.JSON(data);
            } else if (this.HttpContext.path.queryString.includes("Y")) {
                data.error = "'y' parameter is missing";
                return this.HttpContext.response.JSON(data);
            } else if (data.op == undefined) {
                data.error = "'op' parameter is missing";
                return this.HttpContext.response.JSON(data);
            }
        }
    }
}

function isPrime(n) {
    for (var i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }
    return n > 1;
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
    var result = n;
    if (n === 0 || n === 1)
        return 1;
    while (n > 1) {
        n--;
        result *= n;
    }
    return result;
}