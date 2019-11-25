const tranctionUtility = require("./transactionUtility");
const utils = require("./utils");
const fs = require("fs");

const getDesiredEntryFormat = function(empBeverageEntry) {
	const beverageEntry = {};
	for (let index = 1; index < empBeverageEntry.length; index += 2) {
		beverageEntry[empBeverageEntry[index]] = empBeverageEntry[index + 1];
	}
	return beverageEntry;
};

const performTransaction = function(empBeverageEntry) {
	const transactionType = empBeverageEntry[0].slice(2);
	const beverageEntry = getDesiredEntryFormat(empBeverageEntry);
	const transactionPerformer = tranctionUtility[transactionType];
	const fileName = utils.getDataFileName();
	return transactionPerformer(
		beverageEntry,
		fileName,
		fs.readFileSync,
		new Date()
	);
};

exports.performTransaction = performTransaction;
