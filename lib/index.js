// super simple module for the most common nodejs use case.
exports.markdown = require("./markdown");
exports.parse = exports.markdown.toHTML;
exports.parseConde = require('../src/parse_conde');

