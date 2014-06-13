var expect = require('chai').expect
    sinon = require('sinon');

var queryml = require('../index.js').queryml;

describe('queryml function', function() {
    it('should be a function', function () {
        expect(queryml).to.be.a('function');
    });
    it('should throw error if any argument is missing', function () {
        expect(queryml).to.throw(/invalid arguments/);
    });
    
});    
    

    