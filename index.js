var md = require('markdown').markdown;

function jsonml2text (jsonml) {
    return '';
}

function queryml (q, ml) {

    function filter1(f) {
        if (ml.length === 0)
            return [];
        if (f === '')
            return ml;
        if (typeof ml[0] === 'string' && f === ml[0])
            return ml;
            
        return ml.filter(function (el) {
            return (el instanceof Array) && el[0] === f;
        });
    }
    if ( ml === undefined || q === undefined )
        throw new Error('invalid arguments');
    if ( q==='/' )
        return ml;
    if ( q==='' ) 
        return [];
        
    var subq = q.split('/'),
        subml = filter1(subq[0]);
    if ( subq.length === 1 )
        return subml;
    else
        return queryml(subq.splice(1).join('/'), subml);
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
