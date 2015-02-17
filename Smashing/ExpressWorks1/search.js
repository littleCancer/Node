/**
 * Created by steva on 2/17/15.
 */

var request = require('superagent');

/**
 * Search function
 *
 * @param (String) search query
 * @param (Function) callback;
 * @api public
 *
 *
 */

function performSearch(query, fn) {
    request.get('http://search.twitter.com/search.json')
        .send({q:query})
        .end(function(res) {
            if (res.body && Array.isArray(res.body.results)) {
                fn(null, res.body.result);
            } else {
                fn(new Error('Bad twitter response'));
            }
        });
}

module.exports = performSearch;