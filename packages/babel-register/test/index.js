var assert = require("assert");
var path = require("path");
var assign = require("lodash/assign");

var DATA_ES2015 = require.resolve('./__data__/es2015');

suite("babel-register", function () {
  var babelRegister = null;

  function setupRegister(config) {
    babelRegister = require("..");
    babelRegister(assign({
      presets: [path.join(__dirname, '../../babel-preset-es2015')],
      babelrc: false,
      only: '__data__'
    }, config));
  }

  function revertRegister() {
    if (babelRegister) {
      babelRegister.revert();
      babelRegister = null;
    }
  }

  afterEach(function () {
    revertRegister();
    delete require.cache[DATA_ES2015];
  });

  test("basic usage", function () {
    setupRegister();

    assert.ok(require(DATA_ES2015).default);
  });

  test("reverts correctly", function () {
    setupRegister();
    revertRegister();

    assert.throws(function () {
      require(DATA_ES2015);
    }, SyntaxError)
  });
});
