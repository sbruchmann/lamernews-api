module.exports = function configure(grunt) {
    "use strict";

    var path = require("path");

    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: path.join(__dirname, ".jshintrc")
            },

            target: {
                src: ["index.js", "test.js"]
            }
        },

        cafemocha: {
            test: {
                src: "test.js",
                options: {
                    reporter: "spec",
                    timeout: 5000,
                    ui: "bdd"
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-cafe-mocha");

    grunt.registerTask("default", ["jshint", "cafemocha"]);
};
