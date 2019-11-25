const utils = require("../src/utils");
const assert = require("assert");
const fs = require("fs");

describe("give path of file having beverage data", function() {
  it("should give path of file having beverage data", function() {
    const expected =
      "/Users/step21/rajatwork/JavaScript/juice-bugdriver/data/beverageTransactions.json";
    assert.strictEqual(utils.getDataFileName(), expected);
  });
});

describe("write data into given file path", function() {
  it("should write given data into file path", function() {
    const testData = { name: "something" };
    const testFilePath = "./testfile";
    utils.updateTransaction(testData, testFilePath);
    const actualData = fs.readFileSync(testFilePath, "utf8");
    assert.strictEqual(actualData, '{\n  "name": "something"\n}');
    fs.unlinkSync(testFilePath);
  });
});

describe("read data from given filePath", function() {
  it("should give data of given filePath if file exists", function() {
    const existFile = function(path) {
      if (path == "somepath") {
        return true;
      }
    };
    const readFile = function(path, format) {
      if (path == "somepath") {
        return '{ "key": "somecontent" }';
      }
    };
    const actual = utils.getTransactions("somepath", readFile, existFile);
    const expected = { key: "somecontent" };
    assert.deepStrictEqual(actual, expected);
  });

  it("should give {} if given filePath is not exists", function() {
    const existFile = function(path) {
      if (path == "somepath") {
        return false;
      }
    };
    const readFile = function(path, format) {
      if (path == "somepath") {
        return "{}";
      }
    };
    const actual = utils.getTransactions("somepath", readFile, existFile);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });
});

describe("give formated confirmation message having beverageEntry and time", function() {
  it("should give formated confimation message", function() {
    const beverageEntry = {
      empId: 25334,
      beverage: "orange",
      qty: 1
    };
    const time = new Date("2019-11-25T19:25:19.474Z");
    const actualData = utils.createConfirmMessage(beverageEntry, time);
    const expectedData =
      "Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n" +
      "25334,orange,1,2019-11-25T19:25:19.474Z";
    assert.strictEqual(actualData, expectedData);
  });
});

describe("give formated output data if someone query for their record by empId", function() {
  it("should give formated output data for given inputs", function() {
    const empId = 11111;
    const time = new Date("2019-11-25T19:25:19.474Z");
    const beveragesConsumed = [
      { beverage: "orange", quantity: 1, time: time.toJSON() }
    ];
    const noOfBeverageConsumed = 1;
    const actualData = utils.formatOutputData({
      empId,
      beveragesConsumed,
      noOfBeverageConsumed
    });
    const expectedData =
      "Employee ID, Beverage, Quantity, Date\n" +
      "11111,orange,1,2019-11-25T19:25:19.474Z" +
      "\nTotal: 1 Juices";
    assert.strictEqual(actualData, expectedData);
  });
});
