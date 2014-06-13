var md = require('markdown').markdown;

function jsonml2text (jsonml) {
    return '';
}

function queryml (q, ml) {
    if ( ml === undefined || q === undefined )
        throw new Error('invalid arguments');
        
    if (q==='') 
        return [];
    return ml;
}

function extract (text) {
    var jsonml = md.parse(text),
        titlepath = '/markdown/heading[0]',
        summarypath = '/markdown/para[0]'

    return {
        tree: jsonml,
        title: jsonml2text(queryml(titlepath, jsonml)),
        summary: jsonml2text(queryml(summarypath, jsonml))
    };
}

module.exports = {
    jsonml2text: jsonml2text,
    queryml: queryml,
    extract: extract
};
