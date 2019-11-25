const fs = require("fs");

const getDataFileName = function() {
	return "/Users/step21/rajatwork/JavaScript/juice-bugdriver/data/beverageTransactions.json";
};

const updateTransaction = function(data, filePath) {
	const stringData = JSON.stringify(data, null, 2);
	fs.writeFileSync(filePath, stringData, "utf8");
};

const getTransactions = function(filePath, readFileFunc, existsSync) {
	let fileLines = "{}";
	if (existsSync(filePath)) {
		fileLines = readFileFunc(filePath, "utf8") || fileLines;
	}
	return JSON.parse(fileLines);
};

const createConfirmMessage = function(beverageEntry, time) {
	let confirmationMessage = "Transaction Recorded:\n";
	confirmationMessage += "Employee ID,Beverage,Quantity,Date\n";
	confirmationMessage +=
		beverageEntry["--empId"] +
		"," +
		beverageEntry["--beverage"] +
		"," +
		beverageEntry["--qty"] +
		"," +
		time.toJSON();
	return confirmationMessage;
};

const formatOutputData = function(
	empId,
	beveragesConsumed,
	noOfBaverageConsumed
) {
	let formatedData = "Employee ID, Beverage, Quantity, Date\n";
	for (let beverageEntry of beveragesConsumed) {
		formatedData +=
			empId +
			"," +
			beverageEntry["beverage"] +
			"," +
			beverageEntry["quantity"] +
			"," +
			beverageEntry["time"] +
			"\n";
	}
	formatedData += "Total: " + noOfBaverageConsumed + " Juices";
	return formatedData;
};

exports.getTransactions = getTransactions;
exports.updateTransaction = updateTransaction;
exports.getDataFileName = getDataFileName;
exports.createConfirmMessage = createConfirmMessage;
exports.formatOutputData = formatOutputData;
