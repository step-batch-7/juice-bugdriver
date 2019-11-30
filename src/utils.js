const fs = require("fs");

const getDataFileName = function() {
  return (
    process.env.JUICE_TRANSACTIONS_STORE_PATH ||
    "./data/beverageTransactions.json"
  );
};

const updateTransaction = function(data, filePath, helperFuncs) {
  const stringData = JSON.stringify(data, null, 2);
  helperFuncs.writeFile(filePath, stringData, "utf8");
};

const getTransactions = function(filePath, helperFuncs) {
  let fileLines = "[]";
  if (helperFuncs.existsFile(filePath)) {
    fileLines = helperFuncs.readFile(filePath, "utf8");
  }
  return JSON.parse(fileLines);
};

const createConfirmMessage = function(beverageEntry, time) {
  let confirmationMessage =
    `Transaction Recorded:\nEmployee ID,Beverage,Quantity,Date\n` +
    `${beverageEntry["empId"]},${beverageEntry["beverage"]},${
      beverageEntry["qty"]
    },${time.toJSON()}`;
  return confirmationMessage;
};

const formatOutputData = function(transactionResponse) {
  let queryResult = "Employee ID, Beverage, Quantity, Date\n";
  for (let beverageEntry of transactionResponse.selectedRecords) {
    queryResult +=
      `${beverageEntry["empId"]},${beverageEntry["beverage"]},` +
      `${beverageEntry["qty"]},${beverageEntry["date"]}\n`;
  }
  queryResult += `Total: ${transactionResponse.noOfBeverageConsumed} Juices`;
  return queryResult;
};

exports.getTransactions = getTransactions;
exports.updateTransaction = updateTransaction;
exports.getDataFileName = getDataFileName;
exports.createConfirmMessage = createConfirmMessage;
exports.formatOutputData = formatOutputData;
