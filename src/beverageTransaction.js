const tranctionUtility = require("./transactionUtility");
const utils = require("./utils");
const fs = require("fs");
const parseInput = require("./parseInput").parseInput;

const performTransaction = function(
  empBeverageEntry,
  readerFunc,
  existFileFunc
) {
  const { ValidOptions, beverageEntry } = parseInput(empBeverageEntry);
  if (!ValidOptions) {
    return "Not Valid Input";
  }
  const transactionType = beverageEntry.command;
  const transactionPerformer = tranctionUtility[transactionType];
  const fileName = utils.getDataFileName();
  const currentTime = new Date();
  const empBeverageRecords = utils.getTransactions(
    fileName,
    readerFunc,
    existFileFunc
  );
  const transactionResponse = transactionPerformer(
    empBeverageRecords,
    beverageEntry,
    currentTime
  );
  if (transactionType == "save") {
    utils.updateTransaction(transactionResponse.empBeverageRecords, fileName);
    return utils.createConfirmMessage(
      transactionResponse.beverageEntry,
      currentTime
    );
  }
  return utils.formatOutputData(transactionResponse);
};

exports.performTransaction = performTransaction;
