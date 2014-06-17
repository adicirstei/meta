var expect = require('chai').expect
    sinon = require('sinon');

var extract = require('../index.js').extract;

describe('extract function', function() {
    var md1, mdl2, md3;
    before(function () {
        
        md1 = "abcd";
        md2 = "##titlu";
        md3 ="#t\n\np\n\n##st\n\np2 xx";

    });

    it('should be a function', function () {
        expect(extract).to.be.a('function');
    });
    it('should throw error if any argument is missing', function () {
        expect(function () {
            extract();
        }).to.throw(/invalid arguments/);
    });

    it('should extract the meta data', function () {
        expect(extract(md1)).to.have.property('summary', 'abcd');
        expect(extract(md2)).to.have.property('title', 'titlu');
        expect(extract(md3)).to.contain({'title': 't', 'summary': 'p'});
    });
});    
    

    