"use strict";

module.exports = {
    status,
    init,
    search
};

const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: process.env.ES_PATH,
    log: 'trace'
});


function status() {
    return client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity
    });
}

function init() {
    return client.search({
        index: 'cp-final',
        type: 'cp'
    }).then((resp) => resp.hits.hits.map((el) => el._source));
}

function search(cp) {
    return client.search({
        index: 'cp-final',
        type: 'cp',
        body: {
            query: {
                "terms": {
                    "Code_postal": cp
                }
            }
        }
    }).then((resp) => resp.hits.hits.map((el) => el._source));
}