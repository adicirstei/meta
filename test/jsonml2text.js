var expect = require('chai').expect
    sinon = require('sinon');

var jsonml2text = require('../index.js').jsonml2text;

describe('jsonml2text function', function() {
    var ml1, ml2, ml3;
    before(function () {
        
        ml1 = [
            "markdown",
            ["header", {"level": 2}, "un fel ", ["link", { "href": "#" }, "de"], " titlu"],
            ["para", "paragraful ", ["em", "numaru"], " unu"],
            ["para", "paragraful ", ["link", {"href": "x.html"}, "numaru"], " doi"],
            ["header", {"level": 3}, "si un subtitlu"]
        ];
        ml2 = ["header", {"level": 2}, "un fel ", ["link", { "href": "#" }, "de"], " titlu"];
        ml3 = [["para", "paragraful ", ["em", "numaru"], " unu"],
            ["para", "paragraful ", ["link", {"href": "x.html"}, "numaru"], " doi"]];

    });

    it('should be a function', function () {
        expect(jsonml2text).to.be.a('function');
    });
    it('should throw error if any argument is missing', function () {
        expect(function () {
            jsonml2text();
        }).to.throw(/invalid arguments/);
    });

    it('should return the text portion of  as expected', function () {
        expect(jsonml2text([])).to.eql("");
        expect(jsonml2text(ml2)).to.eql("un fel de titlu");
        expect(jsonml2text(ml3)).to.equal("paragraful numaru unu paragraful numaru doi");
        expect(jsonml2text(ml1)).to.equal("un fel de titlu paragraful numaru unu paragraful numaru doi si un subtitlu");
    });
});    
    

    