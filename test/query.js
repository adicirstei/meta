var expect = require('chai').expect
    sinon = require('sinon');

var queryml = require('../index.js').queryml;

describe('queryml function', function() {
    var ml1, ml2, ml3;
    before(function () {
        
        ml1 = [
            "markdown",
            ["header", {"level": 2}, "un fel ", ["link", { "href": "#" }, "de"], " titlu"],
            ["para", " paragraful ", ["em", "numaru"], " unu"],
            ["para", "paragraful ", ["link", {"href": "x.html"}, "numaru"], " doi"],
            ["header", {"level": 3}, "si un subtitlu"]
        ];
        ml2 = ["header", {"level": 2}, "un fel ", ["link", { "href": "#" }, "de"], " titlu"];
        ml3 = [["para", " paragraful ", ["em", "numaru"], " unu"],
            ["para", "paragraful ", ["link", {"href": "x.html"}, "numaru"], " doi"]];

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
        var r;
        expect(queryml('', ml1)).to.have.members([]);
        expect(queryml('/', ml1)).to.have.members(ml1);
        expect(queryml('/mark', ml1)).to.be.empty;
        expect(queryml('/mark/down', ml1)).to.be.empty;
        expect(queryml('/markdown', ml1)).to.have.members(ml1);
        expect(queryml('/markdown/heading', [ 'markdown', [ 'para', 'abcd' ] ])).to.be.empty;
        expect(queryml('/markdown/para', ml1)).to.eql(ml3);
        expect(queryml('/markdown/header', ml1)[0]).to.eql(ml2);
    });
});    
    

    