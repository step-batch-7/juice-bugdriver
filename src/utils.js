const fs = require("fs");

const getDataFileName = function() {
	return "./data/beverageTransactions.json";
};

const updateTransaction = function(data, filePath) {
	const stringData = JSON.stringify(data, null, 2);
	fs.writeFileSync(filePath, stringData, "utf8");
};

const getTransactions = function(filePath, readFileFunc, existsSync) {
	let fileLines = "{}";
	if (existsSync(filePath)) {
		fileLines = readFileFunc(filePath, "utf8");
	}
	return JSON.parse(fileLines);
};

const createConfirmMessage = function(beverageEntry, time) {
	let confirmationMessage = "Transaction Recorded:\n";
	confirmationMessage += "Employee ID,Beverage,Quantity,Date\n";
	confirmationMessage +=
		beverageEntry["empId"] +
		"," +
		beverageEntry["beverage"] +
		"," +
		beverageEntry["qty"] +
		"," +
		time.toJSON();
	return confirmationMessage;
};

const formatOutputData = function(transactionResponse) {
	let queryResult = "Employee ID, Beverage, Quantity, Date\n";
	for (let beverageEntry of transactionResponse.selectedRecords) {
		queryResult +=
			beverageEntry["empId"] +
			"," +
			beverageEntry["beverage"] +
			"," +
			beverageEntry["quantity"] +
			"," +
			beverageEntry["time"] +
			"\n";
	}
	queryResult +=
		"Total: " + transactionResponse.noOfBeverageConsumed + " Juices";
	return queryResult;
};

exports.getTransactions = getTransactions;
exports.updateTransaction = updateTransaction;
exports.getDataFileName = getDataFileName;
exports.createConfirmMessage = createConfirmMessage;
exports.formatOutputData = formatOutputData;
