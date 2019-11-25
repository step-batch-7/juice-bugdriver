const fs = require("fs");
const utils = require("./utils");

const saveBeverageEntry = function(empBeverageRecords, beverageEntry, time) {
  const empId = beverageEntry["empId"];
  const beverage = beverageEntry["beverage"];
  const quantity = +beverageEntry["qty"];
  if (!empBeverageRecords.hasOwnProperty(empId)) {
    empBeverageRecords[empId] = {
      empId: +empId,
      orders: [],
      beverageCount: 0
    };
  }
  empBeverageRecords[empId].orders.push({ beverage, quantity, time });
  empBeverageRecords[empId].beverageCount += quantity;

  return { empBeverageRecords, beverageEntry };
};

const queryBeverageEntry = function(empBeverageRecords, beverageEntry) {
  const empId = beverageEntry["empId"];
  let beveragesConsumed = [];
  let noOfBeverageConsumed = 0;
  if (empBeverageRecords.hasOwnProperty(empId)) {
    noOfBeverageConsumed = empBeverageRecords[empId].beverageCount;
    beveragesConsumed = empBeverageRecords[empId].orders;
  }
  return { empId, beveragesConsumed, noOfBeverageConsumed };
};

exports.save = saveBeverageEntry;
exports.query = queryBeverageEntry;
