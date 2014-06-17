var md = require('markdown').markdown;

function jsonml2text (jsonml) {

    var data, r = [];
    if (jsonml === undefined) {
        throw new Error('invalid arguments');
    }
    if (jsonml.length === 0) {
        return '';
    }
    if (jsonml[0] instanceof Array) {

        return jsonml.reduce(function (prev, curr) {
            prev.push(jsonml2text(curr));
            return prev;
        }, []).join(' ');
    }
    if (typeof jsonml[0] === 'string') {

        if (typeof jsonml[1] === 'string' || jsonml[1] instanceof Array) {
            data = jsonml.splice(1);
        } else {
            data = jsonml.splice(2);
        }

        return data.reduce(function (prev, curr, i) {
            return prev + (i === 0 ? '' : ' ') + (curr instanceof Array ? jsonml2text(curr) : curr).trim();
        }, '');
    } else {
        throw new Error('invalid markdown');
    }
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
        titlepath = '/markdown/heading',
        summarypath = '/markdown/para'

    return {
        tree: jsonml,
        title: jsonml2text(queryml(titlepath, jsonml)[0]),
        summary: jsonml2text(queryml(summarypath, jsonml)[0])
    };
}

module.exports = {
    jsonml2text: jsonml2text,
    queryml: queryml,
    extract: extract
};
