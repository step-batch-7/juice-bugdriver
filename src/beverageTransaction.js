const tranctionUtility = require("./transactionUtility");
const utils = require("./utils");
const parseInput = require("./parseInput").parseInput;

const performTransaction = function(empBeverageEntry, helperFuncs) {
  const { ValidOptions, beverageEntry } = parseInput(empBeverageEntry);
  if (!ValidOptions) {
    return "Not Valid Input";
  }
  const transactionType = beverageEntry.command;
  const transactionPerformer = tranctionUtility[transactionType];
  const fileName = utils.getDataFileName();
  const empBeverageRecords = utils.getTransactions(fileName, helperFuncs);
  const transactionResponse = transactionPerformer(
    empBeverageRecords,
    beverageEntry,
    helperFuncs
  );
  if (transactionType == "save") {
    utils.updateTransaction(
      transactionResponse.empBeverageRecords,
      fileName,
      helperFuncs
    );
    return utils.createConfirmMessage(
      transactionResponse.beverageEntry,
      helperFuncs.timeStamp()
    );
  }
  return utils.formatOutputData(transactionResponse);
};

exports.performTransaction = performTransaction;
