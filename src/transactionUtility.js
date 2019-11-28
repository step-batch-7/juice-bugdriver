const fs = require("fs");
const utils = require("./utils");

const isEmpIdValid = function(empId, beverageRecord) {
  const employeeId = empId || beverageRecord.empId;
  return employeeId === beverageRecord.empId;
};

const isBeverageValid = function(bev, beverageRecord) {
  const beverage = bev || beverageRecord["beverage"];
  return beverage === beverageRecord.beverage;
};

const isDateValid = function(time, beverageRecord) {
  const cmdDate = time || beverageRecord.time;
  const recordDate = new Date(beverageRecord.time);
  const searchedDate = new Date(cmdDate);
  const validDate = recordDate.getDate() === searchedDate.getDate();
  const validMonth = recordDate.getMonth() === searchedDate.getMonth();
  const validYear = recordDate.getFullYear() === searchedDate.getFullYear();
  return validDate && validMonth && validYear;
};

const recordsHaving = function(employeeId, time, beverage) {
  return function(beverageRecord) {
    const validEmpId = isEmpIdValid(employeeId, beverageRecord);
    const validDate = isDateValid(time, beverageRecord);
    const validBeverage = isBeverageValid(beverage, beverageRecord);
    return validEmpId && validDate && validBeverage;
  };
};

const saveBeverageEntry = function(empBeverageRecords, beverageEntry, time) {
  const empId = beverageEntry["empId"];
  const beverage = beverageEntry["beverage"];
  const quantity = +beverageEntry["qty"];
  empBeverageRecords.push({ empId, beverage, quantity, time });
  return { empBeverageRecords, beverageEntry };
};

const queryBeverageEntry = function(beverageRecordList, queryData) {
  const { empId, date, beverage } = queryData;
  const selectedRecords = beverageRecordList.filter(
    recordsHaving(empId, date, beverage)
  );
  const noOfBeverageConsumed = selectedRecords.reduce(function(
    totalQuantity,
    record
  ) {
    return totalQuantity + record["quantity"];
  },
  0);
  return { selectedRecords, noOfBeverageConsumed };
};

exports.save = saveBeverageEntry;
exports.query = queryBeverageEntry;
