import MathModel from '../models/math.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new MathModel()));
    }

    /*get() {
        //see all operations x,y and n

    }

    get(op, x, y) {
        //returns value of operation with x and y
    }

    get(op, n) {
        //returns value of operation with n

    }*/
}