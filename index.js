"use strict";

var _ = require("lodash");
var HTTP_STATUS_CODES = require("http").STATUS_CODES;
var request = require("request");
var url = require("url");

function LamernewsAPI(root) {
    this.root = root;
    return this;
}

LamernewsAPI.prototype.getNews = function getNews(options, callback) {
    var defaults = {
        count: 30,
        start: 0,
        type: "latest"
    };
    var signature;

    if (!callback && typeof options === "function") {
        callback = options;
        options = {};
    }

    options = _.defaults(options || {}, defaults);
    signature = ["getnews", options.type, options.count, options.start];

    this.query(signature.join("/"), callback);

    return this;
};

LamernewsAPI.prototype.query = function query(signature, callback) {
    if (!this.root) {
        throw new Error("No API root specified");
    }

    request(url.resolve(this.root, signature), function(err, res, body) {
        var status;

        if (err) {
            return callback(err);
        }

        status = res.status;

        if (status !== 200) {
            err = new Error(HTTP_STATUS_CODES[status]);
            err.code = status;

            return callback(err);
        }

        try {
            body = JSON.parse(body);
        } catch (err) {
            callback(err);
        }

        callback(null, body);
    });
};

module.exports = LamernewsAPI;
