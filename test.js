"use strict";

// Module dependencies
var expect = require("chai").expect;
var requestMock = require("./request-mock.js");
var rewire = require("rewire");

var LamernewsAPI = rewire("./");

LamernewsAPI.__set__("request", requestMock);

describe("LamernewsAPI", function() {
    beforeEach(function() {
        this.api = new LamernewsAPI("http://echojs.com/api/");
    });

    describe("#getNews", function() {
        it("fetches news asynchronously", function(done) {
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
        it("throws an error if root was not specified", function() {
            this.api.root = null;
            expect(this.api.query).to.throw(Error);
        });

        it("queries the given API endpoint", function(done) {
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
