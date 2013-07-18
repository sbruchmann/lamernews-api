"use strict";

// Module dependencies
var expect = require("chai").expect;
var rewire = require("rewire");

var LamernewsAPI = rewire("./");

LamernewsAPI.__set__("request", function requestMock(url, callback) {
    var res = {
        status: 200
    };

    callback(null, res, JSON.stringify({
        status: "ok",
        count: 1337,
        news: []
    }));
});

describe("LamernewsAPI", function() {
    beforeEach(function() {
        this.api = new LamernewsAPI("http://echojs.com/api/");
    });

    it("has a 'getNews' method", function() {
        expect(this.api).to.respondTo("getNews");
    });

    it("has a 'query' method", function() {
        expect(this.api).to.respondTo("query");
    });

    describe("#getNews", function() {
        it("asynchronously returns news", function(done) {
            this.api.getNews(function(err, response) {
                if (err) {
                    throw err;
                }

                expect(err).to.be.a("null");
                expect(response).to.be.an("object");
                expect(response).to.have.keys([
                    "status", "count", "news"
                ]);
                expect(response.count).to.be.a("number");
                expect(response.news).to.be.an("array");
                expect(response.status).to.be.a("string");
                done();
            });
        });
    });

    describe("#query", function() {
        it("throws an error if no root is specified", function() {
            this.api.root = null;
            expect(this.api.query).to.throw(Error);
        });

        it("asynchronously returns the API response", function(done) {
            var signature = "/getnews/latest/0/30";

            this.api.query(signature, function onDone(err, response) {
                if (err) {
                    throw err;
                }

                expect(err).to.be.a("null");
                expect(response).to.be.an("object");
                done();
            });
        });
    });
});
