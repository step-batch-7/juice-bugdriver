const parseInput = require("../src/parseInput");
const assert = require("assert");

describe("parseInput", function() {
  it("should parse Given cmdArg into object and say if cmdArgs are valid", function() {
    const cmdArgs = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "32452",
      "--qty",
      "3",
    ];
    const actual = parseInput.parseInput(cmdArgs);
    const expected = {
      ValidOptions: true,
      beverageEntry: {
        command: "save",
        beverage: "orange",
        empId: "32452",
        qty: "3",
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should work if options are not valid", function() {
    const cmdArgs = [
      "--sav",
      "--beverag",
      "orange",
      "--empId",
      "32452",
      "--qty",
      "3",
    ];
    const actual = parseInput.parseInput(cmdArgs);
    const expected = {
      ValidOptions: false,
      beverageEntry: {
        command: "sav",
        beverag: "orange",
        empId: "32452",
        qty: "3",
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
  it("should work if quantity is not valid", function() {
    const cmdArgs = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "32452",
      "--qty",
      "3s",
    ];
    const actual = parseInput.parseInput(cmdArgs);
    const expected = {
      ValidOptions: false,
      beverageEntry: {
        command: "save",
        beverage: "orange",
        empId: "32452",
        qty: "3s",
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should work if empId is not valid", function() {
    const cmdArgs = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "324s",
      "--qty",
      "3s",
    ];
    const actual = parseInput.parseInput(cmdArgs);
    const expected = {
      ValidOptions: false,
      beverageEntry: {
        command: "save",
        beverage: "orange",
        empId: "324s",
        qty: "3s",
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should work if date is not valid", function() {
    const cmdArgs = ["--query", "--date", "2019-11-45"];
    const actual = parseInput.parseInput(cmdArgs);
    const expected = {
      ValidOptions: false,
      beverageEntry: {
        command: "query",
        date: "2019-11-45",
      },
    };
    assert.deepStrictEqual(actual, expected);
  });

  it("should work if query option is not valid", function() {
    const cmdArgs = ["--query", "--empI", "23f"];
    const actual = parseInput.parseInput(cmdArgs);
    const expected = {
      ValidOptions: false,
      beverageEntry: {
        command: "query",
        empI: "23f",
      },
    };
    assert.deepStrictEqual(actual, expected);
  });
});
