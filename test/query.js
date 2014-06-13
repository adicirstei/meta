var expect = require('chai').expect
    sinon = require('sinon');

var queryml = require('../index.js').queryml;

describe('queryml function', function() {
    var ml;
    before(function () {
        ml = require('markdown').markdown.parse('## un fel [de](#) titlu\n\n paragraful *numaru* unu\n\nparagraful [numaru](x.html) doi\n\n### si un subtitlu');
    });

    it('should be a function', function () {
        expect(queryml).to.be.a('function');
    });
    it('should throw error if any argument is missing', function () {
        expect(function () {
            queryml();
        }).to.throw(/invalid arguments/);
        expect(function () {
            queryml('');
        }).to.throw(/invalid arguments/);
    });
    it('should behave as expected', function () {
        expect(queryml('', ml)).to.eq([]);
        expect(queryml('/', ml)).to.eq(ml);
    });
});    
    

    