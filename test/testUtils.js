const utils = require("../src/utils");
const assert = require("chai").assert;

describe("give path of file having beverage data", function() {
  it("should give path of file having beverage data", function() {
    const expected = "./data/beverageTransactions.json";
    assert.strictEqual(utils.getDataFileName(), expected);
  });
});

describe("write data into given file path", function() {
  it("should write given data into file path", function() {
    const writeFile = function(path, data, encoding) {
      assert.equal(path, "somepath");
      assert.equal(data, '"somedata"');
      assert.equal(encoding, "utf8");
    };
    const helperFunc = { writeFile: writeFile };
    const actual = utils.updateTransaction("somedata", "somepath", helperFunc);
    assert.isUndefined(actual);
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
        return '[{ "key": "somecontent" }]';
      }
    };
    const helperFunc = { readFile: readFile, existsFile: existFile };
    const actual = utils.getTransactions("somepath", helperFunc);
    const expected = [{ key: "somecontent" }];
    assert.deepStrictEqual(actual, expected);
  });

  it("should give {} if given filePath is not exists", function() {
    const existFile = function(path) {
      assert.strictEqual(path, "somepath");
      return false;
    };
    const readFile = function(path, format) {
      assert.strictEqual(path, "somepath");
      return "[]";
    };
    const helperFunc = { readFile: readFile, existsFile: existFile };
    const actual = utils.getTransactions("somepath", helperFunc);
    const expected = [];
    assert.deepStrictEqual(actual, expected);
  });
});

describe("give formated confirmation message having beverageEntry and time", function() {
  it("should give formated confimation message", function() {
    const beverageEntry = {
      empId: 25334,
      beverage: "orange",
      qty: 1,
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
  it("should give formated output data for given inputs if one juice", function() {
    const time = new Date("2019-11-25T19:25:19.474Z");
    const selectedRecords = [
      { empId: 11111, beverage: "orange", qty: 1, date: time.toJSON() },
    ];
    const noOfBeverageConsumed = 1;
    const actualData = utils.formatOutputData({
      selectedRecords,
      noOfBeverageConsumed,
    });
    const expectedData =
      "Employee ID, Beverage, Quantity, Date\n" +
      "11111,orange,1,2019-11-25T19:25:19.474Z" +
      "\nTotal: 1 Juice";
    assert.strictEqual(actualData, expectedData);
  });

  it("should give formated output data for given inputs if more than one juice", function() {
    const time = new Date("2019-11-25T19:25:19.474Z");
    const selectedRecords = [
      { empId: 11111, beverage: "orange", qty: 1, date: time.toJSON() },
      { empId: 11111, beverage: "banana", qty: 1, date: time.toJSON() },
    ];
    const noOfBeverageConsumed = 2;
    const actualData = utils.formatOutputData({
      selectedRecords,
      noOfBeverageConsumed,
    });
    const expectedData =
      "Employee ID, Beverage, Quantity, Date\n" +
      "11111,orange,1,2019-11-25T19:25:19.474Z\n" +
      "11111,banana,1,2019-11-25T19:25:19.474Z" +
      "\nTotal: 2 Juices";
    assert.strictEqual(actualData, expectedData);
  });
});
