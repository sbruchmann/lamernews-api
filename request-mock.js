module.exports = function requestMock(url, callback) {
    "use strict";

    var res = {
        statusCode: 200
    };

    callback(null, res, JSON.stringify({
        status: "ok",
        count: 1337,
        news: []
    }));
};
