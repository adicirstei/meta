var expect = require('chai').expect
    sinon = require('sinon');

var queryml = require('../index.js').queryml;

describe('queryml function', function() {
    var ml1, ml2, ml3;
    before(function () {
        //ml = require('markdown').markdown.parse('## un fel [de](#) titlu\n\n paragraful *numaru* unu\n\nparagraful [numaru](x.html) doi\n\n### si un subtitlu');
        ml1 = [
            "markdown",
            ["header", {"level": 2}, "un fel ", ["link", { "href": "#" }, "de"], " titlu"],
            ["para", " paragraful ", ["em", "numaru"], " unu"],
            ["para", "paragraful ", ["link", {"href": "x.html"}, "numaru"], " doi"],
            ["header", {"level": 3}, "si un subtitlu"]
        ];

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
        expect(queryml('', ml1)).to.eq([]);
        expect(queryml('/', ml1)).to.eq(ml1);
        expect(queryml('/markdown', ml1)).to.eq([["header", {"level": 2}, "un fel ", ["link", { "href": "#" }, "de"], " titlu"],
            ["para", " paragraful ", ["em", "numaru"], " unu"],
            ["para", "paragraful ", ["link", {"href": "x.html"}, "numaru"], " doi"],
            ["header", {"level": 3}, "si un subtitlu"]]);
    });
});    
    

    