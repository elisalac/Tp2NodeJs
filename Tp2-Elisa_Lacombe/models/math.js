import Model from './model.js';

export default class Math extends Model {
    constructor() {
        super();

        this.addField('op', 'string');
        this.addField('x', 'integer');
        this.addField('y', 'integer');
        this.addField('value', 'string');

        this.setKey("op");
    }
    constructor() {
        super();

        this.addField('op', 'string');
        this.addField('n', 'string');
        this.addField('value', 'string');

        this.setKey("op");
    }
}